let classifier;
let item
const loader = document.getElementById('loader');
const uploadField = document.querySelector('.image-upload');
function setup(path) {
loader.style.display='inline-block'
  const myCanvas = createCanvas(400, 400);
  myCanvas.parent("sketch-container");
  let src = ''
  if (path) {
    src = `${path}`
  }
  else {
    src = `./fish.jpg`
  }
  item = createImg(`${src}`, loadImgOnReady);
  item.hide()
  background(0);
  classifier = ml5.imageClassifier('MobileNet', predictLabel)
}

function loadImgOnReady() {
  image(item, 0, 0, width, height)
}

function predictLabel() {
  classifier.predict(item, showLabel)
}

// show label and probability
function showLabel(error, data) {
  let label = 'Try Again!!!'
  let conf = 0
  if (!error) {
    label = data[0].label;
    conf = data[0].confidence;
  }
  document.getElementById('imageLabel').textContent = label;
  document.getElementById('conf').textContent = `Probability ${conf}`
  loader.style.display='none'
}



function initImageUpload() {
  loader.style.display='none'
  uploadField.addEventListener('change', getFile);

  function getFile(e) {
    let file = e.currentTarget.files[0];
    checkType(file);
  }

  function previewImage(file) {
    reader = new FileReader();
    reader.onload = function () {
      setup(reader.result)
    }
    reader.readAsDataURL(file);

  }

  function checkType(file) {
    let imageType = /image.*/;
    if (!file.type.match(imageType)) {
      alert('Please upload valid image')
      throw 'Please upload valid image';
    } else if (!file) {
      alert('Please upload image')
      throw 'Please upload image';
    } else {
      previewImage(file);
    }
  }

}

initImageUpload();


