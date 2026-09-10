import React, { useState } from 'react';
import { ORG_PROFILES } from '../data/curriculumData';
import { OrgType } from '../types';
import { ArrowRight, HelpCircle, Layers, CheckCircle2, ChevronRight } from 'lucide-react';

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
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Intro Description */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-2">
          <span className="px-2 py-0.5 rounded-full bg-slate-100 font-semibold text-slate-700">
            11:30 AM · 사회시간
          </span>
          <span className="text-blue-600 font-medium">집단적 시민 참여의 시작</span>
        </div>

        <h2 className="text-xl font-bold text-slate-900">
          혼자보다 함께, 지속적인 힘을 만드는 조직들
        </h2>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          개인이 혼자서 끊임없이 목소리를 내는 것에는 한계가 있습니다.
          따라서 비슷한 생각이나 공통된 이해관계를 가진 시민들은 <strong>조직을 결성하여 지속적으로 정치 과정에 참여</strong>합니다.
        </p>

        {/* 3 Modern Profile Cards */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Party */}
          <div
            onClick={() => handleInspect('party')}
            className={`rounded-2xl border-2 transition-all p-5 cursor-pointer relative overflow-hidden ${
              inspectedCards.has('party')
                ? 'border-blue-500 bg-blue-50/50 shadow-md ring-2 ring-blue-300/30'
                : 'border-slate-200 bg-slate-50/70 hover:border-blue-300 hover:shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-600 text-white tracking-wide">
                🟦 PARTY
              </span>
              {inspectedCards.has('party') && (
                <span className="text-xs font-semibold text-blue-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 확인됨
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">정당</h3>
            <div className="my-3 p-3 rounded-xl bg-white border border-blue-100 shadow-xs">
              <div className="text-xs text-slate-400 font-medium mb-0.5">핵심 목표</div>
              <p className="text-sm font-bold text-blue-700">
                정치권력 획득 + 정책 실현
              </p>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              정치적 견해를 같이하는 사람들이 선거를 통해 정권을 획득하고 정책을 실현하기 위해 모인 정치 집단
            </p>
          </div>

          {/* Card 2: Civic Group */}
          <div
            onClick={() => handleInspect('civic')}
            className={`rounded-2xl border-2 transition-all p-5 cursor-pointer relative overflow-hidden ${
              inspectedCards.has('civic')
                ? 'border-emerald-500 bg-emerald-50/50 shadow-md ring-2 ring-emerald-300/30'
                : 'border-slate-200 bg-slate-50/70 hover:border-emerald-300 hover:shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white tracking-wide">
                🟩 CIVIC
              </span>
              {inspectedCards.has('civic') && (
                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 확인됨
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">시민단체</h3>
            <div className="my-3 p-3 rounded-xl bg-white border border-emerald-100 shadow-xs">
              <div className="text-xs text-slate-400 font-medium mb-0.5">핵심 목표</div>
              <p className="text-sm font-bold text-emerald-700">
                사회 전체의 공익 실현
              </p>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              시민들이 자발적으로 결성하여 비영리적으로 사회 전체의 공익과 인권, 환경, 안전 문제를 해결하려는 단체
            </p>
          </div>

          {/* Card 3: Interest Group */}
          <div
            onClick={() => handleInspect('interest')}
            className={`rounded-2xl border-2 transition-all p-5 cursor-pointer relative overflow-hidden ${
              inspectedCards.has('interest')
                ? 'border-amber-500 bg-amber-50/50 shadow-md ring-2 ring-amber-300/30'
                : 'border-slate-200 bg-slate-50/70 hover:border-amber-300 hover:shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-600 text-white tracking-wide">
                🟧 INTEREST
              </span>
              {inspectedCards.has('interest') && (
                <span className="text-xs font-semibold text-amber-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 확인됨
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">이익집단</h3>
            <div className="my-3 p-3 rounded-xl bg-white border border-amber-100 shadow-xs">
              <div className="text-xs text-slate-400 font-medium mb-0.5">핵심 목표</div>
              <p className="text-sm font-bold text-amber-700">
                구성원의 특수 이익 실현
              </p>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              직업이나 경제적 이해관계를 같이하는 사람들이 자신들 구성원의 권익과 특수한 이익을 지키기 위해 조직한 집단
            </p>
          </div>
        </div>

        {/* The Big Question Hook */}
        <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-indigo-200 mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            핵심 질문
          </div>
          <h3 className="text-lg sm:text-xl font-bold leading-snug">
            “셋 다 정치 과정에 참여하는데,<br className="hidden sm:inline" /> 왜 서로 다른 조직일까?”
          </h3>
          <p className="text-xs text-slate-300 mt-2 max-w-lg mx-auto">
            세 조직은 모두 시민과 정치를 연결하지만 <strong>조직의 목적과 활동 방식</strong>에서 결정적인 차이가 있습니다.
            각 프로필을 직접 조사해 봅시다!
          </p>

          <div className="mt-5 flex justify-center">
            <button
              onClick={onNext}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center gap-2 shadow-md transition hover:gap-3"
            >
              <span>PART 04: WHO ARE YOU? 프로필 집중 탐구 시작</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
