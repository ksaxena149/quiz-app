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

  return (
    <>
      {currentQuestion < questions.length ? (
        <QuizCard
          qNumber={currentQuestion+1}
          question={questions[currentQuestion].question}
          opt1={questions[currentQuestion].incorrect_answers[0]}
          opt2={questions[currentQuestion].incorrect_answers[1]}
          opt3={questions[currentQuestion].incorrect_answers[2]}
          opt4={questions[currentQuestion].correct_answer}
          onNextClick={handleAnswerSubmit}
        />
      ) : (
        <ScoreCard score = {score} />
      )}
    </>
  )
}

export default App
