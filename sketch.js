var PLAY = 1;
var END = 0;
var gameState=PLAY;


var backgroundImg;
var penguin, penguin_collapsed, penguinImg;
var icicle, icicleImg;
var icicle2, icicle2Img;
var icicleGrp;

function preload() {
  backgroundImg = loadImage("background.jpeg");
  penguinImg = loadImage("penguin.png");
  penguin_collapsed = loadImage("penguin_dead.png");
  icicleImg = loadImage("icicle.png");
  icicle2Img = loadImage("icicles2.png");
}

function setup() {
  canvas = createCanvas(800,400);
 
  penguin = createSprite(width/12,height/2+height/8,10,10);
  penguin.addImage("bouncing", penguinImg);
  penguin.addImage("collapsed", penguin_collapsed);
  penguin.setCollider('circle',0,0,350)
  penguin.scale = 0.20;
  
  icicleGrp = new Group();
  
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  if(gameState===PLAY)  {
  if(keyDown("SPACE") && penguin.y>15)  {
    penguin.velocityY=-10
  }
  penguin.velocityY = penguin.velocityY+0.8;

  spawnIcicles();
  spawnIcicles2();
  
  if(icicleGrp.collide(penguin || penguin.y>height-10)) {
   gameState = END;
  }
} else if(gameState===END) {
  penguin.velocityY=0;
  icicleGrp.setVelocityXEach(0); 
  penguin.changeAnimation("collapsed", penguin_collapsed);
}
  drawSprites();
}

function spawnIcicles()  {
if(frameCount%83===0 ) {
  icicle = createSprite(800,65,5,5);
  icicle.setCollider('circle',0,0,45)
  icicle.addImage("icicl", icicleImg);
  icicle.scale=0.40;
  icicle.velocityX=-5;
  icicle.lifetime = 400;
  icicle.y=Math.round(random(5,80));
  icicleGrp.add(icicle);
}
}

function spawnIcicles2()  {
  if(frameCount%100===0) {
    icicle2 = createSprite(800,335,5,5);
    icicle2.setCollider('circle',0,0,45)
    icicle2.addImage("icicl2", icicle2Img);
    icicle2.scale=0.20;
    icicle2.velocityX=-5;
    icicle2.lifetime = 400;
    icicle2.y=Math.round(random(320,395));
    icicleGrp.add(icicle2);
  }
}