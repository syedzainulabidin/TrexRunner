const hero = document.querySelector('.hero'); //hero
const villan = document.querySelector('.villan'); //villan
let gameover = document.querySelector('.gameover'); // gameover
let isJumping = false;
let BottomValue = 0; // starting position
const minBottom = 0; // position when jumping
const maxBottom = 65; // position to return to
let isMoving = false;
let count = 200; // starting villan position
let vertical = 0; // first vertical position of villan
let score = 0;
function jumpEffect() {
    if (isJumping) return; //Not allowing multiple jumps before ending previous jump
    isJumping = true;
    let direction = 1; // 1 = positive , -1 = negative
    const speed = 1; // how much percant should hero move in single setTimeOut
    const jumpInterval = setInterval(() => {
        BottomValue += speed * direction; // increament in hero bottom when direction is positive OR decreament in hero bottom when direction is negative
        hero.style.bottom = `${BottomValue}%`; // setting the value
        if (BottomValue >= maxBottom) { //checking if hero hit's the top
            direction = 0; // hold that position for some time in air
            setTimeout(() => {
                direction = -1; // assigning negative value to direction , to decreament the hero bottom
            }, 200)

        }
        if (BottomValue <= minBottom) { // checking if one jump is completed
            clearInterval(jumpInterval); // stoping futher movements in function
            isJumping = false; // ready for the next jump
        }
    }, 5);
    sendVillan(0) // function to send villan with an argument to make the first villan's bottom 0 
}
function sendVillan(vertical) {
    if (isMoving == true) return; // avoiding multiple jumps
    if (vertical == 64) { // changing villan's bottom according to the argument passed to sendVillan()
        villan.style.bottom = vertical + "%";
        villan.style.transform = 'scaleX(-1) rotate(180deg)';
    }
    else if (vertical == 0) { // changing villan's bottom according to the argument passed to sendVillan()
        villan.style.bottom = vertical + "%";
        villan.style.transform = 'scaleX(1) rotate(0deg)';
    }
    let dragInterval = setInterval(() => {
        if (count <= 200 && count >= (-11)) { //checking if the villan is between -11% and 200%
            villan.style.left = count + "%"; // setting villan value to count;
        }
        else { // if the villan has passed the hero, then
            isMoving = false; // ready to come again
            count = 100; // setting villan's left to 100%
            vertical = Math.floor(Math.random() * 2) == 0 ? 0 : 64 // Generate Either 0 OR 64
            sendVillan(vertical); // Run function Again with the Randomly generated 0 OR 64
            clearInterval(dragInterval); // Stoping the Interval
            score++; // Increament in Score
        }
        let villanLeft = villan.style.left.replace("%", ""); // Getting VIllan's Left Value in Numbers
        let heroTop = hero.style.bottom.replace("%", ""); // Getting Hero's Bottom in Numbers
        if (villanLeft <= 26 && villanLeft >= -4 && vertical == 0 && heroTop < 37) { // checking the imapact if the villan's bottom is 0
            clearInterval(dragInterval) //Stoping Interval
            gameOver(score) //Gameover function with the current score argument
        }
        if (villanLeft <= 26 && villanLeft >= -4 && vertical == 64 && heroTop > 29) { // checking the imapact if the villan's bottom is 64
            clearInterval(dragInterval) //Stoping Interval
            gameOver(score) //Gameover function with the current score argument
        }
        document.querySelector('.score').innerHTML = score; //Update Score in-game, when the setInterval is ended (villan passed the hero)
        count--; // Decreament in the Villan's Left
    }, 8)
    isMoving = true; // Not allowing function to run again
}

function gameOver(points) { //Function to display after the impact
    gameover.style.zIndex = 0;
    gameover.innerHTML = `<b>Game Over</b></br> Your Score: ${points} </br><button onclick="location.reload()">Play Again</button>`; //displaying the score and button to reload
    document.querySelector('#hero-char').setAttribute('src', 'assets/dino.png'); // changing hero's image to a skeleton
    window.removeEventListener('keydown', jumpEffect); // removing event listener on keydown and click (tap)
    window.removeEventListener('click', jumpEffect);
    window.addEventListener('keydown', () => { location.reload() });
    window.addEventListener('click', () => { location.reload() });
}

window.addEventListener('keydown', jumpEffect);
window.addEventListener('click', jumpEffect);