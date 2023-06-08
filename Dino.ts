import { Position } from "./Position";
import { Sprite, checkCollision } from "./Sprite";

enum DINO_STATE {
    IDLE = 0,
    RUNNING = 1,
    JUMPING = 2,
    FALLING = 3,
    CROUCHING = 4,
    DEAD = 5
}

class Dino implements IRenderable {
    public position: Position;
    private nowPlayingAnimation: string;
    private animations: Map<string, Sprite[]>;
    public nowRenderingSprite: Sprite;
    private animationStep: number = 60;
    private frameIndex: number;
    private speed: number = 1.15;
    private dinoState: DINO_STATE;
    private maxJumpHeight = 20;

    constructor(position: Position = new Position(0, 0)) {
        this.frameIndex = 0;
        this.dinoState = DINO_STATE.IDLE
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
        this.nowRenderingSprite = idleKeyFrame
    }


    public getRenderResource(): IRenderResource[] {
        return this.animations.get(this.nowPlayingAnimation)!;
    }

    public render(canvasContext: CanvasRenderingContext2D): void {
        canvasContext.drawImage(this.nowRenderingSprite.image, this.position.x, this.position.y)
    }

    public update(timeScale: number, deltaTime: number): void {
        let renderResources: IRenderResource[] = this.getRenderResource()
        this.frameIndex += 1
        let tempIndex = Math.floor(this.frameIndex / this.animationStep) % (this.animationStep * renderResources.length);
        if (renderResources[tempIndex % renderResources.length].image != this.nowRenderingSprite.image) {
            this.nowRenderingSprite = renderResources[tempIndex % renderResources.length]
        }

        switch (this.dinoState) {
            case DINO_STATE.JUMPING: {
                this.position.y -= timeScale * deltaTime * this.speed * 1.5

                if (this.position.y <= this.maxJumpHeight) {
                    this.dinoState = DINO_STATE.FALLING
                }
            }
            case DINO_STATE.FALLING: {
                this.position.y += timeScale * deltaTime * this.speed * 0.75

                if (this.position.y >= 145) {
                    this.position.y = 145
                    this.dinoState = DINO_STATE.RUNNING
                    this.setAnimation("Run")
                }
            }
        }
    }

    public setAnimation(animation: string): void {
        if (animation == "Crouch") {
            this.position.y = 145
            this.position.y += 20;
            this.dinoState = DINO_STATE.CROUCHING
            this.nowPlayingAnimation = animation;
        }

        if (animation == "Jump" && this.dinoState != DINO_STATE.CROUCHING && this.dinoState != DINO_STATE.FALLING) {
            this.dinoState = DINO_STATE.JUMPING
            this.nowPlayingAnimation = animation;
        }

        if (animation == "Run") {
            this.position.y = 145
            this.dinoState = DINO_STATE.RUNNING
            this.nowPlayingAnimation = animation;
        }

        if (animation == "Dead") {
            this.dinoState = DINO_STATE.DEAD
            this.nowPlayingAnimation = animation;
        }

        if (animation == "Idle") {
            this.nowPlayingAnimation = animation;
            this.nowRenderingSprite = this.getRenderResource()[0]
        }
    }

    public reset(): void {
        this.dinoState = DINO_STATE.IDLE
        this.frameIndex = 0;
        this.setAnimation("Idle")
        this.position.x = 10
        this.position.y = 145
    }

}

export { Dino };