img = "";
status = "";
object = [];

function setup() {

  canvas = createCanvas(320, 320); 
  canvas.center();
  video = createCapture(VIDEO);
  video.hide()
  objectDetector = ml5.objectDetector('cocossd',ModelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";

}

function preload() {
  img = loadImage("dog_cat.jpg")
}

function draw() {

  image(video, 0, 0, 320, 320);

  if(status != "") {

    r = random(255);
    g = random(255);
    b = random(255);
    objectDetector.detect(video,gotResults);

    for(i = 0; i<objects.length;i++) {

      document.getElementById("status").innerHTML = "Status : Object Detected";
      document.getElementById("numeber_of_objects").innerHTML = "NUmber of Objects Detected : "+object.length;

      fill(r,g,b);
      percent = floor(object[i].confidence*100);
      stroke(r,g,b);
      text(object[i].label+""+"%",object[i].x+15,object[i].y+15);
      noFill();
      rect(object[i].x,object[i].y,object[i].width,object[i].height);

    }

  }

}

function ModelLoaded() {

  console.log("ModelLoaded");
  status = true;
  objectDetector.detect(video,gotResults);

}

function gotResults(error,results) {

   if(error) {

    console.error(error);

   } else {

    console.log(results);

    object = results;

   }

}