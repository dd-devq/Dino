interface RenderResource {
    image: HTMLImageElement;
}

interface IRenderable {
    position: Position;
    setRenderResource(): void;
    getRenderResource(): RenderResource[];
    render(canvasContext: CanvasRenderingContext2D);
    update(timeScale: number, deltaTime: number);
}
