export default class AnimatedSprite extends Phaser.GameObjects.Sprite {
  timeKeys: {
    time: number
    x: number
    y: number
    alpha?: number
    scale?: number
  }[] = []

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture)
    scene.add.existing(this)
  }
}
