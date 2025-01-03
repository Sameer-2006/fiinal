const banana = document.getElementById("banana");
document.body.style.overflow = 'hidden'

const resetbanana = () => {
  
  let x = Math.random() * window.innerWidth; 
  let y = window.innerHeight; 
  banana.style.left = `${x}px`;
  banana.style.top = `${y}px`;

  
  const velocity = Math.random() * 100 + 150; 
  const angle = Math.random() * 30 + 60; 

  let score=0
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

  
  const animatebanana = () => {
    
    const newX = x + velocityX * time;
    const newY = y - (velocityY * time - 0.5 * gravity * time * time);

    

    
    banana.style.left = `${newX}px`;
    banana.style.top = `${newY}px`;

    
    if (newY > window.innerHeight) {
      resetbanana(); 
      return;
    }

    
    if (velocityY - gravity * time <= 0 && newY < maxHeight) {
      velocityY = -Math.abs(velocityY); 
    }

    
    time += timeStep;

    

    requestAnimationFrame(animatebanana);
  };

  
  animatebanana();
};


resetbanana();

