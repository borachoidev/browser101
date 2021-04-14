const button = document.querySelector('button');
const rabbit = document.querySelector('#rabbit');

button.addEventListener('click', () => {
  //내가 한 방식
  //   const x = rabbit.getBoundingClientRect().left;
  //   const y = rabbit.getBoundingClientRect().top;
  //   window.scrollTo(x, y);
  //강의에서 한 방식
  rabbit.scrollIntoView({ behavior: 'smooth', block: 'center' });
});
