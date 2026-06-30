<script lang="ts">
type Card = {
  question: string;
  answer: string;
};

let cards = $state<Card[]>([
  { question: 'What does HTML stand for?', answer: 'HyperText Markup Language' },
  { question: 'Which CSS property changes text color?', answer: 'color' },
  { question: 'What keyword declares a variable in Svelte?', answer: 'let' },
  { question: 'What symbol starts a Svelte template expression?', answer: '{' },
  { question: 'Which function turns a string into a number?', answer: 'Number' },
]);

let currentIndex = $state(0);
let userAnswer = $state('');
let score = $state(0);
let answered = $state(false);
let isCorrect = $state(false);
let finished = $state(false);

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function check() {
  if (userAnswer.trim() === '') return;
  answered = true;
  isCorrect = normalize(userAnswer) === normalize(cards[currentIndex].answer);
  if (isCorrect) score = score + 1;
}

function next() {
  if (currentIndex < cards.length - 1) {
    currentIndex = currentIndex + 1;
    userAnswer = '';
    answered = false;
    isCorrect = false;
  } else {
    finished = true;
  }
}

function restart() {
  currentIndex = 0;
  userAnswer = '';
  score = 0;
  answered = false;
  isCorrect = false;
  finished = false;
  cards = cards.sort(() => Math.random() - 0.5);
}
</script>

<div class="card stack quiz">
  <h2>Flashcard Quiz</h2>

  {#if finished}
    <div class="finished">
      <p class="score">You scored {score} out of {cards.length}</p>
      <button onclick={restart}>Restart</button>
    </div>
  {:else}
    <p class="progress">Card {currentIndex + 1} of {cards.length}</p>

    <div class="question">
      <p>{cards[currentIndex].question}</p>
    </div>

    {#if answered}
      <p class="feedback" class:correct={isCorrect} class:wrong={!isCorrect}>
        {isCorrect ? 'Correct!' : `The answer was: ${cards[currentIndex].answer}`}
      </p>
    {/if}

    <label class="row">
      Your answer:
      <input type="text" bind:value={userAnswer} disabled={answered} />
    </label>

    <div class="row">
      {#if !answered}
        <button onclick={check} disabled={userAnswer.trim() === ''}>Check</button>
      {:else}
        <button onclick={next}>Next</button>
      {/if}
    </div>

    <p class="score-inline">Score: {score}</p>
  {/if}
</div>

<style>
  .quiz {
    container-type: inline-size;

    h2 {
      font-family: var(--font-heading);
    }

    .progress {
      color: var(--color-text-muted);
    }

    .question {
      padding: var(--space-lg);
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius);
      font-size: 1.25rem;
    }

    .feedback {
      font-weight: 700;
    }

    .feedback.correct {
      color: var(--color-success);
    }

    .feedback.wrong {
      color: var(--color-error);
    }

    .score-inline {
      font-family: var(--font-mono);
    }

    .finished {
      text-align: center;
    }

    .score {
      font-size: 1.5rem;
      font-family: var(--font-accent);
      margin-block-end: var(--space-md);
    }
  }

  @container (min-width: 40ch) {
    .quiz .row {
      flex-wrap: nowrap;
    }
  }
</style>
