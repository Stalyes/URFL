const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const commands = [
    {
        name: 'request',
        description: 'Submit a request to join',
        options: [
            {
                type: 3, // STRING type
                name: 'username',
                description: 'The username to request',
                required: true,
            },
            {
                type: 3, // STRING type
                name: 'aboutme',
                description: 'About me',
                required: false,
            },
            {
                type: 3, // STRING type
                name: 'information',
                description: 'Additional information',
                required: false,
            },
        ],
    },
    {
        name: 'freeagent',
        description: 'Announce a free agent',
        options: [
            {
                type: 3, // STRING type
                name: 'username',
                description: 'The username of the free agent',
                required: true,
            },
            {
                type: 3, // STRING type
                name: 'position',
                description: 'The position the free agent is looking for',
                required: true,
            },
            {
                type: 3, // STRING type
                name: 'information',
                description: 'Additional information about the free agent',
                required: false,
            },
        ],
    },
    {
        name: 'scouting',
        description: 'Post a scouting request',
        options: [
            {
                name: 'teamname',
                type: 3, // STRING
                description: 'The name of the team',
                required: true,
            },
            {
                name: 'positionsneeded',
                type: 3, // STRING
                description: 'The positions that are needed',
                required: true,
            }
        ],
    },
    {
        name: 'friendly',
        description: 'Announce a friendly match',
        options: [
            {
                name: 'description',
                type: 3, // STRING
                description: 'Details about the friendly match',
                required: true,
            }
        ],
    },
    {
        name: 'contract',
        description: 'Offer a contract to a user',
        options: [
            {
                type: 6, // USER type
                name: 'user',
                description: 'The user to offer the contract to',
                required: true,
            },
            {
                type: 3, // STRING type
                name: 'role',
                description: 'The role being offered',
                required: true,
            },
            {
                type: 3, // STRING type
                name: 'team',
                description: 'The team offering the contract',
                required: true,
            }
        ],
    }
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
            body: commands,
        });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();
