const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const GAME_OVER_HEIGHT = canvas.height * 0.1;
const BOX_WIDTH = 50;
const BOX_HEIGHT = 50;

let isGameOver = false;

let box = {
    x: canvas.width / 2 - BOX_WIDTH / 2,
    y: GAME_OVER_HEIGHT,
    width: BOX_WIDTH,
    height: BOX_HEIGHT,
    color: "blue"
};

function drawBox() {
    ctx.fillStyle = box.color;
    ctx.fillRect(box.x, box.y, box.width, box.height);
}

function drawGameOverLine() {
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, GAME_OVER_HEIGHT);
    ctx.lineTo(canvas.width, GAME_OVER_HEIGHT);
    ctx.stroke();
}

function checkGameOver() {
    // ゲームオーバーの判定
    if (box.y <= GAME_OVER_HEIGHT) {
        isGameOver = true;
    }
}

canvas.addEventListener("mousemove", function(event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;

    // マウスカーソルの位置に合わせてボックスのx座標を更新
    box.x = x - BOX_WIDTH / 2;
});

canvas.addEventListener("click", function() {
    if (!isGameOver) {
        // ボックスの位置を初期位置にリセット
        box.y = GAME_OVER_HEIGHT;
    }
});

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBox();
    drawGameOverLine();

    checkGameOver();

    if (isGameOver) {
        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.fillText("GAME OVER", canvas.width / 2 - 100, canvas.height / 2);
    } else {
        requestAnimationFrame(gameLoop);
    }
}

gameLoop();
