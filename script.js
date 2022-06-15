let mainGridBox = document.getElementById('gridBox')

for (i=1; i <= 3; i++) {
    let lineRowDiv = document.createElement('div')
    lineRowDiv.classList.add(`gridContainer${i}`)
    mainGridBox.appendChild(lineRowDiv)
    for (j=1; j <= 3; j++) {
        let identityValue = lineRowDiv.className.slice(-1)
        let singleBoxAsDiv = document.createElement(`div`)
        singleBoxAsDiv.setAttribute('id', `i${(identityValue * j) * j}`)
        singleBoxAsDiv.classList.add('gridSquare')
        lineRowDiv.appendChild(singleBoxAsDiv)
    }
}

let playButton = document.getElementById('playButton')
let scoreTracker = document.getElementById('scoreTracker')
let gamePoints = 0

function pointHandler() {
    gamePoints++
    scoreTracker.innerHTML = `Score: ${gamePoints}/5`
}

function handleColorInGridItem() {
    let randomlySelectedRowValue = Math.floor(Math.random() * 3)
    let randomlySelectedColumnValue = Math.floor(Math.random() * 3)
    let gridItemToBeTemporarilyModified = mainGridBox.children[randomlySelectedRowValue].children[randomlySelectedColumnValue]
    gridItemToBeTemporarilyModified.style.backgroundColor = 'lightBlue'
    gridItemToBeTemporarilyModified.addEventListener('click', pointHandler, {once: true})
    setTimeout(function() {
        gridItemToBeTemporarilyModified.style.backgroundColor = 'white'
    }, 350)
}

playButton.addEventListener('click', function() {
    playButton.disabled = true
    gamePoints = 0
    scoreTracker.innerHTML = `Score: ${gamePoints}/5`
    let endValue = 0
    let gameInterval = setInterval(function() {
        endValue++
        handleColorInGridItem()
        if (endValue == 5) {
            clearInterval(gameInterval)
            playButton.disabled = false
        }
    }, 2000)
})
