const grid = document.querySelector('#game-board'); // Seleciona o elemento HTML com o ID 'game-board' e o atribui à variável grid.

const characters = [ // Cria uma lista de personagens, cada um representado como uma string.
  'bruna',
  'cecilia',
  'clara',
  'cris',
  'ester',
  'hellen',
  'mateus',
  'mari',
  'nanda',
  'yas',
  'emy',
  'lauan',
  'ycaro',
  'luiza',
  'flavia',
  'karol'
];

const createElement = (tag, className) => { // Define uma função que cria um elemento HTML com uma tag específica e uma classe.
  const element = document.createElement(tag); // Cria um novo elemento HTML com a tag fornecida.
  element.className = className; // Define a classe do novo elemento.
  return element; // Retorna o novo elemento.
}

let firstCard = ''; // Inicializa a variável firstCard como uma string vazia para armazenar a primeira carta revelada.
let secondCard = ''; // Inicializa a variável secondCard como uma string vazia para armazenar a segunda carta revelada.

const checkEndGame = () => { // Define uma função para verificar se o jogo terminou.
  const disabledCards = document.querySelectorAll('.disabled-card'); // Seleciona todas as cartas desativadas (pares encontrados).

  if (disabledCards.length === 20) { // Verifica se todas as cartas (20 pares) foram desativadas.
    alert(`É isso galera, obrigada por tudo, pra sempre gestão Rita Lee!`); // Exibe um alerta indicando que o jogo terminou.
    resetCards();
  }
}

const checkForMatch = () => { // Define uma função para verificar se as duas cartas reveladas são iguais.
  const firstCharacter = firstCard.getAttribute('data-character'); // Obtém o atributo 'data-character' da primeira carta.
  const secondCharacter = secondCard.getAttribute('data-character'); // Obtém o atributo 'data-character' da segunda carta.

  if (firstCharacter === secondCharacter) { // Verifica se os personagens das duas cartas são iguais.

    firstCard.firstChild.classList.add('disabled-card'); // Adiciona a classe 'disabled-card' à primeira carta, desativando-a.
    secondCard.firstChild.classList.add('disabled-card'); // Adiciona a classe 'disabled-card' à segunda carta, desativando-a.

    firstCard = ''; // Redefine a variável firstCard.
    secondCard = ''; // Redefine a variável secondCard.

    checkEndGame(); // Chama a função para verificar se o jogo terminou.

  } else { // Se os personagens das cartas não forem iguais.
    setTimeout(() => { // Aguarda 500 milissegundos antes de executar o código abaixo.

      firstCard.classList.remove('reveal-card'); // Remove a classe 'reveal-card' da primeira carta, escondendo-a novamente.
      secondCard.classList.remove('reveal-card'); // Remove a classe 'reveal-card' da segunda carta, escondendo-a novamente.

      firstCard = ''; // Redefine a variável firstCard.
      secondCard = ''; // Redefine a variável secondCard.

    }, 500); // Tempo de espera de 500 milissegundos.
  }
}

const flipCard = ({ target }) => { // Define uma função para revelar a carta clicada.
  if (target.parentNode.className.includes('reveal-card')) { // Verifica se a carta já foi revelada.
    return; // Se já foi revelada, não faz nada.
  }

  if (firstCard === '') { // Se firstCard estiver vazio (nenhuma carta foi revelada ainda).
    target.parentNode.classList.add('reveal-card'); // Adiciona a classe 'reveal-card' à carta clicada, revelando-a.
    firstCard = target.parentNode; // Define firstCard como a carta clicada.

  } else if (secondCard === '') { // Se firstCard já estiver definido, mas secondCard estiver vazio.
    target.parentNode.classList.add('reveal-card'); // Adiciona a classe 'reveal-card' à carta clicada, revelando-a.
    secondCard = target.parentNode; // Define secondCard como a carta clicada.

    checkForMatch(); // Chama a função para verificar se as duas cartas reveladas são iguais.
  }
}

const createCard = (character) => { // Define uma função para criar uma carta com um personagem específico.
  const card = createElement('div', 'card'); // Cria um elemento 'div' com a classe 'card'.
  const front = createElement('div', 'face flipped'); // Cria um elemento 'div' com as classes 'face front' (frente da carta).
  const back = createElement('div', 'face back'); // Cria um elemento 'div' com as classes 'face back' (verso da carta).

  front.style.backgroundImage = `url('../images/${character}.png')`; // Define a imagem de fundo da frente da carta com o personagem.

  card.appendChild(front); // Adiciona a frente da carta ao elemento 'card'.
  card.appendChild(back); // Adiciona o verso da carta ao elemento 'card'.
  card.addEventListener('click', flipCard); // Adiciona um evento de clique à carta para revelá-la.
  card.setAttribute('data-character', character); // Define um atributo 'data-character' na carta com o nome do personagem.

  return card; // Retorna a carta criada.
}

const createBoard = () => { // Define uma função para carregar o jogo.
  const duplicandoCharacters = [...characters, ...characters]; // Duplica a lista de personagens para criar pares.

  const shuffle = duplicandoCharacters.sort(() => Math.random() - 0.5); // Embaralha os personagens aleatoriamente.

  shuffle.forEach((character) => { // Para cada personagem embaralhado
    const card = createCard(character); // Cria uma carta com o personagem.
    grid.appendChild(card); // Adiciona a carta ao elemento 'grid'.
  });
  revealCards(); // Mostra as cartas assim que o jogo começa
  setTimeout(unflipCards, 1000); // Chama a função para desvirar as cartas em 1 segundo (Tempo em milissegundos)
}

// Função para virar todas as cartas assim que o jogo é iniciado
const revealCards = () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => card.classList.add('reveal-card'));
}

// Função para desvirar as cartas após 1 segundo
const unflipCards = () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => card.classList.remove('reveal-card'));
}

const resetCards = () => {
  grid.innerHTML = ''; // Remove todas as cartas do tabuleiro
  firstCard = '';
  secondCard = '';
  createBoard(); // Recarrega o jogo
}

window.onload = () => { // Define uma função para ser executada quando a janela for carregada.
  createBoard(); // Chama a função para carregar o jogo.
}