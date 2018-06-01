//creating game window using phaser framework.
var game=new Phaser.Game(360,640,Phaser.AUTO);

//creating gameState to hold the states of the game
var GameState=
{
   
   
    //used to initialize game settings
    init : function()
    {
        
        this.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL;
        
        this.scale.pageALignHorizontally=true;
        this.scale.pageAlignVertically=true;
    },
    
    //used to load assets before game starts
    preload : function()
    {
        this.load.image('backyard','assets/images/backyard.png');
        this.load.image('apple','assets/images/apple.png');
        this.load.image('arrow','assets/images/arrow.png');
        this.load.image('candy','assets/images/candy.png');
        this.load.image('rotate','assets/images/rotate.png');
        this.load.image('rubberDuck','assets/images/rubber_Duck.png');
        
        this.load.spritesheet('pet','assets/images/pet.png',97,83,5,1,1);

    },
    
    //executed after preload is finished ,used for creating gameObjects
    create : function()
    {
        this.background=game.add.sprite(0,0,'backyard');
        this.background.inputEnabled=true;
        
        this.background.events.onInputDown.add(this.placeItem,this);
        
        this.pet=game.add.sprite(100,400,'pet',0);
        this.pet.anchor.setTo(0.5);
        
        //spritesheet animation
        this.pet.animations.add('anime',[1,2,3,2,1],5,false);
        
        //adding custom parameters to the pet sprite
        this.pet.customParams={health:100,fun:100};
        
        //draggable pet
        this.pet.inputEnabled=true;
        this.pet.input.enableDrag();
        
        this.apple=game.add.sprite(72,570,'apple');
        this.apple.anchor.setTo(0.5);
        this.apple.inputEnabled=true;
        this.apple.input.pixelPerectClick=true;
        this.apple.customParams={health:20};
        this.apple.events.onInputDown.add(this.pickItem,this);
        
        
        this.candy=game.add.sprite(144,570,'candy');
        this.candy.anchor.setTo(0.5);
        this.candy.inputEnabled=true;
        this.candy.input.pixelPerectClick=true;
        this.candy.customParams={health: -10,fun:10};
        this.candy.events.onInputDown.add(this.pickItem,this);
        
        this.rotate=game.add.sprite(288,570,'rotate');
        this.rotate.anchor.setTo(0.5);
        this.rotate.inputEnabled=true;
        this.rotate.input.pixelPerectClick=true;
        this.rotate.customParams={fun:10};
        this.rotate.events.onInputDown.add(this.rotatePet,this);
        
        this.rubberDuck=game.add.sprite(216,570,'rubberDuck');
        this.rubberDuck.anchor.setTo(0.5);
        this.rubberDuck.inputEnabled=true;
        this.rubberDuck.input.pixelPerectClick=true;
        this.rubberDuck.customParams={fun:20};
        this.rubberDuck.events.onInputDown.add(this.pickItem,this);
        
        //array of the sprites for manipulation
        this.buttons=[this.apple,this.candy,this.rotate,this.rubberDuck];
        
        //variable to hold the current selection
        this.selectedItem=null;
        
        //boolean to check ui is blocked or not
        this.uiBlocked=false;
        
        var style={font :'20px Comic Sans MS', fill : '#006699'};
        
        this.game.add.text(10,20,'Health:',style);
        this.game.add.text(140,20,'Fun:',style);
        
        this.healthText=this.game.add.text(80,20,'',style);
        this.funText=this.game.add.text(180,20,'',style);
        
        this.updateText();
        
        this.statReducer=this.game.time.events.loop(Phaser.Timer.SECOND * 5,this.decreaseStat,this);
        
        
        
        
        
    },
    
    pickItem : function(sprite, event)
    {
        //if ui is not blocked we can click any of the sprite
        if(!this.uiBlocked)
            {
                
                //clear selection will clear the previous selection and set alpha to 1 again 
                this.clearSelection();
                
                //assigning the sprite as selected
                this.selectedItem=sprite;
                sprite.alpha=0.4;
                
            }

        
    },
    
    rotatePet : function(sprite, event)
    {
        if(!this.uiBlocked)
            {
                
                this.uiBlocked=true;
                
                this.clearSelection();
                
                sprite.alpha=0.4;
                this.selectedItem=sprite;
                
                var petRotation=this.game.add.tween(this.pet);
                
                petRotation.to({angle : 720}, 1000);
                
                petRotation.start();
                
                petRotation.onComplete.add(function()
                {
                    this.clearSelection();
                    this.uiBlocked=false;
                    
                    this.pet.customParams.fun+=sprite.customParams.fun;
                    this.updateText();
                    
                    
                },this);
            }
    },
    
    clearSelection : function()
    {
        this.buttons.forEach(function(element, index){
                             
                element.alpha=1;             
                             
        });
        
        this.selectedItem=null;
    },
    
    placeItem : function(sprite,event)
    {
        var x=event.position.x;
        var y=event.position.y;
        
        if(this.selectedItem!=null&&!this.uiBlocked)
            {
                var newItem= this.game.add.sprite(x,y,this.selectedItem.key);
                newItem.anchor.setTo(0.5);
                newItem.customParams=this.selectedItem.customParams;
                
                this.uiBlocked=true;
                this.petMovement=this.game.add.tween(this.pet);
                this.petMovement.to({x: newItem.position.x, y: newItem.position.y},1000);
                this.petMovement.start();
                this.petMovement.onComplete.add(function()
                {
                
                    this.uiBlocked=false;
                    
                    
                    this.pet.play('anime');
                    newItem.destroy();
                    
                    
                    var stat;
                    
                    for(stat in newItem.customParams)
                    {
                        if(newItem.customParams.hasOwnProperty(stat))
                            {
                        
                                this.pet.customParams[stat]+=newItem.customParams[stat];
                            }
                    }
                    this.updateText();
                  
                    
                },this);
            } 
        
    },
    
    updateText : function()
    {
        this.healthText.setText(this.pet.customParams.health);
        this.funText.setText(this.pet.customParams.fun);
    },
    
    decreaseStat : function()
    {
        this.pet.customParams.health-=10;
        this.pet.customParams.fun-=10;
        this.updateText();
    },
    
    update : function()
    {
        if(this.pet.customParams.health<=0||this.pet.customParams.fun<=0)
            {
                this.pet.frame=4;
                this.uiBlocked=true;
                
                this.game.time.events.add(2000, this.gameOver, this);
            }
    },
    
    gameOver : function()
    {
        this.game.state.restart();
    },
   
};

// adding state variable to the game window.
game.state.add('GameState',GameState);
game.state.start('GameState');





