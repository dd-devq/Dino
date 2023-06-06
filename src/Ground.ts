import { Position } from "./Position";
import { Sprite } from "./Sprite";


class Ground implements IRenderable {
    public position: Position;
    public ground: Sprite;
    public speed: number;

    constructor(position?: Position) {
        if (!position) {
            position = new Position(0, 0)
        }
        this.speed = 0.5;
        this.position = position;
        this.setRenderResource();
    }

    public setRenderResource(): void {
        let ground_img_src: string = "assets\\Environment\\ground.png";
        this.ground = new Sprite(ground_img_src);
    }

    public getRenderResource(): RenderResource[] {
        return [this.ground];
    }

    public render(canvasContext: CanvasRenderingContext2D): void {
        canvasContext.drawImage(this.ground.image, this.position.x, this.position.y);
        canvasContext.drawImage(this.ground.image, this.position.x + this.ground.image.width, this.position.y);
    }

    public update(timeScale: number, deltaTime: number): void {
        this.position.x -= timeScale * deltaTime * this.speed
        if (this.position.x < -this.ground.image.width) {
            this.position.x = 0
        }
    }
}

export { Ground };