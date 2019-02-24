export default class MenuContainer extends Phaser.GameObjects.Container {
    constructor(scene, x, y, width, height, config) {
        super(scene, x, y);
        this._delta = 0;
        this._activePage = 0;
        this._pointerIsDown = false;
        this.alphaThreshold = 250;
        this.deltaThreshold = 120;
        this.maxAlpha = 0.35;
        this.swipeDuration = 300;
        this.onMenuScrollEvent = false;
        const { pages } = config;
        this._x = x;
        this._y = y;
        this._pages = pages;
        scene.add.existing(this);
        this.setSize(width, height)
            .setInteractive()
            // on drag
            .on('drag', (pointer) => {
            this._delta = pointer.x - this._dragWorldX;
            // this is only used if the user is on the first or last page
            let dragWidth = this._delta;
            let dragDelay = 0.65;
            // if the user wants to swipe to the left but is on the fist page
            if (this._activePage === 0 && this._delta > 0) {
                this.setX(pointer.x - this._dragX + width / 2 - this._delta * dragDelay);
                dragWidth *= 1 - dragDelay;
            }
            // if the user wants to swipe to the right but is on the last page
            else if (this._activePage === this._pages - 1 && this._delta < 0) {
                this.setX(pointer.x - this._dragX + width / 2 - this._delta * dragDelay);
                dragWidth *= 1 - dragDelay;
            }
            // Normal swipe behavior
            else
                this.setX(pointer.x - this._dragX + width / 2);
            this.alpha =
                Math.abs(dragWidth) > this.alphaThreshold * (1 - this.maxAlpha)
                    ? this.maxAlpha
                    : (this.alphaThreshold - Math.abs(dragWidth)) / this.alphaThreshold;
            if (this.onMenuScrollEvent)
                this.scene.events.emit('onMenuScroll', this.x);
        })
            // on pointerdown
            .on('pointerdown', (pointer, x, y) => {
            this._time = pointer.time;
            this._dragX = x;
            this._dragWorldX = pointer.worldX;
            this._pointerIsDown = true;
        })
            // on pointerout
            .on('pointerout', (pointer, x, y) => {
            this.releasePointer(pointer);
        })
            // on pointerup
            .on('pointerup', (pointer, x, y) => {
            this.releasePointer(pointer);
        });
        this.input.hitArea.x += width / 2;
        this.input.hitArea.y += height / 2;
        scene.input.setDraggable(this, true);
    }
    pagesX() {
        let obj = {};
        for (let i = 0; i < this._pages; i++) {
            obj = Object.assign({}, obj, { [`PAGE${i + 1}`]: -(this._x - this.scene.cameras.main.width * i) });
        }
        return obj;
    }
    releasePointer(pointer) {
        if (!this._pointerIsDown)
            return;
        this._pointerIsDown = false;
        if (pointer.time - this._time < 1000 && Math.abs(this._delta) < 20)
            this.click(pointer.worldX, pointer.worldY);
        else if (this._delta !== 0)
            this.swipe();
    }
    collision(rect1, rect2) {
        return (rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.height + rect1.y > rect2.y);
    }
    click(x, y) {
        console.log('click');
        this.each((child) => {
            if (child.type !== 'Sprite')
                return;
            if (this.collision({
                x: child.x + this._x,
                y: child.y + this._y,
                width: child.width,
                height: child.height
            }, {
                x: x + this.scene.cameras.main.width * this._activePage,
                y,
                width: 10,
                height: 10
            }))
                child.startLevel();
        });
    }
    swipe() {
        console.log('swipe');
        if (Math.abs(this._delta) > this.deltaThreshold)
            this._activePage =
                this._delta > 0 ? this._activePage - 1 : this._activePage + 1;
        if (this._activePage < 0)
            this._activePage = 0;
        if (this._activePage > this._pages - 1)
            this._activePage = this._pages - 1;
        this.scene.tweens.add({
            targets: this,
            x: this._x - this.scene.cameras.main.width * this._activePage,
            duration: this.swipeDuration,
            onUpdate: () => {
                if (this.onMenuScrollEvent)
                    this.scene.events.emit('onMenuScroll', this.x);
            },
            onComplete: () => this.setAlpha(1)
        });
        this._delta = 0;
        this.scene.events.emit('changeActivePage', this._activePage);
    }
}
