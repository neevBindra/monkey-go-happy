
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score = 0;
var ground, groundImage;
var PLAY=1;
var END=0;
var gameState=PLAY;
var restart;
var invground;
    
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  groundImage = loadImage("jungle.jpg");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(windowWidth,windowHeight);
  
    ground = createSprite(0,50,600,250);
  ground.addImage(groundImage);
  ground.scale = 0.8;
  ground.x = ground.width/2;

  invground = createSprite(width/2,height-10,width,10);
  invground.visible = false;
  invground.velocityX=-4;
  
  
  
  // creating monkey 
monkey = createSprite(80,height-70,10,10);
  monkey.addAnimation("running", monkey_running);
  monkey.scale=0.1;
  
  // creating ground
  


  bananaGroup = createGroup();
  obstacleGroup= createGroup();
  
   restart = createSprite(400,180,40,40);
  restart.visible= false
  

  monkey.debug = false
  monkey.setCollider("rectangle",0,0,20,monkey.height);
  
}


function draw() {
background("white");
  console.log("this is ",gameState);
  
  monkey.collide(invground);
  
    if(invground.x > 0){
      invground.x = invground.width/2;
    }
  
  
       if(score===10){
      monkey.scale = 0.10;
       }
  
        if(score===14){
monkey.scale = 0.12;
 }
  
   if(score===16){
monkey.scale = 0.14;
 }
  

  
  
  
  
  if(gameState===PLAY){
    
     ground.velocityX=-4;
    
    if(ground.x < 0){
      ground.x = ground.width/2;
    }
    
      if(touches.lenght < 0 || keyDown("space")&&monkey.y>= height - 180){
    monkey.velocityY=-12;
        touches = [];
  }
  monkey.velocityY = monkey.velocityY+0.8;
  
  // banana
  banana();
   
  
  // obstacles
  obstacles();
    
      
    
   
  }
  

  
  if(monkey.isTouching( bananaGroup)){
 bananaGroup.destroyEach();
    score = score+2;
  }
    
    if(monkey.isTouching(obstacleGroup)){
      gameState=END;
      monkey.scale = 0.1;
     }


  
  
    if(gameState===END){
    
    ground.velocityX=0;
    monkey.velocityY=0;
    
    text("GAME OVER",300,120);
    
      monkey.visible = false
    
    bananaGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
      
      bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    
    restart.visible = true
    
    if(mousePressedOver(restart)){
      
      reset();
    }
    
    
  }
  

  drawSprites();
    stroke("white");
  textSize(20);
  fill("white");
  text("score:"+score,370,70)

     
     
  }
  

   


function banana(){
  
  if(frameCount%80===0){
   var banana = createSprite(600,130,10,10);
    banana.addImage(bananaImage);
    banana.velocityX=-6;
    banana.y=Math.round(random(70,180));
    banana.scale=0.1;
    banana.lifetime=100;
    bananaGroup.add(banana);
    
    
   }   
      }

   function obstacles(){
     
     if(frameCount%90===0){
       var obstacle = createSprite(450,210,10,10);
       obstacle.addImage(obstacleImage);
       obstacleGroup.add(obstacle);
       obstacle.scale=0.1;
       obstacle.velocityX=-6;
       obstacle.lifetime=100;
     }
   }

function reset(){
  
  survivalTime=0;
  bananaEaten=0;
  bananaGroup.destroyEach();
  obstacleGroup.destroyEach();
  monkey.visible= true
  restart.visible = false
  gameState= PLAY;
  
  
  
}

