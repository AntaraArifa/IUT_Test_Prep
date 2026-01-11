interface Option {
  id: string;
  text: string;
}

interface QuestionCardProps {
  questionNumber: number;
  totalQuestions: number;
  questionText: string;
  options: Option[];
  selectedAnswer?: string;
  correctAnswer?: string;
  explanation?: string;
  isReviewMode?: boolean;
  onSelectAnswer?: (optionId: string) => void;
}

export default function QuestionCard({
  questionNumber,
  totalQuestions,
  questionText,
  options,
  selectedAnswer,
  correctAnswer,
  explanation,
  isReviewMode = false,
  onSelectAnswer,
}: QuestionCardProps) {
  const getOptionStyle = (optionId: string) => {
    if (!isReviewMode) {
      // Live Test Mode
      return selectedAnswer === optionId
        ? 'bg-[#004B49] text-white border-[#004B49]'
        : 'bg-white text-gray-800 border-gray-200 hover:border-[#004B49]';
    } else {
      // Review Mode
      if (optionId === correctAnswer) {
        return 'bg-green-100 text-green-900 border-green-400';
      }
      if (optionId === selectedAnswer && optionId !== correctAnswer) {
        return 'bg-red-100 text-red-900 border-red-400';
      }
      return 'bg-white text-gray-800 border-gray-200';
    }
  };

  const getOptionLabel = (index: number) => {
    return String.fromCharCode(65 + index); // A, B, C, D
  };

  return (
    <div className="bg-[#8BA8A3] rounded-xl p-6 sm:p-8">
      {/* Question Header */}
      <div className="mb-6">
        <p className="text-sm text-gray-700 mb-2">
          Question {questionNumber} out of {totalQuestions}
        </p>
        <h3 className="text-lg sm:text-xl text-white font-medium">
          {questionText}
        </h3>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {options.map((option, index) => {
          const isSelected = selectedAnswer === option.id;
          const isCorrect = isReviewMode && option.id === correctAnswer;
          const isWrong = isReviewMode && isSelected && option.id !== correctAnswer;

          return (
            <button
              key={option.id}
              onClick={() => !isReviewMode && onSelectAnswer?.(option.id)}
              disabled={isReviewMode}
              className={`w-full text-left px-4 sm:px-6 py-3 sm:py-4 rounded-lg border-2 transition-all flex items-center gap-3 ${getOptionStyle(
                option.id
              )} ${!isReviewMode ? 'cursor-pointer' : 'cursor-default'}`}
            >
              {/* Radio Button */}
              <div
                className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                  isReviewMode
                    ? isCorrect
                      ? 'border-green-600'
                      : isWrong
                      ? 'border-red-600'
                      : 'border-gray-400'
                    : isSelected
                    ? 'border-white'
                    : 'border-gray-400'
                }`}
              >
                {isSelected && (
                  <div
                    className={`w-3 h-3 rounded-full ${
                      isReviewMode
                        ? isCorrect
                          ? 'bg-green-600'
                          : isWrong
                          ? 'bg-red-600'
                          : ''
                        : 'bg-white'
                    }`}
                  ></div>
                )}
              </div>

              {/* Option Text */}
              <span className="text-sm sm:text-base">
                {isReviewMode && (
                  <span className="font-semibold mr-2">
                    {getOptionLabel(index)}.
                  </span>
                )}
                {option.text}
                {isReviewMode && isCorrect && (
                  <span className="ml-2 text-green-700 text-sm">
                    (Correct Answer)
                  </span>
                )}
                {isReviewMode && isWrong && (
                  <span className="ml-2 text-red-700 text-sm">(Your answer)</span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* Explanation in Review Mode */}
      {isReviewMode && explanation && (
        <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">Explanation:—</h4>
          <p className="text-sm text-blue-800 leading-relaxed">{explanation}</p>
        </div>
      )}
    </div>
  );
}
