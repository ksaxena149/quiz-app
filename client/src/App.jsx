import { useEffect, useState } from 'react'
import './App.css'
import QuizCard from './components/QuizCard'
import ScoreCard from './components/ScoreCard'

async function getQuestions() {
  try {
    const response = await fetch('https://opentdb.com/api.php?amount=10&type=multiple');
    const data = await response.json();
    // console.log(data);
    return await data;
  } catch (error) {
    console.log(error);
  }
}

function shuffleOptions(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    async function fetchQuestions() {
      const data = await getQuestions();
      setQuestions(data.results);
    }
    fetchQuestions();
  }, [])

  const handleAnswerSubmit = (selectedOption) => {
    const isCorrect = selectedOption===questions[currentQuestion].correct_answer;
    if (isCorrect) {
      setScore(score + 1);
    }
    setCurrentQuestion(currentQuestion + 1);
  }


  const currentQuestionObj = questions[currentQuestion];
  const incorrectAnswers = currentQuestionObj?.incorrect_answers || [];
  const correctAnswer = currentQuestionObj?.correct_answer;
  const options = shuffleOptions([...incorrectAnswers, correctAnswer]);

  if(options.length === 0){
    return <div>Loading...</div>
  }

  return (
    <>
      {currentQuestion < questions.length ? (
        <QuizCard
          qNumber={currentQuestion+1}
          question={questions[currentQuestion].question}
          opt1={options[0]}
          opt2={options[1]}
          opt3={options[2]}
          opt4={options[3]}
          correctOpt={correctAnswer}
          onNextClick={handleAnswerSubmit}
        />
      ) : (
        <ScoreCard score = {score} />
      )}
    </>
  )
}

export default App
