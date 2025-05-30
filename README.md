#  Discord Music Bot

A powerful Discord bot that plays YouTube audio in voice channels with high-quality streaming and easy-to-use commands.

![Discord Bot](https://img.shields.io/badge/Discord-Bot-5865F2?logo=discord&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black) ![Status](https://img.shields.io/badge/Status-Active-brightgreen)

##  Features

- **YouTube Audio Streaming**: Play audio from YouTube videos or search by song name
- **High-Quality Audio**: Automatically selects the highest quality audio available
- **Voice Channel Integration**: Seamlessly joins and leaves voice channels
- **Simple Commands**: Easy-to-use prefix-based commands (`//play`, `//stop`)
- **Error Handling**: Robust error handling with user-friendly feedback
- **Auto-disconnect**: Automatically leaves voice channel when playback ends
- **Search Functionality**: Search for songs by name, not just YouTube URLs
- **Real-time Status**: Shows currently playing song information

##  Commands

| Command | Description | Usage |
|---------|-------------|-------|
| `//play <song/url>` | Play a YouTube video or search for a song | `//play Bohemian Rhapsody` |
| `//stop` | Stop playback and disconnect from voice channel | `//stop` |

##  Technologies Used

- **[discord.js](https://discord.js.org/)** - Discord API wrapper
- **[@discordjs/voice](https://www.npmjs.com/package/@discordjs/voice)** - Voice connection handling
- **[ytdl-core](https://www.npmjs.com/package/ytdl-core)** - YouTube video downloading
- **[yt-search](https://www.npmjs.com/package/yt-search)** - YouTube search functionality
- **[ffmpeg-static](https://www.npmjs.com/package/ffmpeg-static)** - Audio processing

##  Prerequisites

- **Node.js** 16.9.0 or newer
- **npm** or **yarn** package manager
- **Discord Bot Token** (from Discord Developer Portal)
- **Bot Permissions**: 
  - Connect to Voice Channels
  - Speak in Voice Channels
  - Send Messages
  - Read Message History


##  Project Structure

```
discord-music-bot/
├── bot.js              # Main bot file (your main code)
├── package.json        # Node.js dependencies and scripts
├── package-lock.json   # Dependency lock file
├── .env               # Environment variables (optional)
├── .gitignore         # Git ignore file
└── README.md          # This documentation
```



##  Usage Examples

### Basic Usage
```
User: //play https://www.youtube.com/watch?v=dQw4w9WgXcQ
Bot: 🎶 Now playing: **Rick Astley - Never Gonna Give You Up**

User: //play Bohemian Rhapsody Queen
Bot: 🎶 Now playing: **Queen - Bohemian Rhapsody**

User: //stop
Bot: ⏹️ Playback stopped
```

### Error Handling
```
User: //play
Bot: ❌ Please provide a YouTube link or song name!

User: //play (while not in voice channel)
Bot: ❌ You need to be in a voice channel to play music!
```

##  Code Architecture

### Key Components

#### **Event Handlers**
- `ready`: Triggered when bot connects to Discord
- `messageCreate`: Handles incoming messages and commands

#### **Audio Processing**
- **URL Validation**: Checks if input is a valid YouTube URL
- **Search Functionality**: Searches YouTube if URL is not provided
- **Stream Creation**: Creates audio resource from YouTube video
- **Quality Selection**: Automatically selects highest quality audio

#### **Voice Connection Management**
- **Channel Joining**: Connects to user's voice channel
- **Player Creation**: Creates audio player for the connection
- **Error Recovery**: Handles connection and playback errors
- **Auto-disconnect**: Leaves channel when playback ends



### Error Monitoring
```javascript
// Add logging for debugging
player.on('error', error => {
    console.error('❌ Player error:', error);
    // Add error reporting service here
});
```



##  Future Enhancements

-  **Queue System**: Add song queue functionality
-  **Volume Control**: Implement volume adjustment commands
-  **Playlist Support**: Support for YouTube playlists
-  **Skip/Previous**: Navigate through queued songs
-  **Now Playing**: Enhanced now playing information with progress
-  **Lyrics Integration**: Display song lyrics
-  **Multiple Sources**: Support Spotify, SoundCloud, etc.
-  **Web Dashboard**: Web interface for bot management
-  **Database Integration**: Save user preferences and favorites
-  **Slash Commands**: Implement Discord's slash command system

