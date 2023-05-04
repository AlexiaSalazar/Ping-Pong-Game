const $ = (s, o = document) => o.querySelector(s);
const $$ = (s, o = document) => o.querySelectorAll(s);

var cancelarSub = $('#cancelarSub'),
    game = $('.game', cancelarSub),
    confirmButton = $('.confirm', cancelarSub),
    upButton = $('.controles .up', game),
    downButton = $('.controles .down', game),
    startButton = $('.start', game),
    closeButton = $('.close', game);

var bola = {
        elem: $('.bola', game),
        x: 0,
        y: 0,
        top: 0,
        left: 0
    },
    um = {
        elem: $('.remo.um', game),
        y: 0,
        top: 0,
        score: 0
    },
    dois = {
        elem: $('.remo.dois', game),
        y: 0,
        score: 0
    },
    interval;

function init() {

    if(game.classList.contains('idle')) {

        um.y = game.offsetHeight / 2 - um.elem.offsetHeight / 2;
        dois.y = game.offsetHeight / 2 - dois.elem.offsetHeight / 2;

        start();

        game.classList.remove('idle');
        game.classList.add('init');

    }

}

startButton.addEventListener('click', init);

confirmButton.addEventListener('click', e => {
    cancelarSub.classList.add('show-game');
});

closeButton.addEventListener('click', e => {
    cancelarSub.classList.add('hide-game');
    cancelarSub.classList.remove('show-game');
    setTimeout(() => cancelarSub.classList.remove('hide-game'), 800);
});

function start() {

    bola.x = game.offsetWidth / 2 - bola.elem.offsetWidth / 2;
    bola.y = game.offsetHeight / 2 - bola.elem.offsetHeight / 2;
    bola.top = Math.random() * 2 + 2;
    // bola.left = ((Math.random() < .5) ? 1 : -1) * (Math.random() * 2 + 2);
    bola.left = (1 * Math.random() * 2 + 2);

    interval = window.setInterval(render, 1000 / 60);
}

function render() {

    um.y += um.top;
    dois.y = bola.y - dois.elem.offsetHeight / 2;

    bola.x += bola.left;
    bola.y += bola.top;

    if(um.y <= 0) {
        um.y = 0;
    }

    if(dois.y <= 0) {
        dois.y = 0;
    }

    if(um.y >= game.offsetHeight - um.elem.offsetHeight) {
        um.y = game.offsetHeight - um.elem.offsetHeight;
    }

    if(dois.y > game.offsetHeight - dois.elem.offsetHeight) {
        dois.y = game.offsetHeight - dois.elem.offsetHeight;
    }

    if(bola.y <= 0 || bola.y >= game.offsetHeight - bola.elem.offsetHeight) {
        bola.top = -bola.top;
    }

    if(bola.x <= (um.elem.offsetWidth - 2)) {
        if((bola.y + bola.elem.offsetHeight / 2 ) > um.y && (bola.y + bola.elem.offsetHeight / 2 ) < um.y + um.elem.offsetHeight) {
            bola.left = -bola.left;
        } else {
            dois.score++;
            setTimeout(() => game.classList.add('idle'), 500);
            clearInterval(interval);
            // start();
        }
    }

    if(bola.x >= game.offsetWidth - bola.elem.offsetWidth - (dois.elem.offsetWidth - 2)) {
        if((bola.y + bola.elem.offsetHeight / 2 ) > dois.y && (bola.y + bola.elem.offsetHeight / 2 ) < dois.y + dois.elem.offsetHeight) {
            bola.left = -bola.left;
        } else {
            um.score++
            setTimeout(() => game.classList.add('idle'), 500);
            clearInterval(interval);
            // start();
        }
    }

    um.elem.style.setProperty('--y', um.y + 'px');
    dois.elem.style.setProperty('--y', dois.y + 'px');
    bola.elem.style.setProperty('--x', bola.x + 'px');
    bola.elem.style.setProperty('--y', bola.y + 'px');

}

document.addEventListener('keydown', e => {
    e.preventDefault();
    init();
    if(e.keyCode == 38 || e.which == 38) {
        um.top = -8;
    }
    if(e.keyCode == 40 || e.which == 40) {
        um.top = 8;
    }
}, false);

document.addEventListener('keyup', e => {
    e.preventDefault();
    init();
    if(e.keyCode == 38 || e.which == 38) {
        um.top = 0;
    }
    if(e.keyCode == 40 || e.which == 40) {
        um.top = 0;
    }
}, false);

upButton.onmousedown = e => {
    init();
    um.top = -8;
};

downButton.onmousedown = e => {
    init();
    um.top = 8;
};

upButton.onmouseup = e => {
    um.top = 0;
};

downButton.onmouseup = e => {
    um.top = 0;
};

upButton.ontouchstart = e => {
    init();
    um.top = -8;
};

downButton.ontouchstart = e => {
    init();
    um.top = 8;
};

upButton.ontouchend = e => {
    um.top = 0;
};

downButton.ontouchend = e => {
    um.top = 0;
};