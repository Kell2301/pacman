const startButton = document.querySelector('.startButton')
const options = document.querySelector('.options')
const maze = document.querySelector('.maze')
const time = document.querySelector('.time')
let timeResult = 60
const score = document.querySelector('.score')
const resultGame = document.querySelector('.resultGame')
const pacmanDeathVoice = new Audio('assets/music/pacman_death.wav')
const eatPastillasWav = new Audio('assets/music/pacman_chomp.wav')
const eatJeringaWav = new Audio('assets/music/pacman_eatJeringa.wav')
const pacmanIntroMusic = new Audio('assets/music/pacman_beginning.wav')
const winnerText = document.querySelector('.winnerText')
const width = 20
let realMoves = []
let distances = []
let realMoves2 = []
let distances2 = []
let realMoves3 = []
let distances3 = []
let CepaCount = 0
let CepaCounter = 0
let keyVal = 0
let timerId = 0
const squares = []
let scoreResult = 0
let playerIndex = 21
let playerMove = 1
const cepaPositions = []
let direction = 'forward'
let currentStep = 0
let cepaStep1 = 0
let cepaStep2 = 0
let cepaStep3 = 0
const availableMoves = [-1, -width, 1, width]
let cepaAwayCount = 8
let timerCepaAway = 0
let timerCepaId = 0
let isGamePlay = true
let isCepaSick = false
let countIntroMusic = 10
let counterReset = false
let isCepaSick1 = false
let isCepaSick2 = false
let isCepaSick3 = false
let speedCepa = 1000
let  timerCheckScore =0

const laberintoArray = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1,
  1, 3, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 3, 1,
  1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1,
  1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1,
  1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1,
  1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1,
  1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1,
  1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1,
  1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1,
  1, 3, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 3, 1,
  1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
]
// Crear laberinto
const createLaberinto = () => {
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement('DIV')
    squares.push(square)
    maze.appendChild(square)

    if (laberintoArray[i] === 0) square.classList.add('way')
    else if (laberintoArray[i] === 1) square.classList.add('wall')
    else if (laberintoArray[i] === 3) square.classList.add('jeringa')
  }
}
//crea cepas
const  createCepa = () => {
  while (CepaCounter < 3) {
    const randCepa = parseInt(Math.floor(Math.random() * 399)) //Posicion aleatoria cepas
    if (squares[randCepa].classList.contains('way') && !squares[randCepa].classList.contains('player') && !squares[randCepa].classList.contains('jeringa') && randCepa !== 21) {
      cepaPositions.push(randCepa)
      CepaCounter++
    }
  }
  while (CepaCount < 3) {
    if (CepaCount === 0) squares[cepaPositions[CepaCount]].classList.add('cepa1')
    else if (CepaCount === 1) squares[cepaPositions[CepaCount]].classList.add('cepa2')
    else if (CepaCount === 2) squares[cepaPositions[CepaCount]].classList.add('cepa3')
    CepaCount++
  }

  cepaStep1 = cepaPositions[0]
  cepaStep2 = cepaPositions[1]
  cepaStep3 = cepaPositions[2]
}
//crea pastillas
const  createPastilla = () =>{
  return squares.forEach(square => {
    if (square.classList.contains('way') && !square.classList.contains('player') && !square.classList.contains('cepa1') && !square.classList.contains('cepa2') && !square.classList.contains('cepa3')) square.classList.add('pastilla')

  })
}
const createModal = () => {
const modalDiv = document.createElement('div')
const titleModal = document.createElement('h3')
const contentModal = document.createElement('div')

modalDiv.style.cssText="width:30vw;height:40vh;background-color:white;margin:auto;"
modalDiv.appendChild(titleModal)
modalDiv.appendChild(contentModal)

}
//Elimina las pastillas del laberinto
const clearPastilla = () => {
  return squares.forEach(square => {
    if (square.classList.contains('way') && !square.classList.contains('player') && !square.classList.contains('cepa1') && !square.classList.contains('cepa2') && !square.classList.contains('cepa3')) square.classList.remove('pastilla')
  })
}
createLaberinto()
squares[playerIndex].classList.add('player') 
createCepa()
createPastilla()
//calcula los mtos de las cepas
const calculateDistanceAndPositionForCepa = () => {
  realMoves = availableMoves.filter(availableMove => {
    return (!isCepaSick1) ? (!squares[cepaStep1 + availableMove].classList.contains('wall') && !squares[cepaStep1 + availableMove].classList.contains('cepa2') && !squares[cepaStep1 + availableMove].classList.contains('cepa3') && !squares[cepaStep1 + availableMove].classList.contains('cepaDebil')) :
      null
  })
  if (realMoves !== null) {
    distances = realMoves.map(realMove => {
      return Math.abs(cepaStep1 + realMove - playerIndex)
    })
  }
  realMoves2 = availableMoves.filter(availableMove2 => {
    return (!isCepaSick2) ? (!squares[cepaStep2 + availableMove2].classList.contains('wall') && !squares[cepaStep2 + availableMove2].classList.contains('cepa1') && !squares[cepaStep2 + availableMove2].classList.contains('cepa3') && !squares[cepaStep2 + availableMove2].classList.contains('cepaDebil')) : null
  })
  if (realMoves2 !== null) {
    distances2 = realMoves2.map(realMove2 => {
      return Math.abs(cepaStep2 + realMove2 - playerIndex)
    })
  }
  realMoves3 = availableMoves.filter(availableMove3 => {
    return (!isCepaSick3) ? (!squares[cepaStep3 + availableMove3].classList.contains('wall') && !squares[cepaStep3 + availableMove3].classList.contains('cepa1') && !squares[cepaStep3 + availableMove3].classList.contains('cepa2') && !squares[cepaStep3 + availableMove3].classList.contains('cepaDebil')) : null
  })
  if (realMoves3 !== null) {
    distances3 = realMoves3.map(realMove3 => {
      return Math.abs(cepaStep3 + realMove3 - playerIndex)
    })
  }
}
//Elimina todas las cepas del laberinto
const removeCepa = () => {
  squares[cepaStep1].classList.remove('cepa1')
  squares[cepaStep2].classList.remove('cepa2')
  squares[cepaStep3].classList.remove('cepa3')
}

const moveCepa = () => {
  removeCepa()
  calculateDistanceAndPositionForCepa()
  if (!isCepaSick1)
    cepaStep1 += realMoves[distances.indexOf(Math.min(...distances))]
  else
    cepaStep1 = 2
  if (!isCepaSick2)
    cepaStep2 += realMoves2[distances2.indexOf(Math.min(...distances2))]
  else
    cepaStep2 = 3
  if (!isCepaSick3)
    cepaStep3 += realMoves3[distances3.indexOf(Math.min(...distances3))]
  else
    cepaStep3 = 4
  if (!isCepaSick1)
    squares[cepaStep1].classList.add('cepa1')
  if (!isCepaSick2)
    squares[cepaStep2].classList.add('cepa2')
  if (!isCepaSick3)
    squares[cepaStep3].classList.add('cepa3')
  if (squares[cepaStep1].classList.contains('player') || squares[cepaStep2].classList.contains('player') || squares[cepaStep3].classList.contains('player')) {
    resultGame.innerText = 'Juego Terminado'
    clearInterval(timerId)
    timeResult = 0
    time.innerText = timeResult
    clearInterval(timerCepaId)
    clearInterval(timerCepaAway)
    pacmanDeathVoice.play()
    squares[playerIndex].classList.remove('player')
    squares[playerIndex].classList.add('deathpacman')
    squares[playerIndex]
    isGamePlay = false
  }
}
const  removeCepaick = () => {
  squares[cepaStep1].classList.remove('cepaDebil')
  squares[cepaStep2].classList.remove('cepaDebil')
  squares[cepaStep3].classList.remove('cepaDebil')
}
//Distancia de cepas azules
function cepaAway() {
  if (isCepaSick && isGamePlay) {
    removeCepa()
    removeCepaick()
    calculateDistanceAndPositionForCepa()
    if (!isCepaSick1)
      cepaStep1 += realMoves[distances.indexOf(Math.max(...distances))]
    else
      cepaStep1 = 2
    if (!isCepaSick2)
      cepaStep2 += realMoves2[distances2.indexOf(Math.max(...distances2))]
    else
      cepaStep2 = 3
    if (!isCepaSick3)
      cepaStep3 += realMoves3[distances3.indexOf(Math.max(...distances3))]
    else
      cepaStep3 = 4
    if (!isCepaSick1)
      squares[cepaStep1].classList.add('cepaDebil')
    if (!isCepaSick2)
      squares[cepaStep2].classList.add('cepaDebil')
    if (!isCepaSick3)
      squares[cepaStep3].classList.add('cepaDebil')
    if (squares[cepaStep1].classList.contains('player')) {
      squares[cepaStep1].classList.remove('cepaDebil')
      isCepaSick1 = true
    }
    if (squares[cepaStep2].classList.contains('player')) {
      squares[cepaStep2].classList.remove('cepaDebil')
      isCepaSick2 = true
    }
    if (squares[cepaStep3].classList.contains('player')) {
      squares[cepaStep3].classList.remove('cepaDebil')
      isCepaSick3 = true
    }
    cepaAwayCount--
    if (cepaAwayCount === 0) {
      clearInterval(timerCepaAway)
      removeCepaick()
      cepaAwayCount = 8
      timerCepaId = setInterval(moveCepa, speedCepa)
      isCepaSick = false
      return
    }
  }
}
const displayResultWinnerAndScore = ()=> {
  resultGame.innerText=''
  resultGame.classList.add('winner')
  clearInterval(timerCepaId)
  clearInterval(timerCepaAway)
  clearInterval(timerId)
  winnerText.innerText = 'Ganaste'
  isGamePlay = false
}
//Actualiza puntaje
const updateScore = () => {
  if (squares[playerIndex].classList.contains('jeringa')) {
    clearInterval(timerCepaId)
    isCepaSick = true
    if (isCepaSick)
      cepaAwayCount += 8
    speedCepa = 1500
    timerCepaAway = setInterval(cepaAway, speedCepa)
    scoreResult += 5
    timeResult += 5
    squares[playerIndex].classList.remove('jeringa')
    eatJeringaWav.play()
  } else if (squares[playerIndex].classList.contains('pastilla')) {
    scoreResult += 1
    eatPastillasWav.play()
    squares[playerIndex].classList.remove('pastilla')
  }
  score.innerText = scoreResult
}
timerCheckScore = setInterval(updateScore, 60)
//Pacman movimientos
function move() {
  
  currentStep = currentStep === 4 ? 0 : currentStep + 1
  const player = squares.find(square => square.classList.contains('player'))
  player.classList.remove('player')
  squares[playerIndex].setAttribute('data-step', currentStep)
  if (laberintoArray[playerIndex] === 0 && !squares[playerIndex].classList.contains('wall') || squares[playerIndex].classList.contains('jeringa') || squares[playerIndex].classList.contains('pastilla') || squares[playerIndex].classList.contains('cepaDebil')) {

    if (squares[playerIndex].classList.contains('cepaDebil')) {
        squares[playerIndex].classList.remove('cepaDebil')
        isCepaSick1 = true
    }
    if (squares[playerIndex].classList.contains('cepaDebil')) {
        squares[playerIndex].classList.remove('cepaDebil')
        isCepaSick2 = true
    }
    if (squares[playerIndex].classList.contains('cepaDebil')) {
        squares[playerIndex].classList.remove('cepaDebil')
        isCepaSick3 = true
    }
    laberintoArray[playerIndex] = 0
    if (counterReset) {
      if (scoreResult >= 183){
        displayResultWinnerAndScore()
        counterReset=false
      }
    }
    if (scoreResult === 180)
      displayResultWinnerAndScore()
      squares[playerIndex].classList.add('player')

  } else {  
    if (keyVal === 37) {
      playerIndex = playerIndex + 1
    } else if (keyVal === 38) {
      playerIndex = playerIndex + width
    } else if (keyVal === 39) {
      playerIndex = playerIndex - 1
    } else if (keyVal === 40) {
      playerIndex = playerIndex - width
    }
    squares[playerIndex].classList.add('player')
  }
  squares[playerIndex].setAttribute('data-direction', direction)
  squares[playerIndex].setAttribute('data-step', currentStep)
}
const createJeringa = () => {
  laberintoArray[61] = 3
  laberintoArray[78] = 3
  laberintoArray[321] = 3
  laberintoArray[338] = 3
  if (laberintoArray[61] === 3)
    squares[61].classList.add('jeringa')
  if (laberintoArray[78] === 3)
    squares[78].classList.add('jeringa')
  if (laberintoArray[321] === 3)
    squares[321].classList.add('jeringa')
  if (laberintoArray[338] === 3)
    squares[338].classList.add('jeringa')
}
//Tiempo para jugar
const timer = () => {
  clearInterval(timerId)
  timerId = setInterval(() => {
    timeResult--
    time.innerText = timeResult
    if (timeResult === 0) {
      clearInterval(timerId)
      clearInterval(timerCepaId)
      isGamePlay = false
      if (scoreResult < 180)
        resultGame.innerText = 'Juego Terminado'
      return
    }
  }, 1000)
}

const keyInputs = (e) =>{
  if (isGamePlay) {
    switch (e.keyCode) {
      case 37:
        // left
        keyVal = 37
        if (playerIndex % width > 0) {
          playerIndex--
          playerMove = playerMove - 1
          direction = 'backward'
          move()
        }
        break
      case 38:
        // up
        keyVal = 38
        if (playerIndex - width >= 0) {
          playerIndex -= width
          playerMove = playerMove + width
          direction = 'upward'
          move()
        }
        break
      case 39:
        // right
        keyVal = 39
        if (playerIndex % width < width - 1) {
          playerIndex++
          playerMove = playerMove + 1
          direction = 'forward'
          move()
        }
        break
      case 40:
        // down
        keyVal = 40
        if (playerIndex + width < width * width) {
          playerIndex += width
          playerMove = playerMove - width
          direction = 'downward'
          move()
        }
        break
    }
  } else
    return

}
//Dificultades
options.addEventListener('change', (e) => {
  if (e.target.value === 'Easy')
    speedCepa = 1000
  else if (e.target.value === 'Medium')
    speedCepa = 700
  else if (e.target.value === 'Hard')
    speedCepa = 200
})
//Iniciar juego
startButton.addEventListener('click', () => {
  document.addEventListener('keydown', keyInputs)
  pacmanIntroMusic.pause()

  timer()
  timerCepaId = setInterval(moveCepa, speedCepa)
  startButton.style.visibility = 'hidden'
})


