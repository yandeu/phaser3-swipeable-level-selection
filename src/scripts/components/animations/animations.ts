import SwipeableMenu from '../swipeableMenu/ts/swipeableMenu'
import AnimatedSprite from './animatedSprite'

export default class Animations {
  group: AnimatedSprite[] = []

  constructor(scene: Phaser.Scene, menu: SwipeableMenu) {
    // listen to the "onMenuScroll" event
    menu.getScrollEvent((x: number) => {
      // will calculate the timeKey for each x and y position
      // and adds alpha and scale to the sprite if needed
      this.group.forEach(obj => {
        for (let t = 0; t < obj.timeKeys.length - 1; t++) {
          const t0 = obj.timeKeys[t]
          const t1 = obj.timeKeys[t + 1]

          if (t0.time < x && t1.time > x) {
            let timeDiff = t1.time - t0.time
            let xDiff = t1.x - t0.x
            let yDiff = t1.y - t0.y

            let posX = (xDiff / timeDiff) * (x - t0.time)
            let posY = (yDiff / timeDiff) * (x - t0.time)

            if (t1.alpha !== undefined && t0.alpha !== undefined) {
              let aDiff = t1.alpha - t0.alpha
              let alpha = (aDiff / timeDiff) * (x - t0.time)
              obj.alpha = t0.alpha + alpha
            }

            if (t1.scale !== undefined && t0.scale !== undefined) {
              let aDiff = t1.scale - t0.scale
              let scale = (aDiff / timeDiff) * (x - t0.time)
              obj.setScale(t0.scale + scale)
            }

            obj.x = t0.x + posX
            obj.y = t0.y + posY
          }
        }
      })
    })
  }

  /** Will add a new Sprite to the animation class */
  add(scene: Phaser.Scene, x: number, y: number, texture: string) {
    const newAnimatedSprite = new AnimatedSprite(scene, x, y, texture)
    this.group.push(newAnimatedSprite)
    return newAnimatedSprite
  }
}
