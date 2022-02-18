'use strict'

const $input = document.querySelector('.input')
const $items = document.querySelector('.items')

$input.addEventListener('keypress', (e) => {
  if (!e.target.value) return
  if (e.key === 'Enter') {
    const item = createItem(e.target.value)
    console.log(item)
    $items.appendChild(item)
    e.target.value = ''
  }
})

function createItem(value) {
  const newLi = document.createElement('li')
  newLi.className = 'item'
  newLi.innerHTML = `  
    <span calss="item-description">${value}</span>
    <button class="delete-btn">
      <i class="fa fa-solid fa-trash " data-icon="trash"></i>
    </button>`
  return newLi
}
