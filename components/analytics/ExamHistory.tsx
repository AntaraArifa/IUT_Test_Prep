import Link from 'next/link';

interface ExamRecord {
  id: string;
  name: string;
  date: string;
  score: string;
  timeTaken: string;
}

interface ExamHistoryProps {
  exams: ExamRecord[];
}

export default function ExamHistory({ exams }: ExamHistoryProps) {
  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
      {/* Table Header */}
      <div className="bg-[#004B49] text-white grid grid-cols-5 gap-4 px-6 py-4 font-semibold text-sm">
        <div>Exam</div>
        <div>Date</div>
        <div>Score</div>
        <div>Time Taken</div>
        <div>Action</div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-200">
        {exams.map((exam) => (
          <div
            key={exam.id}
            className="grid grid-cols-5 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors"
          >
            <div className="text-gray-900 font-medium">{exam.name}</div>
            <div className="text-gray-600">{exam.date}</div>
            <div className="text-gray-900 font-semibold">{exam.score}</div>
            <div className="text-gray-600">{exam.timeTaken}</div>
            <div>
              <Link
                href={`/exam/${exam.id}/results`}
                className="text-[#004B49] font-semibold hover:underline text-sm"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
