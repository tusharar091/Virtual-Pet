var PreloadState={
    
    //preloading the assets for HomeScreen as well as the GameScreen
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
    
    create : function()
    {
        // creating the logo
        this.logo=this.add.sprite(this.game.world.centerX,this.game.world.centerY,'logo');
        this.logo.anchor.setTo(0.5);
        
        // creating the progressBar
        this.progressBar=this.add.sprite(this.game.world.centerX,this.game.world.centerY+128,'bar');
        this.progressBar.anchor.setTo(0.5);
        
        //this method breaks the bar sprite into portion and shows the progress until assets are loaded
        this.load.setPreloadSprite(this.progressBar);
        
        //Firing HomeState from preloadState
        this.state.start('HomeState');
    }
};
