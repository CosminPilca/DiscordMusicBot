🎵 Discord Music Bot
A simple Discord music bot built using discord.js and @discordjs/voice that plays YouTube audio in voice channels.

🚀 Features
Join a voice channel and play YouTube audio using either a video URL or a search term

Automatically leaves the voice channel when playback ends

Gracefully handles errors and missing input

Simple command prefix for ease of use


📦 Dependencies
discord.js

@discordjs/voice

ytdl-core

yt-search

ffmpeg-static

🎧 Commands
Prefix: //

Command	Description
//play <url or search>	Plays audio from a YouTube URL or search term
//stop	Stops playback and disconnects from voice

✅ Requirements
Node.js v16.9.0 or newer

FFmpeg (installed automatically via ffmpeg-static)

A Discord bot token with necessary permissions (Read Messages, Send Messages, Connect, Speak)

❗ Notes
Make sure your bot has permission to join and speak in voice channels.

Playback ends automatically when the song finishes.

