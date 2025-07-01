const canvas = document.getElementById("canvas");
const canvasContainer = document.querySelector(".canvasContainer");

const ctx = canvas.getContext('2d');
let image = new Image();
let originalFileName = 'image';

document.getElementById('upload').addEventListener('change' , function(event) {
    document.querySelector(".canvasContainer").style.display = 'block';

    const file = event.target.files[0];

    // Save original file name without extension
        const nameWithoutExt = file.name.split('.').slice(0, -1).join('.');
        originalFileName = nameWithoutExt;


    const reader = new FileReader();
    reader.onload = function(e) {
        image.src = e.target.result;
        // console.log(e.target.result);
        
    }

    reader.readAsDataURL(file);
});

image.onload = function() {  
    canvas.width = image.width;
    canvas.height = image.height;

    ctx.drawImage(image , 0 , 0);
}

function applyFilters() {
    const brightness = document.getElementById('brightness').value;
    const contrast = document.getElementById('contrast').value;
    const grayscale = document.getElementById('grayscale').value;
    const saturate = document.getElementById('saturate').value;
    const sepia = document.getElementById('sepia').value;
    const invert = document.getElementById('invert').value;
    const blur = document.getElementById('blur').value;

    ctx.filter = `
        brightness(${brightness}%) contrast(${contrast}%) grayscale(${grayscale}%) saturate(${saturate}%) sepia(${sepia}%)  invert(${invert}%) blur(${blur}px)
    `

    ctx.drawImage(image , 0 , 0);
}


document.getElementById('brightness').addEventListener('input' , applyFilters);
document.getElementById('contrast').addEventListener('input' , applyFilters);
document.getElementById('grayscale').addEventListener('input' , applyFilters);
document.getElementById('saturate').addEventListener('input' , applyFilters);
document.getElementById('sepia').addEventListener('input' , applyFilters);
document.getElementById('invert').addEventListener('input' , applyFilters);
document.getElementById('blur').addEventListener('input' , applyFilters);

document.getElementById('download').addEventListener('click' , () => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = `${originalFileName}-edited.png`;

    link.click();
})

document.getElementById('reset').addEventListener('click' , ()=> {
    document.getElementById('brightness').value = 100;
    document.getElementById('contrast').value = 100;
    document.getElementById('grayscale').value = 0;
    document.getElementById('saturate').value = 100;
    document.getElementById('sepia').value = 0;
    document.getElementById('invert').value = 0;
    document.getElementById('blur').value = 0;

    applyFilters();
})



