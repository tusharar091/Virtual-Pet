var BootState={
     //used to initialize game settings
    init : function()
    {
        
        this.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL;
        
        this.scale.pageALignHorizontally=true;
        this.scale.pageAlignVertically=true;
    },
    
    preload : function()
    {
        this.load.image('logo','assets/images/logo.png');
        this.load.image('bar','assets/images/bar.png');    
    },
    
    create : function()
    {
        this.game.stage.backgroundColor="#fff";
        
        this.state.start('PreloadState');
    }
};
