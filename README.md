# GrappleHook
## Background and Overview
GrappleHook is a 2d puzzle platforming game that incorporates physics, problem solving, and a grappling hook.

The player will traverse and solve their way through levels using a grappling hook. 

## Functionality & MVP'
In GrappleHook, users will be able to: 
- [ ] Move the player around a level by jumping
- [ ] Traverse using a grappling hook to hook onto surfaces
- [ ] Hear visual feedback dependant on specfic actions
- [ ] Interact with objects on the level 
- [ ] Puzzles for player to solve

## Wireframes
This application screen will consist of the game title, game information, social media links, the game canvas, and a mute option. 

The game canvas will display an entire level with the player sprite and an objective point. Users will use 'A' and 'S' to move the player left and right, 'space' to jump, and the mouse to aim and fire the grappling hook. 

![Wireframe](https://github.com/SackofCodetatoes/grapplehook/blob/master/wireframe.png)

## Architecture and Technologies
The project will implement the following technologies:
* Vanilla JavaScript to control game physics and logic
* `HTML5 Canvas` for DOM manipulation and game rendering
* Webpack to bundle JavaScript files 

The included scripts will be: 
* `game.js` : handles the game logic
* `display.js` : handles the rendering logic and updating canvas
* `grapplehook.js` : Webpack entry file that combines all files
* `player.js` : handles player object and player input 
* `physics.js` : handles fixed and physics object classes.
* `util.js` : handles physics calculations


## Implementation Timeline
### Over the weekend: Setup and create game skeleton
- [ ] Setup project repo and configure webpack appropriately
- [ ] Render a movable player sprite with keyboard keys
- [ ] Create a physics system that player sprite abides by

### Day 1: Create a level
- [ ] Create fixed platforms and walls to allow player traversal
- [ ] Style the sandbox level to be visually appealing

### Day 2: Game Logic
Write out game logic to allow proper physics interactions between player and fixed platforms and walls (collision)
- [ ] Player collision with floors and walls are correct

### Day 3: Create a grappling hook
- [ ] Learn how to and add mouse to aim and fire grappling hook, drawing a line between point and player
- [ ] Learn and update physics system to incorporate radial movement around fixed point for swinging

### Day 4: Build sensory aspects
Spend the day styling and adding audio to appropriate aspects
- [ ] Style the level on canvas to be visually pleasing
- [ ] Add sound effects for jumping, and grappling hook
- [ ] Add mute option
- [ ] Create html elements for additional information

## Bonuses
If time avails, additional features
- [ ] Additional Levels
- [ ] Background music
- [ ] Advanced physics

