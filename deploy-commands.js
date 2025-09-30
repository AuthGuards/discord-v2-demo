const { REST, Routes } = require('discord.js');

const config = {
    token: 'YOUR_BOT_TOKEN_HERE',
    clientId: 'YOUR_CLIENT_ID_HERE'
};

const commands = [
    {
        name: 'demo',
        description: 'Show Components V2 demonstration'
    }
];

const rest = new REST({ version: '10' }).setToken(config.token);

(async () => {
    try {
        console.log('🛡️ AuthGuards Discord V2 Demo - Started refreshing application (/) commands.');
        await rest.put(
            Routes.applicationCommands(config.clientId),
            { body: commands }
        );

        console.log('✅ Successfully reloaded AuthGuards Discord V2 Demo commands.');
        console.log('🌐 Visit https://authguards.com for more information');
    } catch (error) {
        console.error('❌ Error registering commands:', error);
    }
})();
