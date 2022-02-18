'use strict'

const $input = document.querySelector('.input')
const $items = document.querySelector('.items')
const $addBtn = document.querySelector('.add-btn')

$input.addEventListener('keypress', (e) => {
  if (!e.target.value) return
  if (e.key === 'Enter') {
    addList(esd.target.value)
    e.target.value = ''
  }
})

$addBtn.addEventListener('click', (e) => {
  if (!$input.value) return
  addList($input.value)
  $input.value = ''
})

function addList(value) {
  const newLi = document.createElement('li')
  newLi.className = 'item'
  newLi.innerHTML = `  
    <span calss="item-description">${value}</span>
    <button class="delete-btn">
      <i class="fa fa-solid fa-trash " data-icon="trash"></i>
    </button>`
  $items.appendChild(newLi)
}

$items.addEventListener('click', (e) => {
  if (!e.target.dataset.icon) return
  const li = e.target.parentNode.parentNode
  $items.removeChild(li)
})
