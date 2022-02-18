'use strict'

const $items = document.querySelector('.items')
const $input = document.querySelector('.footer__input')
const $addBtn = document.querySelector('.footer__add-btn')

function onAdd() {
  const text = $input.value
  if (text === '') {
    $input.focus()
    return
  }
  const item = createItem(text)
  $items.appendChild(item)
  item.scrollIntoView({ block: 'center' })
  $input.value = ''
  $input.focus()
}

function createItem(text) {
  const newLi = document.createElement('li')
  newLi.className = 'item'

  const span = document.createElement('span')
  span.textContent = text

  const deleteBtn = document.createElement('button')
  deleteBtn.className = 'item__delete-btn'
  deleteBtn.innerHTML = ` <i class="fa fa-solid fa-trash " data-icon="trash"></i>`

  deleteBtn.addEventListener('click', () => {
    $items.removeChild(newLi)
  })
  newLi.appendChild(span)
  newLi.appendChild(deleteBtn)

  return newLi
}

$addBtn.addEventListener('click', (e) => {
  onAdd()
})

$input.addEventListener('keypress', (e) => {
  if (e.key !== 'Enter') return
  onAdd()
})
