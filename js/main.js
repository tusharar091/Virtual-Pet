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
        
        this.apple=game.add.sprite(72,570,'apple');
        this.candy=game.add.sprite(144,570,'candy');
        this.rotate=game.add.sprite(288,570,'rotate');
        this.rubberDuck=game.add.sprite(216,570,'rubberDuck');
        
        
    },
};

// adding state variable to the game window.
game.state.add('GameState',GameState);
game.state.start('GameState');





