import { Position } from "./Position";
import { Sprite } from "./Sprite";

class Bird implements IRenderable {
    public position: Position;
    private bird: Sprite[];
    public nowRenderingSprite: Sprite;
    private animationStep: number = 60;
    private frameIndex: number;
    private speed: number = 0.25;


    constructor(position: Position) {
        this.frameIndex = 0;
        this.position = position;
        this.bird = []
        this.setRenderResource();
    }

    public setRenderResource(): void {
        let fly_frame_1_src: string = "assets\\NPC\\bird1.png";
        let flyKeyFrame1: Sprite = new Sprite(fly_frame_1_src);

        let fly_frame_2_src: string = "assets\\NPC\\bird2.png";
        let flyKeyFrame2: Sprite = new Sprite(fly_frame_2_src);

        this.bird.push(flyKeyFrame1)
        this.bird.push(flyKeyFrame2)

        this.nowRenderingSprite = flyKeyFrame1
    }

    public getRenderResource(): IRenderResource[] {
        return this.bird;
    }

    public render(canvasContext: CanvasRenderingContext2D): void {
        canvasContext.drawImage(this.nowRenderingSprite.image, this.position.x, this.position.y)
    }

    public update(timeScale: number, deltaTime: number): void {
        if (timeScale != 0) {

            let renderResources: IRenderResource[] = this.getRenderResource()
            this.frameIndex += 1
            let tempIndex = Math.floor(this.frameIndex / this.animationStep) % (this.animationStep * renderResources.length);

            if (renderResources[tempIndex % renderResources.length].image != this.nowRenderingSprite.image) {
                this.nowRenderingSprite = renderResources[tempIndex % renderResources.length]
            }
            this.position.x -= timeScale * deltaTime * this.speed
            if (this.speed < 2) {
                this.speed += 0.00015
            }
            else {
                this.speed = 2
            }

            if (this.position.x < -100) {
                this.position.x = 800;
                this.position.y = getRandomNumberInRange(70, 125)
            }
        }
    }

    public reset(): void {
        this.speed = 0.25
        this.position.x = 1200;
        this.position.y = getRandomNumberInRange(70, 125)
    }
}

function getRandomNumberInRange(min: number, max: number): number {
    // Generate a random decimal number between 0 and 1
    const randomDecimal = Math.random();

    // Scale the random decimal to the desired range
    const randomInRange = randomDecimal * (max - min) + min;

    // Round the number to an integer (optional)
    const randomInteger = Math.floor(randomInRange);

    return randomInteger;
}

export { Bird };