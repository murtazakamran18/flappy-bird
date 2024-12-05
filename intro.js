// Get DOM Elements
const introPage = document.getElementById('index-page');
const gameContainer = document.getElementById('game-container');
const playButton = document.getElementById('play-button');
const backgroundMusic = document.getElementById('background-music');

// Play button functionality
playButton.addEventListener('click', () => {
    // Stop intro background music
    backgroundMusic.pause();

    // Hide intro page
    introPage.classList.add('hidden');

    // Show game container
    gameContainer.classList.remove('hidden');
});
