// variables
var bgImg;
var bgImg1;
var spaceshipImg;
var ship1;
var obstacleImg;
var lifeImg;
var life;
var backgr;

var obstacle;

var END =0;
var PLAY =1;
var INTRO=2;
var INTRO1=3;
var gameState =INTRO;

var attImg;
var attack;
var score=0;
var shipHealth=3; 
var astImg;




function preload(){
  bgImg=loadImage("bg.png")
  bgImg1=loadImage("g.png")
  spaceshipImg=loadImage("ship2.png")
  obstacleImg=loadImage("obs.png")
  attImg=loadImage("att.png");
  lifeImg=loadImage("powerup.png")
  astImg=loadImage("ast.png")

}
function setup() {
  createCanvas(800,400);

  

  backgr=createSprite(0,0,800,400);
  backgr.addImage(bgImg);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityY=20;



  ship1=createSprite(400,320,20,20);
  ship1.addImage(spaceshipImg);
  ship1.scale=0.6;

  
  obstaclesGroup=createGroup();
  attackGroup=createGroup();
  lifeGroup=createGroup();
  astGroup=createGroup();

}

function draw() 
{
  background(bgImg);  

   fill(0);
   textSize(20);
   text(mouseX + "," + mouseY,mouseX,mouseY);

  

   ship1.depth=backgr.depth+1;

 if(gameState===INTRO){
   background(0);
   fill("yellow");
   textSize(20);
   text("Earth & humanity were facing its difficult times ",200,150);
   text("and decided to flee from earth in search for a better place but ",200,170);
   text("Press C to continue ===>",200,220);
   if(keyDown("C")){
     gameState=1;
   }
 }

 

   

  if(gameState===PLAY)
  {



    spawnObstacles();
    spawnFire();
    spawnLife();
    spawnAst();

    fill("black");
    textSize(25);
    text("Ships Health="+shipHealth,40,50);
    text("Score "+score,650,50);
    textSize(20);
    text("Score Goal 20 ",670,70);
    textSize(20);
    text("Press A to attack",320,40);    

    if (keyDown(RIGHT_ARROW)){
      ship1.x+=5;
      
    }
    if (keyDown(LEFT_ARROW)){
      ship1.x-=5;
    } 

  
  
   if(ship1.isTouching(obstaclesGroup))
   {
      shipHealth-=2;
      obstaclesGroup.destroyEach();
   }
  
   if(ship1.isTouching(lifeGroup))
   {
      shipHealth+=1;
      lifeGroup.destroyEach();
   }

  }

   if(shipHealth===4){
     shipHealth=3;
   }

  

   if(attackGroup.isTouching(obstaclesGroup))
    {
      obstaclesGroup.destroyEach();
      astGroup.destroyEach();
      score+=1;
    } 
    
    if(attackGroup.isTouching(astGroup))
    {
      astGroup.destroyEach();
      score+=1;
    } 

    if(ship1.isTouching(astGroup))
    {
      astGroup.destroyEach();
      shipHealth-=1;
      
    } 
  

 if(shipHealth===0){
   gameState=0;
 }

  // gameState END 
  if(gameState===END){
    obstaclesGroup.destroyEach();
    background(bgImg1);
     
    //backgr.depth=obstacle.depth+1;

    obstaclesGroup.setVelocityYEach(0);
    
    //backgr.velocityY=0;
    //backgr.x=250;
   // backgr.y=250;
    //backgr.scale=0.5;

    ship1.destroyEach();
    obstacle.visible=false;
    obstacle.velocityY = 0;

  }

 
  drawSprites();
}



function spawnObstacles()
{
  if (frameCount %80 === 0)
  {
    obstacle = createSprite(40,52,22,22); 
    obstacle.x=random(30,800);
    obstacle.addImage(obstacleImg);
    obstacle.scale = 0.2;
    obstacle.velocityY = 8;
    
    obstacle.lifetime = 250;
    obstacle.depth=ship1.depth+1;
    obstaclesGroup.add(obstacle);

  }
}

function spawnFire()
{
  if (keyWentDown("A"))
  {
    attack = createSprite(40,300,22,22); 
    attack.x=ship1.x;
    attack.addImage(attImg);
    attack.scale = 0.5;
    attack.velocityY = -3.5;
    
    attack.lifetime = 250;
    attack.depth=ship1.depth+1;
    attackGroup.add(attack);

  }
}


function spawnLife()
{
  if (frameCount %70 === 0)
  {
    life= createSprite(40,52,22,22); 
    life.x=random(30,800);
    life.addImage(lifeImg);
    life.scale = 0.2;
    life.velocityY = 8;
    
    life.lifetime = 250;
    life.depth=ship1.depth+1;
    lifeGroup.add(life);

  }
}


function spawnAst()
{
  if (frameCount %30 === 0)
  {
    ast= createSprite(40,52,22,22); 
    ast.x=random(30,800);
    ast.addImage(astImg);
    ast.scale = 0.1;
    ast.velocityY = 7;
    
    ast.lifetime = 250;
    ast.depth=ship1.depth+1;
    astGroup.add(ast);

  }
}