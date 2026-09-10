import React from 'react';
import { PartId, PartInfo } from '../types';
import {
  Wifi,
  BatteryCharging,
  Smartphone,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface HeaderProps {
  currentPart: PartId;
  parts: PartInfo[];
  onSelectPart: (id: PartId) => void;
  completedParts: Set<PartId>;
  isPhoneFrame: boolean;
  onTogglePhoneFrame: () => void;
  onResetProgress: () => void;
}

// Visual stickers and short badges for each daily checkpoint
const TIMELINE_STATION: Record<number, { icon: string; short: string; mood: string }> = {
  1: { icon: '☀️', short: '07:00 기상', mood: 'bg-amber-50 text-amber-800 border-amber-200' },
  2: { icon: '📱', short: '07:30 안전신문고', mood: 'bg-blue-50 text-blue-800 border-blue-200' },
  3: { icon: '👥', short: '11:30 3대 조직', mood: 'bg-indigo-50 text-indigo-800 border-indigo-200' },
  4: { icon: '🟦', short: '13:10 기능 탐구', mood: 'bg-sky-50 text-sky-800 border-sky-200' },
  5: { icon: '⚖️', short: '15:40 비교·판별', mood: 'bg-purple-50 text-purple-800 border-purple-200' },
  6: { icon: '📢', short: '17:20 참여의 통로', mood: 'bg-rose-50 text-rose-800 border-rose-200' },
  7: { icon: '🏘️', short: '19:00 동네 참여', mood: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  8: { icon: '🌙', short: '22:30 하루 정리', mood: 'bg-slate-900 text-amber-300 border-slate-700' },
};

export const Header: React.FC<HeaderProps> = ({
  currentPart,
  parts,
  onSelectPart,
  completedParts,
  isPhoneFrame,
  onTogglePhoneFrame,
  onResetProgress,
}) => {
  const currentPartInfo = parts.find((p) => p.id === currentPart) || parts[0];
  const progressPercent = Math.round(((currentPart - 1) / (parts.length - 1)) * 100);

  return (
    <header className="w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-40 shadow-xs transition-all">
      {/* Top Phone Status Bar (2026 Smartphone vibe) */}
      <div className="max-w-5xl mx-auto px-4 py-1.5 flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 font-mono">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-800">{currentPartInfo.timeStr}</span>
          <span className="hidden sm:inline text-slate-400">· 2026. 09. 10. (목)</span>
          <span className="hidden md:inline px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-[10px] font-sans font-semibold border border-blue-200/60">
            #통합사회2 #정치과정과시민참여
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-100/80 text-[11px] font-medium text-slate-600">
            <span className="font-semibold text-slate-700">5G</span>
            <Wifi className="w-3 h-3 text-slate-600" />
            <span>98%</span>
            <BatteryCharging className="w-3.5 h-3.5 text-emerald-500" />
          </div>

          <div className="h-3 w-px bg-slate-200" />

          {/* Frame mode toggle */}
          <button
            onClick={onTogglePhoneFrame}
            className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-sans font-semibold transition"
            title={isPhoneFrame ? '화면 넓게 보기' : '스마트폰 프레임으로 보기'}
          >
            {isPhoneFrame ? (
              <>
                <Maximize2 className="w-3 h-3" />
                <span className="hidden sm:inline">넓은 화면</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3 h-3" />
                <span className="hidden sm:inline">스마트폰 모드</span>
              </>
            )}
          </button>

          <button
            onClick={onResetProgress}
            className="text-[11px] px-2 py-1 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition flex items-center gap-1 font-sans"
            title="처음부터 다시하기"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden md:inline">처음으로</span>
          </button>
        </div>
      </div>

      {/* Main Title & Nav bar */}
      <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 text-white flex items-center justify-center shadow-md shadow-blue-500/20 font-black text-lg select-none">
            시
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
                오늘도 시민입니다
              </h1>
              <span className="hidden sm:inline text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                내 선택이 사회에 닿는 방법
              </span>
            </div>
            <p className="text-xs text-blue-600 font-semibold flex items-center gap-1.5 mt-0.5">
              <span className="px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-700 font-bold text-[10px]">
                PART 0{currentPart}
              </span>
              <span>{currentPartInfo.title}</span>
              <span className="hidden sm:inline text-slate-400 font-normal">· {currentPartInfo.subtitle}</span>
            </p>
          </div>
        </div>

        {/* Prev / Next controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onSelectPart(Math.max(1, currentPart - 1) as PartId)}
            disabled={currentPart === 1}
            className={`px-3 py-1.5 rounded-full border text-xs flex items-center gap-1 font-bold transition ${
              currentPart === 1
                ? 'opacity-30 border-slate-200 text-slate-400 cursor-not-allowed'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-2xs'
            }`}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="hidden md:inline">이전</span>
          </button>

          <span className="text-xs font-bold px-3 py-1 bg-slate-100/90 text-slate-800 rounded-full border border-slate-200/60 font-mono">
            {currentPart} / {parts.length}
          </span>

          <button
            onClick={() => onSelectPart(Math.min(parts.length, currentPart + 1) as PartId)}
            disabled={currentPart === parts.length}
            className={`px-3.5 py-1.5 rounded-full border text-xs flex items-center gap-1 font-bold transition shadow-xs ${
              currentPart === parts.length
                ? 'opacity-30 border-slate-200 text-slate-400 cursor-not-allowed'
                : 'border-blue-500 bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20'
            }`}
          >
            <span className="hidden md:inline">다음</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Progress line */}
      <div className="w-full bg-slate-100 h-1">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-sky-400 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Daily Civic Timeline: ☀️ 아침 → 📱 참여 → 👥 조직 → 🏛 정치 → 🌙 정리 */}
      <div className="max-w-5xl mx-auto px-3 py-2 overflow-x-auto flex items-center gap-2 scrollbar-none text-xs">
        {parts.map((part) => {
          const isActive = part.id === currentPart;
          const isDone = completedParts.has(part.id);
          const meta = TIMELINE_STATION[part.id] || { icon: '📍', short: part.title, mood: 'bg-slate-50 text-slate-700' };

          return (
            <button
              key={part.id}
              onClick={() => onSelectPart(part.id)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full flex items-center gap-1.5 transition text-xs font-semibold ${
                isActive
                  ? 'bg-slate-900 text-white shadow-md shadow-slate-900/20 ring-2 ring-blue-500/50'
                  : isDone
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
                  : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/80 border border-transparent'
              }`}
            >
              <span>{meta.icon}</span>
              <span className="whitespace-nowrap">{meta.short}</span>
              {isDone && !isActive && (
                <CheckCircle2 className="w-3 h-3 text-emerald-600 ml-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
};
