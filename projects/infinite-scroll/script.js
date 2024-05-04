const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = "2GyMr32dlyylCBELSa3wEVprO6dwoT-bs9uRAcZpcTw";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded(){
    console.log('image loaded');
}
// Helper Function to Set Attributes on DOM Elements
function setAttribute(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create elements for Link & Photos, Add to DOM
function displayPhotos() {
  photosArray.forEach((photo) => {
    // create <a> to link to Unsplash
    const item = document.createElement("a");
    // item.setAttribute('href', photo.links.html);
    // item.setAttribute('target', '_blank');
    setAttribute(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // create <img> for photo
    const img = document.createElement("img");

    setAttribute(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event Listner, check when each is finished loading
    img.addEventListener('load', imageLoaded);

    // Put <img> inside <a>, then put bot inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}
// Get Photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {}
}

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >+ document.body.offsetHeight - 1000){

        getPhotos();
        console.log('load more');
    }
})
// On Load
getPhotos();
