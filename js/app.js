"use strict";
let attempts = 0;
let previousImages = [];
let firstImage;
let secoundImage;
let thirdImage;
Product.ProductArray = [];

let ProductNames = [];
let VotesResults = [];
let TimesResults = [];

function Product(prdouctName, imageSoucrce, times, vote) {
  this.prdouctName = prdouctName;
  this.imageSoucrce = imageSoucrce;
  this.times = 0;
  this.vote = 0;

  Product.ProductArray.push(this);

  
}
//new intances
new Product("bag", "Images/bag.jpg");
new Product("banana", "Images/banana.jpg");
new Product("bathroom", "Images/bathroom.jpg");
new Product("boots", "Images/boots.jpg");
new Product("breakfast", "Images/breakfast.jpg");
new Product("bubblegum", "Images/bubblegum.jpg");
new Product("chair", "Images/chair.jpg");
new Product("cthulhu", "Images/cthulhu.jpg");
new Product("dog-duck", "Images/dog-duck.jpg");
new Product("dragon", "Images/dragon.jpg");
new Product("pen", "Images/pen.jpg");
new Product("pet-sweep", "Images/pet-sweep.jpg");
new Product("scissors", "Images/scissors.jpg");
new Product("sweep", "Images/sweep.png");
new Product("tauntaun", "Images/tauntaun.jpg");
new Product("unicorn", "Images/unicorn.jpg");
new Product("usb", "Images/usb.gif");
new Product("water-can", "Images/water-can.jpg");
new Product("wine-glass", "Images/wine-glass.jpg");
new Product("shark", "Images/shark.jpg");

//make sure of the array pushing
console.log(Product.ProductArray);

//make the images Using DOM

let image = document.getElementById("images");
let imageSource1 = document.createElement("img");
image.appendChild(imageSource1);
imageSource1.id = "firstImage";
let imageSource2 = document.createElement("img");
image.appendChild(imageSource2);
imageSource2.id = "secoundImage";
let imageSource3 = document.createElement("img");
image.appendChild(imageSource3);
imageSource3.id = "thirdImage";

function random() {
  return Math.floor(Math.random() * Product.ProductArray.length);
}

function settingVotes() {
  let storedProducts = JSON.stringify(Product.ProductArray);
  console.log("storedProducts",storedProducts);
  localStorage.setItem("storedProducts", storedProducts);
  // console.log('----------------hello------------------');
}

function gettingVotes() {
  let stringProducts = localStorage.getItem("storedProducts");
  let normalProducts = JSON.parse(stringProducts);
  if (normalProducts !== null) {
    Product.ProductArray = normalProducts;
  }
  console.log("normalProducts", normalProducts);
  // return;
}

ChoosingImages();

function ChoosingImages() {

  console.log('inside the choosingImages function', Product.ProductArray);

    console.log('attempts',attempts);
  if (attempts===25){
      result();
      viewChart();
  }

  do {
    firstImage = random();
    secoundImage = random();
    thirdImage = random();
    console.log("before While", firstImage, secoundImage, thirdImage);
  } while (
    firstImage == secoundImage ||
    firstImage == thirdImage ||
    secoundImage == thirdImage ||
    previousImages.includes(firstImage) ||
    previousImages.includes(secoundImage) ||
    previousImages.includes(thirdImage)
  );

  //times seen
//   console.log(Product.ProductArray[firstImage].times++);
 
   Product.ProductArray[firstImage].times++;
  Product.ProductArray[secoundImage].times++;
  Product.ProductArray[thirdImage].times++;

  previousImages = [firstImage, secoundImage, thirdImage];
  console.log("previousImages", previousImages);
  renderImages();
}

function renderImages() {

  // //assign Images
  imageSource1.src = Product.ProductArray[firstImage].imageSoucrce;
  imageSource2.src = Product.ProductArray[secoundImage].imageSoucrce;
  imageSource3.src = Product.ProductArray[thirdImage].imageSoucrce;
}
// Handle clicking

imageSource1.addEventListener("click", vote);
imageSource2.addEventListener("click", vote);
imageSource3.addEventListener("click", vote);

// console.log('times', Product.productsArray[firstImage].imagSource);
function vote(event) {
  

  attempts++;

  if (event.target.id === "firstImage") {
    Product.ProductArray[firstImage].vote++;
    settingVotes() ;
  } else if (event.target.id === "secoundImage") {
    Product.ProductArray[secoundImage].vote++;
    settingVotes() ;
  } else if (event.target.id === "thirdImage") {
    Product.ProductArray[thirdImage].vote++;
    settingVotes() ;
  }

  ChoosingImages();
}

function result() {
  
  let ViewResults = document.createElement("button");
  image.appendChild(ViewResults);
  ViewResults.id = "ViewResults";
  ViewResults.innerHTML = "ViewResults";
  imageSource1.removeEventListener("click", vote);
  imageSource2.removeEventListener("click", vote);
  imageSource3.removeEventListener("click", vote);
  MakearrayforVotes();
  ViewResults.addEventListener("click", renderResults);
}

function MakearrayforVotes() {
  
  for (let i = 0; i < Product.ProductArray.length; i++) {
    VotesResults.push(Product.ProductArray[i].vote);
    
    TimesResults.push(Product.ProductArray[i].times);
    ProductNames.push(Product.ProductArray[i].prdouctName);
  }
}

function renderResults() {
  ViewResults.removeEventListener("click", renderResults);
  for (let i = 0; i < Product.ProductArray.length; i++) {
    // console.log("VotesResults =", VotesResults[i]);
    
    let resultsArea = document.getElementById("results");
    let resultWritten = document.createElement("p");
    resultsArea.appendChild(resultWritten);
    resultWritten.id = "resultWritten";
    
    if (Product.ProductArray[i].times == 0) {
      resultWritten.textContent =
      Product.ProductArray[i].name +
      "  " +
      "was seen" +
      ".  " +
      "No" +
      ".  " +
      "times";
    } else {
      resultWritten.textContent =
      Product.ProductArray[i].prdouctName +
      "  " +
      "had" +
      "  " +
      Product.ProductArray[i].vote +
      "  " +
      "votes" +
        "  " +
        " and was seen " +
        "  " +
        Product.ProductArray[i].times +
        " times";
        
        //   console.log("finish");
      }
      // console.log(VotesResults);
    }
  }
  
  
  
  
  
  function viewChart() {
    
    
    // console.log('--------------',ProductNames,TimesResults);
    let ctx = document.getElementById("myChart").getContext("2d");
  
    let chart = new Chart(ctx, {
      // The type of chart we want to create
      type: "bar",
  
      // The data for our dataset
      data: {
        labels: ProductNames,
  
        datasets: [
          {
            label: " votes",
            backgroundColor: "#f14668",
            borderColor: "#ffff",
            data: VotesResults,
          },
  
          {
            label: "times seen",
            backgroundColor: "#314e52",
            borderColor: "red",
            data: TimesResults,
  
            //
  
            // Configuration options go here
          },
        ],
      },
  
      // Configuration options go here
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }
    gettingVotes();

  // console.log('after  the chart function', Product.ProductArray);
