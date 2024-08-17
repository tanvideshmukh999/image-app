
let searchImage = document.querySelector(".searchBox input");
let searchBtn = document.querySelector(".searchBox button");
let imgColumn1 = document.getElementById("col1"),
  imgColumn2 = document.getElementById("col2"),
  imgColumn3 = document.getElementById("col3");
let cc = document.querySelectorAll("#col3 .img");
let showMoreBtn=document.querySelector(".showMore");

// ------Click Event On Search Button-----------------
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".image-container").style.display = "grid";
 
  imgColumn1.replaceChildren("");
  imgColumn2.replaceChildren("");
  imgColumn3.replaceChildren("");
  document.querySelector(".loader").style.display="block"
  showMoreBtn.style.display="none"
  setTimeout(() => {
    fetchImage(searchImage.value, 1);
    showMoreBtn.style.display="block"
    document.querySelector(".loader").style.display="none"
  }, 3000);

});


// ---------function to Fetch Images and Append Them to the UI container-------
async function fetchImage(img, pg) {
  let fetchData = await fetch(
     `https://api.unsplash.com/search/photos?page=${pg}&query=${img}&client_id=iz82rGN-l3Kv361FI-mM4msCyZ0HHIimFpHg6hSVlhw&count=20`
    //`https://api.unsplash.com/search/photos?page=${pg}&query=${img}&limit=${20}&client_id=kVeJ9_FubrJNuP7sxiJx4M9Dc49gg5vSRaZMhr2VTj0&count=20`
  );
  let imageData = await fetchData.json();
  let imgArray = imageData.results;
  imgArray.forEach((element, idx) => {
    if (idx < 9) {
      let imgUrl = element.urls.regular;
      let imgDescription = element.alt_description;
      let imgLikes = element.likes;
      console.log(element);
      let div1 = document.createElement("div");
      div1.innerHTML = ` 
    <div class="like animate__animated">
    <i class="fa-solid fa-heart"></i>
    <h6>${imgLikes}</h6>
    </div>
   <a href=${element.links.html} target="_blank"> <img src="${imgUrl}"
    alt=""></a>
    <p class="description animate__animated">${imgDescription}</p>`;
      div1.classList.add("img");

      col1Length = document.querySelectorAll("#col1 .img").length;
      col2Length = document.querySelectorAll("#col2 .img").length;

      if ((idx + 1) % 3 == 0) imgColumn3.appendChild(div1);
      else if (col1Length > col2Length) imgColumn2.appendChild(div1);
      else imgColumn1.appendChild(div1);
    }
  });
  hidePara();
  display_para();
  hidePara2();
}

//-----------Hide Description----------------
let para = document.querySelectorAll(".img p");
function hidePara() {
  para = document.querySelectorAll(".img p");
  para.forEach((val) => {
    val.style.display = "none";
  });
}
// -----------Display Description on mouseover----------------
let description = document.querySelectorAll(".img");
let likesContainer = document.querySelectorAll(".like");
let imageNodeList = document.querySelectorAll(".img img");

function display_para() {
  description = document.querySelectorAll(".img");
  likesContainer = document.querySelectorAll(".like");
  imageNodeList = document.querySelectorAll(".img img");
  description.forEach((val, idx) => {
    val.addEventListener("mouseenter", (e) => {
      para[idx].style.display = "block";
      para[idx].classList.add("animate__fadeInUp");
      likesContainer[idx].style.display = "block";
      likesContainer[idx].classList.add("animate__fadeInUp");
    });
  });
}

// display_para();
// -----------Hide Description on mouseout----------------
function hidePara2() {
  description.forEach((val, idx) => {
    val.addEventListener("mouseout", (e) => {
      para[idx].style.display = "none";
      likesContainer[idx].style.display = "none";
    });
  });
}
let page = 1;



// Infinite Scroll
// console.log(window.offsetHeight);
window.addEventListener("scroll",()=>{
  if((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
    page++;
    fetchImage(searchImage.value,page);
  }
})
