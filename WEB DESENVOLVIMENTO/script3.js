// Exercício 1
function executarEx1() {
    const valores = document.getElementById("input1").value.split(",").map(Number);
    let soma = 0;
    for (let i = 0; i < valores.length; i++) {
        soma += valores[i];
    }
    const media = soma / valores.length;
    document.getElementById("saida1").innerText = `Média: ${media.toFixed(2)}`;
}

// Exercício 2
const calcularMediaArrow = (...valores) => {
    return valores.reduce((acc, val) => acc + val, 0) / valores.length;
};

function executarEx2() {
    const valores = document.getElementById("input2").value.split(",").map(Number);
    const media = calcularMediaArrow(...valores);
    document.getElementById("saida2").innerText = `Média: ${media.toFixed(2)}`;
}

// Exercício 3
function executarEx3() {
    const valores = document.getElementById("input3").value.split(",").map(Number);
    const resultado = valores.map(num => `${num} é ${num % 2 === 0 ? "PAR" : "ÍMPAR"}`);
    document.getElementById("saida3").innerText = resultado.join(" | ");
}

// Exercício 4
function ehPerfeito(num) {
    let soma = 0;
    for (let i = 1; i < num; i++) {
        if (num % i === 0) soma += i;
    }
    return soma === num;
}

function executarEx4() {
    const valores = document.getElementById("input4").value.split(",").map(Number);
    const perfeitos = valores.filter(ehPerfeito);
    document.getElementById("saida4").innerText = `Perfeitos: ${perfeitos.join(", ")}`;
}

// Exercício 5
function executarEx5() {
    const json = document.getElementById("input5").value;
    try {
        const obj = JSON.parse(json);
        let resultado = "Propriedades:<br>";
        for (let chave in obj) {
            resultado += `${chave}: ${obj[chave]}<br>`;
        }
        document.getElementById("saida5").innerHTML = resultado;
    } catch (e) {
        document.getElementById("saida5").innerText = "JSON inválido!";
    }
}
