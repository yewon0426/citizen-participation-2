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
  Check,
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
    <div className="space-y-12 pb-16">
      {/* 08:03 AM Smartphone Lock Screen Simulation */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-stone-900 via-stone-900 to-indigo-950 p-6 sm:p-10 text-white shadow-xl">
        <div className="flex items-center justify-between text-xs text-stone-400 font-mono mb-6">
          <span>08:03 AM</span>
          <span className="px-3 py-1 rounded-full bg-white/10 text-stone-200">
            2026년 9월 10일 목요일
          </span>
        </div>

        {/* Lock Screen Time Display */}
        <div className="text-center my-6">
          <div className="text-6xl sm:text-7xl font-light tracking-tight font-sans text-white/95">
            08:03
          </div>
          <p className="text-xs text-indigo-200 mt-2 font-mono">등교길 스마트폰 잠금화면</p>
        </div>

        {/* Push Notification Card */}
        <div className="mt-8 mx-auto max-w-md rounded-3xl bg-white/15 backdrop-blur-md border border-white/20 p-5 shadow-lg text-stone-100 transition hover:bg-white/20">
          <div className="flex items-center justify-between text-xs mb-1.5 text-indigo-200 font-mono">
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
          <p className="text-xs text-stone-300 mt-1.5 pl-6 font-medium">
            등교 시간마다 학생들이 뛰어서 건너느라 사고 위험이 높다는 학부모 및 학생들의 의견 접수 중
          </p>
        </div>

        {/* Big Typography Question */}
        <div className="mt-10 pt-8 border-t border-white/10 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
            “이건 나와 상관없는 일일까?”
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 max-w-sm mx-auto">
            매일 아침 내가 건너는 횡단보도입니다. 당신의 선택은?
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2">
            <button
              onClick={() => handleChoice('pass')}
              className={`w-full sm:w-1/2 p-4 rounded-full text-xs sm:text-sm font-bold transition border flex items-center justify-center gap-2 ${
                initialChoice === 'pass'
                  ? 'bg-stone-700 text-white border-stone-500 ring-2 ring-stone-400'
                  : 'bg-white/10 text-stone-200 border-white/20 hover:bg-white/15'
              }`}
            >
              <span>🚶</span>
              <span>그냥 지나친다</span>
            </button>

            <button
              onClick={() => handleChoice('solve')}
              className={`w-full sm:w-1/2 p-4 rounded-full text-xs sm:text-sm font-black transition border flex items-center justify-center gap-2 ${
                initialChoice === 'solve'
                  ? 'bg-blue-600 text-white border-blue-400 ring-4 ring-blue-400/40 shadow-lg'
                  : 'bg-blue-500/20 text-blue-200 border-blue-400/40 hover:bg-blue-500/30'
              }`}
            >
              <span>💡</span>
              <span>해결 방법을 찾아본다</span>
            </button>
          </div>

          {initialChoice && (
            <div className="mt-5 p-4 rounded-2xl bg-white/10 text-xs text-indigo-100 max-w-md mx-auto border border-white/10 font-medium leading-relaxed animate-fadeIn">
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

      {/* Concept Reveal */}
      {initialChoice && (
        <div className="space-y-10 animate-fadeIn">
          {/* Concept 1: Citizen Participation definition without heavy nested boxes */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-black">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>KEY CONCEPT 01</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
              시민 참여 (Citizen Participation)
            </h3>
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
              시민이 공동체의 문제와 의사 결정 과정에 관심을 가지고, 자신의 의견과 요구를 표현하며 정치·사회 과정에 영향을 미치는 활동
            </p>

            <div className="p-4 rounded-3xl bg-blue-50/70 border border-blue-200 text-stone-800 text-xs sm:text-sm font-semibold max-w-xl mx-auto">
              “시민 참여는 선거일에만 하는 것이 아닙니다. 일상 속 불편과 위험에 목소리를 내는 모든 순간이 시민의 권리입니다.”
            </div>
          </div>

          {/* 3 Situations */}
          <div className="space-y-3 max-w-3xl mx-auto">
            <h4 className="text-sm font-mono uppercase tracking-wider text-stone-600 font-semibold text-center">
              WHY PARTICIPATION MATTERS
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-5 rounded-3xl bg-white border border-stone-200/80 shadow-2xs space-y-2">
                <div className="text-lg">💬</div>
                <div className="text-xs font-bold text-stone-700">“신호 시간을 늘려주세요!”</div>
                <div className="text-xs font-black text-blue-700 pt-1 border-t border-stone-100">
                  → 시민의 요구를 정치 과정에 반영
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-stone-200/80 shadow-2xs space-y-2">
                <div className="text-lg">👀</div>
                <div className="text-xs font-bold text-stone-700">“안전 점검을 제대로 하는지 확인”</div>
                <div className="text-xs font-black text-indigo-700 pt-1 border-t border-stone-100">
                  → 국가기관 권력 감시·견제
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-stone-200/80 shadow-2xs space-y-2">
                <div className="text-lg">🤝</div>
                <div className="text-xs font-bold text-stone-700">“주민과 함께 서명 운동”</div>
                <div className="text-xs font-black text-emerald-700 pt-1 border-t border-stone-100">
                  → 공동체 문제 해결과 민주주의 발전
                </div>
              </div>
            </div>
          </div>

          {/* CHECK Quiz */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-sm max-w-2xl mx-auto space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-800 text-xs font-black">
                CHECK QUIZ (복수 선택)
              </span>
              <span className="text-xs font-mono text-stone-600">3개 선택</span>
            </div>

            <h4 className="text-base font-black text-stone-900 leading-snug">
              시민 참여가 활발할수록 기대할 수 있는 효과는?
            </h4>

            <div className="space-y-2">
              {[
                { id: 'c1', label: '다양한 시민의 요구가 정치 과정에 전달된다.' },
                { id: 'c2', label: '권력에 대한 감시와 견제가 가능해진다.' },
                { id: 'c3', label: '공동체 문제 해결에 시민이 주체로 참여할 수 있다.' },
                { id: 'c4', label: '시민은 정책 결정과 완전히 분리된다. (오답 함정)' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleToggleCheck(item.id)}
                  className={`w-full p-3.5 rounded-2xl text-left text-xs sm:text-sm font-bold border transition flex items-center justify-between ${
                    selectedChecks[item.id]
                      ? item.id === 'c4'
                        ? 'bg-rose-50 border-rose-300 text-rose-900'
                        : 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-stone-50/80 hover:bg-stone-100 border-stone-200 text-stone-800'
                  }`}
                >
                  <span>{item.label}</span>
                  {selectedChecks[item.id] && <Check className="w-4 h-4" />}
                </button>
              ))}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={checkAnswers}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-black transition shadow-sm"
              >
                정답 확인하기
              </button>

              {quizSubmitted && (
                <div
                  className={`text-xs font-bold px-3.5 py-1.5 rounded-full ${
                    isCheckCorrect
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {isCheckCorrect
                    ? '정답입니다! 앞의 세 항목이 시민 참여의 핵심 효과입니다 ✓'
                    : '다시 확인해 보세요! 시민은 정책 결정에 직접 참여합니다 (앞의 3개 선택)'}
                </div>
              )}
            </div>
          </div>

          {/* Next Part */}
          <div className="flex justify-center pt-4">
            <button
              onClick={onNext}
              className="px-8 py-3.5 rounded-full bg-stone-900 hover:bg-blue-600 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-xl shadow-stone-900/15 transition-all group"
            >
              <span>PART 02: 나 혼자 움직인다면 (개별적 참여 & 안전신문고)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
