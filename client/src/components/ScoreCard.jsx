import React from 'react'

const ScoreCard = (props) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Quiz Complete!</h1>
      <h2 className="text-2xl font-bold mb-4">Your Score: {props.score}</h2>
    </div>
  )
}

export default ScoreCard