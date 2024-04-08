import './style.css';

function test() {
  const testBox = document.createElement('div');
  testBox.className = 'test-box';
  document.body.append(testBox);
  testBox.addEventListener('click', () => {
    testBox.classList.toggle('test-box-2');
    console.log('Hello');
  });
}

test();
