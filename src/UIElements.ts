import { Position } from "./Position"
import { Sprite } from "./Sprite"

class UIElements implements IRenderable {
    public position: Position

    public score: number;
    public highScore: number = 0;
    public nowRenderingSprite: Sprite[];
    public cacheDigit: Map<number, Sprite>;

    constructor(position?: Position, highScore?: number) {
        if (highScore == null) {
            highScore = 0
        }
        if (position == null) {
            position = new Position(0, 0)
        }
        this.position = position
        this.score = 0

        this.nowRenderingSprite = []
        this.cacheDigit = new Map<number, Sprite>();

        for (let i = 0; i < 12; i++) {
            this.nowRenderingSprite.push(new Sprite("assets\\UI\\0.png"))
        }

        this.setupCache();

        this.highScore = highScore
        this.setRenderResource()
    }

    setupCache(): void {
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

    setRenderResource(): void {
        let h_img_src: string = "assets\\UI\\h.png";
        let i_img_src: string = "assets\\UI\\i.png";


        this.nowRenderingSprite[0].setResourceSrc(h_img_src)
        this.nowRenderingSprite[1].setResourceSrc(i_img_src)
        this.setHighScoreResources()
        this.setScoreResources(0)
    }

    private setHighScoreResources() {
        if (this.highScore > 99999) {
            this.highScore = 99999
        }

        let highScoreString: string = this.highScore.toString()

        for (let i = 0; 5 - highScoreString.length; i++) {
            highScoreString = "0" + highScoreString
        }

        for (let i = 2; i < 7; i++) {
            let digit: number = parseInt(highScoreString[i - 2])
            this.nowRenderingSprite[i] = this.cacheDigit.get(digit)!
        }

    }

    public setScoreResources(score: number) {
        if (score > 99999) {
            score = 99999
        }

        let scoreString: string = score.toString()

        for (let i = 0; 5 - scoreString.length; i++) {
            scoreString = "0" + scoreString
        }

        for (let i = 7; i < this.nowRenderingSprite.length; i++) {

            let digit: number = parseInt(scoreString[i - 7])
            this.nowRenderingSprite[i] = this.cacheDigit.get(digit)!

        }
    }


    getRenderResource(): IRenderResource[] {
        return this.nowRenderingSprite;
    }

    render(canvasContext: CanvasRenderingContext2D) {


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
    }

    update(timeScale: number, deltaTime: number) {
        this.score += Math.floor(timeScale * deltaTime * 0.25)
        this.setScoreResources(this.score)
    }


}

export { UIElements }