//creating game window using phaser framework.
var game=new Phaser.Game(360,640,Phaser.AUTO);

// adding state variable to the game window.
game.state.add('GameState',GameState);
game.state.add('PreloadState',PreloadState);
game.state.add('BootState',BootState);
game.state.start('BootState');






