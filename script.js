let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

let engine;
let world;
let boxes = [];
let ground;

function setup() {
    createCanvas(800, 600);
    engine = Engine.create();
    world = engine.world;
    Engine.run(engine);
    ground = Bodies.rectangle(400, height, 800, 20, { isStatic: true });
    World.add(world, ground);
}

function mousePressed() {
    boxes.push(new Box(mouseX, mouseY, random(10, 50), random(10, 50)));
}

function draw() {
    background(220);
    for (let box of boxes) {
        box.show();
    }
    fill(170);
    noStroke();
    rectMode(CENTER);
    rect(ground.position.x, ground.position.y, width, 20);
}

class Box {
    constructor(x, y, w, h) {
        this.body = Bodies.rectangle(x, y, w, h);
        this.w = w;
        this.h = h;
        World.add(world, this.body);
    }

    show() {
        let pos = this.body.position;
        let angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        fill(255);
        stroke(0);
        rect(0, 0, this.w, this.h);
        pop();
    }
}
