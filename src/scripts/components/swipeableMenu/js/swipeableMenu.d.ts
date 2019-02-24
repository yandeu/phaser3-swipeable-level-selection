export interface SwipeableMenuConfigPublic {
    /** The x of the Menu Container */
    x: number;
    /** The y of the Menu Container */
    y: number;
    /** The number of rows per page */
    rows: number;
    /** The number of columns per page */
    columns: number;
    /** Define the gab object {x, y} */
    gap: {
        /** The gap on the X axis */
        x: number;
        /** The gap on the Y axis */
        y: number;
    };
    /** Define the number of levels you have */
    levels: number;
    /** Define the titles of the worlds */
    worldTitles: string[];
    /** Define the button object {width, height} */
    button: {
        /** The button's width */
        width: number;
        /** The button's height */
        height: number;
    };
}
export interface SwipeableMenuConfigPrivate extends SwipeableMenuConfigPublic {
    width: number;
    height: number;
    pages: number;
}
export declare type SwipeableMenuConfig = Partial<SwipeableMenuConfigPublic> & {};
export default class SwipeableMenu {
    private scene;
    private container;
    readonly getPagesX: {
        [name: string]: number;
    };
    static readonly defaultConfig: SwipeableMenuConfigPrivate;
    config: SwipeableMenuConfigPrivate;
    worldTitle: Phaser.GameObjects.Text;
    dots: Phaser.GameObjects.Sprite[];
    /** this will listen to the "onMenuScroll" event */
    getScrollEvent(cb: Function): Phaser.Events.EventEmitter;
    setDepth(depth: number): void;
    private init;
    constructor(scene: Phaser.Scene, _config?: SwipeableMenuConfig);
}
