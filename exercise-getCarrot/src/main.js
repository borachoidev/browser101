const CARROT_SIZE = 80
const CARROT_COUNT = 10
const BUG_COUNT = 10
const GAME_DURATION_SEC = 5

const field = document.querySelector('.game__field')
const fieldRect = field.getBoundingClientRect()

const gameBtn = document.querySelector('.game__button')
const gameTimer = document.querySelector('.game__timer')
const gameScore = document.querySelector('.game__score')

const modal = document.querySelector('.modal')
const modalRefresh = document.querySelector('.modal__refresh')
const modalText = document.querySelector('.modal__message')

let started = false
let score = 0
let timer

const carrotSound = new Audio('../asset/sound/carrot_pull.mp3')
const bgSound = new Audio('../asset/sound/bg.mp3')
const alertSound = new Audio('../asset/sound/alert.wav')
const winSound = new Audio('../asset/sound/game_win.mp3')
const bugSound = new Audio('../asset/sound/bug_pull.mp3')

field.addEventListener('click', onFieldClick)
gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame()
  } else {
    startGame()
  }
})
modalRefresh.addEventListener('click', () => {
  startGame()
  hidePopUp()
})

function startGame() {
  started = true
  initGame()
  showStopButton()
  showTimerAndScore()
  startGameTimer()
  playSound(bgSound)
}

function stopGame() {
  started = false
  stopGameTimer()
  hideGameButton()
  showModalWithText('replay?')
  playSound(alertSound)
  stopSound(bgSound)
}

function finishGame(win) {
  started = false
  hideGameButton()
  if (win) playSound(winSound)
  else playSound(bugSound)
  stopGameTimer()
  stopSound(bgSound)
  showModalWithText(win ? 'YOU WIN' : 'YOU LOST!')
}

function showStopButton() {
  const icon = gameBtn.querySelector('.fa')
  icon.classList.add('fa-stop')
  icon.classList.remove('fa-play')
  gameBtn.style.visibility = 'visible'
}

function hideGameButton() {
  gameBtn.style.visibility = 'hidden'
}

function showTimerAndScore() {
  gameTimer.style.visibility = 'visible'
  gameScore.style.visibility = 'visible'
}

function showModalWithText(text) {
  modalText.innerText = text
  modal.classList.remove('modal--hide')
}

function hidePopUp() {
  modal.classList.add('modal--hide')
}

function initGame() {
  score = 0
  field.innerHTML = ''
  gameScore.innerHTML = CARROT_COUNT
  addItem('carrot', CARROT_COUNT, '../asset/img/carrot.png')
  addItem('bug', BUG_COUNT, '../asset/img/bug.png')
}

function onFieldClick(event) {
  if (!started) {
    return
  }

  const target = event.target
  if (target.matches('.carrot')) {
    target.remove()
    score++
    playSound(carrotSound)
    updateScoreBoard()

    if (score === CARROT_COUNT) {
      finishGame(true)
    }
  } else if (target.matches('.bug')) {
    finishGame(false)
  }
}

function playSound(sound) {
  sound.currentTime = 0
  sound.play()
}

function stopSound(sound) {
  sound.pause()
}

function updateScoreBoard() {
  gameScore.innerHTML = CARROT_COUNT - score
}

function addItem(className, count, imgPath) {
  const x1 = 0
  const y1 = 0
  const x2 = fieldRect.width - CARROT_SIZE
  const y2 = fieldRect.height - CARROT_SIZE
  for (let i = 0; i < count; i++) {
    const item = document.createElement('img')
    item.classList.add(className)
    item.setAttribute('src', imgPath)
    const x = randomNumber(x1, x2)
    const y = randomNumber(y1, y2)
    item.style.position = 'absolute'
    item.style.left = `${x}px`
    item.style.top = `${y}px`

    field.appendChild(item)
  }
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function startGameTimer(time) {
  let remainingTimeSec = GAME_DURATION_SEC
  updateTimerText(remainingTimeSec)
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer)
      finishGame(CARROT_COUNT === score)
      return
    }
    updateTimerText(--remainingTimeSec)
  }, 1000)
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  gameTimer.innerHTML = `${minutes}:${seconds}`
}

function stopGameTimer() {
  clearInterval(timer)
}
