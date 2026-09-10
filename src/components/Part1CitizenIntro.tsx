import React, { useState } from 'react';
import {
  Bell,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  MessageSquare,
  Eye,
  HeartHandshake,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Part1Props {
  onComplete: () => void;
  onNext: () => void;
}

export const Part1CitizenIntro: React.FC<Part1Props> = ({ onComplete, onNext }) => {
  const [initialChoice, setInitialChoice] = useState<'pass' | 'solve' | null>(null);
  const [selectedChecks, setSelectedChecks] = useState<Record<string, boolean>>({
    c1: false,
    c2: false,
    c3: false,
    c4: false,
  });
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleChoice = (choice: 'pass' | 'solve') => {
    setInitialChoice(choice);
  };

  const handleToggleCheck = (id: string) => {
    if (quizSubmitted) return;
    setSelectedChecks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const checkAnswers = () => {
    const isCorrect =
      selectedChecks.c1 === true &&
      selectedChecks.c2 === true &&
      selectedChecks.c3 === true &&
      selectedChecks.c4 === false;

    setQuizSubmitted(true);

    if (isCorrect) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
      onComplete();
    }
  };

  const isCheckCorrect =
    quizSubmitted &&
    selectedChecks.c1 &&
    selectedChecks.c2 &&
    selectedChecks.c3 &&
    !selectedChecks.c4;

  return (
    <div className="space-y-6 pb-8">
      {/* 08:03 AM Smartphone Lock Screen Simulation */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-800 to-indigo-950 p-6 text-white shadow-xl">
        <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-6">
          <span>08:03 AM</span>
          <span className="px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
            2026년 9월 10일 목요일
          </span>
        </div>

        {/* Lock Screen Time Display */}
        <div className="text-center my-4">
          <div className="text-5xl font-light tracking-tight font-sans text-white/95">
            08:03
          </div>
          <p className="text-xs text-indigo-200 mt-1">등교길 스마트폰 잠금화면</p>
        </div>

        {/* Push Notification Card */}
        <div className="mt-6 mx-auto max-w-md rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 p-4 shadow-lg text-slate-100 transition hover:bg-white/20">
          <div className="flex items-center justify-between text-xs mb-1.5 text-indigo-200">
            <div className="flex items-center gap-1.5 font-medium">
              <span className="p-1 rounded bg-amber-500/20 text-amber-300">
                <Bell className="w-3.5 h-3.5" />
              </span>
              <span>우리동네 안전알림이</span>
            </div>
            <span>방금 전</span>
          </div>
          <div className="text-sm font-semibold text-white mt-1 flex items-start gap-2">
            <span>🚸</span>
            <p className="leading-snug">
              학교 앞 횡단보도 신호가 너무 짧다는 제보가 계속되고 있습니다.
            </p>
          </div>
          <p className="text-xs text-slate-300 mt-1 pl-6">
            등교 시간마다 학생들이 뛰어서 건너느라 사고 위험이 높다는 학부모 및 학생들의 의견 접수 중
          </p>
        </div>

        {/* Interactive Question */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <h2 className="text-lg font-bold text-white mb-2">
            “이건 나와 상관없는 일일까?”
          </h2>
          <p className="text-xs text-slate-300 mb-5">
            매일 아침 내가 건너는 횡단보도입니다. 당신의 선택은?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto">
            <button
              onClick={() => handleChoice('pass')}
              className={`p-3.5 rounded-xl text-sm font-medium transition border flex items-center justify-center gap-2 ${
                initialChoice === 'pass'
                  ? 'bg-slate-700 text-white border-slate-500 ring-2 ring-slate-400'
                  : 'bg-white/10 text-slate-200 border-white/20 hover:bg-white/15'
              }`}
            >
              <span>🚶</span>
              <span>[그냥 지나간다]</span>
            </button>

            <button
              onClick={() => handleChoice('solve')}
              className={`p-3.5 rounded-xl text-sm font-semibold transition border flex items-center justify-center gap-2 ${
                initialChoice === 'solve'
                  ? 'bg-blue-600 text-white border-blue-400 ring-2 ring-blue-400'
                  : 'bg-blue-500/20 text-blue-200 border-blue-400/40 hover:bg-blue-500/30'
              }`}
            >
              <span>💡</span>
              <span>[문제를 해결할 방법을 찾아본다]</span>
            </button>
          </div>

          {/* Feedback message on choice */}
          {initialChoice && (
            <div className="mt-4 p-3 rounded-xl bg-white/10 text-xs text-indigo-100 max-w-md mx-auto border border-white/10">
              {initialChoice === 'pass' ? (
                <p>
                  “바쁜 아침엔 그냥 지나칠 수도 있죠. 하지만 <strong>불편함을 참기만 하면 아무것도 바뀌지 않습니다.</strong> 만약 내가 작은 행동을 시작한다면 어떻게 될까요?”
                </p>
              ) : (
                <p>
                  “멋진 생각입니다! <strong>작은 관심과 목소리가 모여 안전한 등굣길을 만드는 첫걸음</strong>이 됩니다. 바로 이것이 시민 참여입니다!”
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Concept Reveal (Only reveals or emphasizes after choice) */}
      {initialChoice && (
        <div className="space-y-6 animate-fadeIn">
          {/* Concept 1: Citizen Participation definition */}
          <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50/50 p-5 sm:p-6 shadow-sm">
            <div className="flex items-center gap-2 text-blue-700 font-semibold text-xs mb-2">
              <Sparkles className="w-4 h-4" />
              <span>핵심 개념 발견</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              시민 참여 (Citizen Participation)
            </h3>
            <p className="text-base text-slate-700 leading-relaxed font-medium">
              시민이 공동체의 문제와 의사 결정 과정에 관심을 가지고, 자신의 의견과 요구를 표현하며 정치·사회 과정에 영향을 미치는 활동
            </p>

            {/* Crucial sentence callout */}
            <div className="mt-4 p-4 rounded-xl bg-white border border-blue-200/80 shadow-sm flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-100 text-blue-700 mt-0.5">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-base font-bold text-blue-900">
                  “시민 참여는 선거일에만 하는 것이 아니다.”
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  우리가 생활 속 불편과 문제에 의견을 내고 해결 과정에 적극적으로 참여하는 것도 소중하고 강력한 시민 참여가 됩니다.
                </p>
              </div>
            </div>
          </div>

          {/* 3 Life Situations: Why citizen participation is necessary */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
            <h4 className="text-base font-bold text-slate-900 mb-1">
              시민 참여는 왜 필요할까?
            </h4>
            <p className="text-xs text-slate-500 mb-4">
              아래 세 가지 일상 상황을 클릭하여 민주 사회에서의 역할을 확인해 보세요.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Situation 1 */}
              <button
                onClick={() => setActiveTab(0)}
                className={`p-4 rounded-xl text-left border transition-all ${
                  activeTab === 0
                    ? 'border-blue-500 bg-blue-50/60 ring-2 ring-blue-400/20 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                }`}
              >
                <div className="flex items-center gap-2 text-blue-600 text-sm font-semibold mb-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>상황 1</span>
                </div>
                <p className="text-xs font-medium text-slate-700 mb-2">
                  💬 “학생들의 안전을 위해 신호 시간을 5초만 늘려주세요!”
                </p>
                <div className="pt-2 border-t border-slate-200/60 text-xs font-bold text-blue-800">
                  ⬇ 시민의 요구와 이익을 정치 과정에 반영
                </div>
              </button>

              {/* Situation 2 */}
              <button
                onClick={() => setActiveTab(1)}
                className={`p-4 rounded-xl text-left border transition-all ${
                  activeTab === 1
                    ? 'border-indigo-500 bg-indigo-50/60 ring-2 ring-indigo-400/20 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                }`}
              >
                <div className="flex items-center gap-2 text-indigo-600 text-sm font-semibold mb-1">
                  <Eye className="w-4 h-4" />
                  <span>상황 2</span>
                </div>
                <p className="text-xs font-medium text-slate-700 mb-2">
                  👀 “구청과 경찰서가 안전 점검을 제대로 진행하고 있는지 확인해볼게요.”
                </p>
                <div className="pt-2 border-t border-slate-200/60 text-xs font-bold text-indigo-800">
                  ⬇ 국가기관과 권력의 활동을 감시·견제
                </div>
              </button>

              {/* Situation 3 */}
              <button
                onClick={() => setActiveTab(2)}
                className={`p-4 rounded-xl text-left border transition-all ${
                  activeTab === 2
                    ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-400/20 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                }`}
              >
                <div className="flex items-center gap-2 text-emerald-600 text-sm font-semibold mb-1">
                  <HeartHandshake className="w-4 h-4" />
                  <span>상황 3</span>
                </div>
                <p className="text-xs font-medium text-slate-700 mb-2">
                  🤝 “학생, 학부모, 주민이 함께 모여 통학로 개선 서명운동을 펼쳐요.”
                </p>
                <div className="pt-2 border-t border-slate-200/60 text-xs font-bold text-emerald-800">
                  ⬇ 공동체 문제 해결과 민주주의 발전
                </div>
              </button>
            </div>
          </div>

          {/* CHECK Quiz */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-xs font-bold">
                  CHECK QUIZ
                </span>
                <h4 className="text-sm font-bold text-slate-900">
                  시민 참여가 활발할수록 기대할 수 있는 효과는?
                </h4>
              </div>
              <span className="text-xs text-slate-400 font-medium">(복수 선택)</span>
            </div>

            <div className="space-y-2 mt-3">
              <label
                onClick={() => handleToggleCheck('c1')}
                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${
                  selectedChecks.c1
                    ? 'border-blue-500 bg-blue-50 text-blue-900'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedChecks.c1}
                  onChange={() => {}}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-xs sm:text-sm font-medium">
                  다양한 시민의 요구가 정치 과정에 전달된다.
                </span>
              </label>

              <label
                onClick={() => handleToggleCheck('c2')}
                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${
                  selectedChecks.c2
                    ? 'border-blue-500 bg-blue-50 text-blue-900'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedChecks.c2}
                  onChange={() => {}}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-xs sm:text-sm font-medium">
                  권력에 대한 감시와 견제가 가능해진다.
                </span>
              </label>

              <label
                onClick={() => handleToggleCheck('c3')}
                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${
                  selectedChecks.c3
                    ? 'border-blue-500 bg-blue-50 text-blue-900'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedChecks.c3}
                  onChange={() => {}}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-xs sm:text-sm font-medium">
                  공동체 문제 해결에 시민이 참여할 수 있다.
                </span>
              </label>

              <label
                onClick={() => handleToggleCheck('c4')}
                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${
                  selectedChecks.c4
                    ? 'border-rose-400 bg-rose-50 text-rose-900'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedChecks.c4}
                  onChange={() => {}}
                  className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500"
                />
                <span className="text-xs sm:text-sm font-medium text-slate-600">
                  시민은 정책 결정과 완전히 분리된다.
                </span>
              </label>
            </div>

            {/* Check button & Feedback */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                onClick={checkAnswers}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm transition"
              >
                정답 확인하기
              </button>

              {quizSubmitted && (
                <div
                  className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg ${
                    isCheckCorrect
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {isCheckCorrect ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>정답입니다! 앞의 세 가지 항목이 모두 시민 참여의 핵심 효과입니다.</span>
                    </>
                  ) : (
                    <>
                      <HelpCircle className="w-4 h-4 text-amber-600" />
                      <span>다시 확인해 보세요! 시민은 정책 결정에서 분리되는 것이 아니라 직접 참여하게 됩니다. (앞의 3개 선택)</span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Next Part CTA */}
          <div className="pt-4 flex justify-end">
            <button
              onClick={onNext}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm flex items-center gap-2 shadow-md transition hover:gap-3"
            >
              <span>PART 02: 나 혼자 움직인다면 탐구하기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
