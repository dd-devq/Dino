import { Position } from "./Position";
import { Sprite } from "./Sprite";

class Dino implements IRenderable {
    public position: Position;
    private nowPlayingAnimation: string;
    private animations: Map<string, Sprite[]>;

    constructor(position: Position = new Position(0, 0)) {
        this.position = position;
        this.animations = new Map<string, Sprite[]>();
        this.setRenderResource();
    }

    public setRenderResource(): void {
        // Idle
        let idle_frame_src: string = "assets\\Dinosaur\\dinosaurIdle.png";
        let idleKeyFrame: Sprite = new Sprite(idle_frame_src);
        let idleAnimation: Sprite[] = [idleKeyFrame];

        this.animations.set('Idle', idleAnimation)

        // Dead
        let dead_frame_src: string = "assets\\Dinosaur\\dinosaurDead.png";
        let deadKeyFrame: Sprite = new Sprite(dead_frame_src);
        let deadAnimation: Sprite[] = [deadKeyFrame];

        this.animations.set('Dead', deadAnimation)

        // Jump
        let jump_frame_src: string = "assets\\Dinosaur\\dinosaurJump.png";
        let jumpKeyFrame: Sprite = new Sprite(jump_frame_src);
        let jumpAnimation: Sprite[] = [jumpKeyFrame];

        this.animations.set('Jump', jumpAnimation)

        // Run
        let run_frame_1_src: string = "assets\\Dinosaur\\dinosaurRunFrame1.png";
        let runKeyFrame1: Sprite = new Sprite(run_frame_1_src);

        let run_frame_2_src: string = "assets\\Dinosaur\\dinosaurRunFrame2.png";
        let runKeyFrame2: Sprite = new Sprite(run_frame_2_src);

        let runAnimation: Sprite[] = [runKeyFrame1, runKeyFrame2];

        this.animations.set('Run', runAnimation)

        // Crouch
        let crouch_frame_1_src: string = "assets\\Dinosaur\\dinosaurCrouchFrame1.png";
        let crouchKeyFrame1: Sprite = new Sprite(crouch_frame_1_src);

        let crouch_frame_2_src: string = "assets\\Dinosaur\\dinosaurCrouchFrame2.png";
        let crouchKeyFrame2: Sprite = new Sprite(crouch_frame_2_src);

        let crouchAnimation: Sprite[] = [crouchKeyFrame1, crouchKeyFrame2];

        this.animations.set('Crouch', crouchAnimation)


        this.nowPlayingAnimation = 'Idle'
    }


    public getRenderResource(): RenderResource[] {
        console.log(this.nowPlayingAnimation)
        return this.animations.get(this.nowPlayingAnimation)!;
    }

    render(canvasContext: CanvasRenderingContext2D): void {

    }

    public update(timeScale: number, deltaTime: number): void {

    }
}

export { Dino };