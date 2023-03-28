import * as admin from 'firebase-admin';
admin.initializeApp();

export { basicHTTP} from './http';


// import functions = require("firebase-functions");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello Matey!");
// });
