const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const {
  guildId,
  clientId,
  token
} = require('./config.json');

const commands = [
  new SlashCommandBuilder().setName("register").setDescription("Use it to activate your account.")
].map(command => command.toJSON());

const rest = new REST({
  version: '9'
}).setToken(token);

(async () => {
  try {
    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId), {
        body: commands
      },
    );

    console.log('Successfully registered application commands.');
  } catch (error) {
    console.error(error);
  }
})();
