import { SwipeableMenuConfigPrivate } from './swipeableMenu'
import MenuContainer from './menuContainer'

export default class MenuButtons {
  constructor(scene: Phaser.Scene, config: SwipeableMenuConfigPrivate, container: MenuContainer) {
    const { pages: p, button, gap, levels, rows: r, columns: c } = config

    let level = 0

    for (let pages = 0; pages < p; pages++) {
      for (let rows = 0; rows < r; rows++) {
        for (let columns = 0; columns < c; columns++) {
          if (level >= levels) return

          let page = Math.floor(level / (config.rows * config.columns)) | 0

          let btn = new MenuButton(
            scene,
            columns * (button.width + gap.x) + page * scene.cameras.main.width,
            rows * (button.height + gap.y),
            level
          )

          container.add(btn)
          container.add(btn.btnText)

          level++
        }
      }
    }
  }
}

export class MenuButtonText extends Phaser.GameObjects.Text {
  public type = 'Text'
  constructor(scene: Phaser.Scene, x: number, y: number, text: string, style = {}) {
    super(scene, x, y, text, style)
    scene.add.existing(this)
    this.setOrigin(0.5)
  }
}

export class MenuButton extends Phaser.GameObjects.Sprite {
  public type = 'Sprite'
  public level: number
  public btnText: MenuButtonText
  private _isTweening = false

  constructor(scene: Phaser.Scene, x: number, y: number, level: number) {
    super(scene, x, y, 'btn')
    scene.add.existing(this)
    this.setOrigin(0)
    this.level = level

    this.btnText = new MenuButtonText(scene, this.x + this.width / 2, this.y + this.height / 2 - 8, `${level + 1}`, {
      fontSize: '80px',
      fontFamily: 'customFont'
    })

    this.initialAnimation()
  }

  initialAnimation() {
    let tween = {
      scaleX: 1.2,
      scaleY: 1.2,
      duration: 300,
      yoyo: true,
      repeat: 1,
      ease: 'Quadratic'
    }

    // tween the button
    this.scene.tweens.add({
      ...tween,
      targets: this,
      x: `-=${this.width * 0.1}`,
      y: `-=${this.height * 0.1}`,
      onStart: () => (this._isTweening = true),
      onComplete: () => (this._isTweening = false)
    })

    // tween the button text
    this.scene.tweens.add({ ...tween, targets: this.btnText })
  }

  startLevel() {
    if (this._isTweening) return

    let tween = {
      scaleX: 1.2,
      scaleY: 1.2,
      duration: 100,
      yoyo: true
    }

    // tween the button
    this.scene.tweens.add({
      ...tween,
      targets: this,
      x: `-=${this.width * 0.1}`,
      y: `-=${this.height * 0.1}`,
      onStart: () => (this._isTweening = true),
      onComplete: () => (this._isTweening = false)
    })

    // tween the button text
    this.scene.tweens.add({ ...tween, targets: this.btnText })

    console.log(`start level: ${this.level + 1}`)
  }
}
