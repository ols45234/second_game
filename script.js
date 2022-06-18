//&& || ↓ → ← ↑ && 
var canvas = document.getElementById("canvas");
var canavswidth = 700;
var canavsheight = 900;

canvas.width = canavswidth;
canvas.height = canavsheight;
var canavswidth = 500;
var canvasContext = canvas.getContext("2d");


class gun {
    constructor() {
        this.reset();
    }
    redraw() {
        this.posy -= 5;
        canvasContext.fillStyle = "blue";
        canvasContext.beginPath();
        canvasContext.arc(this.posx, this.posy, 10, 0, 2 * Math.PI);
        canvasContext.fill();
        canvasContext.closePath();
        if (this.posy < 10) {
            this.reset();
        }

    }
    reset() {
        this.posx = ppos + 10;
        this.posy = canavsheight - 120;
    }
}
var gun1 = new gun();

class meteor {
    constructor() {
        this.reset();
    }
    redraw() {
        this.speed += Math.floor(score / 20) + 1;
        this.iter = this.iter + this.speed;
        if (this.hits == 0)
            canvasContext.drawImage(met, this.posx, this.iter / 20, this.size, this.size * 2);
        else
            canvasContext.drawImage(br_met, this.posx, this.iter / 20, this.size, this.size * 2);
        if (this.iter / 20 > canavsheight) {
            this.reset();
        }

        if (((ppos - this.posx) < (this.size + 10) && (ppos - this.posx) > -(this.size + 10)) && (this.iter / 20 > canavsheight - 120)) {
            this.reset();
            if (heath == 1) {
                // score = 0;
                // ppos = (canavswidth - 60) / 2;
                // heath = 3;
                // Cmeteors = 1;
                // Ctargets = 1;
                alert("game over")
            }
            heath--;

        }
        if (((gun1.posx - this.posx) < this.size && (gun1.posx - this.posx) > -this.size) && ((gun1.posy - this.iter / 20) < this.size && (gun1.posy - this.iter / 20) > -this.size)) {
            if (this.hits == 1) {
                this.reset();
                // score++;
                // meteors.push(new meteor())
            }
            else {
                this.hits++;
                gun1.reset();
            }
        }
    }
    reset() {
        this.size = getRandomInt((score / 50) + 50) + 10;
        this.speed = ((getRandomInt(score) + score / 2) / (this.size * 2));
        this.iter = getRandomInt(1000) + 2000;
        this.hits = 0;
        if (Math.random() > 0.2) {
            this.posx = Math.random() * canavswidth - 20;
        }
        else {
            this.posx = ppos
        }
    }

}
class target {
    constructor() {
        this.reset();
    }
    redraw() {
        this.speed += 1;
        this.iter = this.iter + this.speed;
        if (this.iskit == false) {
            canvasContext.drawImage(targetImg, this.posx, this.iter / 20, this.size, this.size);
        } else {
            canvasContext.drawImage(kit, this.posx, this.iter / 20, this.size, this.size);
        }
        if (this.iter / 20 > canavsheight) {
            this.reset();
        }

        if (((ppos - this.posx) < (this.size + 10) && (ppos - this.posx) > -(this.size + 10)) && (this.iter / 20 > canavsheight - 120)) {
            if (heath <= 5 && this.iskit == true)
                heath++;
            this.reset();

        }
        if (((gun1.posx - this.posx) < this.size && (gun1.posx - this.posx) > -this.size) && ((gun1.posy - this.iter / 20) < this.size && (gun1.posy - this.iter / 20) > -this.size)) {
            if (Math.random() > 0.9 || this.iskit == true) {
                this.iskit = true;
            }
            else {
                this.reset();
                score++;
                if (Math.random() < 0.1) {
                    meteors.push(new meteor());
                    Cmeteors++;
                }
                if (Math.random() < 0.05) {
                    targets.push(new target());
                    Ctargets++;
                }

            }
        }
    }
    reset() {
        this.speed = getRandomInt(50);
        this.iter = getRandomInt(1000) + 2000;
        this.size = getRandomInt(50) + 20;
        this.iskit = false;
        this.posx = Math.random() * canavswidth - 20;

    }

}




let met = new Image();
let kit = new Image();
let bg = new Image();
let hero = new Image();
let targetImg = new Image();
let br_met = new Image();
let dis = new Image();

met.src = "img/meteor.png";
kit.src = "img/kit.png";
bg.src = "img/bg.png";
hero.src = "img/hero.png";
targetImg.src = "img/target.png";
br_met.src = "img/br_meteor.png";
dis.src = "img/dis.png";

var score = 0;
var ppos = (canavswidth - 60) / 2;
var heath = 3;
var Cmeteors = 1;
var Ctargets = 1;
window.addEventListener("keydown", onCanvasKeyDown);
window.addEventListener("mousemove", onMouseMove);


function onCanvasKeyDown(event) {
    if (event.key == "a") {
        ppos -= 10;
        if (ppos < 20) {
            ppos = 20
        }

    }
    else if (event.key == "d") {
        ppos += 10;
        if (ppos > canavswidth - 40) {
            ppos = canavswidth - 40
        }

    }
    update();
}

function onMouseMove(event) {
    if (event.clientX < canavswidth)
        ppos = event.clientX - 20 / 2;
    if (ppos > canavswidth - 40)
        ppos = canavswidth - 40
    if (ppos < 20)
        ppos = 20

}

canvasContext.fillStyle = "red";
canvasContext.strokeStyle = "green";

var meteor1 = new meteor();
var meteor2 = new meteor();
var target1 = new target();

var meteors = [];
for (var i = 0; i < 10; i++)
    meteors.push(new meteor())
var targets = [];
for (var i = 0; i < 10; i++)
    targets.push(new target())


setInterval(update, 1);


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function update() {
    if (heath >= 1) {
        canvasContext.fillStyle = "white";
        canvasContext.fillRect(0, 0, canvas.width, canavsheight);
        canvasContext.fillStyle = "black";
        canvasContext.fillRect(500, 0, canvas.width, canavsheight);
        canvasContext.drawImage(bg, 0, 0, canavswidth, canavsheight);
        canvasContext.drawImage(hero, ppos - 20, canavsheight - 120, 60, 120);
        gun1.redraw();
        // meteor1.redraw();
        // meteor2.redraw();
        // target1.redraw();
        for (var i = 0; i < Cmeteors; i++)
            meteors[i].redraw();
        for (var i = 0; i < Ctargets; i++)
            targets[i].redraw();

        canvasContext.font = "20px Arial";
        canvasContext.fillStyle = "red";
        canvasContext.fillText("score:" + String(score), 500, 50);
        canvasContext.fillText("heath:" + String(heath), 500, 80);
    }
    else
        canvasContext.drawImage(dis, 0, 0, canvas.width, canvas.height);
}