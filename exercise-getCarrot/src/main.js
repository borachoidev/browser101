'use strict'
import PopUp from './popup.js'
import Field from './field.js'

// const CARROT_SIZE = 80
const CARROT_COUNT = 5
const BUG_COUNT = 5
const GAME_DURATION_SEC = 7

const gameBtn = document.querySelector('.game__button')
const gameTimer = document.querySelector('.game__timer')
const gameScore = document.querySelector('.game__score')

const carrotSound = new Audio('./asset/sound/carrot_pull.mp3')
const bgSound = new Audio('./asset/sound/bg.mp3')
const alertSound = new Audio('./asset/sound/alert.wav')
const winSound = new Audio('./asset/sound/game_win.mp3')
const bugSound = new Audio('./asset/sound/bug_pull.mp3')

let started = false
let score = 0
let timer

const gameFinishBanner = new PopUp()

gameFinishBanner.setClickListener(() => {
  startGame()
})
const gameField = new Field(CARROT_COUNT, BUG_COUNT)
gameField.setClickListener(onItemClick)

function onItemClick(item) {
  console.log('ddf')
  if (!started) {
    return
  }

  if (item == 'carrot') {
    score++
    updateScoreBoard()

    if (score === CARROT_COUNT) {
      finishGame(true)
    }
  } else if (item == 'bug') {
    finishGame(false)
  }
}

gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame()
  } else {
    startGame()
  }
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
  gameFinishBanner.showWithText('replay?')
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
  gameFinishBanner.showWithText(win ? 'YOU WIN' : 'YOU LOST!')
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

function initGame() {
  score = 0
  gameScore.innerHTML = CARROT_COUNT
  gameField.init()
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
