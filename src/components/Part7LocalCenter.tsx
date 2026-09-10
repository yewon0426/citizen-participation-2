import React, { useState } from 'react';
import { RESIDENT_CASES } from '../data/curriculumData';
import {
  MapPin,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Check,
  Smartphone,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Part7Props {
  onComplete: () => void;
  onNext: () => void;
}

const SYSTEM_OPTIONS = [
  '주민참여예산제',
  '조례 제정·개정·폐지 청구',
  '주민투표',
  '주민소환',
  '주민감사청구',
];

export const Part7LocalCenter: React.FC<Part7Props> = ({
  onComplete,
  onNext,
}) => {
  // Case step simulation
  const [activeCaseIdx, setActiveCaseIdx] = useState(0);
  const [caseSelections, setCaseSelections] = useState<Record<string, string>>({});
  const [caseFeedback, setCaseFeedback] = useState<Record<string, boolean>>({});

  // Matching game state
  const [selectedCaseForMatch, setSelectedCaseForMatch] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({});
  const [isMatchFinished, setIsMatchFinished] = useState(false);

  const handleSelectSystemForCase = (caseId: string, system: string) => {
    setCaseSelections((prev) => ({ ...prev, [caseId]: system }));
    const currentC = RESIDENT_CASES.find((c) => c.id === caseId);
    const isCorrect = currentC?.correctSystem === system;
    setCaseFeedback((prev) => ({ ...prev, [caseId]: isCorrect }));

    if (isCorrect) {
      confetti({ particleCount: 30, spread: 45 });
    }
  };

  const handleMatchSelect = (system: string) => {
    if (!selectedCaseForMatch) return;

    const currentC = RESIDENT_CASES.find((c) => c.id === selectedCaseForMatch);
    if (currentC?.correctSystem === system) {
      const updated = { ...matchedPairs, [selectedCaseForMatch]: system };
      setMatchedPairs(updated);
      setSelectedCaseForMatch(null);

      if (Object.keys(updated).length === RESIDENT_CASES.length) {
        setIsMatchFinished(true);
        confetti({ particleCount: 60, spread: 75 });
        onComplete();
      }
    } else {
      alert(`‘${system}’ 제도는 이 상황과 맞지 않습니다. 상황의 핵심 키워드를 다시 확인해 보세요!`);
    }
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Header */}
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-2 text-xs font-mono text-stone-500">
          <span className="px-3 py-1 rounded-full bg-stone-100 font-bold text-stone-800 flex items-center gap-1.5">
            <Smartphone className="w-3.5 h-3.5 text-blue-600" />
            <span>07:00 PM · 우리 동네 스마트 참여센터 (시민e음)</span>
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight leading-tight">
          “우리 동네 문제,<br />
          어떤 주민참여 제도를 이용할까요?”
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          지방자치에서는 주민이 직접 지자체의 예산, 법규(조례), 중요 정책, 공직자, 행정 감시에 참여할 수 있는 <strong>5대 제도</strong>를 운영하고 있습니다.
          상황별로 알맞은 제도를 터치해 매칭해 보세요:
        </p>
      </div>

      {/* 5 Cases List */}
      <div className="max-w-3xl mx-auto space-y-4">
        {RESIDENT_CASES.map((item, idx) => {
          const isAnswered = !!caseSelections[item.id];
          const isCorrect = caseFeedback[item.id];

          return (
            <div
              key={item.id}
              className={`p-6 rounded-3xl border transition-all ${
                activeCaseIdx === idx
                  ? 'border-blue-400 bg-white shadow-md ring-2 ring-blue-100'
                  : 'border-stone-200/80 bg-white hover:border-stone-300 shadow-2xs'
              }`}
            >
              <div
                onClick={() => setActiveCaseIdx(idx)}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-800 text-xs font-mono font-black">
                    CASE 0{idx + 1}
                  </span>
                  <span className="text-xs font-black text-blue-800 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                    키워드: {item.keyword}
                  </span>
                </div>
                {isAnswered && (
                  <span
                    className={`text-xs font-black flex items-center gap-1 ${
                      isCorrect ? 'text-emerald-700' : 'text-rose-600'
                    }`}
                  >
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" /> 정답 ({item.correctSystem})
                      </>
                    ) : (
                      '다시 선택'
                    )}
                  </span>
                )}
              </div>

              <p className="text-sm font-black text-stone-800 mt-3 leading-relaxed">
                {item.situation}
              </p>

              {activeCaseIdx === idx && (
                <div className="mt-4 pt-4 border-t border-stone-100 animate-fadeIn">
                  <p className="text-xs text-stone-500 font-bold mb-3">
                    알맞은 주민참여제도를 선택하세요:
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {SYSTEM_OPTIONS.map((sys) => (
                      <button
                        key={sys}
                        onClick={() => handleSelectSystemForCase(item.id, sys)}
                        className={`p-3 rounded-2xl text-xs font-black text-center border transition ${
                          caseSelections[item.id] === sys
                            ? sys === item.correctSystem
                              ? 'bg-blue-600 text-white border-blue-600 shadow-sm scale-[1.02]'
                              : 'bg-rose-50 border-rose-300 text-rose-800'
                            : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                        }`}
                      >
                        {sys}
                      </button>
                    ))}
                  </div>

                  {isAnswered && isCorrect && (
                    <div className="mt-4 p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-stone-800 leading-relaxed">
                      <span className="font-black text-blue-800">[제도 해설]: </span>
                      {item.description}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* FINAL MATCH 1:1 INTERACTIVE */}
      <div className="max-w-3xl mx-auto rounded-[2.5rem] bg-white border border-stone-200/80 p-7 sm:p-9 shadow-md space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-black flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>FINAL MATCH</span>
            </span>
            <h3 className="text-lg sm:text-xl font-black text-stone-900">
              5대 제도 1:1 매칭 게임
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-stone-500">
            매칭 완료: {Object.keys(matchedPairs).length} / 5
          </span>
        </div>

        <p className="text-xs text-stone-500">
          왼쪽 ‘상황 키워드’를 누르고, 오른쪽에 알맞은 ‘제도 이름’을 차례대로 탭하여 연결하세요:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Left: Situation Keywords */}
          <div className="space-y-2">
            <div className="text-xs font-mono font-bold text-stone-400">상황 키워드 (선택)</div>
            {RESIDENT_CASES.map((c) => {
              const isMatched = !!matchedPairs[c.id];
              const isSelected = selectedCaseForMatch === c.id;

              return (
                <button
                  key={c.id}
                  onClick={() => !isMatched && setSelectedCaseForMatch(c.id)}
                  disabled={isMatched}
                  className={`w-full p-3.5 rounded-2xl text-left border transition flex items-center justify-between text-xs font-bold ${
                    isMatched
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold opacity-80'
                      : isSelected
                      ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                      : 'bg-stone-50 border-stone-200 text-stone-800 hover:bg-stone-100'
                  }`}
                >
                  <span>{c.keyword}</span>
                  {isMatched ? (
                    <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                      → {matchedPairs[c.id]}
                    </span>
                  ) : isSelected ? (
                    <span className="text-[10px] text-stone-300">오른쪽 제도 탭</span>
                  ) : null}
                </button>
              );
            })}
          </div>

          {/* Right: Systems */}
          <div className="space-y-2">
            <div className="text-xs font-mono font-bold text-stone-400">제도 이름 (연결)</div>
            {SYSTEM_OPTIONS.map((sys) => {
              const isAlreadyUsed = Object.values(matchedPairs).includes(sys);

              return (
                <button
                  key={sys}
                  onClick={() => handleMatchSelect(sys)}
                  disabled={isAlreadyUsed || !selectedCaseForMatch}
                  className={`w-full p-3.5 rounded-2xl text-left border transition text-xs font-bold ${
                    isAlreadyUsed
                      ? 'bg-stone-100 border-stone-200 text-stone-400 cursor-not-allowed'
                      : selectedCaseForMatch
                      ? 'bg-white border-purple-400 text-purple-900 hover:bg-purple-50 shadow-xs ring-2 ring-purple-200'
                      : 'bg-stone-50 border-stone-200 text-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{sys}</span>
                    {isAlreadyUsed && <Check className="w-4 h-4 text-emerald-600" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Master Matching Summary Card */}
        {isMatchFinished && (
          <div className="pt-4 border-t border-stone-100 animate-fadeIn space-y-3">
            <div className="flex items-center gap-2 text-emerald-800 font-black text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>5대 주민참여제도 매칭 완료! 한눈에 최종 정리</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
              <div className="p-3 bg-blue-50 rounded-2xl border border-blue-200">
                <div className="text-lg mb-1">💰 예산</div>
                <div className="font-black text-blue-900 text-[11px]">주민참여예산제</div>
              </div>
              <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200">
                <div className="text-lg mb-1">📜 조례</div>
                <div className="font-black text-purple-900 text-[11px]">조례 제·개·폐 청구</div>
              </div>
              <div className="p-3 bg-indigo-50 rounded-2xl border border-indigo-200">
                <div className="text-lg mb-1">🗳 정책 결정</div>
                <div className="font-black text-indigo-900 text-[11px]">주민투표</div>
              </div>
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200">
                <div className="text-lg mb-1">👤 선출직 해임</div>
                <div className="font-black text-amber-900 text-[11px]">주민소환</div>
              </div>
              <div className="p-3 bg-rose-50 rounded-2xl border border-rose-200">
                <div className="text-lg mb-1">🔎 위법 감시</div>
                <div className="font-black text-rose-900 text-[11px]">주민감사청구</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Next Step */}
      <div className="flex justify-center pt-2">
        <button
          onClick={onNext}
          className="px-8 py-3.5 rounded-full bg-stone-900 hover:bg-blue-600 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-xl shadow-stone-900/15 transition-all group"
        >
          <span>PART 08: MY CIVIC REPORT (하루 종합 성찰 리포트)</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
