const cursor = document.querySelector('.cursor')
const holes = [...document.querySelectorAll('.hole')]
const scoreEl = document.querySelector('.score span')
const time = document.querySelector('.time span')
let score = 0
let tijd = 15

const sound = new Audio("assets/smash.mp3")

function run(){
    const i = Math.floor(Math.random() * holes.length)
    const hole = holes[i]
    let timer = null

    const img = document.createElement('img')
    img.classList.add('mole')
    img.src = 'assets/mole.svg'

    img.addEventListener('click', () => {
        score += 1
        sound.play()
        scoreEl.textContent = score
        img.src = 'assets/dead.png'
        clearTimeout(timer)
        setTimeout(() => {
            hole.removeChild(img)
            run()
        }, 500)
    })

    hole.appendChild(img)

    timer = setTimeout(() => {
        hole.removeChild(img)
        run()
    }, 1500)

}
run()

function gameTimer(){
    if (tijd == 0){
      tijd = 15;
        alert('De Tijd Is Om')
        clearInterval(gameTimer)
        
    
    }
    --tijd
    console.log(tijd)
    time.textContent = tijd
}

setInterval(gameTimer, 1000);

window.addEventListener('mousemove', e => {
    cursor.style.top = e.pageY + 'px'
    cursor.style.left = e.pageX + 'px'
})
window.addEventListener('mousedown', () => {
    cursor.classList.add('active')
})
window.addEventListener('mouseup', () => {
    cursor.classList.remove('active')
})



