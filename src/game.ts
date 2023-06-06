import { Dino } from "./Dino";
import { Ground } from "./Ground";
import { Canvas } from "./Canvas";
import { Position } from "./Position";
import { Bird } from "./Bird";

enum GAME_STATE {
    READY = 0,
    PLAYING = 1,
    PAUSE = 2,
    ENDGAME = 3,
}

requestAnimationFrame(gameLoop)

class GameCore {
    private highScore: number;
    public canvas: Canvas;
    public GAME_STATE: GAME_STATE;
    public dino: Dino;
    public bird: Bird
    public ground: Ground;
    public renderables: IRenderable[];

    constructor() {
        this.highScore = 0;
        this.canvas = new Canvas(800, 200);
        this.renderables = []
        this.dino = new Dino(new Position(10, 145));
        this.bird = new Bird(new Position(300, 100));
        this.ground = new Ground(new Position(0, 180));
        this.renderables.push(this.dino)
        this.renderables.push(this.bird)
        this.renderables.push(this.ground)
        this.GAME_STATE = GAME_STATE.READY;
    }

    public updateHighScore(newHighScore: number): void {
        if (newHighScore > this.highScore) {
            this.highScore = newHighScore;
        }
    }

    public update(timeScale: number, deltaTime: number): void {
        for (const renderable of this.renderables) {
            renderable.update(timeScale, deltaTime)
        }
    }

    public render(): void {
        this.canvas.clear();
        this.canvas.draw();

        let canvasContext = this.canvas.canvasContext;
        for (const renderable of this.renderables) {
            renderable.render(canvasContext)
        }
    }


}



function processInput() {
    console.log("Process Input")

}

function update(timeScale: number, deltaTime: number) {
    gameCore.update(timeScale, deltaTime)
}

function render() {
    gameCore.render();
}

let gameCore = new GameCore()



let previousTime = performance.now()
let timeScale = 0.75

function gameLoop(): void {
    let currentTime = performance.now()
    let deltaTime = currentTime - previousTime
    previousTime = currentTime

    processInput();

    update(timeScale, deltaTime);

    render();

    requestAnimationFrame(gameLoop);
}

