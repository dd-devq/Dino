import { Position } from "./Position";
class Sprite implements IRenderResource {
    public image: HTMLImageElement;

    constructor(imageSrc: string) {
        this.image = new Image();
        this.image.src = imageSrc;
    }
}

function checkCollision(sprite1: Sprite, pos1: Position, sprite2: Sprite, pos2: Position) {

    const image1X = pos1.x;
    const image1Y = pos1.y;
    const image1Width = sprite1.image.width * 0.5;
    const image1Height = sprite1.image.height * 0.5;

    const image2X = pos2.x;
    const image2Y = pos2.y;
    const image2Width = sprite2.image.width * 0.6;
    const image2Height = sprite2.image.height * 0.6;



    if (image1X < image2X + image2Width && image1X + image1Width > image2X &&
        image1Y < image2Y + image2Height && image1Y + image1Height > image2Y) {
        return true;
    }

    return false;
}

export { Sprite, checkCollision };