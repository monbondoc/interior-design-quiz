const progressBar = document.querySelector(".progress-bar");
const progressText = document.querySelector(".progress-text");

// Quiz data and state management
const quizState = {
  currentQuestion: 1,
  totalQuestions: 8,
  answers: {
    A: 0, // Classic
    B: 0, // Minimalist
    C: 0, // Eclectic
    D: 0, // Naturalist
  },
};

// Result descriptions mapped to answer keys
const results = {
  A: {
    title: "Classic Elegance",
    subtitle: "The Timeless Traditionalist",
    description: "Elegant, balanced, and enduring. Drawn to craftsmanship, tradition, and refined details. Thrives on symmetry, layered neutrals, and timeless forms.",
  },
  B: {
    title: "Oasis of Calm",
    subtitle: "The Serene Minimalist",
    description: "Calm, intentional, and uncluttered. Values clarity, light, and functional beauty. Thrives on open space, cohesive palettes, and simplicity.",
  },
  C: {
    title: "Bold Eclectic",
    subtitle: "The Maximalist Haven",
    description: "Bold, expressive, and layered. Loves mixing color, pattern, and eras. Thrives on personality, creativity, and collected stories.",
  },
  D: {
    title: "The Naturalist",
    subtitle: "The Earthy Comforts",
    description: "Grounded, warm, and organic. Drawn to natural materials and soothing spaces. Thrives on texture, light, and connection to nature.",
  },
};

// Get all answer buttons
const answerButtons = document.querySelectorAll(".answer-btn");
const progressFill = document.getElementById("progress-fill");
const currentQuestionSpan = document.getElementById("current-question");
const resultsSection = document.querySelector(".results");
const titlePage = document.querySelector(".title-page");
const startBtn = document.getElementById("start-btn");
const quizSection = document.querySelector(".quiz-section");

// Update progress bar
function updateProgress() {
  const progress = (quizState.currentQuestion / quizState.totalQuestions) * 100;
  progressFill.style.width = progress + "%";
  currentQuestionSpan.textContent = quizState.currentQuestion;
}

// Show next question or results
function showNextQuestion() {
  const currentContainer = document.querySelector(`.question-container[data-question="${quizState.currentQuestion}"]`);
  if (currentContainer) {
    currentContainer.classList.remove("active");
  }

  if (quizState.currentQuestion < quizState.totalQuestions) {
    quizState.currentQuestion++;
    const nextContainer = document.querySelector(`.question-container[data-question="${quizState.currentQuestion}"]`);
    nextContainer.classList.add("active");
    updateProgress();
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    // Show results after last question
    quizSection.classList.remove("active");
    calculateResults();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

// Calculate and display results
function calculateResults() {
  // Find the style(s) with the highest count
  const maxCount = Math.max(...Object.values(quizState.answers));
  const topStyles = Object.keys(quizState.answers).filter(key => quizState.answers[key] === maxCount);

  let resultTitle, resultSubtitle, resultDescription;

  if (topStyles.length === 1) {
    // Single dominant style
    const resultKey = topStyles[0];
    resultTitle = results[resultKey].title;
    resultSubtitle = results[resultKey].subtitle;
    resultDescription = results[resultKey].description;
  } else {
    // Tie - create blended result
    const styleNames = topStyles.map(key => results[key].title);
    resultTitle = styleNames.join("–");
    resultSubtitle = "A Blended Aesthetic";

    // Combine descriptions
    const descriptions = topStyles.map(key => results[key].description);
    resultDescription = "You embody a unique blend of design styles. " + descriptions.join(" ");
  }

  // Display results
  document.getElementById("result-title").textContent = resultTitle;
  document.getElementById("result-subtitle").textContent = resultSubtitle;
  document.getElementById("result-description").textContent = resultDescription;

  resultsSection.classList.add("active");
}

// Handle answer selection
answerButtons.forEach(button => {
  button.addEventListener("click", function () {
    const answer = this.getAttribute("data-answer");
    quizState.answers[answer]++;
    showNextQuestion();
  });
});

// Handle start button click
startBtn.addEventListener("click", function () {
  titlePage.classList.remove("active");
  quizSection.classList.add("active");

  progressBar.classList.add("active");
  progressText.classList.add("active");

  const firstQuestion = document.querySelector('.question-container[data-question="1"]');
  firstQuestion.classList.add("active");

  updateProgress();
  window.scrollTo({ top: 0, behavior: "smooth" });
});
