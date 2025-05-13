let seconds = 0;
let isPaused = false;
let posX = window.innerWidth / 2;
let alienCount = 0;

const alien = document.getElementById("alien");
const nave = document.getElementById("nave");

const timerElement = document.getElementById("timer");

const missilLeft = document.getElementById("missil-left");
const missilRight = document.getElementById("missil-right");
let quantidade = 0;

function Timer(sec) {
    const hour = String(Math.floor(sec / 3600)).padStart(2, '0');
    const min = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${hour}:${min}:${s}`;
}

function StartTimer() {
    setInterval(() => {
        if (!isPaused) {
            seconds++;
            timerElement.textContent = Timer(seconds);
        }
    }, 1000);
}

function launchAlien(id, startX) {
    const alien = document.getElementById(id);

    const maxX = window.innerWidth - alien.offsetWidth;
    startX = Math.max(0, Math.min(startX, maxX));

    let alienY = 0;
    alien.style.left = `${startX}px`;
    alien.style.top = `${alienY}px`;
    alien.style.display = "block";

    const fall = setInterval(() => {
        if (isPaused) return;

        alienY += 5;
        if (alienY > window.innerHeight) {
            clearInterval(fall);
            alien.style.display = "none";
        } else {
            alien.style.top = `${alienY}px`;

            // 🔴 Verifica colisão com a nave do jogador
            if (nave.style.display !== "none" && isColliding(alien, nave)) {
                alien.style.display = "none";
                clearInterval(fall);

                vidas--;
                updateLifeCount(vidas);

                // Verifica se o jogo acabou
                if (vidas <= 0) {
                    isPaused = true;
                    alert("Game Over! Suas vidas acabaram.");
                    // Você pode adicionar aqui um reset ou redirecionar para outra tela
                }
            }
        }
    }, 50);
}
function updateLifeCount(vidas) {
    const lifeElement = document.getElementById("life");
    lifeElement.textContent = `Vidas: ${vidas}`;
}



function launchAliens()
{
    launchAlien("alien1", 500);
    launchAlien("alien2", 700);
    launchAlien("alien3", 900);

}
setInterval(launchAlien, 5000);





// Função de detecção de colisão entre o míssil e a nave
function isColliding(missil, alien) {
    const missileRect = missil.getBoundingClientRect();
    const alienRect = alien.getBoundingClientRect();
    return !(missileRect.right < alienRect.left || 
             missileRect.left > alienRect.right || 
             missileRect.bottom < alienRect.top || 
             missileRect.top > alienRect.bottom);
}

// Função para atualizar o painel lateral com a contagem de naves abatidas
function updateAlienCount() {
    const countElement = document.getElementById("alienlist");
    countElement.textContent = `${alienCount}`;
}



document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        isPaused = !isPaused;
        const areaGame = document.getElementById("AreaGame");
        areaGame.style.animationPlayState = isPaused ? "paused" : "running";

    }

    if (!isPaused) {
        if (e.key === "ArrowLeft" || e.key === "a") {
            posX -= 15;
            
        } else if (e.key === "ArrowRight" || e.key === "d") {
            posX += 15;
            
        }

        // Limita dentro da tela
        const maxX = window.innerWidth - nave.offsetWidth;
        posX = Math.max(0, Math.min(posX, maxX));
        nave.style.left = `${posX}px`;

    }
});

const aliens = [
    document.getElementById("alien1"),
    document.getElementById("alien2"),
    document.getElementById("alien3")];
document.addEventListener("mousedown", () => {
    if (!isPaused) {
        // Define a posição inicial (de onde o míssil "sai")
        let posYL = window.innerHeight - 100;
        let posYR = window.innerHeight - 100;

        // Lança o míssil esquerdo
        if (quantidade === 0) {
            missilLeft.style.display = "block";
            missilLeft.style.top = `${posYL}px`;

            const launch = setInterval(() => {
                posYL -= 10;
                if (posYL < 0) {
                    clearInterval(launch);
                    missilLeft.style.display = "none";
                    quantidade = 1; // Pronto para lançar o míssil direito
                } else {
                    missilLeft.style.top = `${posYL}px`;
                    missilLeft.style.left = `${posX}px`;

                    // Verifica colisão do míssil esquerdo
                    for (let alien of aliens) {
                        if (alien.style.display !== "none" && isColliding(missilLeft, alien)) {
                            // Oculta tanto o míssil quanto a nave
                            alien.style.display = "none";
                            missilLeft.style.display = "none";
                            // Atualiza a contagem de naves abatidas
                            alienCount++;
                            updateAlienCount();
                            clearInterval(launch);
                            break;  // Sai do loop após a primeira colisão
                        }
                    }
                }
            }, 10);
        }

        // Lança o míssil direito
        else if (quantidade === 1) {
            missilRight.style.display = "block";
            missilRight.style.top = `${posYR}px`;

            const launch1 = setInterval(() => {
                posYR -= 10;
                if (posYR < 0) {
                    clearInterval(launch1);
                    missilRight.style.display = "none";
                    quantidade = 0; // Permite lançar o próximo míssil esquerdo
                } else {
                    missilRight.style.top = `${posYR}px`;
                    missilRight.style.left = `${posX}px`;

                    // Verifica colisão do míssil direito
                    for (let alien of aliens) {
                        if (alien.style.display !== "none" && isColliding(missilRight, alien)) {
                            // Oculta tanto o míssil quanto a nave
                            alien.style.display = "none";
                            missilRight.style.display = "none";
                            // Atualiza a contagem de naves abatidas
                            alienCount++;
                            updateAlienCount();
                            clearInterval(launch1);
                            break;  // Sai do loop após a primeira colisão
                        }
                    }
                }
            }, 10);
        }
    }
});

