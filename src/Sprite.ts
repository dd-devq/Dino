
class Sprite implements RenderResource {
    public image: HTMLImageElement;

    constructor(imageSrc: string) {
        this.image = new Image();
        this.image.src = imageSrc;
    }
}

export { Sprite };