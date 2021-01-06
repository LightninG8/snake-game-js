const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;




ctx.fillStyle = "#ffffff";





let state = {
    fps: 60,
    headX: 50,
    headY: 50,
    tail: [],
    tailLength: 100,
    directionX: 1,
    directionY: 0,
    speed: 100,
    appleX: 0,
    appleY: 0,
}
const game = setInterval(frame, 1000/state.fps);

function frame() {
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();

    ctx.fillStyle = "#000000";
    
    state.headX += state.directionX * state.speed / state.fps;
    state.headY += state.directionY * state.speed / state.fps;

    

    // Вывод хвоста
    for (let item of state.tail) {
        ctx.fillRect(item.x, item.y, 10, 10);

        // Столкновение с хвостом
        if (item.x == state.headX && item.y == state.headY) {
            console.log("Столкновение");
            // state.tailLength = 30;
        }
    }
    // Вывод яблока 

    // Формируем хвост
    state.tail.push({
        x: state.headX,
        y: state.headY,
    });

    while (state.tail.length > state.tailLength) {
        state.tail.shift();
    }
    if (state.headX <= 0) {
        state.headX = canvas.width - 1;
    }
    if (state.headX >= canvas.width) {
        state.headX = 0;
    }
    if (state.headY < 0) {
        state.headY = canvas.height - 1;
    }
    if (state.headY >= canvas.height) {
        state.headY = 0;
    }
    
    ctx.fillRect(state.headX, state.headY, 10, 10);

    ctx.restore();

    function generateApple() {
        state.appleX = Math.round(Math.random() * canvas.width);
        state.appleY = Math.round(Math.random() * canvas.height);
    }
}


// Смена направления на мобильных
let touch = {
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    lengthX: 0,
    lengthY: 0,
}
document.addEventListener("touchstart", function(e) {
    touch.startX = e.touches[0].clientX;
    touch.startY = e.touches[0].clientY;
    
});
document.addEventListener("touchmove", function(e) {
    touch.endX = e.touches[0].clientX;
    touch.endY = e.touches[0].clientY;
});
document.addEventListener("touchend", function(e) {
    touch.lengthX = touch.startX - touch.endX;
    touch.lengthY = touch.startY - touch.endY;

    if (Math.abs(touch.lengthX) > Math.abs(touch.lengthY)) {
        if (state.directionX != Math.sign(touch.lengthX)) {
            state.directionX = Math.sign(touch.lengthX) * -1;
            state.directionY = 0;
        }
    } else if (Math.abs(touch.lengthX) < Math.abs(touch.lengthY)) {
        if (state.directionY != Math.sign(touch.lengthY)) {
            state.directionX = 0;
            state.directionY = Math.sign(touch.lengthY) * -1;
        }
    }
});