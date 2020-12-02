const game = document.querySelector('.game');
const control = document.querySelector('.control');
const divItem = document.querySelectorAll('.game div');
const startGame = document.querySelector('.stratGame');
const stopGame = document.querySelector('.stopGame');
const addSpeed = document.querySelector('.addSpeed');
const speedCut = document.querySelector('.speedCut');
const grades = document.querySelector('.control span');

let grade = 0;
let direction = 'right';
let speed = 20;
let setIntervalSpeed = 200;
let sankeListItem = [
    {
        left: 200,
        top: 200
    }
];

function random(min, max) {
    return Math.floor(Math.random() * ( max - min )) + min;
}

function Food (width, height, x, y, color) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.color = color || 'green';
}

Food.prototype.drawFood = function () {
    let div = document.createElement('div');
    div.style.width = this.width + 'px';
    div.style.height = this.height + 'px';
    div.style.backgroundColor = this.color;
    div.style.left = this.x + 'px';
    div.style.top = this.y + 'px';
    div.setAttribute('class','food');

    game.appendChild(div);
}

Food.prototype.clearFood = function () {
    game.removeChild(document.querySelector('.food'));
}

function Snake ( width, height, color) {
    // this.sankeListItem = [...sankeListItem];
    this.width = width;
    this.height = height;
    this.color = color;
}

Snake.prototype.drawSnake = function () {
    console.log(document.querySelectorAll('.sankeBody').length)
    // for (let i = 0; i < document.querySelectorAll('.sankeBody').length; i++) {
    //     game.removeChild(document.querySelectorAll('.sankeBody')[i]);
    // }
    while (document.querySelectorAll('.sankeBody').length) {
        game.removeChild(document.querySelectorAll('.sankeBody')[0]);
    }

    for (let i = 0; i < sankeListItem.length; i++) {
        let div = document.createElement('div');
        div.style.width = this.width + 'px';
        div.style.height = this.height + 'px';
        div.style.backgroundColor = this.color;
        div.style.left = sankeListItem[i].left + 'px';
        div.style.top = sankeListItem[i].top + 'px';
        div.setAttribute('class','sankeBody');

        game.appendChild(div);
    }
}

Snake.prototype.moveSnake = function (direction, speed) {
    let i;
    switch (direction) {
        case 'left':
            // this.sankeListItem[0].left += speed;
            for ( i = sankeListItem.length - 1; i > 0 ; i--) {
                sankeListItem[i].left = sankeListItem[i-1].left;
                sankeListItem[i].top = sankeListItem[i-1].top;
            }
            sankeListItem[0].left -= speed;
            break;
        case 'right':
            for ( i = sankeListItem.length - 1; i > 0 ; i--) {
                sankeListItem[i].left = sankeListItem[i-1].left;
                sankeListItem[i].top = sankeListItem[i-1].top;
            }
            sankeListItem[0].left += speed;
            // console.log(sankeListItem)
            break;
        case 'top':
            for ( i = sankeListItem.length - 1; i > 0 ; i--) {
                sankeListItem[i].left = sankeListItem[i-1].left;
                sankeListItem[i].top = sankeListItem[i-1].top;
            }
            sankeListItem[0].top -= speed;
            break;
        case 'bottom':
            for ( i = sankeListItem.length - 1; i > 0 ; i--) {
                sankeListItem[i].left = sankeListItem[i-1].left;
                sankeListItem[i].top = sankeListItem[i-1].top;
            }
            sankeListItem[0].top += speed;
            break;
    }
    // console.log(sankeListItem)
}

Snake.prototype.addSnakeLenght = function () {
    let addleft = sankeListItem[sankeListItem.length - 1].left;
    let addtop = sankeListItem[sankeListItem.length - 1].top;
    let body = {
        left: addleft,
        top: addtop
    }
    sankeListItem.push(body);
    // console.log(sankeListItem)
}

function initGame() {
    if ( sankeListItem[0].left < 0 || sankeListItem[0].left > 980 ) {
        clearInterval(timeclick);
        alert('闯墙了！！！！ 游戏结束！！！！！！');
        
    }else {
        // 到达顶部从低部出来
        if (sankeListItem[0].top < 0) {
            sankeListItem[0].top = 780;
        }
        // 到达底部从顶部出来
        if (sankeListItem[0].top > 780) {
            sankeListItem[0].top = 0;
        }
        snake.drawSnake();
        snake.moveSnake(direction, speed);
        window.onkeydown = e => {
            if (e.key === 'w' || e.key === 'W') {
                if (direction != 'bottom') {direction = 'top'}
            };
            if (e.key === 's' || e.key === 'S')  {
                if (direction != 'top') {direction = 'bottom'}
            };
            if (e.key === 'a' || e.key === 'A') {
                if (direction != 'right') {direction = 'left'}
            };
            if (e.key === 'd' || e.key === 'D') {
                if (direction != 'left') {direction = 'right'}
            };
        }
        if (sankeListItem[0].left === food.x && sankeListItem[0].top === food.y) {
            grade++;
            grades.textContent = '分数： ' + grade;
            food = new Food(20, 20, random(0,50) * 20, random(0,40) * 20, 'green');
            food.clearFood();
            food.drawFood();
            snake.addSnakeLenght();
        }
    }
}



let food = new Food(20, 20, random(0,50) * 20, random(0,40) * 20, 'green');
food.drawFood();

let snake = new Snake(20, 20, 'red');
snake.drawSnake();

let timeclick;

startGame.addEventListener('click',() => {
    clearInterval(timeclick);
    timeclick = setInterval(() => {
        // console.log(sankeListItem);
        // console.log(setIntervalSpeed);
        initGame();
    }, setIntervalSpeed)
});

stopGame.addEventListener('click', () => {
    clearInterval(timeclick);
})

addSpeed.addEventListener('click', () => {
    if (setIntervalSpeed > 0) {
        clearInterval(timeclick);
        timeclick = setInterval(() => {
            // console.log(sankeListItem);
            console.log(setIntervalSpeed);
            initGame();
        }, setIntervalSpeed)
        setIntervalSpeed -= 20;
    }
});

speedCut.addEventListener('click', () => {
    clearInterval(timeclick);
    timeclick = setInterval(() => {
        // console.log(sankeListItem);
        console.log(setIntervalSpeed);
        initGame();
    }, setIntervalSpeed)
    setIntervalSpeed += 20;
});



// function runStrart() {
//     snake.drawSnake();
//     snake.moveSnake(direction, 20);
//     window.onkeydown = e => {
//         if (e.key === 'w' || e.key === 'W') direction = 'top';
//         if (e.key === 's' || e.key === 'S') direction = 'bottom';
//         if (e.key === 'a' || e.key === 'A') direction = 'left';
//         if (e.key === 'd' || e.key === 'D') direction = 'right';
//     }
//     if (sankeListItem[0].left === food.x && sankeListItem[0].top === food.y) {
//         console.log(1111)
//         grade++;
//         grades.textContent = '分数： ' + grade;
//         food = new Food(20, 20, random(0,50) * 20, random(0,40) * 20, 'green');
//         food.clearFood();
//         food.drawFood();
//         snake.addSnakeLenght();
//     }

//     requestAnimationFrame(runStrart);
// }
// runStrart();