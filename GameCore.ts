import { Dino } from "./Dino";
import { Ground } from "./Ground";
import { Canvas } from "./Canvas";
import { Position } from "./Position";
import { Bird } from "./Bird";
import { Cactus } from "./Cactus";
import { Cloud } from "./Cloud";
import { UIElements } from "./UIElements";
import { checkCollision } from "./Sprite";


enum GAME_STATE {
    READY = 0,
    PLAYING = 1,
    PAUSE = 2,
    ENDGAME = 3,
}

class GameCore {
    public dino: Dino;
    public cactus: Cactus;
    public bird: Bird
    public ground: Ground;
    public cloud: Cloud;
    public uiElements: UIElements;

    private gameState: GAME_STATE;
    private renderables: IRenderable[];
    private timeScale = 0.75;
    private canvas: Canvas;

    constructor() {
        this.canvas = new Canvas(800, 200);
        this.renderables = []
        this.dino = new Dino(new Position(10, 145));
        this.bird = new Bird(new Position(1200, 125));
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
        this.gameState = GAME_STATE.READY;
    }


    public update(deltaTime: number): void {
        for (const renderable of this.renderables) {
            renderable.update(this.timeScale, deltaTime)
        }

        if ((checkCollision(this.dino.nowRenderingSprite, this.dino.position, this.cactus.nowRenderingSprite, this.cactus.position) ||
            checkCollision(this.dino.nowRenderingSprite, this.dino.position, this.bird.nowRenderingSprite, this.bird.position)) &&
            (this.gameState != GAME_STATE.ENDGAME)) {
            this.dino.setAnimation("Dead")
            this.gameState = GAME_STATE.ENDGAME
            this.timeScale = 0;
            this.uiElements.setHighScoreResources()
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
        for (const renderable of this.renderables) {
            renderable.reset()
        }
        this.gameState = GAME_STATE.READY
        this.timeScale = 0.75
    }

    public setGameState(gameState: GAME_STATE): void {
        if (gameState in GAME_STATE) {
            this.gameState = gameState;
        }
    }

    public getGameState(): GAME_STATE {
        return this.gameState
    }
}

export { GameCore };