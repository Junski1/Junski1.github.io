var imgs;

async function CreateModal(path, file) {
    const baseClass = document.getElementById("slides-container");

    imgs = await fetch(path + file)
    .then((response) => response.json())
    .then((json) => json.imgs);

    var newContent;
    //Creates the project images in the row
    var parent = baseClass;

    for(let i = 0; i < imgs.length; i++) {
        //creates the currently show image of the opened project
        newContent = document.createElement("div");
        newContent.classList.add("slides");

        parent.appendChild(newContent);
        parent = newContent;
        newContent = document.createElement("div");
        newContent.classList.add("numtext");
        newContent.innerText = `${i+1} / ${imgs.length}`;
        parent.appendChild(newContent);

        if(imgs[i].alt == "video"){
            newContent = document.createElement("iframe");
            newContent.setAttribute("src", `${imgs[i].src}`);
            newContent.style.height = `${baseClass.offsetWidth/(16/9)}px`;
            parent.appendChild(newContent);
        }
        else{
            newContent = document.createElement("img");
            newContent.setAttribute('src', `${path}${imgs[i].src}`);
            newContent.setAttribute('alt', imgs[i].alt);
            parent.appendChild(newContent);
        }
        parent = parent.parentElement;
    } 

    if(imgs.length > 1){
        //creates next and prev buttons to view other images
        newContent = document.createElement("a");
        newContent.classList.add("prev");
        newContent.setAttribute("onclick","PlusSlides(-1)");
        newContent.style.top = `calc(${baseClass.offsetWidth/(16/9)/2}px - 1.125rem)`;
        newContent.innerHTML = "&#10094;";
        parent.appendChild(newContent);

        newContent = document.createElement("a");
        newContent.classList.add("next");
        newContent.setAttribute("onclick","PlusSlides(1)");
        newContent.style.top = `calc(${baseClass.offsetWidth/(16/9)/2}px - 1.125rem)`;
        newContent.innerHTML = "&#10095;";
        parent.appendChild(newContent);
    }
    

    newContent = document.createElement("div");
    newContent.classList.add("caption-container");  
    parent.appendChild(newContent);
    parent = newContent;

    //name of the image
    newContent = document.createElement("p");
    newContent.setAttribute("id", "caption");
    parent.appendChild(newContent);
    
    if(imgs.length > 1){
        parent = parent.parentElement;
        newContent = document.createElement("div");
        newContent.classList.add("slides-row");
        newContent.classList.add("flex");
        newContent.classList.add("flex-center");
        newContent.classList.add("non-mobile");
        
        parent.appendChild(newContent);
        parent = newContent;
        //creates little clickable images under the currently shown image
        for(let i = 0; i < imgs.length; i++) {
            newContent = document.createElement("img");
            newContent.classList.add("slides-demo");

            if(imgs[i].alt == "video")
                newContent.setAttribute("src", `../img/film-solid.svg`);
            else
                newContent.setAttribute("src", `${path}${imgs[i].src}`);

            newContent.setAttribute("onclick", `CurrentSlide(${i+1})`);
            newContent.setAttribute("alt", `${imgs[i].alt}`);
            parent.appendChild(newContent);
        }
    }
    
    ShowSlides(1);
}

var currentModal;

var slideIndex = 1;

// Next/previous controls
function PlusSlides(n) {
    ShowSlides(slideIndex += n);
}

// Thumbnail image controls
function CurrentSlide(n) {
    ShowSlides(slideIndex = n);
}

function ShowSlides(n) {
    var slides = document.getElementsByClassName("slides");
    var dots = document.getElementsByClassName("slides-demo");
    var captionText = document.getElementById("caption");

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace("active", "");
    }

    
    slides[slideIndex - 1].style.display = "block";

    if(imgs.length > 1)
        dots[slideIndex - 1].classList.add("active");

    captionText.innerHTML = imgs[slideIndex - 1].alt;
}