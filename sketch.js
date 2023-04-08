
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var shark;
var fish,fish2,fish3;
var rod,rod2,rod3;
var spool,spool2,spool3;
var bg;
var ground;
var bubble,bubble2;
var bubble_img;
var wind;
var fish_con;
var fish_con_2;
var fish_con_3;

function preload()
{
  bg_img=loadImage('sea.jpg')
  shark = loadImage('shark eating animation.gif')
  fish = loadImage('fish.jpg')
  fish2= loadImage('fish.jpg')
  fish3 = loadImage('fish.jpg')
  rod = loadImage('rod.jpg')
  rod2 = loadImage('rod.jpg')
  rod3 = loadImage('rod.jpg')
  bubble_img = loadImage('bubble.jpg')
  empty_bubble = loadImage("empty_bubble.png")
  one_bubble = loadImage("bubble_one.webp")
  two_bubble = loadImage("bubble_two.png")
  
}

function setup() {
  createCanvas(600,700);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;

  spool = createImg('spool.jpg');
  spool.position(100,90);
  spool.size(50,50);
  spool.mouseClicked(drop);

   
   spool2 = createImg('spool.jpg');
   spool2.position(450,90);
   spool2.size(50,50);
   spool2.mouseClicked(drop2);

   spool3 = createImg('spool.jpg');
   spool3.position(450,90);
   spool3.size(50,50);
   spool3.mouseClicked(drop3); 
   
   rod = new Rod(7,{x:120,y:90});
   rod2 = new Rod(7,{x:490,y:90});
   rod3 = new Rod(7,{x:490,y:90});

   ground = new Ground(300,height,width,20);

   shark = createSprite(200,620,100,100);
  shark.scale = 0.2;

  bubble_display.scale=0.2
  bubble_display.addAnimation('empty_bubble.png',empty_bubble)
  bubble_display.addAnimation('bubble_one.webp', one_bubble)
  bubble_display.addAnimation('bubble_two,png',two_bubble)
  bubble_display.changeAnimation('empty_bubble.png')
  
  bubble2= createSprite(320,50,20,20)
  bubble2.addImage(bubble_img)
  bubble2.scale=0.02;
  bubble2 = createSprite(50,370,20,20)
  bubble2.addImage(bubble_img)
  bubble2.scale=0.02


wind = createImg("wind.png")
wind.position(260,370)
wind.size(120,120)
wind.mouseClicked(airblow)

fish = Bodies.circle(300,300,20);
Matter.Composite.add(rod.body,fish);

fish_con = new Link(rod,fish);
fish_con_2 = new Link(rod2,fish);

rectMode(CENTER);
ellipseMode(RADIUS);
textSize(50)

}


function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);

  push();
  imageMode(CENTER);
  if(fish!=null){
    image(fish,fish.position.x,fish.position.y,70,70);
  }
  pop();

  rod.show();
  rod2.show();
  Engine.update(engine);

  drawSprites();

  if(collide(fish,shark)==true)
  {
    World.remove(engine.world,fish);
    fish = null;
    
  }

  if(fish!=null && fish.position.y>=650)
  {
    fish=null;
   }
  if(collide(fish,bubble,20)==true){
   bubble.visible=false
    bubble_display.changeAnimation('one')
  }
  if(collide(fish,bubble2,20)==true){
    bubble2.visible=false
    bubble_display.changeAnimation('two')
  }
}

function drop()
{
  rod.break();
  fish_con.dettach();
  fish_con = null; 
}

function drop2()
{
  rod2.break();
  fish_con_2.dettach();
  fish_con_2 = null;
}

function drop3()
{
  rod3.break();
  fish_con_3.dettach();
  fish_con_3 = null;
}

function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}

function airblow(){
  Matter.Body.applyForce(fish,{x:0,y:0},{x:0,y:-0.03})
  
}

