export default class Game {
  constructor() {
    this.gameBtn = document.querySelector('.game__button')
    this.gameTimer = document.querySelector('.game__timer')
    this.gameScore = document.querySelector('.game__score')

    this.started = false
    this.score = 0
    this.timer
  }
}
