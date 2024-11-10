const EUR_TO_USD_RATE = 1.1;
let score = 0;
let currentWatchData = null;

// Load JSON data
async function loadWatchData() {
    const response = await fetch('watch_data_fixed.json');
    const data = await response.json();
    return data;
}

// Function to randomly select a watch and display its details
async function setupGame() {
    const data = await loadWatchData();
    const watches = Object.values(data.watch);

    // Select and display a random watch
    selectRandomWatch(watches);
}

// Function to select a random watch and display its data
function selectRandomWatch(watches) {
    // Choose a random watch and extract data
    currentWatchData = watches[Math.floor(Math.random() * watches.length)];
    const { brand, name, reference_number, images } = currentWatchData;
    const watchImage = images[0];
    const priceEUR = parseFloat(brand.pricerange_end);
    const priceUSD = priceEUR * EUR_TO_USD_RATE;

    // Display the brand, watch name, and reference number
    document.getElementById("brandName").textContent = `Brand: ${brand.name}`;
    document.getElementById("watchName").textContent = `Watch: ${name}`;
    document.getElementById("referenceNumber").textContent = `Reference: ${reference_number}`;

    // Display the image and start the guessing game
    document.getElementById("watchImage").src = watchImage;
    startGuessingGame(priceUSD);
}

// Function to handle the guessing game logic
function startGuessingGame(actualPrice) {
    // Reset result and score for each new watch
    document.getElementById("result").textContent = '';
    document.getElementById("score").textContent = `Total Score: ${score}`;

    document.getElementById("submitGuess").addEventListener("click", function() {
        const guess = parseInt(document.getElementById("guessInput").value);
        if (isNaN(guess)) return;

        const difference = Math.abs(actualPrice - guess);
        const points = Math.max(0, 1000 - difference);
        score += points;

        document.getElementById("result").textContent = `Actual Price: $${actualPrice.toFixed(2)}. You scored ${points} points!`;
        document.getElementById("score").textContent = `Total Score: ${score}`;
    });
}

// Event listener for the Next Watch button
document.getElementById("nextWatch").addEventListener("click", function() {
    setupGame(); // Resets the game with a new random watch
});

// Initialize the game
setupGame();
