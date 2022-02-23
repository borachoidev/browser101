'use strict'
import PopUp from './popup.js'
import Game from './game.js'

// const CARROT_SIZE = 80
const CARROT_COUNT = 5
const BUG_COUNT = 5
const GAME_DURATION_SEC = 7

const game = new Game(GAME_DURATION_SEC, CARROT_COUNT, BUG_COUNT)
const gameFinishBanner = new PopUp()
game.setGameStopListener((reason) => {
  let message
  switch (reason) {
    case 'cancel':
      message = 'Replay❓'
      break
    case 'win':
      message = 'YOU WON 👍'
      break
    case 'lose':
      message = 'YOU LOST 🥲'
      break
    default:
      throw new Error('not valid reason')
  }

  gameFinishBanner.showWithText(message)
})
gameFinishBanner.setClickListener(() => {
  game.start()
})
