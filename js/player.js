const audio = document.getElementById('audioPlayer');
const playIcon = document.getElementById('playButton');

const progressBar = document.getElementById('progress');
const currentTime = document.getElementById('current-time');
const totalTime = document.getElementById('total-time');

audio.addEventListener('timeupdate', () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = `${progress}%`;

  const currentMinutes = Math.floor(audio.currentTime / 60);
  const currentSeconds = Math.floor(audio.currentTime % 60);
  currentTime.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;

  const totalMinutes = Math.floor(audio.duration / 60);
  const totalSeconds = Math.floor(audio.duration % 60);
  totalTime.textContent = `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;
});

function playAudio(position) {
  if (audio.paused) {
    loadAudio(count);
    swapImg(playIcon, "pause.png");
    audio.play().catch(error => {
      console.error("Error playing audio:", error);
    });
  } else {
    swapImg(playIcon, "play.png");
    audio.pause();
  }
}


function loadAudio(index) {
  audio.src = audioUrls[index];
  audio.load(); // Load the new audio source
  
  if (audio.paused) {
    audio.pause();
    swapImg(playIcon, "play.png");
  }

  audio.addEventListener("canplaythrough", () => {
    // Ensure the audio is ready before playing
    //audio.play();
  });

  audio.addEventListener("loadedmetadata", () => {
    const currentMinutes = Math.floor(audio.currentTime / 60);
    const currentSeconds = Math.floor(audio.currentTime % 60);
    currentTime.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
    currentTime.classList.add('rippleFxFast');
    
    const totalMinutes = Math.floor(audio.duration / 60);
    const totalSeconds = Math.floor(audio.duration % 60);
    
    totalTime.textContent = `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;
    totalTime.classList.add('rippleFxFast');
    
    
  });
}

function swapImg(element, source) {
  
  element.src = source;
}

playIcon.addEventListener("click", playAudio);

audio.addEventListener('timeupdate', function() {

  var progress = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = progress + '%';
});