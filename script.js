let move_speed = 3;
let gravity = 0.5;
let bird = document.querySelector('.bird');
let background = document.querySelector('.game-container').getBoundingClientRect();
let score_val = document.querySelector('.score_val');
let message = document.querySelector('.message');
let restartButton = document.querySelector('.restart-button');

let game_state = 'Start';
let bird_dy = 0;

// Sounds
let jump_sound = document.getElementById('jump-sound');
let gameover_sound = document.getElementById('gameover-sound');
let score_sound = document.getElementById('score-sound');

// Key and Touch Events
document.addEventListener('keydown', (e) => {
    if (e.key === ' ' && game_state === 'Play') {
        bird_dy = -7;
        jump_sound.play();
    } else if (e.key === ' ' && game_state === 'Start') {
        startGame();
    }
});

document.body.addEventListener('touchstart', () => {
    if (game_state === 'Play') {
        bird_dy = -7;
        jump_sound.play();
    } else if (game_state === 'Start') {
        startGame();
    }
});

// Restart Button
restartButton.addEventListener('click', () => {
    resetGame();
    startGame();
});

function startGame() {
    message.style.display = 'none';
    restartButton.style.display = 'none';
    game_state = 'Play';
    bird.style.top = '40%';
    bird_dy = 0;
    score_val.innerHTML = '0';
    play();
}

function resetGame() {
    document.querySelectorAll('.pipe_sprite').forEach((pipe) => pipe.remove());
    game_state = 'Start';
    message.style.display = 'block';
    message.innerHTML = 'Press Space or Touch To Start Game';
    restartButton.style.display = 'none';
}

function play() {
    function applyGravity() {
        if (game_state !== 'Play') return;

        bird_dy += gravity;
        bird.style.top = bird.offsetTop + bird_dy + 'px';

        // Check for collision with boundaries
        if (bird.offsetTop <= 0 || bird.offsetTop + bird.offsetHeight >= background.height) {
            endGame();
        }

        requestAnimationFrame(applyGravity);
    }

    function movePipes() {
        if (game_state !== 'Play') return;
    
        let pipes = document.querySelectorAll('.pipe_sprite');
        pipes.forEach((pipe) => {
            let pipe_rect = pipe.getBoundingClientRect();
    
            if (pipe_rect.right <= 0) {
                pipe.remove();
            } else {
                // چیک کریں کہ برڈ اور پائپ کا کوئی تصادم نہ ہو
                if (
                    bird.getBoundingClientRect().left < pipe_rect.right &&
                    bird.getBoundingClientRect().right > pipe_rect.left &&
                    bird.getBoundingClientRect().top < pipe_rect.bottom &&
                    bird.getBoundingClientRect().bottom > pipe_rect.top
                ) {
                    endGame();
                }
    
                // اگر پائپ برڈ کے پیچھے جا رہا ہے تو سکور بڑھائیں
                if (
                    pipe_rect.right < bird.getBoundingClientRect().left &&
                    !pipe.scored
                ) {
                    score_val.innerHTML = +score_val.innerHTML + 1; // سکور بڑھائیں
                    score_sound.play();
                    pipe.scored = true; // اس پائپ کو سکور کیا ہوا نشان زد کریں
                }
    
                // پائپ کو حرکت دیں
                pipe.style.left = pipe.offsetLeft - move_speed + 'px';
            }
        });
    
        requestAnimationFrame(movePipes);
    }
    
    function createPipes() {
        if (game_state !== 'Play') return;

        let pipe_height = Math.floor(Math.random() * (background.height / 2)) + 50;
        let pipe_gap = 150;

        let pipe_top = document.createElement('div');
        pipe_top.className = 'pipe_sprite';
        pipe_top.style.height = pipe_height + 'px';
        pipe_top.style.left = '100%';
        document.querySelector('.game-container').appendChild(pipe_top);

        let pipe_bottom = document.createElement('div');
        pipe_bottom.className = 'pipe_sprite bottom';
        pipe_bottom.style.height = background.height - pipe_height - pipe_gap + 'px';
        pipe_bottom.style.left = '100%';
        document.querySelector('.game-container').appendChild(pipe_bottom);

        setTimeout(createPipes, 3000);
    }

    function endGame() {
        game_state = 'End';
        message.style.display = 'block';
        message.innerHTML = 'Game Over! Press Restart';
        restartButton.style.display = 'block';
        gameover_sound.play();
    }

    applyGravity();
    movePipes();
    createPipes();
}
