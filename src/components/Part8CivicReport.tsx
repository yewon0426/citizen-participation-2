import React, { useState } from 'react';
import { FINAL_QUIZ_DATA } from '../data/curriculumData';
import {
  Award,
  Sparkles,
  Printer,
  RotateCcw,
  BookOpen,
  Clock,
  Moon,
  ShieldCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Part8Props {
  onResetAll: () => void;
}

export const Part8CivicReport: React.FC<Part8Props> = ({ onResetAll }) => {
  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Civic Declaration Card state
  const [studentName, setStudentName] = useState('');
  const [citizenPledge, setCitizenPledge] = useState(
    '일상의 작은 불편을 지나치지 않고, 공동체와 함께 대안을 고민하고 실천하는 주체적 시민'
  );
  const [isCardGenerated, setIsCardGenerated] = useState(false);

  const handleSelectQuiz = (qId: number, optIdx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    FINAL_QUIZ_DATA.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        score += 10;
      }
    });
    return score;
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
  };

  const handleGenerateCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) return;
    setIsCardGenerated(true);
    confetti({ particleCount: 60, spread: 70 });
  };

  const handlePrint = () => {
    window.print();
  };

  const score = calculateScore();

  return (
    <div className="space-y-12 pb-16">
      {/* 22:30 Bedtime Night Notification Card */}
      <div className="rounded-[2.5rem] bg-gradient-to-br from-stone-900 via-stone-900 to-indigo-950 text-white p-7 sm:p-10 shadow-xl space-y-6">
        <div className="flex items-center justify-between text-xs font-mono text-stone-400">
          <span className="px-3 py-1 rounded-full bg-white/10 text-indigo-200 font-extrabold flex items-center gap-1.5">
            <Moon className="w-3.5 h-3.5 text-indigo-300" />
            <span>22:30 PM · 하루를 마치며</span>
          </span>
          <span className="text-indigo-400 font-mono font-bold tracking-wider">MY CIVIC DAY REPORT</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
          “오늘 하루, 나는 어떤 순간에 시민이었을까?”
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-2xl font-medium">
          아침 횡단보도 신호등 민원에서 시작하여 정당과 시민단체의 활동을 탐구하고, 우리 동네 주민참여제도를 살펴본 오늘 하루.
          정치는 먼 곳의 이야기가 아니라, <strong>우리의 평범한 하루 속 모든 선택에 맞닿아 있습니다.</strong>
        </p>

        {/* Timeline of the Day */}
        <div className="pt-6 border-t border-white/10">
          <h3 className="text-xs font-black uppercase tracking-wider text-indigo-300 mb-4 flex items-center gap-1.5 font-mono">
            <Clock className="w-4 h-4" /> 나의 하루 시민 활동 타임라인 (TIMELINE)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="font-mono text-indigo-300 font-bold">07:30 AM</span>
              <div className="font-black text-white mt-1">신호등 민원 신청 (개별적 참여)</div>
              <p className="text-[11px] text-stone-400 mt-1">안전신문고 앱을 통해 보행 신호등 연장 신청 접수</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="font-mono text-indigo-300 font-bold">11:30 AM</span>
              <div className="font-black text-white mt-1">집단 참여의 발견</div>
              <p className="text-[11px] text-stone-400 mt-1">혼자보다 함께 목소리를 내는 정당·시민단체·이익집단 탐구</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="font-mono text-indigo-300 font-bold">13:10 PM</span>
              <div className="font-black text-white mt-1">정당 8대 핵심 기능 마스터</div>
              <p className="text-[11px] text-stone-400 mt-1">후보 공천, 이익 집약, 공약 제시, 정치적 책임, 감시·견제</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="font-mono text-indigo-300 font-bold">15:40 PM</span>
              <div className="font-black text-white mt-1">플라스틱 법안 입장 비교</div>
              <p className="text-[11px] text-stone-400 mt-1">같은 사회문제에 대한 정당, 시민단체, 이익집단의 목적 분석</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="font-mono text-indigo-300 font-bold">17:20 PM</span>
              <div className="font-black text-white mt-1">공청회 및 입법 과정 참여</div>
              <p className="text-[11px] text-stone-400 mt-1">공청회, 주민간담회, 자원봉사, 국회 입법예고 의견 제출</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="font-mono text-indigo-300 font-bold">19:00 PM</span>
              <div className="font-black text-white mt-1">5대 주민참여제도 정복</div>
              <p className="text-[11px] text-stone-400 mt-1">주민참여예산제, 조례 청구, 주민투표, 주민소환, 주민감사청구</p>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. 오늘 발견한 핵심 개념 카드 모아보기                        */}
      {/* ============================================================ */}
      <div className="space-y-4 max-w-4xl mx-auto">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <h3 className="text-xl font-black text-stone-900">
            오늘 하루 발견한 핵심 개념 사전
          </h3>
        </div>
        <p className="text-xs text-stone-500">
          교과서와 시험에 반드시 출제되는 필수 개념 6가지를 다시 한번 정리합니다.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <div className="p-5 rounded-3xl bg-white border border-stone-200/80 shadow-2xs">
            <span className="text-xs font-mono font-black text-blue-600">CONCEPT 01</span>
            <h4 className="text-sm font-black text-stone-900 mt-1">시민 (Citizen)</h4>
            <p className="text-xs text-stone-600 mt-1.5 leading-relaxed font-medium">
              공동체의 일원으로서 기본적 권리를 누리며, 사회와 국가의 의사 결정 과정에 주체적으로 참여하고 책임을 다하는 주체
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-stone-200/80 shadow-2xs">
            <span className="text-xs font-mono font-black text-blue-600">CONCEPT 02</span>
            <h4 className="text-sm font-black text-stone-900 mt-1">개별적 참여 vs 집단적 참여</h4>
            <p className="text-xs text-stone-600 mt-1.5 leading-relaxed font-medium">
              투표·민원 등 개인 단위의 참여와, 뜻을 함께하는 사람들과 정당·시민단체·이익집단 등 조직을 통해 지속적으로 영향력을 행사하는 집단적 참여
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-blue-200 shadow-2xs">
            <span className="text-xs font-mono font-black text-blue-700">CONCEPT 03</span>
            <h4 className="text-sm font-black text-stone-900 mt-1">🔵 정당 (Political Party)</h4>
            <p className="text-xs text-stone-600 mt-1.5 leading-relaxed font-medium">
              정치적 견해를 같이하는 사람들이 <strong>정권 획득</strong>을 목적으로 후보자를 공천하고 정책을 제시하며, 결과에 대해 <strong>정치적 책임</strong>을 지는 집단
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-emerald-200 shadow-2xs">
            <span className="text-xs font-mono font-black text-emerald-700">CONCEPT 04</span>
            <h4 className="text-sm font-black text-stone-900 mt-1">🟩 시민단체 (Civic Group)</h4>
            <p className="text-xs text-stone-600 mt-1.5 leading-relaxed font-medium">
              시민들이 자발적으로 결성하여 비영리적으로 사회 전체의 <strong>공익 실현</strong>과 문제 해결, 권력 감시를 추구하는 단체
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-amber-200 shadow-2xs">
            <span className="text-xs font-mono font-black text-amber-700">CONCEPT 05</span>
            <h4 className="text-sm font-black text-stone-900 mt-1">🟧 이익집단 (Interest Group)</h4>
            <p className="text-xs text-stone-600 mt-1.5 leading-relaxed font-medium">
              공통된 이해관계를 가진 사람들이 자신들 <strong>구성원의 특수한 이익과 권익</strong>을 실현하기 위해 정책 결정 과정에 영향을 미치는 집단
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-purple-200 shadow-2xs">
            <span className="text-xs font-mono font-black text-purple-700">CONCEPT 06</span>
            <h4 className="text-sm font-black text-stone-900 mt-1">주민참여제도 5총사</h4>
            <p className="text-xs text-stone-600 mt-1.5 leading-relaxed font-medium">
              예산(주민참여예산제), 조례(조례 제·개·폐 청구), 중요정책(주민투표), 선출직 해임(주민소환), 행정감시(주민감사청구)
            </p>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. 최종 형성평가 퀴즈 10문항 (FINAL TEST)                    */}
      {/* ============================================================ */}
      <div className="bg-white p-7 sm:p-9 rounded-[2.5rem] border border-stone-200/80 shadow-md max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-black mb-1">
              <Award className="w-4 h-4" />
              <span>FINAL FORMATION TEST (10문항)</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-stone-900">
              오늘 배운 시민 참여 역량 최종 형성평가
            </h3>
          </div>

          {quizSubmitted && (
            <div className="px-5 py-2.5 rounded-2xl bg-stone-900 text-white font-black text-center sm:text-right shadow-sm">
              <div className="text-[11px] font-bold text-stone-400">나의 최종 점수</div>
              <div className="text-2xl">{score}점 / 100점</div>
            </div>
          )}
        </div>

        {/* Quiz list */}
        <div className="space-y-4">
          {FINAL_QUIZ_DATA.map((q, idx) => {
            const userPick = selectedAnswers[q.id];
            const isCorrect = userPick === q.correctAnswer;

            return (
              <div
                key={q.id}
                className={`p-5 rounded-3xl border transition-all ${
                  quizSubmitted
                    ? isCorrect
                      ? 'border-emerald-300 bg-emerald-50/40'
                      : 'border-rose-300 bg-rose-50/40'
                    : 'border-stone-200/80 bg-stone-50/40'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h4 className="text-sm sm:text-base font-black text-stone-900 leading-snug">
                    <span className="text-blue-600 mr-2 font-mono">Q{idx + 1}.</span>
                    {q.question}
                  </h4>
                  {quizSubmitted && (
                    <span
                      className={`text-xs font-black px-2.5 py-0.5 rounded-full flex-shrink-0 ${
                        isCorrect
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {isCorrect ? '정답 ⭕' : '오답 ❌'}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = userPick === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectQuiz(q.id, optIdx)}
                        disabled={quizSubmitted}
                        className={`w-full p-3.5 rounded-2xl text-left text-xs sm:text-sm font-bold border transition flex items-center justify-between ${
                          quizSubmitted
                            ? optIdx === q.correctAnswer
                              ? 'bg-emerald-600 text-white border-emerald-600 font-black shadow-xs'
                              : isSelected
                              ? 'bg-rose-600 text-white border-rose-600'
                              : 'bg-white border-stone-200 text-stone-400'
                            : isSelected
                            ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                            : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
                        }`}
                      >
                        <span>
                          {optIdx + 1}. {opt}
                        </span>
                        {quizSubmitted && optIdx === q.correctAnswer && (
                          <span className="text-[10px] bg-white text-emerald-800 px-2 py-0.5 rounded-full font-black">
                            정답
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Detailed Explanation */}
                {quizSubmitted && (
                  <div className="mt-3.5 p-3.5 rounded-2xl bg-white border border-stone-200 text-xs text-stone-700 leading-relaxed animate-fadeIn">
                    <span className="font-black text-blue-700">[정답 해설]: </span>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit Button */}
        {!quizSubmitted ? (
          <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-stone-500 font-mono font-bold">
              응시 완료: {Object.keys(selectedAnswers).length} / 10문항
            </span>
            <button
              onClick={handleQuizSubmit}
              disabled={Object.keys(selectedAnswers).length < 10}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-extrabold text-sm shadow-md transition disabled:opacity-40"
            >
              10문항 최종 채점하기
            </button>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-center text-xs sm:text-sm text-blue-900 font-bold">
            수고하셨습니다! 오답 해설을 꼼꼼히 확인하고 나만의 <strong>‘디지털 시민 증명서’</strong>를 발급받아 보세요!
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* 4. 오늘의 한마디 (나의 시민 선언문 & 디지털 카드)             */}
      {/* ============================================================ */}
      <div className="bg-white p-7 sm:p-9 rounded-[2.5rem] border border-stone-200/80 shadow-md max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          <h3 className="text-xl font-black text-stone-900">
            오늘의 한마디: 나의 시민 선언문 (MY CIVIC PLEDGE)
          </h3>
        </div>
        <p className="text-xs text-stone-500">
          오늘 배운 내용을 바탕으로, 내가 앞으로 사회 속에서 실천하고 싶은 시민의 모습을 작성해 보세요:
        </p>

        {!isCardGenerated ? (
          <form onSubmit={handleGenerateCard} className="space-y-4 max-w-xl">
            <div>
              <label className="block text-xs font-black text-stone-700 mb-1.5">
                학생 이름 또는 닉네임
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="예: 김시민 (고1)"
                required
                className="w-full px-4 py-3 rounded-2xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-stone-700 mb-1.5">
                “나는 (            )한 시민이 되겠습니다.”
              </label>
              <textarea
                value={citizenPledge}
                onChange={(e) => setCitizenPledge(e.target.value)}
                rows={3}
                required
                className="w-full px-4 py-3 rounded-2xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium leading-relaxed"
              />
            </div>

            <button
              type="submit"
              className="px-7 py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-extrabold text-xs sm:text-sm shadow-md transition flex items-center gap-2"
            >
              <span>디지털 시민 증명서 발급받기</span>
              <Award className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <div className="space-y-6 animate-fadeIn">
            {/* The Digital Civic Card */}
            <div className="max-w-md mx-auto rounded-[2rem] p-6 bg-gradient-to-br from-indigo-950 via-stone-900 to-stone-950 text-white border-2 border-indigo-400/40 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/20 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center font-black text-xs text-blue-300">
                    2026
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-indigo-300 font-black uppercase tracking-widest">
                      CIVIC IDENTITY CARD
                    </div>
                    <div className="text-xs font-black text-white">오늘도 시민입니다</div>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>인증 완료</span>
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="text-[10px] text-stone-400 font-medium">시민 성명</div>
                  <div className="text-lg font-black text-white">{studentName}</div>
                </div>

                <div>
                  <div className="text-[10px] text-stone-400 font-medium">시민 선언 (CIVIC PLEDGE)</div>
                  <p className="text-xs sm:text-sm text-indigo-100 font-medium leading-relaxed italic bg-white/5 p-3.5 rounded-2xl border border-white/10 mt-1">
                    “{citizenPledge}”
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-[10px] text-stone-400 border-t border-white/10 font-mono">
                  <span>통합사회2 시민 참여 시뮬레이션</span>
                  <span>발급: 대한민국 시민</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handlePrint}
                className="px-5 py-2.5 rounded-full border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 text-xs font-bold flex items-center gap-1.5 shadow-2xs transition"
              >
                <Printer className="w-4 h-4" />
                <span>증명서 인쇄 및 저장</span>
              </button>

              <button
                onClick={() => setIsCardGenerated(false)}
                className="px-5 py-2.5 rounded-full border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 text-xs font-bold flex items-center gap-1.5 shadow-2xs transition"
              >
                <RotateCcw className="w-4 h-4" />
                <span>선언문 다시 작성하기</span>
              </button>

              <button
                onClick={onResetAll}
                className="px-6 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-black flex items-center gap-1.5 shadow-md transition"
              >
                <RotateCcw className="w-4 h-4" />
                <span>처음부터 다시 시뮬레이션하기</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
