import React from 'react';
import { PartId, PartInfo } from '../types';
import {
  Sparkles,
  Smartphone,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
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

const TIMELINE_STATION: Record<number, { icon: string; short: string }> = {
  1: { icon: '☀️', short: '07:00 기상' },
  2: { icon: '📱', short: '07:30 신호등 민원' },
  3: { icon: '👥', short: '11:30 집단 참여' },
  4: { icon: '🗳️', short: '13:10 3대 조직 탐구' },
  5: { icon: '⚖️', short: '15:40 조직 비교' },
  6: { icon: '📢', short: '17:20 참여의 통로' },
  7: { icon: '🏘️', short: '19:00 동네 참여' },
  8: { icon: '🌙', short: '22:30 하루 정리' },
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
    <header className="w-full bg-[#FDFBF7]/90 backdrop-blur-md sticky top-0 z-40 transition-all border-b border-stone-200/50">
      {/* Top Bar: MY CIVIC ✦ & Progress */}
      <div className="max-w-5xl mx-auto px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-lg sm:text-xl tracking-tight text-stone-900 font-sans">
                MY CIVIC
              </span>
              <span className="text-amber-500 font-black text-base animate-pulse">✦</span>
            </div>
            <span className="text-[11px] text-stone-500 font-medium -mt-1">
              오늘도 시민입니다
            </span>
          </div>

          <div className="hidden sm:block h-6 w-px bg-stone-200 ml-1" />

          <div className="hidden sm:flex items-center gap-2 text-xs text-stone-600">
            <span className="font-bold text-stone-800 font-mono">
              {currentPartInfo.timeStr}
            </span>
            <span className="text-stone-300">·</span>
            <span className="font-medium text-stone-700">
              {currentPartInfo.title}
            </span>
          </div>
        </div>

        {/* Right side: 오늘의 참여 XX% & controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-stone-100/80 px-3 py-1.5 rounded-full">
            <span className="text-[11px] text-stone-500 font-medium">오늘의 참여</span>
            <span className="text-xs font-black text-stone-900 font-mono">
              {progressPercent}%
            </span>
            <div className="w-12 h-1.5 bg-stone-200 rounded-full overflow-hidden hidden xs:block">
              <div
                className="h-full bg-stone-900 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Quick toggle controls */}
          <button
            onClick={onTogglePhoneFrame}
            className="p-1.5 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-200/50 transition"
            title={isPhoneFrame ? '넓은 화면으로 보기' : '모바일 프레임으로 보기'}
          >
            {isPhoneFrame ? <Maximize2 className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
          </button>

          <button
            onClick={onResetProgress}
            className="p-1.5 rounded-full text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition"
            title="처음부터 다시 시작"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Story Timeline Navigator: horizontal minimal dots & labels */}
      <div className="max-w-5xl mx-auto px-4 pb-2.5 pt-1 overflow-x-auto flex items-center gap-1.5 scrollbar-none">
        {parts.map((part) => {
          const isActive = part.id === currentPart;
          const isDone = completedParts.has(part.id);
          const meta = TIMELINE_STATION[part.id] || { icon: '📍', short: part.title };

          return (
            <button
              key={part.id}
              onClick={() => onSelectPart(part.id)}
              className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium transition flex items-center gap-1.5 ${
                isActive
                  ? 'bg-stone-900 text-stone-50 shadow-sm font-bold'
                  : isDone
                  ? 'bg-stone-200/80 text-stone-800 hover:bg-stone-300/80'
                  : 'text-stone-500 hover:text-stone-800 hover:bg-stone-100'
              }`}
            >
              <span>{meta.icon}</span>
              <span className="whitespace-nowrap">{meta.short}</span>
              {isDone && !isActive && <span className="text-emerald-600 text-[10px] font-bold">✓</span>}
            </button>
          );
        })}
      </div>
    </header>
  );
};
