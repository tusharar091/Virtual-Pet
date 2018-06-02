var HomeState={
    
    //We can pass message from one state to another using init.
    init : function(message)
    {
        // message being passed from GameState once the game is over
        this.message=message;
    },
    
    
    
    create  : function()
    {
        //adding the background to the homescreen
        this.background=this.game.add.sprite(0,0,'backyard');
        
        //defining style for text
        var style={font : '35px Comic Sans MS',fill : '#006699'};
        
        //adding Touch HERE text to homeScreen
        this.gameText=this.game.add.text(this.game.world.centerX,this.game.world.centerY+200,'TOUCH TO START', style);
        this.gameText.anchor.setTo(0.5);
        
        //enabling input to textButton
        this.gameText.inputEnabled=true;
        this.gameText.events.onInputDown.add(function(){
            
            //firing gameState once textButton is clicked.
            this.state.start('GameState');
        },this);
        
        //creating text from message passed from GameStat.
        var style1={font : '30px Elephant',fill:'#ff0000'};
        this.game.add.text(this.game.world.centerX,this.game.world.centerY+100,this.message,style1).anchor.setTo(0.5);
    }
};