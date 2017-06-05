const functions = require('firebase-functions');
const algoliasearch = require('algoliasearch');

const algolia = algoliasearch(functions.config().algolia.app_id, functions.config().algolia.api_key);
const index = algolia.initIndex('users');

exports.searchAddUser = functions.database.ref('/users').onWrite(event => {
  const firebaseObject = event.data.val();

  index.saveObject(firebaseObject, error => {
    if (error) {
      throw error;
    }
    console.log('Firebase object indexed in Algolia: ', firebaseObject.id);
  });
});
