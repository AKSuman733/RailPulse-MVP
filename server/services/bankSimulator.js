const simulateBankPayment = (bank) => {
  return new Promise((resolve) => {
    let delay;
    let status;

    // 🏦 Bank-specific behavior
    if (bank === "SBI") {
      delay = randomBetween(500, 5000); // slow
      status = randomStatus([0.6, 0.2, 0.2]); 
      // 60% success, 20% pending, 20% fail
    } 
    
    else if (bank === "HDFC") {
      delay = randomBetween(500, 1500); // fast
      status = randomStatus([0.9, 0.05, 0.05]);
    } 
    
    else if (bank === "ICICI") {
      delay = randomBetween(1000, 2000); // medium
      status = randomStatus([0.75, 0.15, 0.10]);
    }

    else if (bank === "JP Morgan") {
      delay = randomBetween(500, 3000); // medium
      status = randomStatus([0.7, 0.1, 0.2]);
    }

    else if (bank === "BoA") {
      delay = randomBetween(1000, 2000); // medium
      status = randomStatus([0.5, 0.25, 0.25]);
    }
    else if (bank === "GOLDMAN") {
      delay = randomBetween(500, 1000); // medium
      status = randomStatus([0.7, 0.1, 0.2]);
    }

    else if (bank === "Wells FARGO") {
      delay = randomBetween(500, 2000); // medium
      status = randomStatus([0.5, 0.25, 0.25]);
    }

    const startTime = Date.now();

    
    setTimeout(() => {
      const latency = Date.now() - startTime;

      resolve({
        bank,
        status,
        latency
      });
    }, delay);
  });
};


// 🎲 Helper: Random status based on probability
function randomStatus([successProb, pendingProb, failProb]) {
  const rand = Math.random();

  if (rand < successProb) return "SUCCESS";
  if (rand < successProb + pendingProb) return "PENDING";
  return "FAILED";
}

// 🎲 Helper: Random delay
function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default simulateBankPayment;