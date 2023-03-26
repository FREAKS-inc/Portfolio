const functions = require('firebase-functions');
const admin = require('firebase-admin');
const openai = require('openai');

admin.initializeApp();

exports.updateText = functions.https.onCall(async (data, context) => {
  const prompt = data.prompt;
  const response = await openai.Completion.create({
    engine: 'text-davinci-002',
    prompt,
    maxTokens: 150,
    n: 1,
    stop: '\n'
  });
  
  const text = response.choices[0].text.trim();

  await admin.firestore().doc('text/textDoc').set({
    content: text
  });

  return { success: true };
});
