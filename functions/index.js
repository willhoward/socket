const functions = require('firebase-functions');
const algoliasearch = require('algoliasearch');
const gcs = require('@google-cloud/storage')();
const spawn = require('child-process-promise').spawn;

const algolia = algoliasearch(functions.config().algolia.app_id, functions.config().algolia.api_key);
const index = algolia.initIndex('users');

exports.searchAddUser = functions.database.ref('/users/{userId}').onWrite(event => {
  console.log('Event: ', event.data.val());
  const firebaseObject = event.data.val();
  firebaseObject.objectID = event.data.val().id;

  index.saveObject(firebaseObject, error => {
    if (error) {
      throw error;
    }
    console.log('Firebase object indexed in Algolia: ', firebaseObject.objectID);
  });
});

exports.generateThumbnail = functions.storage.object().onChange(event => {
  const object = event.data;

  const fileBucket = object.bucket;
  const filePath = object.name;
  const contentType = object.contentType;
  const resourceState = object.resourceState;
  const metageneration = object.metageneration;

  if (!contentType.startsWith('image/')) {
    console.log('This is not an image.');
    return;
  }

  console.log('File path: ', filePath);

  const fileName = filePath.split('/').pop();
  if (fileName.startsWith('thumb_')) {
    console.log('Image is already a thumbnail.');
    return;
  }

  if (resourceState === 'not_exists') {
    console.log('This is a deletion event.');
    return;
  }

  if (resourceState === 'exists' && metageneration > 1) {
    console.log('This is a metadata change event.');
    return;
  }

  const bucket = gcs.bucket(fileBucket);
  const tempFilePath = `/tmp/${fileName}`;
  bucket.file(filePath).download({
    destination: tempFilePath,
  }).then(() => {
    console.log('Image downloaded locally to', tempFilePath);
    return spawn('convert', [tempFilePath, '-define', 'jpeg:size=96x96', '-thumbnail', '96x96^', '-gravity', 'center', '-extent', '96x96', tempFilePath]).then(() => {
      console.log('Thumbnail created at', tempFilePath);
      const thumbFilePath = filePath.replace(/(\/)?([^\/]*)$/, '$1thumb_$2');
      return bucket.upload(tempFilePath, {
        destination: thumbFilePath,
      });
    });
  });
});
