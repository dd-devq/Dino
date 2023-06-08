import { Position } from "./Position";
import { Sprite } from "./Sprite";


class Cloud implements IRenderable {
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
        let cloud_img_src: string = "assets\\Environment\\cloud.png";
        this.nowRenderingSprite = new Sprite(cloud_img_src);
    }

    public getRenderResource(): IRenderResource[] {
        return [this.nowRenderingSprite];
    }

    public render(canvasContext: CanvasRenderingContext2D): void {
        canvasContext.drawImage(this.nowRenderingSprite.image, this.position.x, this.position.y);
        canvasContext.drawImage(this.nowRenderingSprite.image, this.position.x + 7 * this.nowRenderingSprite.image.width, this.position.y + 30);
        canvasContext.drawImage(this.nowRenderingSprite.image, this.position.x + 3 * this.nowRenderingSprite.image.width, this.position.y + 50);
    }

    public update(timeScale: number, deltaTime: number): void {
        this.position.x -= timeScale * deltaTime * this.speed
        if (this.position.x < -this.nowRenderingSprite.image.width) {
            this.position.x = 800
        }
    }

    public reset(): void {

    }

}

export { Cloud };