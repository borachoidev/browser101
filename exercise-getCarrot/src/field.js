'use strict'

const carrotSound = new Audio('./asset/sound/carrot_pull.mp3')
const CARROT_SIZE = 80

export default class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount
    this.bugCount = bugCount

    this.field = document.querySelector('.game__field')
    this.fieldRect = this.field.getBoundingClientRect()
    this.field.addEventListener('click', this.onClick)
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick
  }
  init() {
    this.field.innerHTML = ''
    this._addItem('carrot', this.carrotCount, './asset/img/carrot.png')
    this._addItem('bug', this.bugCount, './asset/img/bug.png')
  }

  _addItem(className, count, imgPath) {
    const x1 = 0
    const y1 = 0
    const x2 = this.fieldRect.width - CARROT_SIZE
    const y2 = this.fieldRect.height - CARROT_SIZE
    for (let i = 0; i < count; i++) {
      const item = document.createElement('img')
      item.classList.add(className)
      item.setAttribute('src', imgPath)
      const x = randomNumber(x1, x2)
      const y = randomNumber(y1, y2)
      item.style.position = 'absolute'
      item.style.left = `${x}px`
      item.style.top = `${y}px`
      this.field.appendChild(item)
    }
  }

  onClick(event) {
    const target = event.target
    if (target.matches('.carrot')) {
      target.remove()
      playSound(carrotSound)
      console.log(this.onItemClick)
      this.onItemClick && this.onItemClick('carrot')
    } else if (target.matches('.bug')) {
      this.onItemClick && this.onItemClick('bug')
    }
  }
}

function playSound(sound) {
  sound.currentTime = 0
  sound.play()
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}
