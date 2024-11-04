/* Edit this file */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
function togglePlay() {
    if (video.paused) {
        video.play();
        toggle.textContent = '❚ ❚';
    } else {
        video.pause();
        toggle.textContent = '►';
    }
}

// Update play/pause button whenever play and pause events are fired
function updateButton() {
    console.log(video.paused, 'video is paused');
    
    toggle.textContent = video.paused ? '►' : '❚ ❚';
}

/**
 * Handle Progress 
 */
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.width = `${percent}%`;
}

/**
 * Here we are controlling the audio using the input type range where we give the interval between two steps 0.05
 */
function handleVolume() {

    video.volume = volumeControl.value;
}

/**
 * Here we are controlling the video playback speed using the input type range where we give the interval between two steps 0.1
 */
function handlePlaybackSpeed() {
    video.playbackRate = playbackSpeedControl.value;
}

/**
 * Here we are skipping the video 
 */
function skip(seconds) {
    video.currentTime += seconds;
}

// Scrub through video
function scrub(event) {
    console.log("offsetX",event.offsetX)
    console.log("progress.offsetWidth",progress.offsetWidth)

    const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// Event listeners
video.addEventListener('click', togglePlay); // Toggle play/pause on video click
video.addEventListener('play', updateButton); // Update button when video plays
video.addEventListener('pause', updateButton); // Update button when video pauses
video.addEventListener('timeupdate', handleProgress); // Update progress bar as video plays

toggle.addEventListener('click', togglePlay); // Toggle play/pause on button click
volumeControl.addEventListener('input', handleVolume); // Volume control
playbackSpeedControl.addEventListener('input', handlePlaybackSpeed); // Playback speed control

skipBack.addEventListener('click', () => skip(-10)); // Skip back 10s
skipForward.addEventListener('click', () => skip(25)); // Skip forward 25s

// Allow clicking on progress bar to scrub
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));
