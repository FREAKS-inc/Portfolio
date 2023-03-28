import * as functions from 'firebase-functions';


export const basicHTTP = functions.https.onRequest((request, response) => {

    // accept a input parameter called name
    const name = request.query.name;

    if (name === undefined) {
        // error case, name is required
        response.status(400).send('Name is required');
    }else{
        // success case
        response.send(`Hello There ${name} YYEEHAWWWW!`);        
    }

});