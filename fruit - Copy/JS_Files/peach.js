const peach = document.getElementById("peach");
document.body.style.overflow = 'hidden'

const resetPeach = () => {
  
  let x = Math.random() * window.innerWidth; 
  let y = window.innerHeight; 
  peach.style.left = `${x}px`;
  peach.style.top = `${y}px`;

  
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

  
  const animatePeach = () => {
    
    const newX = x + velocityX * time;
    const newY = y - (velocityY * time - 0.5 * gravity * time * time);

    

    
    peach.style.left = `${newX}px`;
    peach.style.top = `${newY}px`;

    
    if (newY > window.innerHeight) {
      resetPeach(); 
      return;
    }

    
    if (velocityY - gravity * time <= 0 && newY < maxHeight) {
      velocityY = -Math.abs(velocityY); 
    }

    
    time += timeStep;

    
    requestAnimationFrame(animatePeach);
  };

  
  animatePeach();
};

resetPeach()










