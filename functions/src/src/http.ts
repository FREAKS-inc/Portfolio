import * as functions from 'firebase-functions';

import * as admin from 'firebase-admin';
admin.initializeApp();

const basicHTTP = functions.https.onRequest((request, response) => {

    response.send("Hello There");

});