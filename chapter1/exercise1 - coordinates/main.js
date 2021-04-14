const target = document.querySelector('.target');
const vertical = document.querySelector('.vertical');
const horizontal = document.querySelector('.horizontal');
const tag = document.querySelector('.tag');

document.addEventListener('mousemove', e => {
  const xPos = e.clientX + 'px';
  const yPos = e.clientY + 'px';

  target.style.left = xPos;
  target.style.top = yPos;
  vertical.style.left = xPos;
  horizontal.style.top = yPos;
  tag.style.left = xPos;
  tag.style.top = yPos;
  tag.innerHTML = `${xPos} , ${yPos}`;
});
