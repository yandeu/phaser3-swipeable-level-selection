export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    let assets = [
      'btn',
      'dot-active',
      'dot-inactive',
      'grass',
      'deep-grass',
      'tree-right',
      'tree-left',
      'tree-left2',
      'factory',
      'dark-overlay',
      'night',
      'moon'
    ]

    assets.forEach(key => {
      this.load.image(key, `assets/img/${key}.png`)
    })
  }

  create() {
    this.scene.start('MainScene')
  }
}
