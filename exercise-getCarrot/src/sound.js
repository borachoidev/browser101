const carrotSound = new Audio('./asset/sound/carrot_pull.mp3')
const bgSound = new Audio('./asset/sound/bg.mp3')
const alertSound = new Audio('./asset/sound/alert.wav')
const winSound = new Audio('./asset/sound/game_win.mp3')
const bugSound = new Audio('./asset/sound/bug_pull.mp3')

export function playCarrot() {
  playSound(carrotSound)
}
export function playBackground() {
  playSound(bgSound)
}
export function playAlert() {
  playSound(alertSound)
}
export function playWin() {
  playSound(winSound)
}
export function playBug() {
  playSound(bugSound)
}
export function stopBackground() {
  stopSound(bgSound)
}

function playSound(sound) {
  sound.currentTime = 0
  sound.play()
}

function stopSound(sound) {
  sound.pause()
}
