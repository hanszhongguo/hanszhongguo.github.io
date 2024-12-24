document.getElementById('nameInput').addEventListener('input', function() {
    const name = this.value.trim();
    const welcomeMessage = document.getElementById('welcomeMessage');
    const greeting = document.getElementById('greeting');
    if (name.toLowerCase() === 'shi') {
        greeting.style.opacity = '0';
        setTimeout(() => {
            greeting.style.display = 'none';
            welcomeMessage.style.display = 'block';
            welcomeMessage.style.opacity = '1';
        }, 1000);
    } else {
        welcomeMessage.style.opacity = '0';
        setTimeout(() => {
            welcomeMessage.style.display = 'none';
            greeting.style.display = 'block';
            greeting.style.opacity = '1';
        }, 1000);
    }
});

document.getElementById('welcomeMessage').addEventListener('click', function() {
    const puzzleImage = document.getElementById('puzzleImage');
    const welcomeMessage = document.getElementById('welcomeMessage');
    welcomeMessage.style.opacity = '0';
    setTimeout(() => {
        welcomeMessage.style.display = 'none';
        puzzleImage.src = 'images/tower.jpg';
        puzzleImage.style.display = 'block';
        puzzleImage.style.opacity = '1';
    }, 1000);
});

let clickCount = 0;

document.getElementById('puzzleImage').addEventListener('click', function() {
    clickCount++;
    const overlayText = document.getElementById('overlayText');
    overlayText.style.display = 'block';
    typeText("The cold wild breezes around\n<span class='cursive'>THE TOWER</span>", overlayText);

    if (clickCount >= 10) {
        console.log('20 clicks reached, changing to jail.jpg');
        document.body.style.backgroundColor = 'black';
        document.querySelector('.puzzle-container').style.display = 'none';
        setTimeout(() => {
            const puzzleImage = document.getElementById('puzzleImage');
            puzzleImage.src = 'images/jail.jpg';
            puzzleImage.style.display = 'block';
            puzzleImage.style.opacity = '1';
            document.querySelector('.puzzle-container').style.display = 'block';
            console.log('jail.jpg should be displayed now');
        }, 1000);
    }
});

document.addEventListener('click', function(event) {
    const puzzleImage = document.getElementById('puzzleImage');
    if (puzzleImage && puzzleImage.src.includes('jail.jpg')) {
        console.log('jail.jpg clicked, changing to input mode');
        document.body.style.backgroundColor = 'white';
        document.querySelector('.puzzle-container').innerHTML = `
            <p id="greeting">Hello Shi <input type="text" id="nameInput" placeholder="I can see you"></p>
        `;
        document.getElementById('nameInput').addEventListener('input', function() {
            setTimeout(() => {
                console.log('Input detected, changing to gates.jpg');
                document.body.style.backgroundColor = 'black';
                document.querySelector('.puzzle-container').style.display = 'none';
                setTimeout(() => {
                    const puzzleImage = document.createElement('img');
                    puzzleImage.id = 'puzzleImage';
                    puzzleImage.src = 'images/gates.jpg';
                    puzzleImage.alt = 'Puzzle Image';
                    puzzleImage.className = 'photo';
                    puzzleImage.style.display = 'block';
                    puzzleImage.style.opacity = '1';
                    document.querySelector('.puzzle-container').appendChild(puzzleImage);
                    document.querySelector('.puzzle-container').style.display = 'block';
                    console.log('gates.jpg should be displayed now');
                }, 1000);
            }, 1000);
        });
    }
});

function typeText(text, element) {
    let i = 0;
    element.innerHTML = '';
    function typing() {
        if (i < text.length) {
            if (text.substring(i, i + 6) === '<span ') {
                const endSpan = text.indexOf('</span>', i) + 7;
                element.innerHTML += text.substring(i, endSpan);
                i = endSpan;
            } else {
                element.innerHTML += text.charAt(i);
                i++;
            }
            if (element.offsetWidth >= element.parentElement.offsetWidth) {
                element.innerHTML += '\n';
            }
            setTimeout(typing, 100);
        }
    }
    typing();
}