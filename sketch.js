let reflections;
let inc;
let prevTheta;
let prevmagM;
let flag = 0;
let isDrawing = 1;
const hMin = 180;
const hMax = 260;
const sat = 90;
let light = 70;
let ranOff = 20;

function setup() {
    createCanvas(800, 800);
    colorMode(HSL);
    background(0);
    // refSlider = createSlider(1, 30, 6, 1);
    hAvg = ((hMin + hMax) / 2);
    hDif = ((hMin - hMax) / 2);
    reflections = 4;

}

function draw() {
    translate(width / 2, height / 2)
    xPos = mouseX - width / 2;
    yPos = mouseY - height / 2;
    // reflections = refSlider.value();
    inc = 2 * Math.PI / reflections;
    // light = map()
    if (!flag) {
        prevTheta = cartesian2Polar(xPos);
        prevmagM = calcMag(xPos, yPos);
    } else {
        prevmagM = magM;
        prevTheta = theta;
    }
    flag++;

    if (mouseX != 0 && mouseY != 0) {
        // stroke(255);
        strokeWeight(magM / 15 + 2);

        magM = calcMag(xPos, yPos);
        theta = cartesian2Polar(xPos, yPos);
        // stk = hAvg + hDif * cos(theta + ranOff);

        if (isDrawing) {
            for (let i = 0; i < 2 * Math.PI; i += inc) {
                stk = hAvg + hDif * cos(i + ranOff);
                stroke(stk, sat, light)
                line(magM * cos(theta + i), magM * sin(theta + i), prevmagM * cos(prevTheta + i), prevmagM * sin(prevTheta + i));

            }
        }

    }
}

function calcMag(x, y) {
    magM = Math.sqrt(x * x + y * y)
    return magM
}

function cartesian2Polar(x, y) {
    theta = Math.atan2(y, x)
    return theta
}

function mouseInWindow() {
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        return true
    }
}

function mouseClicked() {
    if (mouseInWindow()) {
        background(0);
        ranOff += 10;
    }
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        reflections++;
        background(0);
    } else if (keyCode === DOWN_ARROW) {
        reflections = max(1, reflections - 1)
        background(0);

    }
}