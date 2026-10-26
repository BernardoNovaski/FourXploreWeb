/* 
   FOURXPLORE - script.js
   Funcionalidades: tema, validação, carrossel, abas, FAQ e modal
*/
/* 0. TEMA: MODO CLARO/ESCURO E 4 OPÇÕES DE COR */
function alternarTema() {
  // Liga/desliga a classe "escuro" na tag <body>
  document.body.classList.toggle("escuro");

  // Atualiza o texto do botão conforme o tema ativo
  let botao = document.getElementById("btnTema");
  if (document.body.classList.contains("escuro")) {
    botao.innerText = "☀️ Modo Claro";
  } else {
    botao.innerText = "🌙 Modo Escuro";
  }
}

function trocarCor(nome) {
  // Remove os 4 temas e aplica apenas o escolhido
  document.body.classList.remove("tema-verde", "tema-azul", "tema-roxo", "tema-laranja");
  document.body.classList.add("tema-" + nome);
}

/* 1. VALIDAÇÃO DO FORMULÁRIO (10 campos) */
function validarFormulario() {
  let nome = document.getElementById("bernardo_nome").value.trim();
  let email = document.getElementById("bernardo_email").value.trim();
  let telefone = document.getElementById("bernardo_telefone").value.trim();
  let idade = Number(document.getElementById("bernardo_idade").value);
  let senha = document.getElementById("bernardo_senha").value;
  let confirma = document.getElementById("bernardo_confirma").value;
  let perfil = document.querySelector("input[name='perfil']:checked");
  let passeio = document.getElementById("bernardo_passeio").value;
  let mensagem = document.getElementById("bernardo_mensagem").value.trim();
  let termos = document.getElementById("bernardo_termos").checked;
  let msg = document.getElementById("bernardo_msg");

  if (nome === "") {
    msg.innerText = "Preencha o campo nome!";
    msg.style.color = "red";
  }
  else if (email === "" || !email.includes("@") || !email.includes(".")) {
    msg.innerText = "Digite um e-mail válido!";
    msg.style.color = "red";
  }
  else if (telefone.length < 10) {
    msg.innerText = "Digite um telefone com DDD (mínimo 10 dígitos)!";
    msg.style.color = "red";
  }
  else if (idade < 18 || idade > 120) {
    msg.innerText = "Informe uma idade válida (mínimo 18 anos)!";
    msg.style.color = "red";
  }
  else if (senha.length < 6) {
    msg.innerText = "A senha deve ter pelo menos 6 dígitos!";
    msg.style.color = "red";
  }
  else if (senha !== confirma) {
    msg.innerText = "As senhas não coincidem!";
    msg.style.color = "red";
  }
  else if (perfil === null) {
    msg.innerText = "Escolha o seu perfil (Pessoa ou Empresa)!";
    msg.style.color = "red";
  }
  else if (passeio === "") {
    msg.innerText = "Selecione um passeio de interesse!";
    msg.style.color = "red";
  }
  else if (mensagem.length < 10) {
    msg.innerText = "A mensagem deve ter pelo menos 10 caracteres!";
    msg.style.color = "red";
  }
  else if (!termos) {
    msg.innerText = "Você precisa aceitar receber contato!";
    msg.style.color = "red";
  }
  else {
    msg.innerText = "Mensagem enviada com sucesso, " + nome + "!";
    msg.style.color = "green";
    document.getElementById("bernardo_formulario").reset();
  }
}

/*  2. CARROSSEL (8 imagens) */
let fotos = [
  "img/painel.jpg", "img/newtonPuppi.jpg", "img/igrejaMatriz.jpg", "img/velhoMoinho.jpg",
  "img/saltoBoaVista.jpg", "img/feiraNoturna.jpg", "img/feiraLouca.jpg", "img/mirSaltoBoaVista.jpg"
];

let legendas = [
  "Passeio 1: Rota da Louça",
  "Passeio 2: Parque Newton Püppi",
  "Passeio 3: Centro Histórico e Igreja Matriz",
  "Passeio 4: Velho Moinho",
  "Passeio 5: Salto Boa Vista",
  "Passeio 6: Feira Noturna",
  "Passeio 7: Feira da Louça",
  "Passeio 8: Mirante do Salto Boa Vista"
];

let indice = 0;

function mudar(direcao) {
  indice = indice + direcao;

  // Atualiza imagem, legenda e indicador
  document.getElementById("bernardo_foto").src = fotos[indice];
  document.getElementById("bernardo_foto").alt = legendas[indice];
  document.getElementById("bernardo_legenda").innerText = legendas[indice];
  document.getElementById("bernardo_indicador").innerText = "Imagem " + (indice + 1) + " de " + fotos.length;

  // Desabilita botões nos limites
  document.getElementById("bernardo_btnVoltar").disabled = (indice === 0);
  document.getElementById("bernardo_btnAvancar").disabled = (indice === fotos.length - 1);
}

// Evento de teclado: setas do teclado navegam no carrossel
document.addEventListener("keydown", function (evento) {
  // Não troca a imagem enquanto a pessoa digita no formulário
  let digitando = (evento.target.tagName === "INPUT" || evento.target.tagName === "TEXTAREA" || evento.target.tagName === "SELECT");

  if (evento.key === "ArrowRight" && !digitando && indice < fotos.length - 1) {
    mudar(1);
  } else if (evento.key === "ArrowLeft" && !digitando && indice > 0) {
    mudar(-1);
  } else if (evento.key === "Escape") {
    fecharModal();
  }
});

/* 3. SISTEMA DE ABAS (6 abas) */
function resetarTudo() {
  for (let i = 1; i <= 6; i++) {
    document.querySelector("#aba" + i).style.display = "none";
    document.querySelector("#btnAba" + i).classList.remove("ativo");
  }
}

function mostrarAba(numero) {
  resetarTudo();
  document.querySelector("#aba" + numero).style.display = "block";
  document.querySelector("#btnAba" + numero).classList.add("ativo");
}

/* 4. FAQ / ACCORDION (6 itens) */
const itens = document.querySelectorAll(".bernardo_item");

itens.forEach(function (item) {
  const botao = item.querySelector(".bernardo_acc_btn");

  botao.addEventListener("click", function () {
    const jaAberto = item.classList.contains("ativo");

    // Fecha todas as gavetas antes de abrir a selecionada
    itens.forEach(function (outroItem) {
      outroItem.classList.remove("ativo");
    });

    // Abre apenas se não estava aberta
    if (!jaAberto) {
      item.classList.add("ativo");
    }
  });
});

/* 5. MODAL DINÂMICA (estrutura única) */
function abrirModal(titulo, mensagem) {
  document.getElementById("tituloModal").innerText = titulo;
  document.getElementById("textoModal").innerText = mensagem;
  document.getElementById("fundoModal").style.display = "block";
}

function fecharModal() {
  document.getElementById("fundoModal").style.display = "none";
}
