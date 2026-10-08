const cursor = document.getElementById("cursor");
let x = 0;
let y = 0;
let targetX = 0;
let targetY = 0;

addEventListener('pointermove', evento => {
    targetX = evento.clientX;
    targetY = evento.clientY;
    cursor.style.opacity = 1;
});

(function f() {
    x = targetX;
    y = targetY;
    cursor.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(f);
})();

function FormatarTelefone() {

    const inputTel = document.getElementById("inpTel");

    // 1. Remove qualquer caractere que NÃO seja um número (letras, parênteses antigos, hifens)
    let apenasNumeros = inputTel.value.replace(/\D/g, "");

    // 2. Aplica a máscara dinamicamente com base na quantidade de números digitados
    if (apenasNumeros.length > 0) {
        // Coloca o DDD entre parênteses: (XX
        apenasNumeros = apenasNumeros.replace(/^(\d{2})/, "($1");
    }
    if (apenasNumeros.length > 3) {
        // Fecha o parênteses do DDD e adiciona o espaço: (XX) X
        apenasNumeros = apenasNumeros.replace(/^(\(\d{2})(\d)/, "$1) $2");
    }
    if (apenasNumeros.length > 9) {
        // Se for celular (11 dígitos), o hífen vai depois do 5º número: (XX) 9XXXX-XXXX
        // Se for fixo (10 dígitos), o hífen vai depois do 4º número: (XX) XXXX-XXXX
        if (apenasNumeros.length > 13) {
            apenasNumeros = apenasNumeros.replace(/^(\(\d{2}\))\s(9)(\d{4})(\d{4}).*/, "$1 $2 $3-$4");
        } else {
            apenasNumeros = apenasNumeros.replace(/^(\(\d{2}\)\s\d{4})(\d{4}).*/, "$1-$2");
        }
    }

    // 3. Atualiza o valor do input na tela com a máscara aplicada
    inputTel.value = apenasNumeros;
}

function FormatarEmail() {
    const inputEmail = document.getElementById("inpEmail");

    let emailLimpo = inputEmail.value.replace(/\s/g, "").toLowerCase();
    inputEmail.value = emailLimpo;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailLimpo)) {
        return false;
    }

    return true;
}

function EnviarFormulario() {
    if (FormatarEmail()) {
        document.getElementById("inpNome").value = "";
        document.getElementById("inpTel").value = "";
        document.getElementById("inpEmail").value = "";
        document.getElementById("inpMensagem").value = "";
        window.alert("Formulário limpo!");
    }
    else {
        window.alert("Email inválido! Por favor, insira um email válido.");
    }
}