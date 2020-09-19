var PLAY = 1;
var END = 0;
var gameState = PLAY;


var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var survivalTime


function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {

  createCanvas(600, 400);

  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;

  FoodGroup = createGroup();
  obstacleGroup = createGroup();

  score = 0;
  survivalTime = 0;

}


function draw() {

  background("pink");
  monkey.collide(ground);

  if (gameState === PLAY) {

    if (FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
      score = score + 2;
    }

    if (keyDown("space") && monkey.y >= 160) {
      monkey.velocityY = -25;
    }

    monkey.velocityY = monkey.velocityY + 1.8

    stroke("white");
    textSize(20);
    fill("white");
    text("BananaCount : " + score, 390, 50);

    stroke("black");
    textSize(20);
    fill("black");
    survivalTime = Math.ceil(frameCount / frameRate())
    text("SurvivalTime : " + survivalTime, 50, 50);

    if (ground.x < 150) {
      ground.x = ground.width / 2;
    }

    if (monkey.isTouching(obstacleGroup)) {
      monkey.destroy();
      FoodGroup.destroyEach();
      gameState = END;
    }

    obstacle2();
    banana2();

  } else if (gameState === END) {
    monkey.destroy();
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    ground.destroy();

    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);

    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);

    stroke("black");
    textSize(60);
    fill("black");
    text("GAME OVER!!", 100, 200);



  }

  drawSprites();

}

function banana2() {
  if (frameCount % 80 === 0) {
    banana = createSprite(600, 100, 40, 10);
    banana.y = Math.round(random(120, 200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;

    banana.lifetime = 120;

    FoodGroup.add(banana);
  }
}


function obstacle2() {
  if (frameCount % 190 === 0) {
    obstacle = createSprite(600, 100, 40, 10);
    obstacle.y = Math.round(random(320, 320));
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -5;

    obstacle.lifetime = 134;

    obstacleGroup.add(obstacle);
  }
}