var sword, score, monstergroup, fruitgroup, fruit, monster, gameo;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
score = 0;
var gameOver;
var cut;

function preload() {
  knife = loadImage("sword.png");
  fruit1 = loadImage("fruit1.png")
  fruit2 = loadImage("fruit2.png")

  fruit3 = loadImage("fruit3.png")

  fruit4 = loadImage("fruit4.png")
  alien1 = loadAnimation("alien1.png", "alien2.png")

  alien2 = loadImage("alien2.png")
  gameo = loadImage("gameover.png");
  cut = loadSound("cut.mp3");
  gameOver = loadSound("gameover.mp3");
}

function setup() {
  createCanvas(600, 500);
  sword = createSprite(40, 200, 20, 20);
  sword.addImage("sword", knife);
  sword.addImage("gameover", gameo);
  sword.scale = 0.7;
  sword.visible = true;

  game = createSprite(300, 300);
  game.visible = false;

  sword.setCollider("rectangle", 0, 0, 40, 40);

  fruitgroup = new Group();
  monstergroup = new Group();
}

function draw() {
  background("cyan");
  text("score :" + score, 550, 20);


  if (gamestate === PLAY) {
    fruits();
    monsters();
    sword.x = World.mouseX;
    sword.y = World.mouseY;

    if (fruitgroup.isTouching(sword)) {
      fruitgroup.destroyEach();
      score = score + 2;
      cut.play();
    } else {
      if (monstergroup.isTouching(sword)) {
        gamestate = END;
        gameOver.play();
        fruitgroup.destroyEach();
        monstergroup.destroyEach();
        fruitgroup.setVelocityXEach(0);
        monstergroup.setVelocityXEach(0);

        sword.x = 200;
        sword.y = 200;
        //game.visible=true;
        //sword.visible=false;
        sword.changeImage("gameover", gameo);

      }
    }
  }

  drawSprites();


}

function fruits() {
  if (frameCount % 80 === 0) {
    fruit = createSprite(600, 200, 20, 10);

    fruit.scale = 0.3;
    fruit.velocityX = -(7+(score/4));
    fruit.y = Math.round(random(10, 490));


    var ran = Math.round(random(1, 4));
    switch (ran) {
      case 1:
        fruit.addImage("fruit", fruit1);
        break;
      case 2:
        fruit.addImage("fruit", fruit2);
        break;
      case 3:
        fruit.addImage("fruit", fruit3);
        break;
      case 4:
        fruit.addImage("fruit", fruit4);
        break;
      default:
        break;
    }

var pos = Math.round(random(1,2));
        if(pos === 1) {
          fruit.x = 400;
          fruit.velocityX = -(7+(score/4));
        }
        if(pos === 2) {
          fruit.x = 0;
          fruit.velocityX = -(7+(score/4));
        }
    fruitgroup.add(fruit);
    fruit.setLifetime = 100;
  }
}

function monsters() {
  if (frameCount % 200 === 0) {
    monster = createSprite(600, 200, 20, 10);
    monster.addAnimation("fruit", alien1);
    monster.y = Math.round(random(100, 500));
    monster.velocityX = -(7+(score/10))
    monster.setlifetime = 50;
    //monster.scale=0.3;
    monstergroup.add(monster);
  }

}