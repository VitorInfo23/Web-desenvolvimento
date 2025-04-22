const items = document.querySelectorAll('.item');
const container = document.querySelector('.flex-container');
const sizeInput = document.getElementById('size');
const squareBtn = document.getElementById('square');
const circleBtn = document.getElementById('circle');
const colorButtons = document.querySelectorAll('.color');
const flexDirectionSelect = document.getElementById('flexDirection');
const justifyContentSelect = document.getElementById('justifyContent');
const alignItemsSelect = document.getElementById('alignItems');

// Atualiza o tamanho dos itens
sizeInput.addEventListener('input', () => {
  const value = sizeInput.value + 'px';
  items.forEach(item => {
    item.style.width = value;
    item.style.height = value;
  });
});

// Altera o formato para quadrado
squareBtn.addEventListener('click', () => {
  items.forEach(item => {
    item.style.borderRadius = '0';
  });
  squareBtn.classList.add('selected');
  circleBtn.classList.remove('selected');
});

// Altera o formato para círculo
circleBtn.addEventListener('click', () => {
  items.forEach(item => {
    item.style.borderRadius = '50%';
  });
  circleBtn.classList.add('selected');
  squareBtn.classList.remove('selected');
});

// Altera a cor dos itens
colorButtons.forEach(button => {
  button.addEventListener('click', () => {
    const bg = button.style.backgroundColor;
    items.forEach(item => {
      item.style.backgroundColor = bg;
    });
  });
});

// Atualiza propriedades Flexbox do container
function updateFlexbox() {
  container.style.flexDirection = flexDirectionSelect.value;
  container.style.justifyContent = justifyContentSelect.value;
  container.style.alignItems = alignItemsSelect.value;
}

flexDirectionSelect.addEventListener('change', updateFlexbox);
justifyContentSelect.addEventListener('change', updateFlexbox);
alignItemsSelect.addEventListener('change', updateFlexbox);

// Inicia com configurações padrão
updateFlexbox();
