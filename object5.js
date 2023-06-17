function setup() {
    canvas = createCanvas(640, 400);
    canvas.center();
}
var img;
function preload() {
    img = loadImage("lawn.jpeg");
    cocossd = ml5.objectDetector("cocossd", modelLoaded);
}
function draw() {
    image(img, 0, 0, 640, 400);
    for(i = 0; i < objects.length; i++) {
        stroke("red");
        fill("red");
        percent = Math.floor(objects[i].confidence * 100) + "%";
        text(objects[i].label + " " + percent, objects[i].x + 15, objects[i].y + 15);
        noFill();
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
}
status_ = "";
function modelLoaded() {
    console.log("model loaded");
    cocossd.detect(img, gotResults);
    status_ = true;
}
objects = [];
function gotResults(error, results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
    document.getElementById("status2").innerHTML = "Model detected " + objects.length + " objects";
    document.getElementById("status").innerHTML = "Status: Objects Detected";
}