import 'modern-normalize';
import './style.scss';

function test() {
  let i = 0;
  const testBox = document.createElement('div');
  testBox.className = 'test-box';
  document.body.append(testBox);
  testBox.addEventListener('click', () => {
    testBox.classList.toggle('test-box-2');
    i += 1;
    console.log(i);
  });
}

test();
