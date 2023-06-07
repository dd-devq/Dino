import { Dino } from "./Dino";
import { Ground } from "./Ground";
import { Canvas } from "./Canvas";
import { Position } from "./Position";
import { Bird } from "./Bird";
import { Cactus } from "./Cactus";
import { Cloud } from "./Cloud";
import { UIElements } from "./UIElements";
import { Sprite, checkCollision } from "./Sprite";
import { check } from "prettier";
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
    public cactus: Cactus;
    public bird: Bird
    public ground: Ground;
    public cloud: Cloud;
    public uiElements: UIElements;
    public renderables: IRenderable[];
    constructor() {
        this.highScore = 0;
        this.canvas = new Canvas(800, 200);
        this.renderables = []
        this.dino = new Dino(new Position(10, 145));
        this.bird = new Bird(new Position(300, 125));
        this.ground = new Ground(new Position(0, 180));
        this.cactus = new Cactus(new Position(800, 145));
        this.cloud = new Cloud(new Position(800, 100));
        this.uiElements = new UIElements(new Position(550, 20));
        this.renderables.push(this.dino)
        this.renderables.push(this.bird)
        this.renderables.push(this.ground)
        this.renderables.push(this.cloud)
        this.renderables.push(this.cactus)
        this.renderables.push(this.uiElements)
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
        if (checkCollision(this.dino.nowRenderingSprite, this.dino.position, this.cactus.nowRenderingSprite, this.cactus.position) ||
            checkCollision(this.dino.nowRenderingSprite, this.dino.position, this.bird.nowRenderingSprite, this.bird.position)) {
            this.GAME_STATE = GAME_STATE.ENDGAME
            gameCore.dino.setAnimation("Dead")
            console.error("Collision Detected")
            timeScale = 0;
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
    public replay() {

    }
}


const keysPressed: Set<string> = new Set();
const keysHeld: Set<string> = new Set();

function processInput() {
    if (gameCore.GAME_STATE == GAME_STATE.READY) {
        if (!keysHeld.has(" ")) {
            document.addEventListener("keydown", handleKeyDown);
        }
        document.addEventListener("keyup", handleKeyUp);
    }
}

function handleKeyDown(event: KeyboardEvent): void {
    let key = event.key
    if (!keysPressed.has(key)) {
        keysPressed.add(key);
        keysHeld.add(key);
        if (gameCore.GAME_STATE === GAME_STATE.READY && (key === " " || key === "ArrowUp")) {
            gameCore.GAME_STATE = GAME_STATE.PLAYING
        }
        if (gameCore.GAME_STATE == GAME_STATE.PLAYING && (key === " " || key === "ArrowUp")) {
            gameCore.dino.setAnimation("Jump")
        }
        if (gameCore.GAME_STATE == GAME_STATE.PLAYING && key === "ArrowDown") {
            gameCore.dino.setAnimation("Crouch")
        }
    }
    if (keysHeld.has(key)) {
        if (gameCore.GAME_STATE == GAME_STATE.PLAYING && (key === " " || key === "ArrowUp")) {
            gameCore.dino.setAnimation("Jump")
        }
    }
}

function handleKeyUp(event: KeyboardEvent): void {
    let key = event.key
    keysPressed.delete(key);
    keysHeld.delete(key);

    if (gameCore.GAME_STATE == GAME_STATE.PLAYING && key === "ArrowDown") {
        gameCore.dino.setAnimation("Run")
    }

    if (gameCore.GAME_STATE == GAME_STATE.ENDGAME && (key === " ")) {
        gameCore.replay()
    }
}


function update(timeScale: number, deltaTime: number) {
    gameCore.update(timeScale, deltaTime)
}

function render() {
    gameCore.render();
}

let gameCore = new GameCore()



let lag = 0.0;
const MS_PER_UPDATE = 33.33;


let previousTime = performance.now()
let timeScale = 0.75

function gameLoop(): void {
    let currentTime = performance.now()
    let deltaTime = currentTime - previousTime
    previousTime = currentTime
    lag += deltaTime

    processInput();

    while (lag >= MS_PER_UPDATE) {
        update(timeScale, deltaTime);
        lag -= MS_PER_UPDATE;
    }
    render();

    requestAnimationFrame(gameLoop);
}

