'use strict';

const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const song = [
    {
        name: 'pyari-pankaru',
        displayName: 'Pyari Pankaru',
        artist: 'Gulabi Sapera, Titi Robin',
    },
    {
        name: 'choo-lo',
        displayName: 'Choo Lo',
        artist: 'The Local Train',
    },
    {
        name: 'swangin-on-westheimer',
        displayName: "Swangin' On Westheimer",
        artist: 'Don Toliver',
    },
    {
        name: 'the-night-we-met',
        displayName: 'The Night We Met',
        artist: 'Lord Huron',
    }
]

let isPlaying = false;

// Play song
function playSong(){
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Pause
function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

playBtn.addEventListener('click', function(){
    isPlaying == false ? playSong() : pauseSong();
})

// update DOM
function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

let songIndex = 0;

function nextSong(){
    if(songIndex < song.length-1){
        songIndex++;
    } else{
        songIndex = 0;
    }
    loadSong(song[songIndex]);
    playSong();
}

function prevSong(){
    if(songIndex == 0){
        songIndex = song.length-1;
    } else{
        songIndex--;
    }
    loadSong(song[songIndex]);
    playSong();
}

loadSong(song[songIndex]);

prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
music.addEventListener('ended', nextSong);

music.addEventListener('timeupdate', function(e){
    if(isPlaying){
        const {duration, currentTime} = e.srcElement;
        const progressPercent = (currentTime/duration) * 100;
        progress.style.width = `${progressPercent}%`;

        // calculate duration
        const durationMinnutes = Math.trunc(duration / 60);
        let durationSeconds = Math.floor(duration%60);
        if(durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`;
        } 
        if(durationSeconds){
            durationEl.textContent = `${durationMinnutes}:${durationSeconds}`;
        }

        // calculate current duration
        const currentMinnutes = Math.trunc(currentTime / 60);
        let currentSeconds = Math.floor(currentTime%60);
        if(currentSeconds < 10){
            currentSeconds = `0${currentSeconds}`;
        } 
        currentTimeEl.textContent = `${currentMinnutes}:${currentSeconds}`;
    }
});

progressContainer.addEventListener('click', function(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX/width)*duration;
})