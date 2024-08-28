const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;


function flipCard(e) {
    const clickedDiv = e.target.closest('.memory-card');

    if (lockBoard) return;
    if (clickedDiv === firstCard) return;

    clickedDiv.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = clickedDiv;
        return;
    }
    secondCard = clickedDiv;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.princess === secondCard.dataset.princess;

    isMatch ? disableCards() : unFlipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unFlipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));