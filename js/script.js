//selecting all required elements
const dropArea = document.querySelector(".drag-area"),
dragText = dropArea.querySelector("header"),
input = dropArea.querySelector("input");
let fileInput = document.getElementById("file");
let result = document.getElementById("result");
let file; //this is a global variable and we'll use it inside multiple functions

dropArea.onclick = ()=>{
  input.click(); //if user click on the button then the input also clicked
}

input.addEventListener("change", function(){
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = this.files[0];
  dropArea.classList.add("active");
  showFile(); //calling function
});


//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event)=>{
  event.preventDefault(); //preventing from default behaviour
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
});

//If user leave dragged File from DropArea
dropArea.addEventListener("dragleave", ()=>{
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
});

//If user drop File on DropArea
dropArea.addEventListener("drop", (event)=>{
  event.preventDefault(); //preventing from default behaviour
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = event.dataTransfer.files[0];
  showFile(); //calling function
});

function showFile(){
  let fileType = file.type; //getting selected file type
  let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
  if(validExtensions.includes(fileType)){ //if user selected file is an image file
    let fileReader = new FileReader(); //creating new FileReader object
    fileReader.onload = ()=>{
      let fileURL = fileReader.result; //passing user file source in fileURL variable
        // UNCOMMENT THIS BELOW LINE. I GOT AN ERROR WHILE UPLOADING THIS POST SO I COMMENTED IT
      let imgTag = `<img src="${fileURL}" alt="image">`; //creating an img tag and passing user selected file source inside src attribute
      dropArea.innerHTML = imgTag; //adding that created img tag inside dropArea container

    }
    fileReader.readAsDataURL(file);
  }else{
    alert("This is not an Image File!");
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
  }
}

fileInput.onchange = () => {
    result.style.display = "none";
    let reader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.onload = () => {
        let fileURL = reader.result;
        let imgTag = `<img src="${fileURL}" alt="image">`;
        dropArea.innerHTML = imgTag;
    }
}

let pickcolor = document.getElementById("pick-color");
let error = document.getElementById("error");
let hexvalueref = document.getElementById("hex-value");
let rgbvalueref = document.getElementById("rgb-value");
let pickedcolor = document.getElementById("picked-color");
let eyeDropper;

window.onload = () => {
    if("EyeDropper" in window){
        pickcolor.classList.remove("hide");
        eyeDropper = new EyeDropper();
    }else{
        error.classList.remove("hide");
        error.innerText = "Your Browser Doesn't Support EyeDropper API";
        pickcolor.classList.add("hide");
        return false;
    }
}

const colorSelector = async() => {
    const color = await eyeDropper.open().then((colorValue) => {
        error.classList.add("hide");
        let hexvalue = colorValue.sRGBHex;
        let rgbArr = [];
        for(let i = 1;i<hexvalue.length;i+=2){
            rgbArr.push(parseInt(hexvalue[i]+hexvalue[i+1],16))
        }
        let rgbvalue = "rgb("+rgbArr+")";
        result.classList.remove("hide");
        result.style.display = "flex";
        hexvalueref.value = hexvalue;
        rgbvalueref.value = rgbvalue;
        pickedcolor.style.backgroundColor = hexvalue;
    }).catch((err) => {
        error.classList.remove("hide");
        
    })
}

pickcolor.addEventListener("click",colorSelector);

let copy = (textId) => {
    document.getElementById(textId).select();
    document.execCommand("copy");
    if(copy){
        error.innerText = "Color Code Copied!";
    }else{
        error.innerText = "Color Code Not Copied";
    }
}