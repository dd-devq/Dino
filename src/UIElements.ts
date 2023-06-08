import { Position } from "./Position"
import { Sprite } from "./Sprite"

class UIElements implements IRenderable {
    public position: Position
    public score: number;
    public static highScore: number = 0;
    public nowRenderingSprite: Sprite[];
    private cacheDigit: Map<number, Sprite>;
    private isEndGame: boolean;

    constructor(position?: Position, highScore?: number) {
        if (highScore == null) {
            highScore = 0
        }
        if (position == null) {
            position = new Position(0, 0)
        }
        this.position = position
        this.score = 0
        this.isEndGame = false;
        this.nowRenderingSprite = []
        this.cacheDigit = new Map<number, Sprite>();

        for (let i = 0; i < 14; i++) {
            this.nowRenderingSprite.push(new Sprite("assets\\UI\\0.png"))
        }

        this.cacheRenderResource();

        UIElements.highScore = highScore
        this.setRenderResource()
    }

    private cacheRenderResource(): void {
        this.cacheDigit.set(0, new Sprite("assets\\UI\\0.png"))
        this.cacheDigit.set(1, new Sprite("assets\\UI\\1.png"))
        this.cacheDigit.set(2, new Sprite("assets\\UI\\2.png"))
        this.cacheDigit.set(3, new Sprite("assets\\UI\\3.png"))
        this.cacheDigit.set(4, new Sprite("assets\\UI\\4.png"))
        this.cacheDigit.set(5, new Sprite("assets\\UI\\5.png"))
        this.cacheDigit.set(6, new Sprite("assets\\UI\\6.png"))
        this.cacheDigit.set(7, new Sprite("assets\\UI\\7.png"))
        this.cacheDigit.set(8, new Sprite("assets\\UI\\8.png"))
        this.cacheDigit.set(9, new Sprite("assets\\UI\\9.png"))
    }

    public setRenderResource(): void {
        let h_img_src: string = "assets\\UI\\h.png";
        let i_img_src: string = "assets\\UI\\i.png";
        let game_over_img_src: string = "assets\\UI\\gameOver.png";
        let replay_img_src: string = "assets\\UI\\replay.png";


        this.nowRenderingSprite[0] = new Sprite(h_img_src)
        this.nowRenderingSprite[1] = new Sprite(i_img_src)

        this.nowRenderingSprite[12] = new Sprite(game_over_img_src)
        this.nowRenderingSprite[13] = new Sprite(replay_img_src)
        this.setHighScoreResources()
        this.setScoreResources(0)
    }

    public setHighScoreResources(): void {
        if (UIElements.highScore > 99999) {
            UIElements.highScore = 99999
        }

        if (this.score > UIElements.highScore) {
            UIElements.highScore = this.score
        }

        let highScoreString: string = UIElements.highScore.toString()

        for (let i = 0; 5 - highScoreString.length; i++) {
            highScoreString = "0" + highScoreString
        }

        for (let i = 2; i < 7; i++) {
            let digit: number = parseInt(highScoreString[i - 2])
            this.nowRenderingSprite[i] = this.cacheDigit.get(digit)!
        }

    }

    public setScoreResources(score: number): void {
        if (score > 99999) {
            score = 99999
        }

        let scoreString: string = score.toString()

        for (let i = 0; 5 - scoreString.length; i++) {
            scoreString = "0" + scoreString
        }

        for (let i = 7; i < 12; i++) {

            let digit: number = parseInt(scoreString[i - 7])
            this.nowRenderingSprite[i] = this.cacheDigit.get(digit)!
        }
    }


    public getRenderResource(): IRenderResource[] {
        return this.nowRenderingSprite;
    }

    public render(canvasContext: CanvasRenderingContext2D): void {
        let renderResource = this.getRenderResource()
        let offset: number = 15;

        canvasContext.drawImage(renderResource[0].image, this.position.x, this.position.y)
        canvasContext.drawImage(renderResource[1].image, this.position.x + offset, this.position.y)
        offset += 30;

        for (let i = 2; i < 7; i++) {
            canvasContext.drawImage(renderResource[i].image, this.position.x + offset, this.position.y)
            offset += 15;
        }
        offset += 15;

        for (let i = 7; i < 12; i++) {
            canvasContext.drawImage(renderResource[i].image, this.position.x + offset, this.position.y)
            offset += 15;
        }

        if (this.isEndGame) {
            canvasContext.drawImage(renderResource[12].image, 275, 125)
            canvasContext.drawImage(renderResource[13].image, 350, 75)
        }
    }

    public update(timeScale: number, deltaTime: number): void {
        this.score += Math.floor(timeScale * deltaTime * 0.25)
        this.setScoreResources(this.score)
        if (timeScale == 0) {
            this.isEndGame = true;
        }
    }


    public reset(): void {
        this.score = 0;
        this.setScoreResources(this.score)
        this.isEndGame = false;
    }
}

export { UIElements }