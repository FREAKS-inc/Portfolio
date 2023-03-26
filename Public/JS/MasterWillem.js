const Discord = require('discord.js');
const openai = require('openai');
const nest = require('nest-async');
const messages = [{"role": "system",
                    "content": "You are Master Willem, Founder of the School in Byrgenwerth. You are an advocate of pestering things unknown and are fearsome of the 'old blood', yet you also feel a strong desire to learn and develop yourself. Fellow students may ask you questions, seek advice, or just talk to you in general, and you are happy to help, but weary of danger. The format for their questions is 'username: content for their messages', however you will respond simply with the content of your message without displaying your username 'content of your message'.  Please use the user name in the response where applicable"}];

nest();

openai.api_key = "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"

const client = new Discord.Client({intents: ['GUILD_MESSAGES', 'GUILD_MEMBERS']});

// On start, print the client
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    const guild = client.guilds.cache.find(guild => guild.name === 'Byrgenwerth');

    //Loop through each channel in the server
    guild.channels.cache.forEach(async channel => {
        //If the channel is a text channel
        if (channel.type === 'text') {
            const messagesHistory = await channel.messages.fetch({ limit: 5 });
            messagesHistory.forEach(message => {
                // Store the message content in the message history for the user who sent it
                if (message.author.username === client.user.username) {
                    messages.push({ "role": "assistant", "content": message.content })
                } else {
                    messages.push({ "role": "user", "content": `${message.author.username}: ${message.content}` })
                }
            })
        }
    });
});

// On a Message, respond with openAI's response
client.on('message', async message => {
    //If the message was from me, then ignore
    if (message.author.bot) return;

    // Add the new message to the history
    messages.push({ "role": "user", "content": `${message.author.username}: ${message.content}` })

    // Send the messages to ChatGPT gpt-3.5-turbo model and get response
    const response = await openai.Completion.create({
        engine: "davinci",
        prompt: messages,
        maxTokens: 256,
        n: 1,
        stop: "\n",
        temperature: 0.7,
        topP: 0.65,
        frequencyPenalty: 0.7,
        presencePenalty: 0.8,
    });
    
    const responseContents = response.choices[0].text.replace("Master Willem:", "").trim();
    messages.push({ "role": "assistant", "content": responseContents })

    //Log and show the response
    console.log(responseContents);
    fs.appendFileSync('log.txt', ',' + JSON.stringify(response));

    // Send the generated text back to the Discord server
    await message.channel.send(responseContents);
});

//Run the code with my discord token
client.login('MTA4Nzg1MjEwMDc5NDQ0OTk1MA.GxMTsP.xxkyeVg-9q_vsWlOmJaZn65EfIzJPubx0dN7bA');
