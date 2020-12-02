//Create variables here
var dog, dogIMG, dogIMG1, database, foodS, foodStock;
var feed, addFood;
var fedTime, lastFed;
var foodObj;

function preload()
{
  //load images here
  dogIMG = loadImage("images/dogImg.png");
  dogIMG1 = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000, 500);

  foodObj = new Food();

  dog = createSprite(800, 220, 150, 150);
  dog.addImage(dogIMG);
  dog.scale = 0.2;

  feed = createButton("Feed the Dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
}


function draw() {  
  background(46, 130, 87);

  if(foodS!== undefined){
    fill(255);
    textsize(20);

    if(lastFed >= 12){
      text("Last Feed : " + lastFed % 12 + " PM", 350, 30);
    }
    else if(lastFed == 0){
      text("Last Feed : 12 AM", 350, 30);
    }
    else{
      text("Last Feed : " + lastFed + " AM", 350, 30);
    }

  }
  foodObj.display();
  drawSprites();
}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function FeedDog(){
  dog.addImage(dogIMG1);
  foodObj.updateFoodStock(foodObj.getFoodStock()- 1)
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })

}

function addFoods(){
  foodS ++;
  database.ref('/').update({
    Food: foodS
  })
}