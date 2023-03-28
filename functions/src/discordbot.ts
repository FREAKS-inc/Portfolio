// Write a bot that responds to messages in a Discord channel

// Import the discord.js module
const Discord = require('discord.js');

// Use dotenv to load environment variables from a .env file
require('dotenv').config();

// Get Discord token from environment variables
const discord_token = process.env.DISCORD_TOKEN;

// Create an instance of a Discord client
const client = new Discord.Client();

// The ready event is vital, it means that only _after_ this will your bot start reacting to information
// received from Discord
client.on('ready', () => {
  console.log('I am ready!');
});


// Handle form submission
const handleSubmit = async (e) => {
    e.preventDefault();

    if (userInput.trim() === "") {
      return;
    }

    setLoading(true);
    const context = [...messages, { role: "user", content: userInput }];
    setMessages(context);

    // Send chat history to API
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: context }),
    });

    // Reset user input
    setUserInput("");

    const data = await response.json();

    if (!data) {
      handleError();
      return;
    }

    setMessages((prevMessages) => [...prevMessages, { role: "assistant", content: data.result.content }]);
    setLoading(false);

  };

