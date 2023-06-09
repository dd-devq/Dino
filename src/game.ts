import { GameCore } from "./GameCore";

enum GAME_STATE {
    READY = 0,
    PLAYING = 1,
    PAUSE = 2,
    ENDGAME = 3,
}
enum DINO_STATE {
    IDLE = 0,
    RUNNING = 1,
    JUMPING = 2,
    FALLING = 3,
    CROUCHING = 4,
    DEAD = 5
}
/*Global variable*/

let keysPressed: Set<string> = new Set();
let keysHeld: Set<string> = new Set();

let gameCore = new GameCore();
let previousTime = performance.now();

/*End global variable*/

function processInput() {
    if (gameCore.getGameState() == GAME_STATE.READY) {
        if (!keysHeld.has(" ")) {
            document.addEventListener("keydown", handleKeyDown);
        }
        document.addEventListener("keyup", handleKeyUp);
    }
}

function update(deltaTime: number): void {
    gameCore.update(deltaTime);
}

function render(): void {
    gameCore.render();
}

requestAnimationFrame(gameLoop);

function gameLoop(): void {
    let currentTime = performance.now();
    let deltaTime = currentTime - previousTime;
    previousTime = currentTime;

    processInput();

    if (gameCore.getGameState() != GAME_STATE.READY) {
        update(deltaTime);
    }

    render();

    requestAnimationFrame(gameLoop);
}

function handleKeyDown(event: KeyboardEvent): void {
    let key = event.key;

    if (!keysPressed.has(key)) {
        keysPressed.add(key);
        keysHeld.add(key);
        if (gameCore.getGameState() === GAME_STATE.READY && (key === " " || key === "ArrowUp")) {
            gameCore.setGameState(GAME_STATE.PLAYING);
        }

        else if (gameCore.getGameState() == GAME_STATE.PLAYING && (key === " " || key === "ArrowUp")) {
            gameCore.dino.setAnimation("Jump");
        }

        else if (gameCore.getGameState() == GAME_STATE.PLAYING && key === "ArrowDown") {
            if(gameCore.dino.dinoState != DINO_STATE.FALLING && gameCore.dino.dinoState != DINO_STATE.JUMPING) {
                gameCore.dino.setAnimation("Crouch");
            }
            else {
                gameCore.dino.gravity = 4;
            }
        }

        else if (gameCore.getGameState() == GAME_STATE.ENDGAME && (key === " ")) {
            gameCore.replay();
        }
    }

    if (keysHeld.has(key)) {
        if (gameCore.getGameState() == GAME_STATE.PLAYING && (key === " " || key === "ArrowUp")) {
            gameCore.dino.setAnimation("Jump");
        }
        if (gameCore.getGameState() == GAME_STATE.PLAYING && key === "ArrowDown" && gameCore.dino.dinoState == DINO_STATE.RUNNING) {
            gameCore.dino.setAnimation("Crouch");
        }
    }
}

function handleKeyUp(event: KeyboardEvent): void {
    let key = event.key;

    keysPressed.delete(key);
    keysHeld.delete(key);

    if (gameCore.getGameState() == GAME_STATE.PLAYING && key === "ArrowDown") {
        gameCore.dino.setAnimation("Run");
    }

    if(gameCore.getGameState() == GAME_STATE.PLAYING && gameCore.dino.dinoState == DINO_STATE.JUMPING &&
        (key === "ArrowUp" || key === " ")) {
        gameCore.dino.dinoState = DINO_STATE.FALLING
    }

}
