import React, { useState } from 'react';
import { OrgType } from '../types';
import {
  COMMON_GROUND_OPTIONS,
  EXAM_TRAP_QUESTIONS,
  MYSTERY_CASES,
} from '../data/curriculumData';
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Award,
  Bell,
  Check,
  Search,
  BookOpen,
  HelpCircle,
  TrendingUp,
  Bookmark,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Part5Props {
  onComplete: () => void;
  onNext: () => void;
}

// 8 Characteristics Stickers for the 3 Worlds + Common Zone
interface StickerItem {
  id: string;
  text: string;
  correctZone: 'party' | 'civic' | 'interest' | 'common';
}

const STICKER_POOL: StickerItem[] = [
  { id: 's1', text: '정치사회화', correctZone: 'common' },
  { id: 's2', text: '여론 형성 및 결집', correctZone: 'common' },
  { id: 's3', text: '정책 과정에 영향력 행사', correctZone: 'common' },
  { id: 's4', text: '국민의 요구 전달', correctZone: 'common' },
  { id: 's5', text: '후보자 공천', correctZone: 'party' },
  { id: 's6', text: '정권 획득 (국가 권력 쟁취)', correctZone: 'party' },
  { id: 's7', text: '사회 전체의 공익 실현', correctZone: 'civic' },
  { id: 's8', text: '구성원의 특수 이익 실현', correctZone: 'interest' },
];

export const Part5CompareOrganizations: React.FC<Part5Props> = ({
  onComplete,
  onNext,
}) => {
  // Common Zone Interactive Sorter
  const [placedStickers, setPlacedStickers] = useState<
    Record<string, 'party' | 'civic' | 'interest' | 'common'>
  >({});
  const [selectedSticker, setSelectedSticker] = useState<StickerItem | null>(null);
  const [isClassificationDone, setIsClassificationDone] = useState(false);

  // Notes view mode (Only revealed upon "SAVE TO NOTES")
  const [showNotesTable, setShowNotesTable] = useState(false);

  // Exam Trap state
  const [trapAnswers, setTrapAnswers] = useState<Record<string, string>>({});
  const [trapSubmitted, setTrapSubmitted] = useState<Record<string, boolean>>({});

  // Mystery Cases State
  const [currentCaseIdx, setCurrentCaseIdx] = useState(0);
  const [caseAnswers, setCaseAnswers] = useState<
    Record<
      string,
      {
        selectedOrg: OrgType | null;
        selectedClues: string[];
        isSubmitted: boolean;
      }
    >
  >({});

  // Handle placing sticker into zone
  const handlePlaceStickerInZone = (zone: 'party' | 'civic' | 'interest' | 'common') => {
    if (!selectedSticker) return;

    if (selectedSticker.correctZone === zone) {
      const updated = { ...placedStickers, [selectedSticker.id]: zone };
      setPlacedStickers(updated);
      setSelectedSticker(null);
      confetti({ particleCount: 25, spread: 45 });

      if (Object.keys(updated).length === STICKER_POOL.length) {
        setIsClassificationDone(true);
        confetti({ particleCount: 60, spread: 75 });
      }
    } else {
      alert(`‘${selectedSticker.text}’ 스티커는 이 영역의 고유 특성이 아닙니다. 다른 영역을 선택해 보세요!`);
    }
  };

  // Exam Trap Answer Handler
  const handleAnswerTrap = (qId: string, optId: string) => {
    setTrapAnswers((prev) => ({ ...prev, [qId]: optId }));
    setTrapSubmitted((prev) => ({ ...prev, [qId]: true }));
  };

  // Mystery case handler
  const currentCase = MYSTERY_CASES[currentCaseIdx];
  const caseState = caseAnswers[currentCase.id] || {
    selectedOrg: null,
    selectedClues: [],
    isSubmitted: false,
  };

  const toggleClue = (clue: string) => {
    if (caseState.isSubmitted) return;
    const exists = caseState.selectedClues.includes(clue);
    const updated = exists
      ? caseState.selectedClues.filter((c) => c !== clue)
      : [...caseState.selectedClues, clue];

    setCaseAnswers((prev) => ({
      ...prev,
      [currentCase.id]: { ...caseState, selectedClues: updated },
    }));
  };

  const selectOrgForCase = (org: OrgType) => {
    if (caseState.isSubmitted) return;
    setCaseAnswers((prev) => ({
      ...prev,
      [currentCase.id]: { ...caseState, selectedOrg: org },
    }));
  };

  const submitCase = () => {
    if (!caseState.selectedOrg) return;
    setCaseAnswers((prev) => ({
      ...prev,
      [currentCase.id]: { ...caseState, isSubmitted: true },
    }));
    confetti({ particleCount: 30, spread: 50 });
  };

  return (
    <div className="space-y-16 pb-16">
      {/* ============================================================ */}
      {/* 1. THREE WORLDS COLLIDE: COMMON ZONE INTERACTION              */}
      {/* ============================================================ */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-mono tracking-widest text-stone-600 uppercase font-semibold">
            WHERE THREE WORLDS MEET
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            세 세계가 만나는 곳
          </h2>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
            정당, 시민단체, 이익집단은 서로 다른 목적을 가졌지만 때로는 <strong>놀랍도록 닮은 기능</strong>을 공유합니다.
            아래 스티커를 탭한 후, 알맞은 영역(정당 / 시민단체 / 이익집단 / COMMON ZONE)으로 분류하세요:
          </p>
        </div>

        {/* Sticker Tray (Unplaced stickers) */}
        <div className="bg-white/80 backdrop-blur-sm p-5 rounded-3xl border border-stone-200/80 shadow-xs max-w-3xl mx-auto">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-stone-500 mb-3">
            <span>스티커 보관함 (분류할 항목을 먼저 탭하세요)</span>
            <span>
              남은 항목: {STICKER_POOL.length - Object.keys(placedStickers).length} / {STICKER_POOL.length}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {STICKER_POOL.map((stk) => {
              const isPlaced = !!placedStickers[stk.id];
              const isSelected = selectedSticker?.id === stk.id;

              if (isPlaced) return null;

              return (
                <button
                  key={stk.id}
                  onClick={() => setSelectedSticker(stk)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-200 ${
                    isSelected
                      ? 'bg-stone-900 text-white shadow-lg scale-105 ring-4 ring-stone-300'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
                  }`}
                >
                  {stk.text}
                </button>
              );
            })}

            {Object.keys(placedStickers).length === STICKER_POOL.length && (
              <div className="text-xs font-bold text-emerald-700 py-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                모든 특성 스티커가 올바른 영역에 배치되었습니다!
              </div>
            )}
          </div>
        </div>

        {/* The 3 Circles Layout + Centered COMMON ZONE */}
        <div className="relative max-w-4xl mx-auto py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* 1. Left: PARTY ZONE */}
            <div
              onClick={() => handlePlaceStickerInZone('party')}
              className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between min-h-[220px] ${
                selectedSticker
                  ? 'border-blue-400 bg-blue-50/50 hover:bg-blue-100/60 ring-2 ring-blue-300'
                  : 'border-blue-200 bg-white/70 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🗳️</span>
                  <h3 className="font-black text-blue-900 text-base">PARTY (정당 고유 영역)</h3>
                </div>
                <p className="text-[11px] text-stone-700">오직 정당만이 수행하는 유일무이한 특성</p>
              </div>

              <div className="space-y-1.5 mt-4">
                {Object.entries(placedStickers)
                  .filter(([_, z]) => z === 'party')
                  .map(([id]) => {
                    const item = STICKER_POOL.find((s) => s.id === id);
                    return (
                      <div
                        key={id}
                        className="px-3 py-1.5 rounded-full bg-blue-600 text-white text-xs font-bold shadow-2xs text-center animate-fadeIn"
                      >
                        ✓ {item?.text}
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* 2. Middle: CIVIC ZONE */}
            <div
              onClick={() => handlePlaceStickerInZone('civic')}
              className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between min-h-[220px] ${
                selectedSticker
                  ? 'border-emerald-400 bg-emerald-50/50 hover:bg-emerald-100/60 ring-2 ring-emerald-300'
                  : 'border-emerald-200 bg-white/70 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🌱</span>
                  <h3 className="font-black text-emerald-900 text-base">CIVIC (시민단체 고유 영역)</h3>
                </div>
                <p className="text-[11px] text-stone-700">사회 전체를 위한 비영리 공익 추구</p>
              </div>

              <div className="space-y-1.5 mt-4">
                {Object.entries(placedStickers)
                  .filter(([_, z]) => z === 'civic')
                  .map(([id]) => {
                    const item = STICKER_POOL.find((s) => s.id === id);
                    return (
                      <div
                        key={id}
                        className="px-3 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-2xs text-center animate-fadeIn"
                      >
                        ✓ {item?.text}
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* 3. Right: INTEREST ZONE */}
            <div
              onClick={() => handlePlaceStickerInZone('interest')}
              className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between min-h-[220px] ${
                selectedSticker
                  ? 'border-amber-400 bg-amber-50/50 hover:bg-amber-100/60 ring-2 ring-amber-300'
                  : 'border-amber-200 bg-white/70 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">💼</span>
                  <h3 className="font-black text-amber-900 text-base">INTEREST (이익집단 고유 영역)</h3>
                </div>
                <p className="text-[11px] text-stone-700">자기 집단 구성원만의 특수한 권익 대변</p>
              </div>

              <div className="space-y-1.5 mt-4">
                {Object.entries(placedStickers)
                  .filter(([_, z]) => z === 'interest')
                  .map(([id]) => {
                    const item = STICKER_POOL.find((s) => s.id === id);
                    return (
                      <div
                        key={id}
                        className="px-3 py-1.5 rounded-full bg-amber-600 text-white text-xs font-bold shadow-2xs text-center animate-fadeIn"
                      >
                        ✓ {item?.text}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Central Big Circle: COMMON ZONE ⭐ */}
          <div
            onClick={() => handlePlaceStickerInZone('common')}
            className={`mt-6 p-7 rounded-3xl border-2 transition-all cursor-pointer text-center ${
              selectedSticker
                ? 'border-purple-500 bg-purple-50 hover:bg-purple-100/70 ring-4 ring-purple-200 shadow-md'
                : 'border-purple-300 bg-gradient-to-r from-blue-50/50 via-purple-50/60 to-amber-50/50 shadow-sm'
            }`}
          >
            <div className="max-w-md mx-auto space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-black">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                <span>COMMON ZONE (세 조직 모두의 공통점)</span>
              </div>
              <h4 className="text-lg font-black text-stone-900">
                “셋 다 하는 일이지만, 시험에서 가장 많이 낚이는 핵심!”
              </h4>
              <p className="text-[11px] text-stone-700">
                정치사회화, 여론 형성, 정책 영향, 요구 전달은 셋 모두가 수행합니다!
              </p>
            </div>

            {/* Placed Common Stickers */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              {Object.entries(placedStickers)
                .filter(([_, z]) => z === 'common')
                .map(([id]) => {
                  const item = STICKER_POOL.find((s) => s.id === id);
                  return (
                    <span
                      key={id}
                      className="px-3.5 py-1.5 rounded-full bg-purple-600 text-white text-xs font-black shadow-xs animate-fadeIn"
                    >
                      ⭐ {item?.text}
                    </span>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Big Reveal after classification: "같은 기능도 있지만 목적은 다릅니다." */}
        {isClassificationDone && (
          <div className="text-center py-6 space-y-3 animate-fadeIn">
            <h3 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              “같은 기능도 있지만,<br />
              <span className="text-purple-600">목적은 완전히 다릅니다.</span>”
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 max-w-lg mx-auto leading-relaxed">
              정당은 <strong>정권 획득</strong>, 시민단체는 <strong>공익 실현</strong>, 이익집단은 <strong>특수 이익</strong>을 위해
              여론을 모으고 정책에 영향력을 행사합니다.
            </p>

            <div className="pt-2">
              <button
                onClick={() => setShowNotesTable(!showNotesTable)}
                className="px-6 py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-black transition flex items-center gap-2 mx-auto shadow-md"
              >
                <Bookmark className="w-4 h-4" />
                <span>{showNotesTable ? '정리 노트 접기' : 'SAVE TO NOTES: 한눈에 비교표 열기'}</span>
              </button>
            </div>
          </div>
        )}

        {/* 2. THE NOTES TABLE (Revealed only on demand) */}
        {showNotesTable && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-md max-w-4xl mx-auto space-y-5 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <h4 className="text-base sm:text-lg font-black text-stone-900">
                  MY CIVIC NOTE: 3대 집단 완벽 비교표
                </h4>
              </div>
              <span className="text-xs font-mono text-stone-600 font-bold">EXAM SUMMARY</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-stone-100/80 text-stone-800">
                    <th className="p-3 font-bold border-b border-stone-200">구분</th>
                    <th className="p-3 font-black text-blue-700 border-b border-stone-200">🔵 정당</th>
                    <th className="p-3 font-black text-emerald-700 border-b border-stone-200">🟩 시민단체</th>
                    <th className="p-3 font-black text-amber-700 border-b border-stone-200">🟧 이익집단</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700">
                  <tr>
                    <td className="p-3 font-bold bg-stone-50/50">설립 목적</td>
                    <td className="p-3 font-semibold text-blue-900">정권 획득 (선거 승리)</td>
                    <td className="p-3 font-semibold text-emerald-900">사회 전체의 공익 실현</td>
                    <td className="p-3 font-semibold text-amber-900">구성원만의 특수 이익</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold bg-stone-50/50">후보자 공천</td>
                    <td className="p-3 font-bold text-blue-600">독점적 공천 (O)</td>
                    <td className="p-3 text-stone-600">공천권 없음 (X)</td>
                    <td className="p-3 text-stone-600">공천권 없음 (X)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold bg-stone-50/50">정치적 책임</td>
                    <td className="p-3 font-bold text-blue-900">선거를 통해 직접적 책임</td>
                    <td className="p-3 text-stone-600">직접적 선거 책임 없음</td>
                    <td className="p-3 text-stone-600">직접적 선거 책임 없음</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold bg-stone-50/50">공통 기능</td>
                    <td colSpan={3} className="p-3 bg-purple-50/60 font-semibold text-purple-950">
                      ⭐ <strong>모두 수행:</strong> 여론 형성, 정치사회화, 정책 결정 과정에 압력/영향 행사, 국민 요구 집약 및 전달
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* ============================================================ */}
      {/* 3. EXAM TRAP QUESTIONS: 7대 출제 함정 피드                    */}
      {/* ============================================================ */}
      <section className="space-y-6 max-w-3xl mx-auto">
        <div className="text-center space-y-1">
          <span className="text-[11px] font-mono tracking-widest text-stone-600 uppercase font-semibold">
            EXAM TRAP RADAR
          </span>
          <h3 className="text-2xl font-black text-stone-900 tracking-tight">
            시험에 100% 나오는 7대 함정 퀴즈
          </h3>
          <p className="text-xs text-stone-700">
            교과서나 모의고사에서 자주 출제되는 헷갈리는 문항을 풀어보세요:
          </p>
        </div>

        <div className="space-y-4">
          {EXAM_TRAP_QUESTIONS.map((trap, idx) => {
            const isAnswered = !!trapSubmitted[trap.id];
            const userChoice = trapAnswers[trap.id];
            const correctOpt = trap.options.find((o) => o.isCorrect);
            const isCorrect = userChoice === correctOpt?.id;

            return (
              <div
                key={trap.id}
                className={`p-5 rounded-3xl border transition-all ${
                  isAnswered
                    ? isCorrect
                      ? 'border-emerald-300 bg-emerald-50/40'
                      : 'border-rose-300 bg-rose-50/40'
                    : 'border-stone-200 bg-white shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="text-xs font-mono font-bold text-stone-600">
                    TRAP 0{idx + 1}
                  </div>
                  {isAnswered && (
                    <span
                      className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                        isCorrect
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {isCorrect ? '정답 ✓' : '함정에 걸림! ⚠️'}
                    </span>
                  )}
                </div>

                <h4 className="text-sm sm:text-base font-black text-stone-900 leading-snug">
                  {trap.question}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                  {trap.options.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleAnswerTrap(trap.id, opt.id)}
                      className={`p-3 rounded-2xl text-xs font-bold text-left border transition ${
                        userChoice === opt.id
                          ? opt.isCorrect
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-rose-600 text-white border-rose-600'
                          : 'bg-stone-50/80 hover:bg-stone-100 border-stone-200 text-stone-800'
                      }`}
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>

                {isAnswered && (
                  <div className="mt-3 p-3 rounded-2xl bg-white/80 border border-stone-200 text-xs text-stone-700 leading-relaxed animate-fadeIn">
                    <span className="font-black text-blue-700">[해설]: </span>
                    {trap.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. FINAL MYSTERY DETECTOR: 6대 실제 조직 판별관               */}
      {/* ============================================================ */}
      <section className="space-y-6 max-w-3xl mx-auto">
        <div className="text-center space-y-1">
          <span className="text-[11px] font-mono tracking-widest text-stone-600 uppercase font-semibold">
            MYSTERY ORGANIZATIONS
          </span>
          <h3 className="text-2xl font-black text-stone-900 tracking-tight">
            조직 판별 수사관 🕵️
          </h3>
          <p className="text-xs text-stone-700">
            사례 카드를 읽고 3대 집단 중 어디에 해당하는지 단서를 찾아 판별하세요:
          </p>
        </div>

        {/* Case Navigation Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none justify-center">
          {MYSTERY_CASES.map((c, idx) => {
            const isDone = caseAnswers[c.id]?.isSubmitted;
            return (
              <button
                key={c.id}
                onClick={() => setCurrentCaseIdx(idx)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1 ${
                  currentCaseIdx === idx
                    ? 'bg-stone-900 text-white'
                    : isDone
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                <span>CASE {idx + 1}</span>
                {isDone && <span>✓</span>}
              </button>
            );
          })}
        </div>

        {/* Current Mystery Case Card */}
        <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-stone-500">
            <span className="font-bold text-stone-900">{currentCase.title}</span>
            <span className="text-stone-400">수사 기록</span>
          </div>

          <p className="text-xs text-stone-600">{currentCase.description}</p>

          <h4 className="text-base sm:text-lg font-black text-stone-900 leading-snug">
            {currentCase.feedSnippet}
          </h4>

          {/* Clues */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-bold text-stone-500">핵심 단서 (탭하여 확인):</span>
            <div className="flex flex-wrap gap-2">
              {currentCase.decisiveClues.map((clue, idx) => (
                <button
                  key={idx}
                  onClick={() => toggleClue(clue)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border transition ${
                    caseState.selectedClues.includes(clue)
                      ? 'bg-blue-50 border-blue-300 text-blue-800 font-black'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  🔍 {clue}
                </button>
              ))}
            </div>
          </div>

          {/* Choice Org */}
          <div className="pt-3 border-t border-stone-100">
            <span className="text-xs font-bold text-stone-700 block mb-2">
              이 조직의 정체는 무엇일까요?
            </span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { type: 'party' as OrgType, label: '🔵 정당' },
                { type: 'civic' as OrgType, label: '🟩 시민단체' },
                { type: 'interest' as OrgType, label: '🟧 이익집단' },
              ].map((item) => (
                <button
                  key={item.type}
                  onClick={() => selectOrgForCase(item.type)}
                  disabled={caseState.isSubmitted}
                  className={`p-3 rounded-2xl text-xs font-black border transition ${
                    caseState.selectedOrg === item.type
                      ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          {!caseState.isSubmitted ? (
            <button
              onClick={submitCase}
              disabled={!caseState.selectedOrg}
              className="w-full py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-black transition disabled:opacity-40 shadow-sm"
            >
              판별 결과 제출하기
            </button>
          ) : (
            <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 text-xs text-stone-800 leading-relaxed space-y-1 animate-fadeIn">
              <div className="font-black text-blue-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>
                  정답:{' '}
                  {currentCase.correctType === 'party'
                    ? '정당'
                    : currentCase.correctType === 'civic'
                    ? '시민단체'
                    : '이익집단'}
                </span>
              </div>
              <p className="font-medium text-stone-700">{currentCase.explanation}</p>
            </div>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. NEXT PART BUTTON                                          */}
      {/* ============================================================ */}
      <div className="pt-6 flex justify-center">
        <button
          onClick={onNext}
          className="px-8 py-3.5 rounded-full bg-stone-900 hover:bg-blue-600 text-white font-extrabold text-sm shadow-xl shadow-stone-900/20 transition-all flex items-center gap-2 group"
        >
          <span>PART 06: 오늘의 참여 알림 (공청회·간담회·자원봉사·입법)</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
