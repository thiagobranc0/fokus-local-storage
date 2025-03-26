const btnAdicionarTarefa = document.querySelector(".app__button--add-task");
const formAdicionarTarefa = document.querySelector(".app__form-add-task");
const textArea = document.querySelector(".app__form-textarea");
const listaDeTarefas = document.querySelector(".app__section-task-list");
const btnCancelar = document.querySelector(".app__form-footer__button--cancel");
const paragrafoDescricaoTarefa = document.querySelector(
  ".app__section-active-task-description"
);

const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
let tarefaSelecionada = null;
let liTarefaSelecionada = null;

function atualizarTarefas() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function criarElementoTarefa(tarefa) {
  const li = document.createElement("li");
  li.classList.add("app__section-task-list-item");
  const svg = document.createElement("svg");
  svg.innerHTML = `<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>`;
  const paragrafo = document.createElement("p");
  paragrafo.classList.add("app__section-task-list-item-description");
  paragrafo.textContent = tarefa.descricao;

  const botao = document.createElement("button");
  botao.classList.add("app_button-edit");

  botao.onclick = () => {
    // const antigaDescricao = paragrafo.textContent;
    const novaDescrição = prompt("Qual a nova descrição da tarefa?");
    if (novaDescrição) {
      paragrafo.textContent = novaDescrição;
      tarefa.descricao = novaDescrição;
      atualizarTarefas();
    }
    // tarefas.forEach((tarefa) => {
    //   if (tarefa.descricao === antigaDescricao) {
    //     tarefa.descricao = novaDescrição;
    //     localStorage.setItem("tarefas", JSON.stringify(tarefas));
    //   }
    // });
  };

  const imgBotao = document.createElement("img");
  imgBotao.setAttribute("src", "/imagens/edit.png");
  botao.appendChild(imgBotao);

  li.appendChild(svg);
  li.appendChild(paragrafo);
  li.appendChild(botao);

  li.onclick = () => {
    const lisTarefas = listaDeTarefas.childNodes;
    lisTarefas.forEach((li) => {
      li.classList.remove("app__section-task-list-item-active");
    });

    if (tarefaSelecionada == tarefa) {
      paragrafoDescricaoTarefa.textContent = "";
      tarefaSelecionada = null;
      tarefaSelecionada = null;
      return;
    }

    tarefaSelecionada = tarefa;
    liTarefaSelecionada = li;
    paragrafoDescricaoTarefa.textContent = tarefa.descricao;

    li.classList.add("app__section-task-list-item-active");
  };
  return li;
}

btnAdicionarTarefa.addEventListener("click", () => {
  formAdicionarTarefa.classList.toggle("hidden");
});

function cancelaFormulario() {
  btnCancelar.addEventListener("click", () => {
    textArea.innerText = "";
    formAdicionarTarefa.classList.add("hidden");
  });
}

cancelaFormulario();

formAdicionarTarefa.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const tarefa = {
    descricao: textArea.value,
  };
  tarefas.push(tarefa);
  const elementoTarefa = criarElementoTarefa(tarefa);
  listaDeTarefas.appendChild(elementoTarefa);
  atualizarTarefas();
  textArea.value = "";
  formAdicionarTarefa.classList.add("hidden");
});

tarefas.forEach((tarefa) => {
  const elementoTarefa = criarElementoTarefa(tarefa);
  listaDeTarefas.appendChild(elementoTarefa);
});

document.addEventListener("FocoFinalizado", () => {
  if (tarefaSelecionada && liTarefaSelecionada) {
    liTarefaSelecionada.classList.remove("app__section-task-list-item-active");
    liTarefaSelecionada.classList.add("app__section-task-list-item-complete");
    liTarefaSelecionada
      .querySelector("button")
      .setAttribute("disabled", "disabled");
  }
});
