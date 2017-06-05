const functions = require('firebase-functions');
const algoliasearch = require('algoliasearch');

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
