let btnStartGame = document.querySelector('.btn-start');
let btnNewGame = document.querySelector('.btn-restart');
let gameField = document.querySelector('.game-field');
let points = document.querySelector('.points');
let timer = document.querySelector('.timer');
let modal = document.querySelector('.modal');
let btnSaveResults = document.querySelector('.btn-save');
let userName = document.querySelector('.modal-user');
let table = document.querySelector('.table');
let gameStart = false;
let randomQuantity;
let box;
let scoreCounter = 0;
let randomTop;
let randomLeft;
let intervalId;
let timerId;
let time = 0;

btnStartGame.addEventListener('click', (event) => {
    if (!gameStart) {
        startGame();
    }
})

btnNewGame.addEventListener('click', () => {
    if (!gameStart) {
        startGame();
    } else {
        clearInterval(intervalId);
        clearTimeout(timerId);
        removeBlocks();
        gameStart = false;
        timer.innerHTML = `01:00`;
        startGame();
    }
})

const tick = () => {
    timer.innerHTML = `00:${time > 9 ? time-- : '0' + time--}`;
}

const showModal = () => {
    modal.classList.add('visible');
}

const startGame = () => {
    scoreCounter = 0;
    points.innerHTML = `${scoreCounter}`;
    time = 59;
    genBox();
    intervalId = setInterval(tick, 1000)
    timerId = setTimeout(endGame, 60000);
    gameStart = true;
}

const endGame = () => {
    showModal();
    clearInterval(intervalId);
    clearTimeout(timerId);
    removeBlocks();
    gameStart = false;
    timer.innerHTML = `01:00`;
}

const removeBlocks = () => {
    let itemsToRemove = document.querySelectorAll('.box');
    itemsToRemove.forEach(el => el.remove());
}


const getColorCode = () => {
    let makeColorCode = '0123456789ABCDEF';
    let code = '#';
    for (let count = 0; count < 6; count++) {
        code = code + makeColorCode[Math.floor(Math.random() * 16)];
    }
    return code;
}


const genBox = () => {
    randomQuantity = Math.floor(Math.random() * 2 + 1);
    for (let i = 0; i < randomQuantity; i++) {
        boxCreate();
    }
}

const boxCreate = () => {
    let width = gameField.offsetWidth;
    let height = gameField.offsetHeight;
    box = document.createElement('div');
    randomTop = Math.floor(Math.random() * (height - 50));
    randomLeft = Math.floor(Math.random() * (width - 50));
    box.style.top = randomTop + 'px';
    box.style.left = randomLeft + 'px';
    box.classList.add('box');
    setBg(box);
    gameField.append(box);
}

const setBg = (item) => {
    item.style.backgroundColor = getColorCode();
}

gameField.addEventListener('click', (event) => {
    if (event.target.className === 'box') {
        event.target.remove();
        scoreCounter++;
        points.innerHTML = `${scoreCounter}`;
        genBox();
    } else {
        return false;
    }
})

btnSaveResults.addEventListener('click', () => {
    let user = {};
    if (userName.value.length !== 0) {
        user.name = userName.value;
        user.points = scoreCounter;
    }
    table.insertAdjacentHTML('beforeend',
        `<tr class="table-row">
                    <td class="table-data">${user.name}</td>
                    <td class="table-data">${user.points}</td>
                </tr>`);
    modal.classList.remove('visible');
    scoreCounter = 0;
    points.innerHTML = `${scoreCounter}`;
})