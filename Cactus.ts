import { Position } from "./Position";
import { Sprite } from "./Sprite";

class Cactus implements IRenderable {
    public position: Position;
    public nowRenderingSprite: Sprite;
    private speed: number;
    private DEFAULT_GROUND: number;
    private cacheCactus: Map<number, Sprite>;
    private cacheSmallCactus: Map<number, Sprite>;


    constructor(position?: Position) {
        if (!position) {
            position = new Position(0, 0)
        }

        this.cacheCactus = new Map<number, Sprite>();
        this.cacheSmallCactus = new Map<number, Sprite>();

        this.speed = 0.25;
        this.position = position;
        this.DEFAULT_GROUND = 145;

        this.cacheRenderResource();
        this.setRenderResource();
    }

    public cacheRenderResource(): void {
        this.cacheCactus.set(1, new Sprite("assets\\Environment\\cactus1.png"))
        this.cacheCactus.set(2, new Sprite("assets\\Environment\\cactus2.png"))
        this.cacheCactus.set(3, new Sprite("assets\\Environment\\cactus3.png"))
        this.cacheCactus.set(4, new Sprite("assets\\Environment\\cactus4.png"))
        this.cacheCactus.set(5, new Sprite("assets\\Environment\\cactus5.png"))
        this.cacheCactus.set(6, new Sprite("assets\\Environment\\cactus6.png"))

        this.cacheSmallCactus.set(1, new Sprite("assets\\Environment\\smallCactus1.png"))
        this.cacheSmallCactus.set(2, new Sprite("assets\\Environment\\smallCactus2.png"))
        this.cacheSmallCactus.set(3, new Sprite("assets\\Environment\\smallCactus3.png"))
        this.cacheSmallCactus.set(4, new Sprite("assets\\Environment\\smallCactus4.png"))
        this.cacheSmallCactus.set(5, new Sprite("assets\\Environment\\smallCactus5.png"))
        this.cacheSmallCactus.set(6, new Sprite("assets\\Environment\\smallCactus6.png"))
    }

    public setRenderResource(): void {
        this.position.y = this.DEFAULT_GROUND;

        let index: number = Math.floor(Math.random() * 5) + 1;
        let isSmall: number = Math.floor(Math.random() * 2);

        if (isSmall == 0) {
            this.nowRenderingSprite = this.cacheCactus.get(index)!
        }
        else {
            this.nowRenderingSprite = this.cacheSmallCactus.get(index)!
            this.position.y += 15;
        }

    }

    public getRenderResource(): IRenderResource[] {
        return [this.nowRenderingSprite];
    }

    public render(canvasContext: CanvasRenderingContext2D): void {
        canvasContext.drawImage(this.nowRenderingSprite.image, this.position.x, this.position.y);
    }

    public update(timeScale: number, deltaTime: number): void {
        this.position.x -= timeScale * deltaTime * this.speed
        if (this.speed < 2) {
            this.speed += 0.0001
        }
        else {
            this.speed = 2;
        }
        if (this.position.x < -this.nowRenderingSprite.image.width) {
            this.position.x = 800;
            this.setRenderResource();
        }
    }

    public reset(): void {
        this.speed = 0.25
        this.position.x = 800;
        this.setRenderResource();
    }

}

export { Cactus };