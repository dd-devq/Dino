interface IRenderResource {
    image: HTMLImageElement;
    setResourceSrc(imageSrc: string): void;
}

interface IRenderable {
    position: Position;
    setRenderResource(): void;
    getRenderResource(): RenderResource[];
    render(canvasContext: CanvasRenderingContext2D): void;
    update(timeScale: number, deltaTime: number): void;
}
