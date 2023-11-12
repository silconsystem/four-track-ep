
const audioElements = document.querySelectorAll('.audio-element');
const playIcons = document.querySelectorAll('.play-button');

const progressBars = document.querySelectorAll('.progress');
const currentTimes = document.querySelectorAll('.current-time');
const totalTimes = document.querySelectorAll('.total-time');
let currentlyPlayingIndex = null;

audioElements.forEach((audio, index) => {
  
  audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBars[index].style.width = `${progress}%`;
  
    const currentMinutes = Math.floor(audio.currentTime / 60);
    const currentSeconds = Math.floor(audio.currentTime % 60);
    currentTimes[index].textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
  
    const totalMinutes = Math.floor(audio.duration / 60);
    const totalSeconds = Math.floor(audio.duration % 60);
    totalTimes[index].textContent = `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;
  
    // Check if the audio is paused and update play button accordingly
    if (audio.paused) {
      swapImg(playIcons[index], "../play.png");
    } else {
      swapImg(playIcons[index], "../pause.png");
    }
  });

  playIcons[index].addEventListener('click', () => {
    if (currentlyPlayingIndex !== null && currentlyPlayingIndex !== index) {
      // Pause the currently playing audio if another play button is clicked
      audioElements[currentlyPlayingIndex].pause();
      //currentTimes[currentlyPlayingIndex].textContent = '00:00';
    }

    playAudio(index);
  });
});

function playAudio(index) {
  const audio = audioElements[index];
  const playIcon = playIcons[index];

  if (audio.paused) {
    if (currentlyPlayingIndex !== null && currentlyPlayingIndex !== index) {
      // Pause the currently playing audio before loading the new track
      audioElements[currentlyPlayingIndex].pause();
    }

    currentlyPlayingIndex = index;
    loadAudio(index);
    swapImg(playIcon, "../pause.png");
    audio.play().catch(error => {
      console.error("Error playing audio:", error);
    });
  } else {
    swapImg(playIcon, "../play.png");
    audio.pause();
    currentlyPlayingIndex = null;
  }
}

function loadAudio(index) {
  const audio = audioElements[index];
  audio.src = audioUrls[index];
  audio.load(); // Load the new audio source

  if (audio.paused) {
    audio.pause();
    swapImg(playIcons[index], "../play.png");
  }

  audio.addEventListener("canplaythrough", () => {
    // Ensure the audio is ready before playing
    //audio.play();
  });

  audio.addEventListener("loadedmetadata", () => {
    const currentMinutes = Math.floor(audio.currentTime / 60);
    const currentSeconds = Math.floor(audio.currentTime % 60);
    currentTimes[index].textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
    currentTimes[index].classList.add('rippleFxFast');

    const totalMinutes = Math.floor(audio.duration / 60);
    const totalSeconds = Math.floor(audio.duration % 60);
    totalTimes[index].textContent = `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;
    totalTimes[index].classList.add('rippleFxFast');
  });
}

// Load initial audio durations when the page loads
audioElements.forEach((audio, index) => {
  audio.addEventListener("loadedmetadata", () => {
    const totalMinutes = Math.floor(audio.duration / 60);
    const totalSeconds = Math.floor(audio.duration % 60);
    totalTimes[index].textContent = `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;
  });
});

function swapImg(element, source) {
  element.src = source;
}