interface IRenderResource {
    image: HTMLImageElement;
}

interface IRenderable {
    position: Position;
    nowRenderingSprite: Sprite;

    setRenderResource(): void;
    getRenderResource(): RenderResource[];
    render(canvasContext: CanvasRenderingContext2D): void;
    update(timeScale: number, deltaTime: number): void;
    reset(): void;
}

enum GAME_STATE {
    READY = 0,
    PLAYING = 1,
    PAUSE = 2,
    ENDGAME = 3,
}