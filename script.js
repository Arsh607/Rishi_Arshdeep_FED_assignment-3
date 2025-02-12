// Initialize game state
let currentState = 0; // Start at the beginning of the story
let playerHealth = 100; // Starting health
let inventory = []; // Player's inventory

// Define story data
const storyData = [
  {
    question: "You are at the edge of the Forest of Shadows. What will you do?",
    options: [
      { text: "Enter cautiously", nextState: 1, effect: "You encounter a peaceful creature offering advice." },
      { text: "Charge boldly", nextState: 2, effect: "You are attacked by a wild beast!" }
    ]
  },
  {
    question: "You find yourself lost in the forest. What do you do?",
    options: [
      { text: "Follow the sound of water", nextState: 3, effect: "You find a hidden magical artifact." },
      { text: "Climb a tree to get a better view", nextState: 4, effect: "You are caught by enemies and must fight to escape." }
    ]
  },
  {
    question: "You are attacked by a wild beast! What will you do?",
    options: [
      { text: "Fight the beast", nextState: 5, effect: "You defeat the beast but lose health." },
      { text: "Run away", nextState: 6, effect: "You barely escape but lose more health." }
    ]
  },
  {
    question: "You find a magical artifact. What will you do with it?",
    options: [
      { text: "Take it", nextState: 7, effect: "You gain a powerful item!" },
      { text: "Leave it", nextState: 8, effect: "You continue your journey, but without the artifact." }
    ]
  },
  {
    question: "You are caught by enemies! What will you do?",
    options: [
      { text: "Fight", nextState: 9, effect: "You defeat the enemies but lose health." },
      { text: "Try to talk to them", nextState: 10, effect: "You manage to negotiate your way out." }
    ]
  },
  {
    question: "You defeated the beast and continue your journey.",
    options: [
      { text: "Search for shelter", nextState: 11, effect: "You find a safe place to rest." },
      { text: "Keep moving", nextState: 12, effect: "You encounter a strange traveler." }
    ]
  },
  {
    question: "You barely escape but are injured.",
    options: [
      { text: "Look for help", nextState: 13, effect: "A healer aids you, restoring some health." },
      { text: "Keep going despite the injury", nextState: 14, effect: "You find a small village where you can rest." }
    ]
  },
  {
    question: "The journey ends. You've completed your quest!",
    options: []
  }
];

// Function to render the game state
function renderQuestion() {
  const questionContainer = document.getElementById("question");
  const answersContainer = document.getElementById("answers");
  const healthContainer = document.getElementById("health");

  // Clear previous answers
  answersContainer.innerHTML = "";

  // Ensure we are within valid state
  if (currentState < 0 || currentState >= storyData.length) {
    console.error("Invalid state:", currentState);
    return;
  }

  // Display the current question
  questionContainer.textContent = storyData[currentState].question;

  // Display current health
  healthContainer.textContent = `Health: ${playerHealth}`;

  console.log(`Rendering state: ${currentState}`); // Debugging log

  // If there are no options, the game has ended
  if (storyData[currentState].options.length === 0) {
    alert("The adventure is over!");
    return;
  }

  // Add buttons for each choice
  storyData[currentState].options.forEach((option, index) => {
    console.log(`Adding option ${index + 1}: ${option.text}`); // Debugging log
    addAnswerButton(option.text, option.nextState, option.effect);
  });
}

// Helper function to create and add answer buttons
function addAnswerButton(text, nextState, effect) {
  const li = document.createElement("li"); // Ensure buttons are inside list items
  li.style.listStyleType = "none"; // Remove bullet points

  const button = document.createElement("button");
  button.textContent = text;
  button.onclick = function () {
    handleChoice(nextState, effect);
  };

  li.appendChild(button); // Append button to list item
  document.getElementById("answers").appendChild(li); // Append to UL
}

// Function to handle user choices
function handleChoice(nextState, effect) {
  console.log(`Effect: ${effect}`);
  console.log(`Current State: ${currentState}, Next State: ${nextState}`);

  // Display effect to the player
  const effectContainer = document.getElementById("effect");
  if (effectContainer) {
    effectContainer.textContent = effect;
  }

  // Apply health effects
  if (/lose health/i.test(effect)) {
    playerHealth -= 10;
  } else if (/gain a powerful item/i.test(effect)) {
    inventory.push("Magical Artifact");
  }

  // Ensure the game does not continue past the last valid state
  if (nextState >= storyData.length || nextState < 0) {
    console.warn(`Invalid nextState: ${nextState}`);
    alert("The adventure is over!");
    return;
  }

  // Update game state
  currentState = nextState;
  renderQuestion();
}

// Initialize the game
function startGame() {
  renderQuestion(); // Display the first question
}

// Start the game on page load
window.onload = startGame;
