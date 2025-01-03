let score=0
const apple = document.getElementById("apple");
document.body.style.overflow = 'hidden'
const appleImage = apple.querySelector("img");
const scoreElement = document.getElementsByClassName("score");


const resetApple = () => {
  
  let x = Math.random() * window.innerWidth*.555;
  let y = window.innerHeight; 
  apple.style.left = `${x}px`;
  apple.style.top = `${y}px`;


  const velocity = Math.random() * 100 + 150; 
  const angle = Math.random() * 30 + 60; 

  const angleRadians = (angle * Math.PI) / 180;

  
  const gravity = 9.8; 
  const timeStep = 0.12; 

  
  let velocityX = velocity * Math.cos(angleRadians);
  let velocityY = velocity * Math.sin(angleRadians);


  let time = 0;

  const maxHeight = y - (velocityY * velocityY) / (2 * gravity); 
  if (maxHeight < 0) {
    const scale = Math.sqrt((2 * gravity * (y - window.innerHeight * 0.2)) / (velocityY * velocityY));
    velocityX *= scale;
    velocityY *= scale;
  }


  const animateApple = () => {

    const newX = x + velocityX * time;
    const newY = y - (velocityY * time - 0.5 * gravity * time * time);

    

    apple.style.left = `${newX}px`;
    apple.style.top = `${newY}px`;

    
    if (newY > window.innerHeight) {
      resetApple();
      return;
    }

    if (velocityY - gravity * time <= 0 && newY < maxHeight) {
      velocityY = -Math.abs(velocityY); 
    }
    time += timeStep;

    requestAnimationFrame(animateApple);
  };

  animateApple();
};

resetApple();








// Select the score display element
const scoreDisplay = document.querySelector(".score");


// Function to update the score instantly
const updateScore = (points) => {
  score += points; // Increment the score by the given points
  scoreDisplay.innerText = `SCORE: ${score}`; // Update the text in the score display
};

// Function to reset the score
const resetScore = () => {
  score = 0; // Set the score to zero
  scoreDisplay.innerText = `SCORE: ${score}`; // Update the text in the score display
};

// Function to handle fruit slicing
const handleSlice = (fruit, points) => {
  if (fruit.id === "bomb") {
    // If bomb is clicked, reset the score
    alert("Oops! You hit the bomb!");
    resetScore(); // Reset the score
  } else {
    updateScore(points); // Update the score for other fruits
  }

 
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
  let points = fruit.id === "bomb" ? 0 : 10; // Bomb doesn't add points; others add points

  fruit.addEventListener("mousedown", () => {
    handleSlice(fruit, points); // Handle slicing logic
  });
});
