// Initialize game state
let currentState = 0;  // Start at the beginning of the story
let playerHealth = 100;  // Starting health
let inventory = [];  // Player's inventory

// Define story content
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
    }
  ];

// Render function to update the game UI
function renderQuestion() {
    const questionContainer = document.getElementById("question");
    const answersContainer = document.getElementById("answers");
  
    // Clear previous answers
    answersContainer.innerHTML = "";
  
    // Display the current question
    questionContainer.textContent = storyData[currentState].question;

    // Add buttons for each choice
  storyData[currentState].options.forEach(option => {
    addAnswerButton(option.text, option.nextState, option.effect);
  });
}

// Helper function to create and add answer buttons
function addAnswerButton(text, nextState, effect) {
  const button = document.createElement("button");
  button.textContent = text;
  button.onclick = function() {
    handleChoice(nextState, effect);
  };
  document.getElementById("answers").appendChild(button);
}

// Handle choice, update state, and render next question
function handleChoice(nextState, effect) {
  console.log(effect);  // Log the effect of the choice (can be expanded with more effects like health changes)

  currentState = nextState;  // Update the state
  renderQuestion();  // Re-render the next question
}

// Initialize the game
function startGame() {
  renderQuestion();  // Display the first question
}

// Start the game on page load
window.onload = startGame;