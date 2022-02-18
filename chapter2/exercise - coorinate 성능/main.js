const target = document.querySelector('.target')
const vertical = document.querySelector('.vertical')
const horizontal = document.querySelector('.horizontal')
const tag = document.querySelector('.tag')

addEventListener('load', () => {
  const targetRect = target.getBoundingClientRect()
  const targetHalfWidth = targetRect.width / 2
  const targetHalfHeight = targetRect.height / 2

  document.addEventListener('mousemove', (e) => {
    const xPos = e.clientX
    const yPos = e.clientY

    vertical.style.transform = `translateX(${xPos}px)`
    horizontal.style.transform = `translateY(${yPos}px)`
    target.style.transform = `translate(${xPos - targetHalfWidth}px, ${yPos - targetHalfHeight}px)`
    tag.style.transform = `translate(${xPos}px,${yPos}px)`

    tag.innerHTML = `${xPos}px , ${yPos}px`
  })
})
