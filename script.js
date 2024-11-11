let score = 0;
let currentWatchData = null;

// Load JSON data
async function loadWatchData() {
    const response = await fetch('ebay_watches.json');
    const data = await response.json();
    return data.findCompletedItemsResponse[0].searchResult[0].item;
}

// Function to randomly select a watch and display its details
async function setupGame() {
    const watches = await loadWatchData();
    selectRandomWatch(watches);
}

// Function to select a random watch and display its data
function selectRandomWatch(watches) {
    // Choose a random watch and extract data
    currentWatchData = watches[Math.floor(Math.random() * watches.length)];
    const title = currentWatchData.title[0];
    //const condition = currentWatchData.condition.conditionDisplayName[0];
    let watchImage = currentWatchData.galleryURL[0];

    // Modify image URL for higher resolution if needed
    if (watchImage.includes("s-l140")) {
        watchImage = watchImage.replace("s-l140", "s-l500"); // or "s-l1600" for even higher resolution
    }

    const priceUSD = parseFloat(currentWatchData.sellingStatus[0].convertedCurrentPrice[0].__value__);

    // Display the title as the watch name
    document.getElementById("watchName").textContent = `Watch Listing: ${title}`;

    // Display the image and start the guessing game
    document.getElementById("watchImage").src = watchImage;
    startGuessingGame(priceUSD);
}

// Function to handle the guessing game logic
function startGuessingGame(actualPrice) {
    // Reset result for each new watch
    document.getElementById("result").textContent = '';
    document.getElementById("score").textContent = `Total Score: ${score}`;

    // Update the event listener for the Submit Guess button
    document.getElementById("submitGuess").onclick = function() {
        const guess = parseInt(document.getElementById("guessInput").value);
        if (isNaN(guess)) return;

        const percent_difference = (1-Math.min(Math.abs((actualPrice - guess) / actualPrice),1)) * 10;
        const points = Math.ceil(percent_difference);
        score += points;

        document.getElementById("result").textContent = `Actual Price: $${actualPrice.toFixed(2)}. You scored ${points} points!`;
        document.getElementById("score").textContent = `Total Score: ${score}`;
    };
}

// Event listener for the Next Watch button
document.getElementById("nextWatch").addEventListener("click", function() {
    setupGame(); // Resets the game with a new random watch
});

// Initialize the game
setupGame();