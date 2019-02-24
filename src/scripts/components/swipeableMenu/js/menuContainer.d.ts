import { SwipeableMenuConfigPrivate } from './swipeableMenu';
export default class MenuContainer extends Phaser.GameObjects.Container {
    private _dragX;
    private _dragWorldX;
    private _delta;
    private _activePage;
    private _x;
    private _y;
    private _time;
    private _pages;
    private _pointerIsDown;
    alphaThreshold: number;
    deltaThreshold: number;
    maxAlpha: number;
    swipeDuration: number;
    onMenuScrollEvent: boolean;
    pagesX(): {
        [name: string]: number;
    };
    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, config: SwipeableMenuConfigPrivate);
    private releasePointer;
    private collision;
    private click;
    private swipe;
}
