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
        
        this.pet=game.add.sprite(100,400,'pet');
        this.pet.anchor.setTo(0.5);
        
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
        this.rotate.events.onInputDown.add(this.rotatePet,this);
        
        this.rubberDuck=game.add.sprite(216,570,'rubberDuck');
        this.rubberDuck.anchor.setTo(0.5);
        this.rubberDuck.inputEnabled=true;
        this.rubberDuck.input.pixelPerectClick=true;
        this.rubberDuck.customParams={fun:20};
        this.rubberDuck.events.onInputDown.add(this.pickItem,this);
        
        this.buttons=[this.apple,this.candy,this.rotate,this.rubberDuck];
        this.selectedItem=null;
        
        
        
        
        
    },
    
    pickItem : function(sprite, event)
    {
        console.log('item is picked');
        

        
    },
    
    rotatePet : function(sprite, event)
    {
        console.log('rotating....');
    },
    
   
};

// adding state variable to the game window.
game.state.add('GameState',GameState);
game.state.start('GameState');





