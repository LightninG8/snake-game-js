'use strict';

let
    canv = document.querySelector("#canvas"),
    ctx = canv.getContext("2d");

const
    counter = document.querySelector(".game__count"),
    startButton = document.querySelector(".game__start"),
    timerCont = document.querySelector(".game__time"),
    gameCont = document.querySelector(".game__container");

let
    gs = 10, // Ширина клетки
    tc = canv.width / gs, // Количество клеток
    keyCode,
    
    // Координаты головы
    px = Math.floor(Math.random() * tc),
    py = Math.floor(Math.random() * tc),

    // Яблоко
    ax = Math.floor(Math.random() * tc),
    ay = Math.floor(Math.random() * tc),

    // Направление
    xv = 0,
    yv = 0,

    trail = [], // Голова
    tail = 5, // Длина хвоста
    score = 0, // Счёт
    speed = 10,

    // Время
    sec = 0,
    min = 0,
    time = `Время: ${min}:0${sec}`;

function game() {
    switch (keyCode) {
        case 37: // Влево
            xv = xv === 1 ? 1 : -1;
            yv = 0;
            break;
        case 38: // Вверх
            xv = 0;
            yv = yv === 1 ? 1 : -1;
            break;
        case 39: // Вправо
            xv = xv === -1 ? -1 : 1;
            yv = 0;
            break;
        case 40: // Вниз
            xv = 0;
            yv = yv === -1 ? -1 : 1;
            break;
    }
    // Движение
    px += xv;
    py += yv;

    // Стены
    if (px < 0) { // Лева граница
        px = tc - 1;
    }
    if (px > tc - 1) { // Правая граница
        px = 0;
    }
    if (py < 0) { // Верхняя граница
        py = tc - 1;
    }
    if (py > tc - 1) { // Нижняя граница
        py = 0;
    }

    // Очистка
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height);

    // Вывод хвоста
    ctx.fillStyle = "white";
    for (let i = 0; i < trail.length; i++) {
        ctx.fillRect(trail[i].x * gs, trail[i].y * gs, gs, gs);

        // Столкновение с хвостом
        if (trail[i].x === px && trail[i].y === py) {
            tail = 5;
            score = 0;
        }
    }

    // Перемещаем хвост
    trail.push({
        x: px,
        y: py
    });

    // Удаляем лишнее
    while (trail.length > tail) {
        trail.shift();
    }

    // Если съедено яблоко
    if (ax === px && ay === py) {
        score++;
        tail++;

        ax = Math.floor(Math.random() * tc);
        ay = Math.floor(Math.random() * tc);
    }

    // Рисуем яблоко
    ctx.fillStyle = "red";
    ctx.fillRect(ax * gs, ay * gs, gs, gs);

    // Выводим инфу
    counter.textContent = `Счёт: ${score}`;
}

// Изменение направления
function keyPush(e) {
    keyCode = e.keyCode;
}

window.onload = function () {
    startButton.addEventListener("click", function startGame() {
        document.addEventListener("keydown", keyPush);
        setInterval(game, 1000 / 10);

        gameCont.classList.add("hidden");

        // Время
        let time = setInterval(() => {
            if (sec < 60 - 1) {
                if (sec < 10) {
                    time = `Время: ${min}:0${sec}`;
                    if (min < 10) {
                        time = `Время: 0${min}:0${sec}`;
                    }
                } else {
                    time = `Время: ${min}:${sec}`;
                    if (min < 10) {
                        time = `Время: 0${min}:${sec}`;
                    }
                }
                sec++;
            } else {
                sec = 0;
                min++;
            }

            timerCont.textContent = time;
        }, 1000);

        startButton.removeEventListener("click", startGame);
    })

};