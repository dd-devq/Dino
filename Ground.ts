import { Position } from "./Position";
import { Sprite } from "./Sprite";


class Ground implements IRenderable {
    public position: Position;
    public nowRenderingSprite: Sprite;
    public speed: number;

    constructor(position?: Position) {
        if (!position) {
            position = new Position(0, 0)
        }

        this.speed = 0.25;
        this.position = position;
        this.setRenderResource();
    }

    public setRenderResource(): void {
        let ground_img_src: string = "assets\\Environment\\ground.png";
        this.nowRenderingSprite = new Sprite(ground_img_src);
    }

    public getRenderResource(): IRenderResource[] {
        return [this.nowRenderingSprite];
    }

    public render(canvasContext: CanvasRenderingContext2D): void {
        canvasContext.drawImage(this.nowRenderingSprite.image, this.position.x, this.position.y);
        canvasContext.drawImage(this.nowRenderingSprite.image, this.position.x + this.nowRenderingSprite.image.width, this.position.y);
    }

    public update(timeScale: number, deltaTime: number): void {
        this.position.x -= timeScale * deltaTime * this.speed

        if (this.speed < 2) {
            this.speed += 0.0001
        }
        else {
            this.speed = 2
        }

        if (this.position.x < -this.nowRenderingSprite.image.width) {
            this.position.x = 0
        }
    }

    public reset(): void {
        this.speed = 0.25
        this.position.x = 0
    }
}

export { Ground };