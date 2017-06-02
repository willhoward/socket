# socket
Real-time instant messaging app, with React and Firebase. Live instance: https://socket.willhowardgb.com.

### Running locally
Built and run this project yourself with the following steps:

* Run `git clone https://github.com/willhowardgb/socket.git`.
* Navigate into the project folder and run `yarn` to install the necessary packages.
* Create a new Firebase project and copy your project config credentials.
* Paste your Firebase config credentials to the space indicated in `index.js`.
* Make sure you have the email and password authentication method enabled in your Firebase project.
* Run `yarn start` to launch the project locally in your browser.

### Deploying to Firebase
Deploy this project in under 2 minutes with the following steps:

* Install the Firebase CLI using the instructions provided.
* Run `firebase init` and follow the steps to set up hosting. Choose `/build` as your build folder, and decline the option to set up the project as a single-page app, since doing so will break the in-built routing.
* Run `yarn build` to build a production-ready version of the project, then `firebase deploy` to deploy it. The url for the running app will be returned.
