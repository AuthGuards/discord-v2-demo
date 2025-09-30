const { 
    Client, 
    GatewayIntentBits, 
    ActionRowBuilder, 
    ButtonBuilder, 
    ButtonStyle, 
    StringSelectMenuBuilder, 
    TextInputBuilder, 
    ModalBuilder, 
    TextInputStyle, 
    EmbedBuilder,
    MessageFlags,
    TextDisplayBuilder,
    SeparatorBuilder,
    SeparatorSpacingSize,
    ThumbnailBuilder,
    SectionBuilder,
    ChannelSelectMenuBuilder,
    ContainerBuilder,
    MediaGalleryBuilder,
    MediaGalleryItemBuilder,
    FileBuilder,
    AttachmentBuilder
} = require('discord.js');

const config = {
    token: 'YOUR_BOT_TOKEN_HERE',
    clientId: 'YOUR_CLIENT_ID_HERE',
    guildId: 'YOUR_GUILD_ID_HERE'
};

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('clientReady', () => {
    console.log(`🛡️ AuthGuards Discord V2 Demo Bot is ready! Logged in as ${client.user.tag}`);
    console.log('🌐 Visit https://authguards.com for more information');
    console.log('📋 Available commands:');
    console.log('  /demo - Show Discord Components V2 examples');
});

client.on('interactionCreate', async (interaction) => {
    if (interaction.isCommand()) {
        await handleSlashCommand(interaction);
    } else if (interaction.isButton()) {
        await handleButtonInteraction(interaction);
    } else if (interaction.isStringSelectMenu()) {
        await handleSelectMenuInteraction(interaction);
    } else if (interaction.isModalSubmit()) {
        await handleModalSubmit(interaction);
    }
});

async function handleSlashCommand(interaction) {
    const { commandName } = interaction;

    switch (commandName) {
        case 'demo':
            await showComponentsDemo(interaction);
            break;
    }
}

async function showComponentsDemo(interaction) {
    const botAvatarURL = client.user.displayAvatarURL({ extension: 'png', size: 512 });

    const textDisplay = new TextDisplayBuilder()
        .setContent('🛡️ **AuthGuards Discord V2 Demo** - This is a TextDisplay component showcasing the new Discord Components V2 system.');

    const separator = new SeparatorBuilder()
        .setDivider(true)
        .setSpacing(SeparatorSpacingSize.Small);

    const thumbnail = new ThumbnailBuilder({ media: { url: botAvatarURL } });
    const sectionWithThumbnail = new SectionBuilder()
        .addTextDisplayComponents(
            new TextDisplayBuilder().setContent('🛡️ **AuthGuards Components V2 Demo**'),
            new TextDisplayBuilder().setContent('This section demonstrates how to use Section components with thumbnails in Discord\'s new V2 system.')
        )
        .setThumbnailAccessory(thumbnail);

    const channelSelectMenu = new ChannelSelectMenuBuilder()
        .setCustomId('channel_select_menu')
        .setPlaceholder('Select a channel…');
    const selectActionRow = new ActionRowBuilder().addComponents(channelSelectMenu);

    const mediaGallery = new MediaGalleryBuilder().addItems(
        new MediaGalleryItemBuilder().setURL('https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400'),
        new MediaGalleryItemBuilder().setURL('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400')
    );

    const sectionWithButtons = [
        new SectionBuilder()
            .addTextDisplayComponents(new TextDisplayBuilder().setContent('🌐 **AuthGuards Website**'))
            .setButtonAccessory(
                new ButtonBuilder()
                    .setLabel('Visit AuthGuards.com')
                    .setURL('https://authguards.com')
                    .setStyle(ButtonStyle.Link)
            ),
        new SectionBuilder()
            .addTextDisplayComponents(new TextDisplayBuilder().setContent('📺 **Discord Server**'))
            .setButtonAccessory(
                new ButtonBuilder()
                    .setLabel('Join Discord')
                    .setURL('https://discord.authguards.com')
                    .setStyle(ButtonStyle.Link)
            ),
        new SectionBuilder()
            .addTextDisplayComponents(new TextDisplayBuilder().setContent('💬 **Support**'))
            .setButtonAccessory(
                new ButtonBuilder()
                    .setLabel('Get Help')
                    .setCustomId('support_button')
                    .setStyle(ButtonStyle.Primary)
            )
    ];

    const demoJSON = Buffer.from(JSON.stringify({ 
        project: 'AuthGuards Discord V2 Demo',
        website: 'https://authguards.com',
        discord: 'https://discord.authguards.com',
        message: 'This demo showcases Discord Components V2 features', 
        timestamp: Date.now(),
        components: 'Discord Components V2 Demo by AuthGuards',
        version: '1.0.0'
    }, null, 2));
    const attachment = new AttachmentBuilder(demoJSON, { name: 'authguards-demo.json' });
    const fileComponent = new FileBuilder().setURL('attachment://authguards-demo.json');

    const container = new ContainerBuilder()
        .setAccentColor(0x00D4AA)
        .addMediaGalleryComponents(mediaGallery)
        .addSectionComponents(sectionWithThumbnail)
        .addMediaGalleryComponents(
            new MediaGalleryBuilder().addItems(new MediaGalleryItemBuilder().setURL(botAvatarURL))
        )
        .addSectionComponents(...sectionWithButtons)
        .addSeparatorComponents(new SeparatorBuilder().setDivider(true).setSpacing(SeparatorSpacingSize.Small))
        .addTextDisplayComponents(
            new TextDisplayBuilder().setContent('🛡️ **AuthGuards Discord V2 Demo - Complete Components V2 Showcase**'),
            new TextDisplayBuilder().setContent('This message demonstrates the full power of Discord\'s new Components V2 system:'),
            new TextDisplayBuilder().setContent('• **TextDisplay** - Rich markdown text with up to 4000 characters'),
            new TextDisplayBuilder().setContent('• **Section** - Group text with accessories like thumbnails and buttons'),
            new TextDisplayBuilder().setContent('• **MediaGallery** - Display up to 10 images in carousel format'),
            new TextDisplayBuilder().setContent('• **Separator** - Add visual dividers and spacing between components'),
            new TextDisplayBuilder().setContent('• **File** - Attach JSON, images, or other files dynamically'),
            new TextDisplayBuilder().setContent('• **Button** - Interactive elements for links and actions'),
            new TextDisplayBuilder().setContent('• **ChannelSelectMenu** - Let users select channels interactively'),
            new TextDisplayBuilder().setContent('• **Container** - Group components with custom accent colors'),
            new TextDisplayBuilder().setContent('\n🚀 **Ready to build with Discord V2?** Visit https://authguards.com for more demos!')
        )
        .addFileComponents(fileComponent);

    await interaction.reply({
        flags: MessageFlags.IsComponentsV2,
        components: [textDisplay, separator, sectionWithThumbnail, selectActionRow, container],
        files: [attachment]
    });
}

async function handleButtonInteraction(interaction) {
    const { customId } = interaction;

    switch (customId) {
        case 'support_button':
            const supportText = new TextDisplayBuilder()
                .setContent('🛡️ **AuthGuards Support**\n\nNeed help with Discord V2 components or this demo?\n\n• Visit our website: https://authguards.com\n• Join our Discord: https://discord.authguards.com\n• Check out our GitHub for more examples!');

            const supportSection = new SectionBuilder()
                .addTextDisplayComponents(supportText)
                .setButtonAccessory(
                    new ButtonBuilder()
                        .setLabel('Join AuthGuards Discord')
                        .setURL('https://discord.authguards.com')
                        .setStyle(ButtonStyle.Link)
                );

            await interaction.reply({
                flags: MessageFlags.IsComponentsV2,
                components: [supportSection],
                ephemeral: true
            });
            break;
    }
}

async function handleSelectMenuInteraction(interaction) {
    const { customId, values } = interaction;

    switch (customId) {
        case 'channel_select_menu':
            const selectedChannel = values[0];
            const channel = interaction.guild.channels.cache.get(selectedChannel);
            
            const channelInfo = new TextDisplayBuilder()
                .setContent(`📺 **Selected Channel: ${channel.name}**\n\n**Type:** ${channel.type}\n**ID:** ${channel.id}\n**Created:** ${channel.createdAt.toDateString()}`);

            const channelSection = new SectionBuilder()
                .addTextDisplayComponents(channelInfo)
                .setButtonAccessory(
                    new ButtonBuilder()
                        .setLabel('View Channel')
                        .setURL(`https://discord.com/channels/${interaction.guild.id}/${channel.id}`)
                        .setStyle(ButtonStyle.Link)
                );

            await interaction.reply({
                flags: MessageFlags.IsComponentsV2,
                components: [channelSection],
                ephemeral: true
            });
            break;
    }
}

async function handleModalSubmit(interaction) {
    return;
}

client.once('clientReady', async () => {
    const commands = [
        {
            name: 'demo',
            description: 'Show Components V2 demonstration'
        }
    ];
    console.log('🛡️ AuthGuards Discord V2 Demo - Slash commands registered:');
    commands.forEach(cmd => console.log(`  /${cmd.name} - ${cmd.description}`));
    console.log('🌐 Visit https://authguards.com for more information');
});

client.on('error', console.error);
process.on('unhandledRejection', console.error);
client.login(config.token);