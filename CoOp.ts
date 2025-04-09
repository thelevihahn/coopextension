
/**
* Use this file to define custom functions and blocks.
* Read more at https://arcade.makecode.com/blocks/custom
*/

namespace scene {
    /**
     * Centers the camera between all player sprites.
     */
    //% block
    //% group="Camera"
    //% weight=75
    export function CenterCoOpCamera(): void {
        // Setup Temp Variables
        let x = 0
        let y = 0
        let pSprites = sprites.allOfKind(SpriteKind.Player)
        let playerCount = pSprites.length

        // Do math for number of players
        for (let playerSprite of pSprites) {
            if (playerSprite) {
                x += playerSprite.x
                y += playerSprite.y
            }
        }

        //UpdateCamera
        scene.centerCameraAt(x / playerCount, y / playerCount)
    }
}