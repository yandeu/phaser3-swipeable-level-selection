import SwipeableMenu from '../components/swipeableMenu/ts/swipeableMenu'
import Animations from '../components/animations/animations'

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    // create the menu
    // the second parameter is (config) is optional
    const menu = new SwipeableMenu(this)
    menu.setDepth(1)

    // you can get the default configs like so:
    console.log(SwipeableMenu.defaultConfig)

    // instantiate the Animations class
    const animations = new Animations(this, menu)

    // getting x position of the pages
    const { PAGE1, PAGE2, PAGE3, PAGE4 } = menu.getPagesX

    // camHeight and camWidth
    const { height: camHeight, width: camWidth } = this.cameras.main

    /**
     * The code below will crate the animated sprite with its timeKeys
     */

    let grass = animations.add(this, 0, camHeight, 'grass')
    grass.setOrigin(0, 1)

    let deepGrass = animations.add(this, 0, 0, 'deep-grass')
    deepGrass.setOrigin(0, 1)
    deepGrass.timeKeys = [
      { time: PAGE1, x: 0, y: camHeight + deepGrass.height },
      { time: PAGE2, x: 0, y: camHeight }
    ]
    deepGrass.setY(deepGrass.timeKeys[0].y)

    let treeLeft = animations.add(this, 0, 0, 'tree-left')
    treeLeft.setOrigin(1, 0)
    treeLeft.timeKeys = [
      { time: PAGE1, x: 0, y: -20 },
      { time: PAGE2, x: 150, y: -20 },
      { time: PAGE3, x: 50, y: -20 }
    ]
    treeLeft.setX(treeLeft.timeKeys[0].x)

    let treeRight = animations.add(this, 0, 0, 'tree-right')
    treeRight.setOrigin(0, 0)
    treeRight.timeKeys = [
      { time: PAGE1, x: camWidth, y: -20 },
      { time: PAGE2, x: camWidth - 150, y: -20 },
      { time: PAGE3, x: camWidth - 50, y: -20 }
    ]
    treeRight.setX(treeRight.timeKeys[0].x)

    let darkOverlay = animations.add(this, 0, 0, 'dark-overlay')
    darkOverlay.setOrigin(0, 0)
    darkOverlay.timeKeys = [
      { time: PAGE2, x: 0, y: 0, alpha: 0 },
      { time: PAGE3, x: 0, y: 0, alpha: 0.4 },
      { time: PAGE4, x: 0, y: 0, alpha: 0 }
    ]
    darkOverlay.setY(darkOverlay.timeKeys[0].y)
    darkOverlay.setX(darkOverlay.timeKeys[0].x)
    darkOverlay.setAlpha(darkOverlay.timeKeys[0].alpha)

    let factory = animations.add(this, 0, 0, 'factory')
    factory.setOrigin(0, 0)
    factory.timeKeys = [
      { time: PAGE2, x: 0, y: camHeight + 50 },
      { time: PAGE3, x: 0, y: camHeight - factory.height }
    ]
    factory.setY(factory.timeKeys[0].y)

    let night = animations.add(this, 0, 0, 'night')
    night.setOrigin(0, 0)
    night.timeKeys = [
      { time: PAGE3, x: 0, y: 0, alpha: 0 },
      { time: PAGE4, x: 0, y: 0, alpha: 1 }
    ]
    night.setY(night.timeKeys[0].y)
    night.setX(night.timeKeys[0].x)
    night.setAlpha(night.timeKeys[0].alpha)

    let moon = animations.add(this, 0, 0, 'moon')
    moon.setOrigin(0.5)
    moon.timeKeys = [
      { time: PAGE3, x: camWidth / 2, y: camHeight / 2, alpha: 0, scale: 0.25 },
      { time: PAGE4, x: camWidth / 2, y: camHeight / 2, alpha: 1, scale: 1 }
    ]
    moon.setY(moon.timeKeys[0].y)
    moon.setX(moon.timeKeys[0].x)
    moon.setAlpha(moon.timeKeys[0].alpha)
  }
}
