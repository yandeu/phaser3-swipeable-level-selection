import { SwipeableMenuConfigPrivate } from './swipeableMenu';
import MenuContainer from './menuContainer';
export default class MenuButtons {
    constructor(scene: Phaser.Scene, config: SwipeableMenuConfigPrivate, container: MenuContainer);
}
export declare class MenuButtonText extends Phaser.GameObjects.Text {
    type: string;
    constructor(scene: Phaser.Scene, x: number, y: number, text: string, style?: {});
}
export declare class MenuButton extends Phaser.GameObjects.Sprite {
    type: string;
    level: number;
    btnText: MenuButtonText;
    private _isTweening;
    constructor(scene: Phaser.Scene, x: number, y: number, level: number);
    initialAnimation(): void;
    startLevel(): void;
}
