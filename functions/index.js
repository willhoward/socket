const functions = require('firebase-functions');
const algoliasearch = require('algoliasearch');

const algolia = algoliasearch(functions.config().algolia.app_id, functions.config().algolia.api_key);
const index = algolia.initIndex('users');

exports.userSearchWorker = functions.database
  .ref('/users').onWrite(event => {
    const firebaseObject = event.data.val();
    firebaseObject.objectID = event.data.key;
    index.saveObject(firebaseObject, err => {
      if (err) {
        throw err;
      }
      console.log('Firebase object indexed in Algolia', firebaseObject.objectID);
    });
  });
