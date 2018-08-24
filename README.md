# GrappleHook
[Live Demo](https://sackofcodetatoes.github.io/grapplehook/)

![GrappleHook Preview](https://github.com/SackofCodetatoes/grapplehook/blob/master/images/preview.gif)

GrappleHook is a 2d side-scrolling game that incorporates a bit of physics and a grappling hook. The game engine and mechanics were implemented using JavaScript and HTML5 Canvas. GrappleHook was built in a 5 day deadline with future revisions to come.
Assets were not made by me.

Assets Sources: 
* [City Background](https://opengameart.org/content/city-background-repetitive-3)
* [Character](https://0x72.itch.io/16x16-industrial-tileset)
 
## Features
In GrappleHook, the user can:  
* Move the player in horizontal directions and jump
* Traverse the level using a grappling hook


## Engine
The game engine and logic was built out from scratch using JavaScript and utilized HTML5 canvas to render the game entitites. The engine functions by defining game entities in the `init()` function and stores the entities into an `entities` object which the `display` iterates over to render all active entities. Additionally, game entities are derived from a base entity and additional object classes can be easily created.

```
code here
```
While functional, certain parts can be abstracted to simplify interface.

## Game Logic
The game features a movable character that is influenced by gravity. The player can move along the horizontal and vertical axis with functional collision detection in respective directions. Collision detection is determined by checking the object's next coordinates and if it contacts a `platform` entitity, the player's coordinates are incrementally shifted until contacting. 
The player can also fire an anchor point omni-directionally to traverse quicker. Calculating projectile velocity currently takes the mouse location and the right triangle angle formed between the player and target point. 
Currently, the swing mechanic takes the player's horiztonal speed and vertical speed to calculate rotation speed around the anchor point. Additionally, the player can bounce off platforms when colliding a during the `swing` state.  

While the logic is not perfect, it does create interesting game behaviors.

## Architecture and Technologies
The project uses the following technologies:
* Vanilla JavaScript to control game physics and logic
* `HTML5 Canvas` for DOM manipulation and game rendering
* Webpack to bundle JavaScript files 

## Future Features
* Add an objective to the game
* Add appropriate sound effects
* Fix known bugs
* Rework physics 
* Add different game states for better game flow

