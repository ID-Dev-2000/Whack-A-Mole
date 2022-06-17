let mainGridBox = document.getElementById('gridBox')
let gridSizeSelect = document.getElementById('gridSizeSelect')
let gridSizeOptions = document.getElementById('gridSizeOptions')

let gridSizeVariable = 3

gridSizeSelect.addEventListener('click', function() {
    // Mobile responsiveness: remove grid size options, set grid to default (3)
    let mediaQuery = window.matchMedia('(max-width: 500px)')

    // Sub-optimal solution, should use slice alternative
    if (mediaQuery.matches) {
        gridSizeSelect.options[3].hidden = true
        gridSizeSelect.options[4].hidden = true
        gridSizeSelect.options[5].hidden = true
    }
})

gridSizeSelect.addEventListener('change', function() {
    gridSizeVariable = gridSizeSelect.options[gridSizeSelect.selectedIndex].value
    // update grid box upon user input
    mainGridBox.innerHTML = ''
    for (i=1; i <= gridSizeVariable; i++) { 
        let lineRowDiv = document.createElement('div')
        lineRowDiv.classList.add(`gridContainer${i}`)
        mainGridBox.appendChild(lineRowDiv)
        for (j=1; j <= gridSizeVariable; j++) {
            let identityValue = lineRowDiv.className.slice(-1)
            let singleBoxAsDiv = document.createElement(`div`)
            singleBoxAsDiv.setAttribute('id', `i${(identityValue * j) * j}`)
            singleBoxAsDiv.classList.add('gridSquare')
            lineRowDiv.appendChild(singleBoxAsDiv)
        }
    }
})

// Draw grid box on initial load
for (i=1; i <= gridSizeVariable; i++) {
    let lineRowDiv = document.createElement('div')
    lineRowDiv.classList.add(`gridContainer${i}`)
    mainGridBox.appendChild(lineRowDiv)
    for (j=1; j <= gridSizeVariable; j++) {
        let identityValue = lineRowDiv.className.slice(-1)
        let singleBoxAsDiv = document.createElement(`div`)
        singleBoxAsDiv.setAttribute('id', `i${(identityValue * j) * j}`)
        singleBoxAsDiv.classList.add('gridSquare')
        lineRowDiv.appendChild(singleBoxAsDiv)
    }
}

let playButton = document.getElementById('playButton')
let scoreTracker = document.getElementById('scoreTracker')
let difficultySlider = document.getElementById('difficultySlider')
let gamePoints = 0

function pointHandler() {
    gamePoints++
    scoreTracker.innerHTML = `Score: ${gamePoints}/5`
}

function handleColorInGridItem() {
    // Randomly selects grid item
    let randomlySelectedRowValue = Math.floor(Math.random() * gridSizeVariable)
    let randomlySelectedColumnValue = Math.floor(Math.random() * gridSizeVariable)
    // Creates clone of grid item, used to prevent infinite clicks, removes event listener
    let gridItemToBeTemporarilyModified = mainGridBox.children[randomlySelectedRowValue].children[randomlySelectedColumnValue]
    let gridItemClone = gridItemToBeTemporarilyModified.cloneNode(true)
    gridItemToBeTemporarilyModified.style.backgroundColor = 'lightBlue'
    gridItemToBeTemporarilyModified.addEventListener('click', function() {
        pointHandler()
        gridItemToBeTemporarilyModified.style.backgroundColor = 'lightGreen'
    }, {once: true})
    setTimeout(function() {
        gridItemToBeTemporarilyModified.style.backgroundColor = 'white'
        // Replaces grid item after color changes
        gridItemToBeTemporarilyModified.parentNode.replaceChild(gridItemClone, gridItemToBeTemporarilyModified)
    }, difficultySlider.value)
}

// Starts game, disables play button to indicate to user that game has began
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
