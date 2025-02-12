function renderQuestion() {
    // Get the current question and options based on the state
    const currentQuestion = questions[currentState]; // Assuming questions is an array of questions
    const questionBox = document.getElementById("question");
    questionBox.innerText = currentQuestion.question;