// DOM-Elemente abrufen
const dom = {
  title: document.getElementById("title"),
  progress: {
    progressFill: document.getElementById("progress-fill"),
    questionNumber: document.getElementById("question-number"),
    totalQuestions: document.getElementById("total-questions"),
  },
  questionWrap: document.getElementById("question-wrap"),
  step: {
    question: document.getElementById("question"),
    questionPosition: document.getElementById("question-position"),
  },
  answers: document.getElementById("answers"),
  next: document.getElementById("next"),
  result: {
    resultBlock: document.getElementById("result"),
    validAnswers: document.getElementById("valid-answers"),
    questionsCount: document.getElementById("result-total-questions"),
  },
};

// Titel setzen
dom.title.innerHTML = data.title;

let totalSteps = data.questions.length;
let step = 0;
let validAnswersCount = 0;

// Klick auf den Button 'Nächste Frage'
dom.next.onclick = () => {
  if (step < totalSteps) {
    step++;
    renderQuiz(totalSteps, step);
  }
};

// Funktion zur Darstellung der gesamten Umfrage
function renderQuiz(total, step) {
  renderProgress(total, step);

  if (step < total) {
    const answers = data.questions[step].answers;
    const answersHtml = buildAnswers(answers);
    renderQuestion(step);
    renderAnswers(answersHtml);
    isDisableButton(true); // Initially disable the next button
  } else {
    renderResults();
  }
}

// Darstellung eines Fortschrittsbalkens
function renderProgress(total, step) {
  const progressPercent = (100 / total) * step;
  dom.progress.questionNumber.innerHTML = step + 1;
  dom.progress.totalQuestions.innerHTML = total;
  dom.progress.progressFill.style.width = `${progressPercent}%`;
}

// Darstellung der Frage
function renderQuestion(step) {
  dom.step.questionPosition.innerHTML = `${step + 1}`;
  dom.step.question.innerHTML = data.questions[step].question;
}

// Erstellung von HTML-Code für Antworten
function buildAnswers(answers) {
  return answers
    .map(
      (answer, idx) =>
        `<div class="quiz_answer" data-id="${idx + 1}">${answer}</div>`
    )
    .join("");
}

// Darstellung von Antworten
function renderAnswers(htmlString) {
  dom.answers.innerHTML = htmlString;
}

// Verfolgung des Klicks auf eine Antwort
dom.answers.onclick = (event) => {
  const target = event.target;
  if (target.classList.contains("quiz_answer")) {
    const answerNumber = target.dataset.id;
    const isValid = checkAnswer(step, answerNumber);
    const answerClass = isValid ? "quiz_answer_valid" : "quiz_answer_invalid";
    target.classList.add(answerClass);
    isDisableButton(false); // Enable the next button when an answer is selected
    validAnswersCount += isValid ? 1 : 0;
  }
};

// Überprüfung der Richtigkeit der Antwort
function checkAnswer(step, answer) {
  return data.questions[step].validAnswer == answer;
}

// Sperren der Schaltfläche
function isDisableButton(isDisable) {
  dom.next.classList.toggle("quiz_btn_disable", isDisable);
}

// Quizergebnis ansehen
function renderResults() {
  dom.answers.style.display = "none";
  dom.next.style.display = "none";
  dom.questionWrap.style.display = "none";
  dom.result.resultBlock.style.display = "block";
  dom.result.validAnswers.innerHTML = validAnswersCount;
  dom.result.questionsCount.innerHTML = totalSteps;
}

// Initiales Rendern des Quizzes
renderQuiz(totalSteps, step);
