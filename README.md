# GrappleHook
[Live Demo](https://sackofcodetatoes.github.io/grapplehook/)

![GrappleHook Preview](https://github.com/SackofCodetatoes/grapplehook/blob/master/images/preview.gif)

GrappleHook is a 2d side-scrolling game that incorporates a bit of physics and a grappling hook. The game engine and mechanics were implemented using JavaScript and HTML5 Canvas. GrappleHook was built in a 5 day deadline with future revisions to come.
Assets + Sounds were not made by me.

Asset + Sound Sources: 
* City Background from [OpenGameArt.org](https://opengameart.org/content/city-background-repetitive-3)
* Character from [16x16 Industrial Tile Set](https://0x72.itch.io/16x16-industrial-tileset)
* Title and Background Music from [bensound.com](www.bensound.com)
* Sound effects from [freesound.org](https://freesound.org/)

## Features
In GrappleHook, the user can:  
* Move the player in horizontal directions and jump
* Traverse the level using a grappling hook
* Sound mute function


## Engine
The game engine and logic was built out from scratch using JavaScript and utilizes HTML5 canvas to render game entitites. The engine functions by running a level seed function to initialize all game entitites (player, coins, platforms) and stores references to each entity in `game.entities` array. Platforms and coins are additionally stored in `game.platforms` and `game.coins` arrays for collission detection. Both collission detection and image drawing is done by iterating over the respective arrays. Game Entities are derived from `GameEntity` base class primarily consisting of a `draw()` and `update()` function. `draw()`, be default draws a rectangle dependent on current viewport and entitiy position. `update()` functions as a step or action to take per in the game logic, which is called from `Game.update()`.

## Sounds
Sound effects are initialized as `audio` tags in HTML and stored in `audioPlayer` object. `Game` initializes the `audioPlayer` object which queries the document for all `audio` tags. 
`Game` sets `audioPlayer`'s `currentBGM` to respective tunes while a reference to `audioPlayer` is passed to the `player` object and calls `playEffect(effect)` to trigger respective sound effects. `toggleMute()` utilizes simple state machine which togges between states. To ensure music is loaded before being played, audio is initialized as muted and not playing. Audio begins when user presses 'M' which unmutes and plays the correct background music.  



## Game Logic
The game features a movable character influenced by gravity. The player can move along the horizontal and vertical axis with functional collision detection in respective directions. Collision detection is determined by checking the object's next coordinates via the object's `positionMeeting(obj)` function, inspired from GameMaker Studio's positionmeeting function. If the entity's next position intersects with a platform or coin entitity, appropriate actions are triggered. 
The player can also fire an anchor point omni-directionally to traverse quicker. Calculating projectile velocity currently takes the mouse location and the right triangle angle formed between the player and target point. 
Currently, the swing mechanic usess a fixed rotation speed based on distance from player. 

Swing path calculations were implemented with help from: 
https://math.stackexchange.com/questions/103202/calculating-the-position-of-a-point-along-an-arc


While the logic is not perfect, it does create interesting game behaviors.

## Architecture and Technologies
The project uses the following technologies:
* Vanilla JavaScript to control game physics and logic
* `HTML5 Canvas` for DOM manipulation and game rendering
* Webpack to bundle JavaScript files 

## Future Features
* Add additional appropriate sound effects
* Add more animations
* Add different game states for better game flow

