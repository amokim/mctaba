// Selecting relevant DOM items
const startBtn = document.getElementById('start-btn');
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const questionText = document.getElementById('question-text');
const answerList = document.getElementById('answer-list');
const timerDisplay = document.getElementById('timer');
const questionProgress = document.getElementById('question-progress');
const progressFill = document.getElementById('progress-fill');
const resultScreen = document.getElementById('results-screen')
const reviewButton = document.getElementById('review-btn');
const restartButton = document.getElementById('restart-btn');
const reviewScreen = document.getElementById('review-screen');
const reviewList = document.getElementById('review-list');
const backToResultsButton = document.getElementById('back-to-results-btn');
const lastScore = document.getElementById('last-score-display');
const leaderboardSection = document.getElementById('leaderboard-section');
const leaderboardList = document.getElementById('leaderboard-list');
const shareScoreButton = document.getElementById('share-score-btn');
const shareConfirmation = document.getElementById('share-confirmation');

// Setting up initial states
let currentQuestionIndex = 0;
let score = 0;
const userAnswers = [];
let timerInterval = null;
const timer = 15;
let selectedCategory = null;
let selectedDifficulty = null;
let activeQuestions = [];
let lastResult = { score: 0, total: 0, percentage: 0 };

const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

// Sound effects (Web Audio API, no audio files needed)
let audioCtx = null;

const getAudioContext = () => {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
};

const playTone = (frequency, startDelay, duration, type = 'sine') => {
    const ctx = getAudioContext();
    const startTime = ctx.currentTime + startDelay;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = type;
    oscillator.frequency.value = frequency;
    gainNode.gain.setValueAtTime(0.15, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
};

const playCorrectSound = () => {
    playTone(880, 0, 0.12);
    playTone(1175, 0.1, 0.15);
};

const playIncorrectSound = () => {
    playTone(220, 0, 0.25, 'sawtooth');
};

// Building up the startQuiz function
const loadQuestion = () => {

    const currentQuestion = activeQuestions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    
    // clearing old list content on the answelist
    answerList.innerHTML = '';

    // Populating the answer options
    currentQuestion.options.forEach(option => {
        const answer = document.createElement('li');
        answer.textContent = option;
        answerList.append(answer);
        answer.classList.remove('correct', 'incorrect', 'selected', 'disabled');
    });
    startTimer();
    questionProgress.textContent = `Question ${currentQuestionIndex + 1} of ${activeQuestions.length}`;
    progressFill.style.width = `${(currentQuestionIndex / activeQuestions.length) * 100}%`;

};

// Creating the start timer functionality when the quiz is started
const startTimer = () => {
    clearInterval(timerInterval);

    let timeLeft = timer;
    timerDisplay.textContent = `${timeLeft} seconds`;

    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `${timeLeft} seconds`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timeIsUp();
        }
    }, 1000);
};

// Handling when the timer goes to zero
const timeIsUp = () => {
    const currentQuestion = activeQuestions[currentQuestionIndex];
    const correctAnswerIndex = currentQuestion.correct;
    const answerItems = answerList.querySelectorAll('li');

    answerItems.forEach(answer => {
        answer.classList.add('disabled');
        if (answer.textContent === currentQuestion.options[correctAnswerIndex]) {
            answer.classList.add('correct');
        }
    });

    playIncorrectSound();

    userAnswers.push({
        question: currentQuestion.question,
        selected: null,
        correct:  currentQuestion.options[correctAnswerIndex],
        wasCorrect: false
    });

    setTimeout(goToNextQuestion, 1500);
};

// Starting the quiz 
startBtn.addEventListener('click',() => {
    
    // getting the user selected difficulty and topic
    selectedCategory = document.querySelector('input[name="category"]:checked').value;
    selectedDifficulty = document.querySelector('input[name="difficulty"]:checked').value;

    //Getting the filtered question array based on the user selected category and difficulty level
    const matchingQuestions = quizQuestions.filter(q => q.category.toLowerCase() === selectedCategory && q.difficulty === selectedDifficulty);

    // Shuffling and capping the active quiz to 10 questions
    activeQuestions = shuffleArray(matchingQuestions).slice(0, 10);

    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    
    loadQuestion();
});

// Validating user answer
answerList.addEventListener('click', (e) => {
    if (e.target.tagName !== 'LI') return;
    if (e.target.classList.contains('disabled')) return;

    clearInterval(timerInterval);

    const clickedAnswer = e.target;
    const selectedAnswer = clickedAnswer.textContent;
    const currentQuestion = activeQuestions[currentQuestionIndex];
    const correctAnswerIndex = activeQuestions[currentQuestionIndex].correct;
    const isCorrect = selectedAnswer === currentQuestion.options[correctAnswerIndex];

    const answerItems = answerList.querySelectorAll('li');
    answerItems.forEach(li => li.classList.add('disabled'));

    if (isCorrect) {
        clickedAnswer.classList.add('correct');
        score++;
        playCorrectSound();
    } else {
        clickedAnswer.classList.add('incorrect');
        answerItems.forEach(answer => {
            if (answer.textContent === currentQuestion.options[correctAnswerIndex]) {
                answer.classList.add('correct');
            }
        });
        playIncorrectSound();
    }

    userAnswers.push({
        question: currentQuestion.question,
        selected: selectedAnswer,
        correct: currentQuestion.options[correctAnswerIndex],
        wasCorrect: isCorrect
    });

    setTimeout(goToNextQuestion, 1500);
});

// creating the go to next question function after user selects an answer or the timer runs to zero
const goToNextQuestion = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < activeQuestions.length) {
        loadQuestion();
    } else {
        showResults();
    }
};

// Displaying results back to the user after they finish the quiz
const showResults = () => {
    progressFill.style.width = '100%';
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');

    const total = activeQuestions.length;
    const percentage = Math.round((score / total) * 100);
    const grade = getGrade(percentage);
    const message = getMessage(grade);

    document.getElementById('final-score').textContent = `${percentage}`;
    document.getElementById('final-grade').textContent = grade;
    document.getElementById('final-message').textContent = message;

    lastResult = { score, total, percentage };

    saveScoreToStorage(score, total);
    saveToLeaderboard(score, total, percentage);
    renderLeaderboard();
};

const getGrade = (percentage) => {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
};

const getMessage = (grade) => {
    const messages = {
        A: 'Excellent Work!',
        B: 'Good Job!',
        C: 'Average!',
        D: 'Below Average, room to improve',
        F: 'Keep Practicing!'
    };
    return messages[grade];
};

// Reviewing selected answers
reviewButton.addEventListener('click', () => {
    resultScreen.classList.add('hidden');
    reviewScreen.classList.remove('hidden');
    reviewScreenContent();
});

const reviewScreenContent = () => {
    reviewList.innerHTML = '';

    userAnswers.forEach((answer, index) => {
        const li = document.createElement('li');

        const questionElement = document.createElement('p');
        questionElement.textContent = `${index + 1}. ${answer.question}`;
        li.appendChild(questionElement);

        const userAnswerElement = document.createElement('p');
        userAnswerElement.textContent = `Your answer: ${answer.selected ?? 'No answer'}`;
        li.classList.add(answer.wasCorrect ? 'correct' : 'incorrect');
        li.appendChild(userAnswerElement);

        if (!answer.wasCorrect) {
            const correctAnswerElement = document.createElement('p');
            correctAnswerElement.textContent = `Correct answer: ${answer.correct}`;
            correctAnswerElement.classList.add('correct');
            li.appendChild(correctAnswerElement);
        }

        reviewList.appendChild(li);
    });
};

// Restarting the quiz
restartButton.addEventListener('click', () => {
    score = 0;
    currentQuestionIndex = 0;
    userAnswers.length = 0;

    resultScreen.classList.add('hidden');
    reviewScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');

    loadQuestion();
});

// Back to results button
backToResultsButton.addEventListener('click', () => {
    reviewScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
});

// Local storage intergration
const saveScoreToStorage = (score, total) => {
    const scoreData = {
        score,
        total,
        date: new Date().toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        })
    };
    localStorage.setItem('quizLastScore', JSON.stringify(scoreData));
};

// Displaying last user score
const displayLastScore = () => {
    const saved = localStorage.getItem('quizLastScore');

    if (saved) {
        const {score, total, date} = JSON.parse(saved);
        lastScore.textContent = `Your last score was: ${score}/${total} on ${date}`;
        lastScore.classList.remove('hidden');
    }
};

// Leaderboard storage (top 5 scores, kept sorted by percentage then raw score)
const LEADERBOARD_KEY = 'quizLeaderboard';
const MAX_LEADERBOARD_ENTRIES = 5;

const saveToLeaderboard = (score, total, percentage) => {
    const leaderboard = JSON.parse(localStorage.getItem(LEADERBOARD_KEY)) || [];

    leaderboard.push({
        score,
        total,
        percentage,
        date: new Date().toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        })
    });

    leaderboard.sort((a, b) => b.percentage - a.percentage || b.score - a.score);
    const topScores = leaderboard.slice(0, MAX_LEADERBOARD_ENTRIES);

    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(topScores));
};

// Displaying the top 5 leaderboard entries
const renderLeaderboard = () => {
    const leaderboard = JSON.parse(localStorage.getItem(LEADERBOARD_KEY)) || [];

    if (leaderboard.length === 0) {
        leaderboardSection.classList.add('hidden');
        return;
    }

    leaderboardList.innerHTML = '';
    leaderboard.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = `${entry.score}/${entry.total} (${entry.percentage}%) — ${entry.date}`;
        leaderboardList.appendChild(li);
    });

    leaderboardSection.classList.remove('hidden');
};

// Sharing the final score to the clipboard
shareScoreButton.addEventListener('click', () => {
    const shareText = `I scored ${lastResult.score}/${lastResult.total} (${lastResult.percentage}%) on the Trivia Quiz App! Can you beat me?`;

    navigator.clipboard.writeText(shareText).then(() => {
        shareConfirmation.classList.remove('hidden');
        setTimeout(() => shareConfirmation.classList.add('hidden'), 2000);
    });
});

displayLastScore();
renderLeaderboard();