import { Position } from "./Position";
class Sprite implements IRenderResource {
    public image: HTMLImageElement;

    constructor(imageSrc: string) {
        this.image = new Image();
        this.image.src = imageSrc;
    }

    public setResourceSrc(imageSrc: string): void {
        this.image.src = imageSrc;
    }
}

function checkCollision(sprite1: Sprite, pos1: Position, sprite2: Sprite, pos2: Position) {

    const image1X = pos1.x; // Replace "x" with the actual property representing the x-coordinate of image1
    const image1Y = pos1.y; // Replace "y" with the actual property representing the y-coordinate of image1
    const image1Width = sprite1.image.width; // Replace "width" with the actual property representing the width of image1
    const image1Height = sprite1.image.height; // Replace "height" with the actual property representing the height of image1

    console.log(image1X)
    console.log(image1Y)

    const image2X = pos2.x; // Replace "x" with the actual property representing the x-coordinate of image2
    const image2Y = pos2.y; // Replace "y" with the actual property representing the y-coordinate of image2
    const image2Width = sprite2.image.width; // Replace "width" with the actual property representing the width of image2
    const image2Height = sprite2.image.height; // Replace "height" with the actual property representing the height of image2
    console.log(image2X)
    console.log(image2Y)
    // Check for collision
    if (
        image1X < image2X + image2Width &&
        image1X + image1Width > image2X &&
        image1Y < image2Y + image2Height &&
        image1Y + image1Height > image2Y
    ) {
        // Collision detected
        return true;
    }

    // No collision
    return false;
}

export { Sprite, checkCollision };