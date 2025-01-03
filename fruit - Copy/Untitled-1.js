
// Select the score display element
const scoreDisplay = document.querySelector(".score");


// Function to update the score instantly
const updateScore = (points) => {
  score += points; // Increment the score by the given points
  scoreDisplay.innerText = `SCORE: ${score}`; // Update the text in the score display
};

// Function to handle fruit slicing
const handleSlice = (fruit, points) => {
  updateScore(points); // Update the score instantly

  // Reset fruit after some time
  setTimeout(() => {
    fruit.style.left = `${Math.random() * window.innerWidth}px`; // Randomize position
    fruit.style.top = `${window.innerHeight}px`; // Reset to bottom
    fruit.style.display = "block"; // Make the fruit visible again
  }, 1000);
};

// Add event listeners for all fruits
document.querySelectorAll(".fruit").forEach((fruit) => {
  // Assign points based on the fruit type
  let points = fruit.id === "bomb" ?0:1; // Bomb deducts points; others add points

  fruit.addEventListener("click", () => {
    if (fruit.id === "bomb") {
      alert("Oops! You hit the bomb!");
    }
    handleSlice(fruit, points); // Handle slicing logic
  });
});
