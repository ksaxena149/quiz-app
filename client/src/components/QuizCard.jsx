import React, { useState } from 'react';

const QuizCard = (props) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [showNext, setShowNext] = useState(false);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setShowAnswer(true);
    setShowNext(true);
  }

  const handleNextClick = () => {
    setSelectedOption('');
    setShowAnswer(false);
    setShowNext(false);
    props.onNextClick(selectedOption);
  }

  const getAnswerClass = (option) => {
    if (showAnswer) {
      if (option === selectedOption && option === props.opt4) {
        return 'bg-green-500 text-white';
      } else if (option === selectedOption && option !== props.opt4) {
        return 'bg-red-500 text-white';
      } else if (option === props.opt4) {
        return 'bg-green-500 text-white';
      }
    } else if (option === selectedOption) {
      return 'bg-blue-500 text-white';
    }
    return '';
  }

  return (
<>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{`Question ${props.qNumber}`}</div>
            <div className="mt-2 text-gray-900 text-3xl font-bold">{props.question}</div>
            <div className="mt-4">
              <form>
                <label className={`block mb-4 ${getAnswerClass(props.opt1)}`}>
                  <input
                    type="radio"
                    name="capital"
                    value={props.opt1}
                    className="form-radio h-6 w-6 text-blue-500 rounded border-2 border-blue-500"
                    checked={selectedOption === props.opt1}
                    onChange={handleOptionChange}
                    disabled={showAnswer}
                  />
                  <span className="ml-2 text-xl">a) {props.opt1}</span>
                </label>
                <label className={`block mb-4 ${getAnswerClass(props.opt2)}`}>
                  <input
                    type="radio"
                    name="capital"
                    value={props.opt2}
                    className="form-radio h-6 w-6 text-blue-500 rounded border-2 border-blue-500"
                    checked={selectedOption === props.opt2}
                    onChange={handleOptionChange}
                    disabled={showAnswer}
                  />
                  <span className="ml-2 text-xl">b) {props.opt2}</span>
                </label>
                <label className={`block mb-4 ${getAnswerClass(props.opt3)}`}>
                  <input
                    type="radio"
                    name="capital"
                    value={props.opt3}
                    className="form-radio h-6 w-6 text-blue-500 rounded border-2 border-blue-500"
                    checked={selectedOption === props.opt3}
                    onChange={handleOptionChange}
                    disabled={showAnswer}
                  />
                  <span className="ml-2 text-xl">c) {props.opt3}</span>
                </label>
                <label className={`block mb-4 ${getAnswerClass(props.opt4)}`}>
                  <input
                    type="radio"
                    name="capital"
                    value={props.opt4}
                    className="form-radio h-6 w-6 text-blue-500 rounded border-2 border-blue-500"
                    checked={selectedOption === props.opt4}
                    onChange={handleOptionChange}
                    disabled={showAnswer}
                  />
                  <span className="ml-2 text-xl">d) {props.opt4}</span>
                </label>
              </form>
            </div>
            {showNext && (
              <button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                onClick={handleNextClick}
              >
                Next
              </button>
            )}
            {/* {showAnswer && (
              <div className="mt-4">
                <span className="text-gray-900 text-xl font-bold">{`Answer: ${props.opt4}`}</span>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </>
  )
}

export default QuizCard;