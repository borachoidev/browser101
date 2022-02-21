//시작 버튼 게임 시작하기
// - 타이머 시작
// - 버튼 ㅁ로 바뀌기
// - 벌레 좌표뿌리기
// - 당근 좌표 뿌리기
// - 남은 당근 갯수 표시
let carrotCount = 10

// 타이머 만들기
function startTimer(time) {
  let timer
  let interval
  interval = setInterval(() => {
    if (time < 1) {
      clearTimeout(timer)
      clearInterval(interval)
    }

    timer = setTimeout(() => {
      time--
    }, 1000)
  }, 1000)
}

// 버튼 토글 이벤트

//컨테이너 크기 찾기
const $gameContainer = document.querySelector('.game__content')

function createItem(type) {
  const [x, y] = getPostion()
  const item = document.createElement('div')
  item.style.position = 'absolute'
  item.style.top = `${y}px`
  item.style.left = `${x}px`
  item.setAttribute('data-type', type.name)
  item.innerHTML = `<img src=${type.img} alt=${type.name} />`
  $gameContainer.appendChild(item)
}
createItem({ img: '../asset/img/bug.png', name: 'bug' })
createItem({ img: '../asset/img/carrot.png', name: 'carrot' })

function getPostion() {
  const left = $gameContainer.getBoundingClientRect().left
  const top = $gameContainer.getBoundingClientRect().top
  const right = $gameContainer.getBoundingClientRect().right
  const bottom = $gameContainer.getBoundingClientRect().bottom

  const x = Math.floor(Math.random() * (right - left) + left)
  const y = Math.floor(Math.random() * (bottom - top) + top)
  return [x, y]
}

// 당근 갯수 표시
