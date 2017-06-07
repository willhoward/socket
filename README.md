# socket
Real-time instant messaging app, with [React](https://facebook.github.io/react/) and [Firebase](https://firebase.google.com/). Live instance: https://socket.willhowardgb.com.

### Running Locally
Built and run this project yourself with the following steps:

* Run `git clone https://github.com/willhowardgb/socket.git`.
* Navigate into the project folder and run `yarn` to install the necessary packages.
* Create a new Firebase project and create two files at the root of your project folder, `env.dev` and `env.prod`. Insert the following environment variables into both of these files from your Firebase and Algolia config credentials:
```
REACT_APP_FIREBASE_API_KEY=<API KEY HERE>
REACT_APP_FIREBASE_AUTH_DOMAIN=<AUTH DOMAIN HERE>
REACT_APP_FIREBASE_DATABASE_URL=<DATABASE URL HERE>
REACT_APP_FIREBASE_PROJECT_ID=<PROJECT ID HERE>
REACT_APP_FIREBASE_STORAGE_BUCKET=<STORAGE BUCKET HERE>
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<SENDER ID HERE>
REACT_APP_ALGOLIA_APPLICATION_ID=<APP ID HERE>
REACT_APP_ALGOLIA_API_KEY=<API KEY HERE>
```
* Make sure you have the email and password authentication method enabled in your Firebase project.
* Run `yarn start` to launch the project locally in your browser.

### Deploying to Firebase Hosting
Deploy this project in under two minutes with the following steps:

* Install the Firebase CLI using the instructions provided [here](https://github.com/firebase/firebase-tools).
* Run `firebase init` and follow the steps to set up hosting. Choose `/build` as your build folder, and decline the option to set up the project as a single-page app, since doing so will break the in-built routing.
* Run `yarn build` to build a production-ready version of the project, then `firebase deploy` to deploy it. The url for the running app will be returned.

### How It Works
This project was created with [create-react-app](https://github.com/facebookincubator/create-react-app), a tool which allows the rapid creation of React apps with no build configuration or fuss. It is intended to be the most minimal, lightweight chat app possible, without compromising on user experience. In order to achieve this, the CSS styling has been customised to include only those elements used in the project and does not rely on an underlying framework. It is therefore likely that, should you attempt to add new components, the styling will not apply.

The app relies on a constant connection to the Firebase Database, which keeps all conversations up to date in real-time. Since Firebase includes support for loss of connection, the app will store messages when the connection to the database is lost, warn the user, then re-sync the data when the connection is re-established.
