
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
    
    const exitCamHandlers: {kind: number, handler: (sprite: Sprite) => void}[]=[]
    const watchedSprites: {kind: number, sprite: Sprite}[]=[]

    // Register a handler that will be called when a sprite exits the screen
    export function onExitCamera(kind: number, handler: (sprite: Sprite) => void){
        exitCamHandlers.push({kind,handler})
    }

    // Watch an array of sprites of a specific kind for when they exit the camera view
    export function watchSprites(kind: number, sprites: Sprite[]){
        for(const sprite of sprites){
            if (watchedSprites.find(s => s.sprite === sprite) === undefined){
                watchedSprites.push({ kind, sprite })
            }
        }
    }

    // Check if a sprite is offscreen (ouside the camera view)
    function isOffscreen(sprite: Sprite): boolean {
        return (
            sprite.right < scene.cameraProperty(CameraProperty.Left) ||
            sprite.left > scene.cameraProperty(CameraProperty.Right) ||
            sprite.bottom < scene.cameraProperty(CameraProperty.Top) ||
            sprite.top > scene.cameraProperty(CameraProperty.Bottom)
        )
    }

    control.runInParallel(() => {
        while(true) {
            for (const watched of watchedSprites) {
                if (isOffscreen(watched.sprite)) {
                    // Only tirgger handlers for sprites that match the specified allOfKind
                    for (const camHandler of exitCamHandlers){
                        if (camHandler.kind === watched.kind){
                            camHandler.handler(watched.sprite)
                        }
                    }
                }
            }
        }
    })
}
