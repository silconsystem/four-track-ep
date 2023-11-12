/**function checkScreenSize() {
  // Get the current window width
  const windowWidth = window.innerWidth;

  // Check if the window width is below 600 pixels
  if (windowWidth < 600) {
    // Load another HTML page
    window.location.href = 'html/mobile.html';
    
  } else if (windowWidth > 600) {
    window.location.href = '/index.html';
  }
}

// Attach the function to the window resize event
window.addEventListener('resize', checkScreenSize);

// Call the function on page load to handle the initial state
document.addEventListener('DOMContentLoaded', checkScreenSize);**/
/**
function checkScreenSize() {
  const windowWidth = window.innerWidth;
  const mobilePrompt = document.getElementById('mobilePrompt');

  if (windowWidth < 600) {
    mobilePrompt.style.display = 'block';
  } else {
    mobilePrompt.style.display = 'none';
  }
}

function loadMobilePage() {
  window.location.href = 'html/mobile.html';
}

window.addEventListener('resize', checkScreenSize);
document.addEventListener('DOMContentLoaded', checkScreenSize);

const loadMobilePageButton = document.getElementById('loadMobilePage');
loadMobilePageButton.addEventListener('click', loadMobilePage);
**/
function loadNewPage(htmlpage) {
  
  window.location.href = htmlpage;
  console.log('button pressed ');
}