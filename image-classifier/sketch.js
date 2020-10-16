let classifier;
let item
function setup() {
  const myCanvas = createCanvas(400, 400);
  myCanvas.parent("sketch-container");
  item = createImg('./fish.jpg', loadImgOnReady);
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
  let conf= ''
  if (!error) {
    label = data[0].label;
    conf = data[0].confidence;
  }
  document.getElementById('imageLabel').textContent = label;
  document.getElementById('conf').textContent = `Probability ${conf}`
}