const { Client, GatewayIntentBits, REST, Routes, PermissionsBitField } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

// Command registration for /start
const commands = [
  {
    name: 'start',
    description: 'Renames all channels to "Join" and pings everyone 100 times per channel'
  }
];

client.once('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);

  // Register slash commands
  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
  try {
    console.log('Registering slash commands...');
    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: commands }
    );
    console.log('Slash commands registered!');
  } catch (error) {
    console.error('Error registering slash commands:', error);
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, guild } = interaction;

  if (commandName === 'start') {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      await interaction.reply('You do not have permission to run this command!');
      return;
    }

    await interaction.reply('Renaming all channels to "Join" and pinging everyone 100 times per channel!');

    // Rename all text-based channels and send 100 @everyone pings
    guild.channels.cache.forEach(async (channel) => {
      if (channel.isTextBased()) {
        try {
          await channel.setName('join'); // Rename the channel to "join"
          for (let i = 0; i < 100; i++) {
            await channel.send('@everyone Join this channel!'); // Ping @everyone 100 times
          }
        } catch (error) {
          console.error(`Could not rename or ping in ${channel.name}:`, error);
        }
      }
    });

    await interaction.followUp('All channels renamed and pings sent!');
  }
});

client.login(process.env.TOKEN);
