var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var play=1,end=0,gamestate=play;
var cioudimage,cloudsgroup;
var obs1,obs2,obs3,obs4,obs5,obs6,obstaclesgroup;
var count=0,highscore=0;
var trexcollided,tcimage;
var gameover,gameoverimage,restart,restartimage;
var jump,die,checkpoint;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  jump=loadSound("jump.mp3");
  die=loadSound("die.mp3");
  checkpoint=loadSound("checkPoint.mp3");
  
  
  groundImage = loadImage("ground2.png")
  cloudimage=loadImage("cloud.png");
  obs1=loadImage("obstacle1.png");
  obs2=loadImage("obstacle2.png");
  obs3=loadImage("obstacle3.png");
  obs4=loadImage("obstacle4.png");
  obs5=loadImage("obstacle5.png");
  obs6=loadImage("obstacle6.png");
  tcimage=loadImage("trex_collided.png");
  gameoverimage=loadImage("gameOver.png")
 restartimage=loadImage("restart.png");

}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",tcimage);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  obstaclesgroup=new Group();
  cloudsgroup=new Group();
  gameover=createSprite(300,100);
  gameover.addImage(gameoverimage);
  gameover.scale=0.5;
  restart=createSprite(300,140);
  restart.addImage(restartimage);
  restart.scale=0.5;
  gameover.visible=false;
  restart.visible=false;
}

function draw() {
  background(180);
  text("score: "+count,500,50);
  text("highscore: " + highscore,420,50);   
  if(gamestate==play){
    ground.velocityX=-(6+3*count/100);
    if(keyDown("space") && trex.y>=161) {
    trex.velocityY = -10;
      jump.play();
  }
    if(count>0 && count%100==0){
     checkpoint.play(); 
    }
  
    count =count+Math.round(getFrameRate()/60);
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
    spawnObstacle();
    spawnClouds();
    if(obstaclesgroup.isTouching(trex)){
     gamestate=end;
      die.play();
    }
  }
  else if(gamestate==end){
    ground.velocityX=0;
    trex.velocityY=0; 
    obstaclesgroup.setVelocityXEach(0);
    cloudsgroup.setVelocityXEach(0);
    obstaclesgroup.setLifetimeEach(-1);
    cloudsgroup.setLifetimeEach(-1);
    trex.changeAnimation("collided", tcimage);
    gameover.visible=true;
  restart.visible=true;
  }
  
  if(mousePressedOver(restart)){
    gamestate=play;
    obstaclesgroup.destroyEach();
    cloudsgroup.destroyEach();
    gameover.visible=false;
    restart.visible=false;
    if(highscore<count){
      highscore=count;
    }
    count=0;
    trex.changeAnimation("running",trex_running);
  }
  
  trex.collide(invisibleGround);
  drawSprites();
}
function spawnClouds(){
  if(World.frameCount % 60==0){
    var cloud=createSprite(600,120,10,10);
    cloud.y=random(70,120);
    cloud.velocityX= -4;
    cloud.addImage("cloud",cloudimage);
    cloud.scale=0.5;
    cloud.lifetime=150;
    cloud.depth=trex.depth;
    trex.depth=trex.depth+1;
    
    cloudsgroup.add(cloud);
  }
  
}
function spawnObstacle(){
  if(World.frameCount % 60==0){
    var obstacle =createSprite(600,165,10,40);
    obstacle.velocityX= -(6+3*count/100);
    var rand= Math.round(random(1,6));
    switch(rand){
      case 1: obstacle.addImage(obs1);
      break;
      case 2: obstacle.addImage(obs2);
      break;
       case 3: obstacle.addImage(obs3);
      break;
       case 4: obstacle.addImage(obs4);
      break;
       case 5: obstacle.addImage(obs5);
      break;
       case 6: obstacle.addImage(obs6);
      break;
      default : break;
    }
    obstacle.scale=0.5;
    obstacle.lifetime=100;
    obstaclesgroup.add(obstacle);
      
  }
}