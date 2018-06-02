//creating gameState to hold the states of the game
var GameState=
{
    //executed after preload is finished ,used for creating gameObjects
    create : function()
    {
        //adding background
        this.background=game.add.sprite(0,0,'backyard');
        this.background.inputEnabled=true;
        
        //enabling the input on background and calling placeItem where user gave the input on the background
        this.background.events.onInputDown.add(this.placeItem,this);
        
        //adding pet to the initial default loaction
        this.pet=game.add.sprite(100,400,'pet',0);
        this.pet.anchor.setTo(0.5);
        
        //spritesheet animation
        this.pet.animations.add('anime',[1,2,3,2,1],5,false);
        
        //adding custom parameters to the pet sprite
        this.pet.customParams={health:100,fun:100};
        
        //draggable pet
        this.pet.inputEnabled=true;
        this.pet.input.enableDrag();
        
        //adding elements and calling pickItem on each of those
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
        
        this.rubberDuck=game.add.sprite(216,570,'rubberDuck');
        this.rubberDuck.anchor.setTo(0.5);
        this.rubberDuck.inputEnabled=true;
        this.rubberDuck.input.pixelPerectClick=true;
        this.rubberDuck.customParams={fun:20};
        this.rubberDuck.events.onInputDown.add(this.pickItem,this);
        
        //adding rotatePet function on clicking rotate icon
        this.rotate=game.add.sprite(288,570,'rotate');
        this.rotate.anchor.setTo(0.5);
        this.rotate.inputEnabled=true;
        this.rotate.input.pixelPerectClick=true;
        this.rotate.customParams={fun:10};
        this.rotate.events.onInputDown.add(this.rotatePet,this);
        
        //array of the sprites for manipulation
        this.buttons=[this.apple,this.candy,this.rotate,this.rubberDuck];
        
        //variable to hold the current selection of used
        this.selectedItem=null;
        
        //boolean to check ui is blocked or not
        this.uiBlocked=false;
        
        //defining style for game text
        var style={font :'20px Comic Sans MS', fill : '#006699'};
        
        
        this.game.add.text(10,20,'Health:',style);
        this.game.add.text(140,20,'Fun:',style);
        
        //textContainer for health and fun
        this.healthText=this.game.add.text(80,20,'',style);
        this.funText=this.game.add.text(180,20,'',style);
        
        // method for updating the text regularly under different scenarios it will intially show pet's health and fun as 100.
        this.updateText();
        
        
        //Implementing a timer loop which will trigger decreaseStat function every 5 seconds
        this.statReducer=this.game.time.events.loop(Phaser.Timer.SECOND * 5,this.decreaseStat,this);
        
        
        
        
        
    },
    
    //pick the item according to user selection(click) if ui is not blocked.
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
    
    
    //rotate the pet 2 times and will block the ui while it is rotating 
    rotatePet : function(sprite, event)
    {
        if(!this.uiBlocked)
            {
                
                this.uiBlocked=true;
                
                this.clearSelection();
                
                sprite.alpha=0.4;
                this.selectedItem=sprite;
                
                
                //adding tween animation for 1sec
                var petRotation=this.game.add.tween(this.pet);
                
                petRotation.to({angle : 720}, 1000);
                
                petRotation.start();
                
                //unblocking ui on completion of rotation animation
                petRotation.onComplete.add(function()
                {
                    this.clearSelection();
                    this.uiBlocked=false;
                    
                    //updating customParams of pet by adding the value from roation customParams.
                    this.pet.customParams.fun+=sprite.customParams.fun;
                    this.updateText();
                    
                    
                },this);
            }
    },
    
    
    //function to clear the selection of user
    clearSelection : function()
    {
        //iteraing over each sprite and making it's transparency to 0
        this.buttons.forEach(function(element, index){
                             
                element.alpha=1;             
                             
        });
        
        //clearing selectedItem
        this.selectedItem=null;
    },
    
    //will place the pickedItem and place it on the coordinates of the user input selected on background.
    placeItem : function(sprite,event)
    {
        //event gives us the pointer of user click
        var x=event.position.x;
        var y=event.position.y;
        
        //checking if there  a selected item and ui is not blocked to avoid null pointer exception
        if(this.selectedItem!=null&&!this.uiBlocked)
            {
                //creating a clone of the object selected to the position given by the event
                var newItem= this.game.add.sprite(x,y,this.selectedItem.key);
                newItem.anchor.setTo(0.5);
                newItem.customParams=this.selectedItem.customParams;
                
                //blocking the ui while pet's in transition
                this.uiBlocked=true;
                
                //translating pet from one position to other position
                this.petMovement=this.game.add.tween(this.pet);
                this.petMovement.to({x: newItem.position.x, y: newItem.position.y},1000);
                this.petMovement.start();
                this.petMovement.onComplete.add(function()
                {
                    // unblocking the ui on completion
                    this.uiBlocked=false;
                    
                    //playing sprite animation and destroying the cloned item
                    this.pet.play('anime');
                    newItem.destroy();
                    
                    //updating pet stat on consumption of different items
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
    
    //updating text accordingly
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
//        this.game.state.restart();
            this.state.start('HomeState',true, false,'Game Over');
    },
   
};