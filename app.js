const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');
const query = document.getElementById('search');

// selected image 

let sliders = [];


// If this key doesn't work
// Find the name in the url and go to their website
// to create your own api key
const KEY = '15674931-a9d714b6e9d654524df198e00&q';

// show images 
const showImages = (images) => {
  query.value="";
  spinner_toggle();
  imagesArea.style.display = 'block';
  gallery.innerHTML = '';
  // show gallery title
  galleryHeader.style.display = 'flex';
  images.forEach(image => {
    let div = document.createElement('div');
    div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
    div.innerHTML = ` <img  class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;
    gallery.appendChild(div)
  });

}

const getImages = (query) => {
  const url=`https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo&pretty=true`;
  spinner_toggle();
  fetch(url)
    .then(response => response.json())
    .then(data => showImages(data.hits))  // correction: hitS => hits
    .catch(err => console.log(err))
}

let spinner_toggle = () => {
  let spinner = document.getElementById('spinner');
  spinner.classList.toggle('d-none');
  imagesArea.classList.toggle('d-none');
}


// const getImages = (query) => {
//   fetch(`https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo&pretty=true`)
//     .then(response => response.json())
//     .then(data => showImages(data.hits))  // correction: hitS => hits
//     .catch(err => console.log(err))
// }


// const getImages = (query) => {
//   fetch(`https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo&pretty=true`)
//     .then(response => response.json())
//     .then(data => showImages(data.hits))  // correction: hitS => hits
//     .catch(error =>{
//              message.innerText = "Please Write Somethings to Search";
//          });
//          document.getElementById('search').value = "";
//         message.innerText = "";
// }








let slideIndex = 0;
const selectItem = (event, img) => {
  let element = event.target;
  element.classList.toggle('added'); //image select/unselect handling here
 
  let item = sliders.indexOf(img);
  if (item === -1) {
    sliders.push(img); //image select/unselect handling here
  } else {
    sliders.splice(item, 1);
  }
}
var timer
const createSlider = () => {
  // check slider image length
  if (sliders.length < 2) {
    alert('Select at least 2 image.')
    return;
  }
  // crate slider previous next area
  sliderContainer.innerHTML = '';
  const prevNext = document.createElement('div');
  prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
  prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;

  sliderContainer.appendChild(prevNext)
  document.querySelector('.main').style.display = 'block';
  // hide image aria
  imagesArea.style.display = 'none';
  const duration = document.getElementById('duration').value || 1000;
  sliders.forEach(slide => {
    let item = document.createElement('div')
    item.className = "slider-item";
    item.innerHTML = `<img class="w-100"
    src="${slide}"
    alt="">`;
    sliderContainer.appendChild(item)
  });
  
  //slider timing validation
  changeSlide(0)
  if(duration >= 2000){
    timer = setInterval(function () {
      slideIndex++;
      changeSlide(slideIndex);
    }, duration);
  } else{
    alert('please enter 2000 milliseconds or more.If you want to set less value than 2000 milliseconds,set it manually');
  }
}

// change slider index 
const changeItem = index => {
  changeSlide(slideIndex += index);
}

// change slide item
const changeSlide = (index) => {

  const items = document.querySelectorAll('.slider-item');
  if (index < 0) {
    slideIndex = items.length - 1
    index = slideIndex;
  };

  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }

  items.forEach(item => {
    item.style.display = "none"
  })

  items[index].style.display = "block"
}

// searchBtn.addEventListener('click', function () {
//   document.querySelector('.main').style.display = 'none';
//   clearInterval(timer);
//   const search = document.getElementById('search');
//   getImages(search.value)
//   sliders.length = 0;
// })


// Input Validation

searchBtn.addEventListener('click', function () {
  document.querySelector('.main').style.display = 'none';
  clearInterval(timer);
  const searchValidation = query.value;
  const inputCharacters = /[A-Z-a-z]/;
  if(searchValidation.match(inputCharacters)){
    getImages(searchValidation);
  }else{
   alert("Please Write Valid Somethings to Search");
  }
  sliders.length = 0;
});


sliderBtn.addEventListener('click', function () {
  createSlider()
})

// Enter Button Trigger

// document.getElementById("search")
//     .addEventListener("keyup", function(event) {
//       console.log(pk 2);
//     event.preventDefault();
//     if (event.keyCode === 13) {
//         document.getElementById("search-btn").click();
//     }
// });


var searchButton = document.getElementById("search-btn");
var searchField = document.getElementById("search");

searchField.addEventListener("keypress", function(event) {
    //  console.log('hello');
    // event.preventDefault();
    // console.log('hello 2');
    // console.log('keyCOde',event.key, event.keyCode);
    // console.log('keyCOde',event.key);
    // if (event.keyCode == 13){
      if (event.key== 'Enter'){
      // console.log('hello 3');
      searchButton.click();
    }

});

