
class Canvas {
    public canvas: HTMLCanvasElement;
    public canvasContext: CanvasRenderingContext2D;
    private height: number;
    private width: number;

    constructor(width: number = 600, height: number = 200) {
        this.createCanvas(width, height);
        this.canvasContext = this.canvas.getContext('2d')!;
        this.height = height;
        this.width = width;
    }

    public clear(): void {
        this.canvasContext.clearRect(0, 0, this.width, this.height);
    }

    public draw(): void {
        this.canvasContext.fillStyle = "white";
        this.canvasContext.fillRect(0, 0, this.width, this.height);
    }

    public getWidth(): number {
        return this.width;
    }

    public getHeight(): number {
        return this.height;
    }

    private createCanvas(width: number = 600, height: number = 200): void {
        let game = document.getElementById("game");
        this.canvas = document.createElement("canvas");
        this.canvas.id = "canvas";
        this.canvas.height = height;
        this.canvas.width = width;
        game?.appendChild(this.canvas);
    }
}

export { Canvas };