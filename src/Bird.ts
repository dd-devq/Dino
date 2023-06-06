import { Position } from "./Position";
import { Sprite } from "./Sprite";

class Bird implements IRenderable {
    public position: Position;
    public bird: Sprite[];

    constructor(position: Position) {
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
    }

    public getRenderResource(): RenderResource[] {
        return this.bird;
    }

    render(canvasContext: CanvasRenderingContext2D): void {

    }

    public update(timeScale: number, deltaTime: number): void {

    }
}



export { Bird };