const audio = new Audio();
let isPlay = true;
const playBtn = document.getElementById('iconSong');
let nextBtn = document.getElementById('nextBtn');
let prevBtn = document.getElementById('prevBtn');
let playNum = 0;
let artist = document.querySelector('.player_action_song_artist');
let titleSong = document.querySelector('.player_action_song_title');
let blockImg = document.querySelector('.player_img');
let bcg_image = document.querySelector('.bcg_image');
let currentTime = document.querySelector('.currentTime');
let durationTime = document.querySelector('.durationTime');
const seekSlider = document.getElementById('progress_line');

const songsObj = {
    0: {
        src: './assets/audio/beyonce.mp3',
        artist: "Beyonce",
        titleSong: "Don't Hurt Yorself",
        img: './assets/img/lemonade.png'
    },
    1: {
        src: './assets/audio/assets_audio_dontstartnow.mp3',
        artist: "Dua Lipa",
        titleSong: "Don't Start Now",
        img: './assets/img/dontstartnow.png'
    }
}
window.onload = function() {
    audio.src = songsObj[0].src;
    artist.textContent = songsObj[0].artist;
    titleSong.textContent = songsObj[0].titleSong;
    blockImg.src = songsObj[0].img;
    bcg_image.src = songsObj[0].img;
};

function playAudio() {
    audio.currentTime = seekSlider.value;
    (!isPlay) ? audio.play() : audio.pause();
}

playBtn.classList.add('play');
function toggleBtn() {
    playBtn.classList.contains('play') ? playBtn.classList.toggle('pause') : playBtn.classList.toggle('play');
    if (playBtn.classList.contains('play')) {
        zoomBlockImgToggle();
    }
}

playBtn.addEventListener('click', () => {
    toggleBtn();
    isPlay = !isPlay;
    playAudio();
    
})

// next and prev btn
function nextSong() {
    if (playNum <= 0){
        playNum = Object.keys(songsObj).length - 1;
        audio.src = songsObj[playNum].src;
        artist.textContent = songsObj[playNum].artist;
        titleSong.textContent = songsObj[playNum].titleSong;
        blockImg.src = songsObj[playNum].img;
        bcg_image.src = songsObj[playNum].img;
        playAudio();
    } 
}
function prevSong() {
    if (playNum >= Object.keys(songsObj).length - 1){
        playNum = 0;
        audio.src = songsObj[playNum].src;
        artist.textContent = songsObj[playNum].artist;
        titleSong.textContent = songsObj[playNum].titleSong;
        blockImg.src = songsObj[playNum].img;
        bcg_image.src = songsObj[playNum].img;
        playAudio();
    } 
}

nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

//zoom image
function zoomBlockImgToggle() {
    blockImg.classList.contains('player_img') ? blockImg.classList.toggle('player_img_zoom') : blockImg.classList.toggle('player_img');
}

//get duration
const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
}

const displayDuration = () => {
    durationTime.textContent = calculateTime(audio.duration);
}

if (audio.readyState > 0) {
    displayDuration();
} else {
    audio.addEventListener('loadedmetadata', () => {
        displayDuration();
    });
}

// move range and currentTime
audio.addEventListener('timeupdate', () => {
    seekSlider.value =  Math.floor(audio.currentTime);
    currentTime.textContent = calculateTime(seekSlider.value);
    seekSlider.setAttribute("max", (audio.duration));
});