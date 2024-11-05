// Author: ClarkCodes - Reproductor de Musica creado entre el 1 y el 5 de Noviembre del 2024, se empezo a las 5pm y se termino a las 6am


// ****** Declarations

let isSeeking = false;
const audio = document.querySelector( '#audioMagoDeOzSongId' );
const songTitle = document.querySelector( '#titleId' );
const songArtistAlbum = document.querySelector( '#artistAlbumId' );
const progressBarSlider = document.querySelector( '#progressBarSliderId' );
const currentTime = document.querySelector( '#currentTimeId' );
const totalTime = document.querySelector( '#totalTimeId' );
const playPauseReplayButton = document.querySelector( '#playPauseReplayButtonId' );
const playPauseReplayImage = document.querySelector( '#playPauseReplayButtonId img' );
const stopButton = document.querySelector( '#stopButtonId' );
const volumeButton = document.querySelector( '#volumeButtonId' );
const volumeButtonImage = document.querySelector( '#volumeButtonId img' );
const volumeSlider = document.querySelector( '#volumeSliderId' );
const volumeValue = document.querySelector( '#volumeValueId' );

const playIcon = 'icons/play_arrow_24dp_E8EAED_FILL1_wght400_GRAD0_opsz24.svg';
const pauseIcon = 'icons/pause_24dp_E8EAED_FILL1_wght400_GRAD0_opsz24.svg';
const replayIcon = 'icons/replay_24dp_E8EAED_FILL1_wght400_GRAD0_opsz24.svg';
const highVolumeIcon = 'icons/volume_up_24dp_E8EAED_FILL1_wght400_GRAD0_opsz24.svg';
const lowVolumeIcon = 'icons/volume_down_alt_24dp_E8EAED_FILL1_wght400_GRAD0_opsz24.svg';
const mutedIcon = 'icons/no_sound_24dp_E8EAED_FILL1_wght400_GRAD0_opsz24.svg';


// ****** Events Setting

playPauseReplayButton.addEventListener( 'click', () => togglePlay() );
stopButton.addEventListener( 'click', () => stopSong() );
progressBarSlider.addEventListener( 'input', () => { isSeeking = true; } );
progressBarSlider.addEventListener( 'change', () => seek() );
audio.addEventListener( 'loadedmetadata', () => loadSongBasics() );
audio.addEventListener( 'timeupdate', () => updateProgress() );
audio.addEventListener( 'play', () => updatePlayPauseIcon() );
audio.addEventListener( 'pause', () => updatePlayPauseIcon() );
audio.addEventListener( 'ended', () => songEnd() );
volumeButton.addEventListener( 'click', () => toogleMute() );
volumeSlider.addEventListener( 'input', () => setVolume() );


// ****** Functions

function formatToMinSec( totalSeconds ) { // Formats to Minutes and Seconds ( m:ss )
    const minutes = ( totalSeconds / 60 ) | 0; // Removing the floating fractional part of the float with a bitwise operation
    const seconds = ( totalSeconds % 60 ) | 0;
    
    // Add leading zero to seconds if needed
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    
    return `${minutes}:${formattedSeconds}`;
}

function loadSongBasics() {
    const totalSeconds = parseInt( audio.duration );
    progressBarSlider.max = totalSeconds;
    totalTime.textContent = formatToMinSec( totalSeconds );
    audio.volume = 0.5;
    audio.play();
}

function togglePlay() {
    if ( audio.ended ) { // If the Song has ended 
        audio.currentTime = 0.0;
        audio.play();
    } else if ( audio.paused ) { // If the song is Paused
        audio.play();
    } else { // If the song is currently playing
        audio.pause();
    }
}

function updatePlayPauseIcon() {
    playPauseReplayImage.setAttribute( 'src', ( audio.paused ? playIcon : pauseIcon ) );
}

function stopSong() {
    if( audio.currentTime > 0 ) {
        audio.pause();
        audio.currentTime = 0.0;
    }
}

function updateProgress() {
    if ( !isSeeking ) {
        progressBarSlider.value = audio.currentTime | 0;
    }

    currentTime.textContent = formatToMinSec( audio.currentTime );
}

function seek() {
    audio.currentTime = progressBarSlider.value * 1.0;
    isSeeking = false;
}

function songEnd() {
    playPauseReplayImage.setAttribute( 'src', replayIcon );
}

function toogleMute() {
    if ( audio.muted ) {
        audio.muted = false;
        const volume = audio.volume * 100;
        volumeSlider.value = volume;
        volumeButtonImageSetter( volume );
    }
    else {
        audio.muted = true;
        volumeSlider.value = 0;
        volumeButtonImage.setAttribute( 'src', mutedIcon );
    }

    volumeValue.textContent = volumeSlider.value;
}

function setVolume() {
    const volume = volumeSlider.value;
    audio.volume = volume / 100;
    volumeValue.textContent = volume;
    volumeButtonImageSetter( volume );
    
    if( volume > 0 && audio.muted ) {
        audio.muted = false;
    }
}

function volumeButtonImageSetter( volume ) {
    volumeButtonImage.setAttribute( 'src', ( volume >= 50 ) ? highVolumeIcon : lowVolumeIcon );
}
