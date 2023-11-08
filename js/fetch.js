/**
 * 
 *     fetch function
 *     
 *     BINAURAL SUB / SONICLABOR 2023
 */
const xmlUrl = 'https://binauralsubliminal.com/album_02/getrssfeed.php';

const landscapeTxt = document.querySelector('.landscape-text');
const landscape = document.querySelector('.landscape');

const hero = document.querySelector('.hero');
const layers = hero.querySelectorAll('.layer');
const heroHeading = hero.querySelectorAll('.heading');
const dataScenes = Array.from(layers).map(layer => layer.getAttribute('data-scene'));

let count = 0;

function updateCounter(callback) {
  
  const radioButtons = document.querySelectorAll('input[name="scene"]');

  radioButtons.forEach((radio) => {
    radio.addEventListener('change', (event) => {
      if (event.target.checked) {
        count = event.target.value - 1;
        // Use the selectedValue to load corresponding data from the array
        console.log(`Selected value: ${event.target.value}`);
        callback(count);
        loadAudio(count);
      }
    });
  });
}

updateCounter((counter) => {
  console.log("Current count:", counter);
});


const rightContent = document.querySelector('.right-content');
const rContentHeading = rightContent.querySelectorAll('.heading');
const rContentPara = rightContent.querySelectorAll('.paragraph');

const leftContent = document.querySelector('.left-content');
const lContentImg = leftContent.querySelectorAll('.image');

const audioContent = leftContent.querySelectorAll('audio');

const nextButton = document.getElementById('nextBtn');
const prevButton = document.getElementById('prevBtn');

const titles = [];
const descriptions = [];
const images = [];
const audioUrls = [];

function fetchRSSData() {

  fetch(xmlUrl)
    .then(response => response.text())
    .then(data => {
      // Handle the XML data here
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, 'text/xml');

      const channel = xmlDoc.querySelector('channel');
      const channelTitle = channel.querySelector('title').textContent;
      const channelDescription = channel.querySelector('description').textContent;
      const channelLink = channel.querySelector('link').textContent;
      const channelImg = channel.querySelector('image').getAttribute('href');

      const channelItems = channel.querySelectorAll('item');

      for (var i = 0; i < channelItems.length; i++) {

        const item = channelItems[i];

        const title = item.querySelector('title').textContent;
        const description = item.querySelector('description').textContent;
        const imageUrl = item.querySelector('image').getAttribute('href');
        const audioUrl = item.querySelector('enclosure').getAttribute('url');

        // Usage
        //const description = item.querySelector('description').textContent;
        const formattedDescription = customFormatText(description);

        //console.log(formattedDescription);

        titles.push(title);
        descriptions.push(formattedDescription);
        images.push(imageUrl);
        audioUrls.push(audioUrl);

        heroHeading[i].textContent = titles[i];
        rContentHeading[i].textContent = titles[i];
        rContentPara[i].innerHTML = descriptions[i];
        lContentImg[i].src = images[i];
      }

      console.log(`titles: ${titles}`);

      landscapeTxt.textContent = channelTitle;
      landscape.style.backgroundImage = `url('${channelImg}')`;
      loadAudio(count);
      //console.log(channelImg, channelTitle, channelDescription, channelLink)
    })
    .catch(error => {
      console.error('Error fetching the XML data:', error);
    });
}
fetchRSSData();

function customFormatText(text) {

  let formattedText = text.trim();
  formattedText = formattedText
    .replace(/\s+/g, ' ') // Replace multiple whitespaces with a single space
    .replace(/(\.)/g, '$1<br>') // Add line breaks after periods
    .replace(/(,)/g, '$1 ') // Add space after commas
    .replace(/(www[^ ]+)/g, '<br>$1') // Add newline before text starting with 'www'
    .replace(/(.*):(.*)/g, '<br>$1:<br>$2') // Add newline after colon
    .replace(/\((.*?)\)/g, '$1<br>($1)<br>'); // Add newline inside parentheses

  return formattedText;
}