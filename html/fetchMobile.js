// Replace 'your_xml_url_here' with the actual URL of your XML file
const xmlUrl = 'https://binauralsubliminal.com/album_02/getrssfeed.php';

const itemImage = document.querySelectorAll('.item-coverart');
const trackAuthor = document.querySelectorAll('.track-author');
const trackName = document.querySelectorAll('.track-name');
const trackDescription = document.querySelectorAll('.track-description');
const audioElement = document.querySelectorAll('.audio-element');
const mobileBody = document.querySelector('body');
const pubDateEl = document.querySelectorAll('.item-pubdate');

const audioUrls = [];

fetch(xmlUrl)
  .then(response => response.text())
  .then(xmlData => {
    // Parse the XML data
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, 'text/xml');

    // Extract channel information
    const channel = xmlDoc.querySelector('channel');
    const author = channel.querySelector('author').textContent;
    const title = channel.querySelector('title').textContent;
    const description = channel.querySelector('description').textContent;
    const imageUrl = channel.querySelector('image').getAttribute('href');
    
    mobileBody.style.backgroundImage = `url('${imageUrl}')`;

    console.log('Channel Information:');
    console.log('Author:', author);
    console.log('Title:', title);
    console.log('Description:', description);
    console.log('Image URL:', imageUrl);

    // Extract item information
    const items = xmlDoc.querySelectorAll('item');
    items.forEach((item, index) => {
      const itemTitle = item.querySelector('title').textContent;
      const itemDescription = item.querySelector('description').textContent;
      const itemImageUrl = item.querySelector('image').getAttribute('href');
      const enclosureUrl = item.querySelector('enclosure').getAttribute('url');
      const pubDate = item.querySelector('pubDate').textContent;
      
      itemImage[index].src = itemImageUrl;
      trackAuthor[index].textContent = `${index}. ${itemTitle}`;
      //trackName[index].textContent = itemTitle;
      trackDescription[index].textContent = itemDescription; 
      audioElement[index].src = enclosureUrl;
      pubDateEl[index].textContent = pubDate;
      
      audioUrls.push(enclosureUrl);

      console.log('\nItem Information:');
      console.log('Title:', itemTitle);
      console.log('Description:', itemDescription);
      console.log('Image URL:', itemImageUrl);
      console.log('Enclosure URL:', enclosureUrl);
      console.log('Publication Date:', pubDate);
      console.log('audioUrls: ', audioUrls[index]);
    });
  })
  .catch(error => console.error('Error fetching XML:', error));
