var HomeState={
    init : function(message)
    {
        this.message=message;
    },
    create  : function()
    {
        this.background=this.game.add.sprite(0,0,'backyard');
        this.background.inputEnabled=true;
        this.background.events.onInputDown.add(function()
                                              {
            this.state.start('GameState');
        },this);
        
        var style={font : '35px Comic Sans MS',fill : '#006699'};
        this.gameText=this.game.add.text(this.game.world.centerX,this.game.world.centerY+200,'TOUCH TO START', style);
        this.gameText.anchor.setTo(0.5);
        
        var style1={font : '30px Elephant',fill:'#ff0000'};
        this.game.add.text(this.game.world.centerX,this.game.world.centerY+100,this.message,style1).anchor.setTo(0.5);
    }
};