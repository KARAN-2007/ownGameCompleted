var bg,bgI;
var hero,hI;
var sit,stand;
var ground,ground2;
var fall;
var enemy,eG,blackGroup,blackE,eGI,blackGun,blackGGroup;
var npc,npc22,npc33;
var gun,gunGroup,g;
var enemyGun,eGGroup;
var START=0
var PLAY=1
var END=2
var gameState=START;
var reload,rI;
var IB,ibI;
var fall1,fall2,blackFall
var sack;
var speed=0
var score=0
var shot;
var enemyS
var heroS
var heroEnd
var blackEnemyEnd,enemyEnd,enemyEnd2;
var gameOver,gOI;
var reset,rI;

function preload(){
        bgI=loadImage("OWNGAMEBG5.png")
        hI=loadAnimation("player character/pc1.png","player character/pc2.png",
        "player character/pc3.png","player character/pc4.png","player character/pc5.png",
        "player character/pc6.png")
        sit=loadAnimation("pcSit/pcsit4.png")
        fall=loadAnimation("playerCharactetDown/pcd5.png")
        npc=loadAnimation("npc1/npc1.1.png","npc1/npc1.2.png","npc1/npc1.3.png"
        ,"npc1/npc1.4.png","npc1/npc1.5.png","npc1/npc1.6.png")
        npc22=loadAnimation("npc3/npc3.1.png","npc3/npc3.2.png","npc3/npc3.3.png"
        ,"npc3/npc3.4.png","npc3/npc3.5.png","npc3/npc3.6.png")
        npc33=loadAnimation("npc4/npc4.1.png","npc4/npc4.2.png","npc4/npc4.3.png"
        ,"npc4/npc4.4.png","npc4/npc4.5.png","npc4/npc4.6.png")
        g=loadAnimation("Herofire/fire1.png","Herofire/fire2.png"
        ,"Herofire/fire3.png","Herofire/fire4.png","Herofire/fire5.png"
        ,"Herofire/fire6.png","Herofire/fire7.png","Herofire/fire8.png"
        ,"Herofire/fire9.png")
        eGI=loadAnimation("eGun/eG1.png","eGun/eG2.png","eGun/eG3.png","eGun/eG4.png",
        "eGun/eG5.png","eGun/eG6.png","eGun/eG7.png","eGun/eG8.png")
        fall1=loadAnimation("npc1Fall.png")
        fall2=loadAnimation("npc2Fall.png")
        blackFall=loadAnimation("blackDown.png")
        shot=loadSound("shot.wav")
        heroS=loadSound("die2.wav")
        enemyS=loadSound("die1.wav")
        heroEnd=loadAnimation("playerCharactetDown/pcd9.png")
        blackEnemyEnd=loadAnimation("npc4/npc4.2.png")
        enemyEnd=loadAnimation("npc1/npc1.1.png")
        enemyEnd2=loadAnimation("npc3/npc3.1.png")
        gOI=loadImage("gameOver.png")
        rI=loadImage("restart.png")

}


function setup(){
        createCanvas(950,500)
        bg=createSprite(width/2,height/2,950,500)
        bg.addImage(bgI)
        bg.scale=1.2;
        bg.velocityX=-2;

        hero=createSprite(130,320);
        hero.addAnimation("play",hI)
        hero.addAnimation("sit",sit)
        hero.addAnimation("fall",fall)
        hero.scale=0.3;
        hero.velocityY=1

        IB=createSprite(530,300)
        IB.addAnimation("I",eGI)
        IB.scale=0.25
        IB.visible=false;

        
        ground=createSprite(180,410,50,10)
        ground.visible=false

        ground2=createSprite(180,410,2000,10)
        ground2.visible=false

        gameOver=createSprite(width/2,height/2-150)
        gameOver.addImage(gOI)
        gameOver.scale=0.5
        gameOver.visible=false

        reset=createSprite(width/2,height/2+50)
        reset.addImage(rI)
        reset.scale=0.2
        


        
        eG=new Group();
        blackGroup=new Group();
        gunGroup=new Group();
        eGGroup=new Group();
        blackGGroup=new Group();
}

function draw(){
          background("purple")

          if(gameState===START){
            gameOver.visible=false
            reset.visible=false
                hero.visible=false;
                bg.visible=false;
                bg.velocityX=0;
                hero.changeAnimation("play",hI)
                fill("black")
                textSize(19)
                text("STORY-",50,50)
                text("AGENT 'B' IS AN UNDERCOVER AGENT. HE CAME TO KNOW ABOUT A GANG OF SMUGGLERS.",50,100)
                text("NOW HE IS ON HIS MISSION TO STOP THE SMUGGLERS.PLAY AS AGENT 'B' AND STOP THE",50,130)
                text("SMMUGLERS!",50,160)
                fill("white")
                textSize(20)
                fill("black")
                text("RULES-",50,190)
                text("1. YOU CAN SHOOT BULLET BY HOLDING RIGHT ARROW<=.",50,220)
                text("2. YOU CAN SIT WITH DOWN ARROW.",50,250)
                text("3. YOU CAN JUMP WITH UP ARROW.",50,280)
                text("4. AVOID GETTING HIT BY ENEMY'S BULLET.",50,310)
                IB.visible=true;
                textSize(30)
                fill("white")
                text(" PRESS SPACE TO PLAY!!!!",300,400)
                console.log(frameCount)
                frameCount=0
                if(keyDown("space")){
                    gameState=PLAY
                    IB.visible=false;
                }
          }

          if(gameState===PLAY){
                reset.visible=false
                speed = speed + Math.round(getFrameRate()/60)
                hero.visible=true;
                bg.visible=true;
               
                bg.velocityX=-(2 + 1* speed/500);
              
                if(bg.x<450){
                   bg.x=780
                }

                if(keyDown("DOWN_ARROW")){
                    hero.changeAnimation("sit",sit)
                    hero.scale=0.49
                    //hero.debug=true
                    bg.velocityX=0
                    //hero.setCollider("circle",0,0,60)
              
                }

                if(keyWentUp("DOWN_ARROW")){
                    hero.changeAnimation("play",hI)
                    hero.scale=0.3;
                    hero.velocityY=5;
                    bg.velocityX=-2;
                }
                if(keyDown("UP_ARROW")){
                    hero.velocityY=-10
                }
                    hero.velocityY+=0.5
                if(keyDown("RIGHT_ARROW")){
                    spawnGun()
                    //shot.play()
                }
                if(gunGroup.isTouching(blackGGroup)){
                    gunGroup[0].destroy();
                    blackGGroup[0].destroy();
                    
                  
                }
                if(gunGroup.isTouching(eGGroup)){
                    eGGroup[0].destroy();
                    gunGroup[0].destroy();
                }
                if(gunGroup.isTouching(eG)){
                      score=score+1
                      console.log("Score:"+score)
                      eG[0].destroy();
                      enemyS.play()
                     /* if(eG[0].x<950){
                          eG[0].changeAnimation("fall",fall1)
                      }

                          eG[0].setCollider("rectangle",0,200,eG[0].width,eG[0].height)
                          //eG.remove(eG[0])
                    
                          setTimeout (() => {
                          eG[0].destroy();
                            
                          }, 3000)
                
                  
                  
                  }*/
                }
                if(gunGroup.isTouching(blackGroup)){
                    score=score+1
                    console.log("Score:"+score)
                    blackGroup[0].destroy();
                    enemyS.play()

              }
              
              if(eGGroup.isTouching(hero)||blackGGroup.isTouching(hero)){
                  gameState=END
              }



                  spawnEnemy();
                  blackEnemy();
                  if(eG[0]!==undefined){
                    spawnEG();
                  }
                  if(blackGroup[0]!==undefined){
                    blackEg();
                  }
                  
                  

          }
          if(gameState===END){
            gunGroup.setVelocityXEach(0)
            eGGroup.setVelocityXEach(0)
            blackGGroup.setVelocityXEach(0)
            bg.velocityX=0
            eG.setVelocityXEach(0)
            blackGroup.setVelocityXEach(0)
            hero.velocityY=10
            hero.changeAnimation("fall",fall)
            if(eG[0]!==undefined){
            eG[0].changeAnimation("end",enemyEnd)
            }
            if(blackGroup[0]!==undefined){
            blackGroup[0].changeAnimation("end",blackEnemyEnd)
            
            
            }
            gameOver.visible=true
            reset.visible=true
            if(mousePressedOver(reset)){
                gameState=START
                
                eG.destroyEach()
                gunGroup.destroyEach()
                blackGroup.destroyEach()
                eGGroup.destroyEach()
                blackGGroup.destroyEach()
                score=0

            }
           
          }

          eG.collide(ground2)
          hero.collide(ground)
          
          
          drawSprites()
          textSize(30)
                fill("white")
                text(" Enemies Killed: "+score,width/2,50)
}

function spawnEnemy(){
        if(frameCount%200===0){
              enemy=createSprite(width,random(50,320))
              enemy.velocityX=-(2.9 + 1* speed/500)
              enemy.velocityY=5
              
              var randm=Math.round(random(1,2))

              switch(randm){
                case 1 : enemy.addAnimation("1",npc);
                         enemy.addAnimation("fall",fall1);
                         enemy.addAnimation("end",enemyEnd)
                         enemy.scale=0.3
                         break;
                case 2:enemy.addAnimation("2",npc22);
                       enemy.scale=0.55;
                       enemy.addAnimation("fall",fall2)
                       enemy.addAnimation("fall",enemyEnd2)
                       break;
                default: break;
            
              }
              enemy.lifeTime=200
              eG.add(enemy);
        }


  
}

function blackEnemy(){
      if(frameCount%400===0){
            blackE=createSprite(width,330)
            blackE.velocityX=-(5 + 1* speed/500)
            blackE.addAnimation("b",npc33)
            blackE.addAnimation("end",blackEnemyEnd)
            blackE.scale=0.55
            blackE.lifeTime=200
            blackGroup.add(blackE)
       }
}

function spawnGun(){
      if(frameCount%15===0){
            gun=createSprite(hero.x+10,hero.y-20,10,5)
            gun.shapeColor="black"
            gun.velocityX=+(5 + 1*speed/500)
            gun.addAnimation("shoot",g)
            gun.scale=0.6
            gun.lifeTime=200
            gunGroup.add(gun)
        }
}

function spawnEG(){
      if(frameCount%60===0 && enemy.x<=950){
          
            enemyGun=createSprite(enemy.x-40,enemy.y-26,10,5)
            enemyGun.shapeColor="white"
            enemyGun.velocityX=-(5 + 1* speed/500)
            enemyGun.addAnimation("gun",eGI)
            enemyGun.scale=0.08
            enemyGun.lifeTime=200
            eGGroup.add(enemyGun);
        }
}

function blackEg(){
        if(frameCount%60===0){
            blackGun=createSprite(blackE.x-40,blackE.y-26,10,5)
            blackGun.shapeColor="white"
            blackGun.velocityX=-(5 + 1* speed/500)
            blackGun.addAnimation("g",eGI)
            blackGun.scale=0.08
            blackGun.lifeTime=200
            blackGGroup.add(blackGun);
        }
}
