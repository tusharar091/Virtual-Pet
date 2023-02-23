// BootState is used to load the assets used in Preload phase such as progressBar and logo so as to avoid delay in loading assets in preload part

var BootState={
     //used to initialize game settings , used here so that every state of the game can use same settings.
    init : function()
    {
        //initializes scale mode to SHOW_ALL which preserves aspect ratio and utilizes the space according to the resolution of devices.
        this.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL;
        
        // used to align the game screen with the parent window so as to make it work more centrally.
        this.scale.pageALignHorizontally=true;
        this.scale.pageAlignVertically=true;
    },
    
    //preloading the assets for preload phase
    preload : function()
    {
        this.load.image('logo','assets/images/logo.png');
        this.load.image('bar','assets/images/bar.png');    
    },
    
    //creating the bootscreen
    create : function()
    {
        // stage sets the background to  white for bootscreen
        this.game.stage.backgroundColor="#fff";
        
        //firing up the Preload state from bootState
        this.state.start('PreloadState');
    }
};
