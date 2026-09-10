import React, { useState } from 'react';
import { OrgType } from '../types';
import { ArrowRight, HelpCircle, CheckCircle2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Part3Props {
  onComplete: () => void;
  onNext: () => void;
}

export const Part3CollectiveIntro: React.FC<Part3Props> = ({ onComplete, onNext }) => {
  const [inspectedCards, setInspectedCards] = useState<Set<OrgType>>(new Set());

  const handleInspect = (type: OrgType) => {
    const updated = new Set(inspectedCards);
    updated.add(type);
    setInspectedCards(updated);
    if (updated.size >= 3) {
      onComplete();
      confetti({ particleCount: 35, spread: 55 });
    }
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Intro Description */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono text-stone-600">
          <span className="px-3 py-1 rounded-full bg-stone-100 font-bold text-stone-800">
            11:30 AM · 통합사회 수업
          </span>
          <span className="text-blue-600 font-bold">집단적 시민 참여의 시작</span>
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-mono tracking-widest text-stone-600 uppercase font-semibold">
            KEY CONCEPT 03
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 leading-tight tracking-tight">
            혼자보다 함께,<br />
            지속적인 힘을 만드는 세 집단
          </h2>
          <p className="text-xs sm:text-sm text-stone-700 max-w-xl leading-relaxed">
            개인이 혼자서 끊임없이 목소리를 내는 것에는 한계가 있습니다.
            따라서 비슷한 생각이나 공통된 이해관계를 가진 시민들은 <strong>조직을 결성하여 지속적으로 정치 과정에 참여</strong>합니다.
          </p>
        </div>

        {/* 3 Modern Magazine Profile Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Card 1: Party */}
          <div
            onClick={() => handleInspect('party')}
            className={`rounded-3xl border-2 transition-all p-6 cursor-pointer flex flex-col justify-between min-h-[260px] ${
              inspectedCards.has('party')
                ? 'border-blue-500 bg-blue-50/60 shadow-md ring-2 ring-blue-200'
                : 'border-stone-200/80 bg-white hover:border-blue-300 shadow-2xs'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-blue-600 text-white tracking-wide">
                  🔵 PARTY
                </span>
                {inspectedCards.has('party') && (
                  <span className="text-xs font-black text-blue-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 확인 완료
                  </span>
                )}
              </div>
              <h3 className="text-xl font-black text-stone-900 mb-2">정당</h3>
              <div className="text-xs font-bold text-blue-800 mb-3">
                핵심 목표: <span className="underline decoration-blue-400">정치권력 획득 + 정책 실현</span>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed">
                정치적 견해를 같이하는 사람들이 선거를 통해 정권을 획득하고 정책을 실현하기 위해 모인 집단
              </p>
            </div>
            <div className="pt-4 text-[11px] font-mono text-stone-600 font-bold">
              #공직선거출마 #공천권보유 #정치적책임
            </div>
          </div>

          {/* Card 2: Civic Group */}
          <div
            onClick={() => handleInspect('civic')}
            className={`rounded-3xl border-2 transition-all p-6 cursor-pointer flex flex-col justify-between min-h-[260px] ${
              inspectedCards.has('civic')
                ? 'border-emerald-500 bg-emerald-50/60 shadow-md ring-2 ring-emerald-200'
                : 'border-stone-200/80 bg-white hover:border-emerald-300 shadow-2xs'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-600 text-white tracking-wide">
                  🟩 CIVIC
                </span>
                {inspectedCards.has('civic') && (
                  <span className="text-xs font-black text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 확인 완료
                  </span>
                )}
              </div>
              <h3 className="text-xl font-black text-stone-900 mb-2">시민단체</h3>
              <div className="text-xs font-bold text-emerald-800 mb-3">
                핵심 목표: <span className="underline decoration-emerald-400">사회 전체의 공익 실현</span>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed">
                시민들이 자발적으로 결성하여 비영리적으로 공익과 인권, 환경, 안전 문제를 해결하려는 단체
              </p>
            </div>
            <div className="pt-4 text-[11px] font-mono text-stone-600 font-bold">
              #비영리 #사회전체공익 #권력감시견제
            </div>
          </div>

          {/* Card 3: Interest Group */}
          <div
            onClick={() => handleInspect('interest')}
            className={`rounded-3xl border-2 transition-all p-6 cursor-pointer flex flex-col justify-between min-h-[260px] ${
              inspectedCards.has('interest')
                ? 'border-amber-500 bg-amber-50/60 shadow-md ring-2 ring-amber-200'
                : 'border-stone-200/80 bg-white hover:border-amber-300 shadow-2xs'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-600 text-white tracking-wide">
                  🟧 INTEREST
                </span>
                {inspectedCards.has('interest') && (
                  <span className="text-xs font-black text-amber-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 확인 완료
                  </span>
                )}
              </div>
              <h3 className="text-xl font-black text-stone-900 mb-2">이익집단</h3>
              <div className="text-xs font-bold text-amber-800 mb-3">
                핵심 목표: <span className="underline decoration-amber-400">구성원의 특수 이익 실현</span>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed">
                직업이나 경제적 이해관계를 같이하는 사람들이 자신들 구성원의 권익과 특수한 이익을 지키기 위해 결성한 집단
              </p>
            </div>
            <div className="pt-4 text-[11px] font-mono text-stone-600 font-bold">
              #특수이익 #전문직종협회 #노동조합
            </div>
          </div>
        </div>

        {/* The Big Question Hook */}
        <div className="rounded-[2.5rem] bg-gradient-to-br from-stone-900 via-stone-900 to-indigo-950 text-white p-8 sm:p-10 text-center space-y-4 shadow-xl">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-xs font-black text-indigo-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CRITICAL INQUIRY</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black leading-tight tracking-tight">
            “셋 다 정치 과정에 참여하는데,<br />
            왜 서로 다른 조직일까?”
          </h3>

          <p className="text-xs sm:text-sm text-stone-300 max-w-lg mx-auto leading-relaxed">
            세 조직은 모두 시민과 정치를 연결하지만 <strong>조직의 목적과 활동 방식</strong>에서 결정적인 차이가 있습니다.
            각 프로필의 세부 피드를 직접 조사해 봅시다!
          </p>

          <div className="pt-3 flex justify-center">
            <button
              onClick={onNext}
              className="px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all group"
            >
              <span>PART 04: WHO ARE YOU? 프로필 집중 탐구 시작</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
