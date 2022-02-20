'use strict'

const $items = document.querySelector('.items')
const $input = document.querySelector('.footer__input')
const $addBtn = document.querySelector('.footer__add-btn')
const $form = document.querySelector('#form')

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

let id = 0

function createItem(text) {
  const newLi = document.createElement('li')
  newLi.classList.add('item')

  newLi.innerHTML = `
      <span>${text}</span>
      <button class="item__delete-btn" data-id=${id}>
        <i class="fa fa-solid fa-trash " data-id=${id} aria-hidden="true"></i>
      </button>
    `
  newLi.dataset.id = id
  id++
  return newLi
}

$form.addEventListener('submit', (event) => {
  onAdd()
  event.preventDefault()
})

$items.addEventListener('click', (event) => {
  const id = event.target.dataset.id
  if (!id) return

  const toBeDelete = document.querySelector(`.item[data-id="${id}"]`)
  toBeDelete.remove()
})
