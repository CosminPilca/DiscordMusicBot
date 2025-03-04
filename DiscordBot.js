/**
 * Discord Music Bot using discord.js and @discordjs/voice
 * This bot allows users to play YouTube audio in a voice channel.
 */

const { Client, GatewayIntentBits } = require('discord.js');
const {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource,
    AudioPlayerStatus,
    entersState,
    VoiceConnectionStatus,
    StreamType,
} = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const yts = require('yt-search');
const ffmpeg = require('ffmpeg-static');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const PREFIX = '//';

/**
 * Event triggered when the bot is ready.
 */
client.once('ready', () => {
    console.log(`✅ Logged in as ${client.user.tag}!`);
});

/**
 * Event triggered when a message is created.
 * @param {import('discord.js').Message} message - The message object.
 */
client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'play') {
        if (!args[0]) {
            return message.channel.send('❌ Please provide a YouTube link or song name!');
        }

        const query = args.join(' ');
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            return message.channel.send('❌ You need to be in a voice channel to play music!');
        }

        try {
            const url = await getVideoUrl(query);
            if (!url) return message.channel.send('❌ Could not find the song.');

            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator,
            });

            await entersState(connection, VoiceConnectionStatus.Ready, 30e3);
            const player = createAudioPlayer();
            connection.subscribe(player);

            const info = await ytdl.getInfo(url);
            const format = ytdl.chooseFormat(info.formats, {
                quality: 'highestaudio',
                filter: 'audioonly',
            });

            if (!format) throw new Error('No suitable format found');

            const stream = ytdl(url, {
                quality: 'highestaudio',
                filter: 'audioonly',
                highWaterMark: 1 << 25,
                dlChunkSize: 0,
                requestOptions: {
                    headers: {
                        'User-Agent': 'Mozilla/5.0',
                        'Accept-Language': 'en-US,en;q=0.9',
                    },
                },
            });

            const resource = createAudioResource(stream, {
                inputType: StreamType.Arbitrary,
                inlineVolume: true,
                metadata: {
                    title: info.videoDetails.title,
                },
            });

            player.play(resource);
            message.channel.send(`🎶 Now playing: **${info.videoDetails.title}**`);

            player.on(AudioPlayerStatus.Idle, () => {
                connection.destroy();
            });

            player.on('error', error => {
                console.error('❌ Player error:', error);
                message.channel.send('⚠️ Playback error. Trying to recover...');
                connection.destroy();
            });
        } catch (error) {
            console.error('❌ Main error:', error);
            message.channel.send(`❌ Error: ${error.message}`);
        }
    } else if (command === 'stop') {
        const voiceChannel = message.member.voice.channel;
        if (voiceChannel) {
            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator,
            });
            connection.destroy();
            message.channel.send('⏹️ Playback stopped');
        }
    }
});

/**
 * Retrieves the YouTube video URL based on the provided search query.
 * @param {string} query - YouTube link or search query.
 * @returns {Promise<string|null>} The video URL or null if not found.
 */
async function getVideoUrl(query) {
    if (ytdl.validateURL(query)) return query;

    const { videos } = await yts(query);
    return videos[0]?.url || null;
}

// Login to Discord with the bot token.
client.login('YOUR_PRIVATE_BOT_TOKEN_HERE...');
