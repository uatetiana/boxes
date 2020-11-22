let btnStartGame = document.querySelector('.btn-start');
let btnNewGame = document.querySelector('.btn-restart');
let gameField = document.querySelector('.game-field');
let points = document.querySelectorAll('.points');
let timer = document.querySelector('.timer');
let modal = document.querySelector('.modal');
let btnSaveResults = document.querySelector('.btn-save');
let userName = document.querySelector('.modal-user');
let tableBody = document.querySelector('.table-body');
let closeModal = modal.querySelectorAll('.btn-close');
let progressBars = document.querySelectorAll('.progress-bar')
let gameStart = false;
let randomQuantity;
let box;
let scoreCounter = 0;
let randomTop;
let randomLeft;
let intervalId;
let timerId;
let time = 0;
let boxes;
let id = 1;
let pointsArr = [];


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
    points[1].innerHTML = `${scoreCounter}`;
    modal.classList.add('visible');
}

const startGame = () => {
    scoreCounter = 0;
    points[0].innerHTML = `${scoreCounter}`;
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
    boxes = document.querySelectorAll('.box');
    randomQuantity = Math.floor(Math.random() * 3);
    if (boxes.length === 0 && randomQuantity === 0) {
        randomQuantity = 1;
    }
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

gameField.addEventListener('mouseover', (event) => {
    if (event.target.className === 'box') {
        event.target.style.boxShadow = `0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)`;
    }
})

gameField.addEventListener('mouseout', (event) => {
    if (event.target.className === 'box') {
        event.target.style.boxShadow = 'none';
    }
})

gameField.addEventListener('click', (event) => {

    if (event.target.className === 'box') {
        event.target.remove();
        scoreCounter++;
        points[0].innerHTML = `${scoreCounter}`;
        genBox();
    } else {
        return false;
    }
})

btnSaveResults.addEventListener('click', () => {
    let user = {};
    if (userName.value.length !== 0) {
        user.id = id++;
        user.name = userName.value;
        user.points = scoreCounter;
        pointsArr.push(scoreCounter)
    } else {
        user.id = id++;
        user.name = 'user';
        user.points = scoreCounter;
        pointsArr.push(scoreCounter)
    }
    tableBody.insertAdjacentHTML('beforeend',
        `<tr>
            <th scope="row">${user.id}</th>
            <td>${user.name}</td>
            <td>${user.points}</td>
        </tr>`);
    modal.classList.remove('visible');
    scoreCounter = 0;
    points[0].innerHTML = `${scoreCounter}`;
    updateProgress();
})

closeModal.forEach(el => {
    el.addEventListener('click', () => {
        modal.classList.remove('visible');
    })
})


const updateProgress = () => {
    let maxScore = Math.max.apply(null, pointsArr);
    for (let i = 0; i < pointsArr.length && i < progressBars.length; i++) {
        progressBars[i].style.width = `${( pointsArr[i] * 100) / maxScore}%`;
    }
}

