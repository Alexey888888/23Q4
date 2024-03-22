const block = document.createElement('div');
block.className = 'block1';
let count = 0;
block.textContent = count.toString();

block.addEventListener('click', () => {
  count++;
  block.textContent = count.toString();
});

export default block;
