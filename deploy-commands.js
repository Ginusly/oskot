const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

const commands = [];
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
    } else {
        console.log(`[WARNING] The command at ${file} is missing a required "data" or "execute" property.`);
    }
}

const rest = new REST().setToken('MTQ2Njg3NjE0MzMzMTQ0Mjk1MQ.GeTWt_.cFJnMPLGnwxpQJwNRe8K9sro6RJwnPjF9hj1dI');

(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        // Note: Using global application commands (Routes.applicationCommands) instead of guild commands for simplicity, 
        // but they can take up to an hour to propagate. For instant updates during dev, guild commands are better.
        // Given the quick setup, I will use applicationCommands (global).
        await rest.put(
            Routes.applicationCommands('1466876143331442951'),
            { body: commands },
        );

        console.log(`Successfully reloaded ${commands.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();
