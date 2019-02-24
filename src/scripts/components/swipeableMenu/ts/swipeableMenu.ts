import MenuContainer from './menuContainer'
import MenuButtons from './menuButtons'
// import { SwipeableMenuConfig, SwipeableMenuConfigPrivate } from './swipeableMenuTypes'

export interface SwipeableMenuConfigPublic {
  /** The x of the Menu Container */
  x: number
  /** The y of the Menu Container */
  y: number
  /** The number of rows per page */
  rows: number
  /** The number of columns per page */
  columns: number
  /** Define the gab object {x, y} */
  gap: {
    /** The gap on the X axis */
    x: number
    /** The gap on the Y axis */
    y: number
  }
  /** Define the number of levels you have */
  levels: number
  /** Define the titles of the worlds */
  worldTitles: string[]
  /** Define the button object {width, height} */
  button: {
    /** The button's width */
    width: number
    /** The button's height */
    height: number
  }
}
export interface SwipeableMenuConfigPrivate extends SwipeableMenuConfigPublic {
  width: number
  height: number
  pages: number
}
export type SwipeableMenuConfig = Partial<SwipeableMenuConfigPublic> & {}

export default class SwipeableMenu {
  private container: MenuContainer

  get getPagesX() {
    return this.container.pagesX()
  }

  public static get defaultConfig(): SwipeableMenuConfigPrivate {
    return {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      pages: 0,
      rows: 3,
      columns: 5,
      gap: {
        x: 120,
        y: 60
      },
      levels: 60,
      worldTitles: [
        'GREEN HILLS',
        'DEEP FOREST',
        'BOX FACTORY',
        'BATTLE FOR THE MOON'
      ],
      button: {
        width: 100,
        height: 100
      }
    }
  }

  config: SwipeableMenuConfigPrivate
  worldTitle: Phaser.GameObjects.Text
  dots: Phaser.GameObjects.Sprite[] = []

  /** this will listen to the "onMenuScroll" event */
  public getScrollEvent(cb: Function) {
    this.container.onMenuScrollEvent = true
    return this.scene.events.on('onMenuScroll', (x: number) => {
      cb(-x)
    })
  }

  public setDepth(depth: number) {
    this.container.setDepth(depth)
    this.worldTitle.setDepth(depth)
    this.dots.forEach(dot => {
      dot.setDepth(depth)
    })
  }

  private init() {
    const scene = this.scene
    this.container = new MenuContainer(
      scene,
      this.config.x,
      this.config.y,
      this.config.width + (this.config.pages - 1) * scene.cameras.main.width,
      this.config.height,
      this.config
    )

    new MenuButtons(scene, this.config, this.container)

    this.worldTitle = scene.add
      .text(
        scene.cameras.main.width / 2,
        this.config.y - 50,
        `1. ${this.config.worldTitles[0]}`,
        {
          fontFamily: 'customFont',
          fontSize: '64px',
          color: '#fff',
          stroke: '#cc4943ff',
          strokeThickness: 8
        }
      )
      .setOrigin(0.5, 1)

    for (let page = 0; page < this.config.pages; page++) {
      let dot = scene.add
        .sprite(
          scene.cameras.main.width / 2 +
            50 / 2 +
            50 * page -
            (50 * this.config.pages) / 2,
          this.config.y + this.config.height + 50,
          page === 0 ? 'dot-active' : 'dot-inactive'
        )
        .setOrigin(0.5)
      this.dots.push(dot)
    }

    scene.events.on('changeActivePage', activePage => {
      scene.time.addEvent({
        delay: this.container.swipeDuration / 2,
        callback: () => {
          try {
            this.dots.forEach(dot => {
              dot.setTexture('dot-inactive')
            })
            this.dots[activePage].setTexture('dot-active')

            let newText = `${activePage + 1}. ${
              this.config.worldTitles[activePage]
            }`
            this.worldTitle.setText(newText)
          } catch (error) {
            console.error(error.message)
          }
        }
      })
    })
  }
  constructor(private scene: Phaser.Scene, _config: SwipeableMenuConfig = {}) {
    this.config = { ...SwipeableMenu.defaultConfig, ..._config }
    this.config.width =
      this.config.gap.x * (this.config.columns - 1) +
      this.config.button.width * this.config.columns
    this.config.height =
      this.config.gap.y * (this.config.rows - 1) +
      this.config.button.height * this.config.rows
    this.config.x =
      this.config.x === 0
        ? scene.cameras.main.width / 2 - this.config.width / 2
        : this.config.x
    this.config.y =
      this.config.y === 0
        ? scene.cameras.main.height / 2 - this.config.height / 2
        : this.config.y
    this.config.pages = Math.ceil(
      this.config.levels / (this.config.rows * this.config.columns)
    )

    this.init()
  }
}
