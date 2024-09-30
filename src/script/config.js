function showCustomConfirm(callback) {
    const confirmModal = document.getElementById('custom-confirm');
    const yesBtn = document.getElementById('confirm-yes');
    const noBtn = document.getElementById('confirm-no');

    confirmModal.style.display = 'flex';

    yesBtn.onclick = () => {
        confirmModal.style.display = 'none';
        callback(true);
    };

    noBtn.onclick = () => {
        confirmModal.style.display = 'none';
        callback(false);
    };
}

function darkmode() {
    let active = JSON.parse(localStorage.getItem('darkmode')) || false;
    const activer = document.querySelector('.tema-options');
    const marker = document.querySelector('.marquer');

    const enableDarkMode = () => {
        document.documentElement.style.setProperty('--tema2', 'rgb(8, 10, 17)');
        document.documentElement.style.setProperty('--tema', 'rgb(9, 9, 27)');
        document.documentElement.style.setProperty('--textAndBorder', 'rgb(255, 255, 255)');
        marker.style.transform = 'translate(182%)';
    }

    const disableDarkMode = () => {
        document.documentElement.style.setProperty('--tema2', 'rgb(255, 255, 255)');
        document.documentElement.style.setProperty('--tema', 'rgb(255, 255, 255)');
        document.documentElement.style.setProperty('--textAndBorder', 'rgb(8, 10, 17)');
        marker.style.transform = 'translate(0%)';
    }

    if (active) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }

    activer.addEventListener('click', () => {
        marker.style.transform = 'translate(100%)';
        active = !active;
        localStorage.setItem('darkmode', JSON.stringify(active));

        if (active) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    });
}

function OnOff() {
    let active = JSON.parse(localStorage.getItem('buttonState')) || false;
    const container = document.querySelectorAll('.activer');
    const indicator = document.querySelector('.activerb');

    if (active) {
        indicator.style.transform = 'translateX(100%)';
    } else {
        indicator.style.transform = 'translateX(0%)';
    }

    container.forEach((button) => {
        button.addEventListener('click', () => {
            if (!active) {
                indicator.style.transform = 'translateX(100%)';
                active = true;
            } else {
                indicator.style.transform = 'translateX(0%)';
                active = false;
            }
            localStorage.setItem('buttonState', JSON.stringify(active));
        });
    });
}

function customBackgound() {
    let active = JSON.parse(localStorage.getItem('customBackground')) || false;

    const container = document.querySelector('.planos-container');
    const button = document.querySelector('.planes-activer');

    if (active) {
        container.style.display = 'flex';
    } else {
        container.style.display = 'none';
    }

    button.addEventListener('click', () => {
        active = !active;
        localStorage.setItem('customBackground', JSON.stringify(active));

        if (active) {
            container.style.display = 'flex';
        } else {
            container.style.display = 'none';
        }
    });
}

function alterateTema() {
    const temas = document.querySelectorAll('.tema');
    const colorPicker = document.querySelector('.colorPicker');
    let TextAndBorderColor = JSON.parse(localStorage.getItem('TextAndBorder'));

    if (TextAndBorderColor) {
        document.documentElement.style.setProperty('--textAndBorder', TextAndBorderColor.toString());
    }

    const changeColor = (color) => {
        localStorage.setItem('TextAndBorder', JSON.stringify(color));

        document.documentElement.style.setProperty('--textAndBorder', color);
    };

    temas.forEach(tema => {
        tema.addEventListener('click', () => {
            const color = window.getComputedStyle(tema).backgroundColor;
            changeColor(color);
        });
    });

    colorPicker.addEventListener('input', (event) => {
        const color = event.target.value;
        changeColor(color);
    });
}

function modeOfView() {
    const storedSize = JSON.parse(localStorage.getItem('sizeOfCard'));

    let CardWidth = storedSize ? storedSize.largura : 250;
    let CardHeight = storedSize ? storedSize.altura : 250;

    let cardSize = {
        largura: CardWidth,
        altura: CardHeight
    }

    const options = document.querySelectorAll('.visu-option');

    options.forEach(option => {
        option.addEventListener('click', () => {
            const size = option.classList;
            document.getElementById('confirm-text').innerHTML = 'Isso mudará o modo de exibição dos Cards na tela inicial, continuar?';

            showCustomConfirm((confirm => {
                if (confirm) {
                    if (size.contains('big')) {
                        CardWidth = 250;
                        CardHeight = 250;
                    } else if (size.contains('medium')) {
                        CardWidth = 150;
                        CardHeight = 150;
                    } else if (size.contains('details')) {
                        CardWidth = 250;
                        CardHeight = 150;
                    } else if (size.contains('title')) {
                        CardWidth = 250;
                        CardHeight = 100;
                    }

                    cardSize = {
                        largura: CardWidth,
                        altura: CardHeight
                    };

                    localStorage.setItem('sizeOfCard', JSON.stringify(cardSize));
                }
            }))
        });
    });
}









window.addEventListener('DOMContentLoaded', () => {
    darkmode();
    OnOff();
    customBackgound();
    alterateTema();
    modeOfView();
});