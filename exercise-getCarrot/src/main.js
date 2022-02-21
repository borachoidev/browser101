const $gameContainer = document.querySelector('.game__content')
const $startBtn = document.querySelector('.controler')
const $timer = document.querySelector('.timer')
const $rest = document.querySelector('.rest')
const DEFAULT_CARROT = 10
const DEFAULT_TIME = 10
let isStart = false
let carrotCount = DEFAULT_CARROT
let limit = DEFAULT_TIME
let timer
let interval
const bg = new Audio('../asset/sound/bg.mp3')
const win = new Audio('../asset/sound/game_win.mp3')
//시작 버튼 게임 시작하기
$startBtn.addEventListener('click', () => {
  isStart = !isStart
  if (!isStart) {
    finishGame()
    openModal('REPLAY?')

    return
  }
  startGame()
})

function startGame() {
  bg.currentTime = 0

  bg.volume = 0.1
  win.pause()
  bg.play()
  //게임 초기화
  $gameContainer.innerHTML = ''
  carrotCount = DEFAULT_CARROT
  limit = DEFAULT_TIME
  $startBtn.innerHTML = `<i class="fa-solid fa-stop fa"></i>`
  for (let i = 0; i < 10; i++) {
    createItem({ img: '../asset/img/carrot.png', name: 'carrot' })
    createItem({ img: '../asset/img/bug.png', name: 'bug' })
  }
  $rest.innerHTML = carrotCount
  $timer.innerHTML = `0:${limit}`
  startTimer(limit)
}

// 타이머 만들기
function startTimer(time) {
  interval = setInterval(() => {
    $timer.innerHTML = `0:${time}`
    timer = setTimeout(() => {
      --time
    }, 1000)

    if (time < 1) {
      finishGame()
      openModal('YOU LOST!')
    }
  }, 1000)
}

//컨테이너 크기 찾기
function createItem(type) {
  const [x, y] = getPostion()
  const item = document.createElement('div')
  item.style.position = 'absolute'
  item.classList.add('game__item')
  item.style.top = `${y}px`
  item.style.left = `${x}px`
  item.innerHTML = `<img src=${type.img} alt=${type.name} data-type="${type.name}" />`
  $gameContainer.appendChild(item)
}

function getPostion() {
  const left = $gameContainer.getBoundingClientRect().left + 25
  const top = $gameContainer.getBoundingClientRect().top + 25
  const right = $gameContainer.getBoundingClientRect().right - 75
  const bottom = $gameContainer.getBoundingClientRect().bottom - 80

  const x = Math.floor(Math.random() * (right - left) + left)
  const y = Math.floor(Math.random() * (bottom - top) + top)
  return [x, y]
}

const $modalBtn = document.querySelector('.modal__button')
$modalBtn.addEventListener('click', () => {
  const $modal = document.querySelector('.modal')
  $modal.classList.remove('visible')
  const audio = new Audio('../asset/sound/alert.wav')
  audio.volume = 0.1
  audio.play()
  startGame()
})

$gameContainer.addEventListener('click', (event) => {
  if (!event.target.dataset.type) {
    return
  }

  if (event.target.dataset.type === 'bug') {
    const audio = new Audio('../asset/sound/bug_pull.mp3')
    audio.volume = 0.1
    audio.play()
    finishGame()
    openModal('YOU LOST!')
    return
  }

  const carrot = event.target
  const audio = new Audio('../asset/sound/carrot_pull.mp3')
  audio.volume = 0.1
  audio.play()
  carrot.remove()
  carrotCount--
  $rest.innerHTML = carrotCount
  if (limit > 0 && carrotCount === 0) {
    openModal('YOU WON!')
    win.currentTime = 0
    win.volume = 0.1
    win.play()
    finishGame()
  }
})

function openModal(content) {
  const $modalContent = document.querySelector('.modal__content')
  const $modal = document.querySelector('.modal')
  $modal.classList.add('visible')
  $modalContent.innerText = content
}

function finishGame() {
  bg.pause()
  clearTimeout(timer)
  clearInterval(interval)
  $startBtn.innerHTML = `<i class="fa-solid fa-play fa"></i>`
}
