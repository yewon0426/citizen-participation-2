import React, { useState } from 'react';
import { OrgType } from '../types';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Award,
  Heart,
  MessageCircle,
  Share2,
  TrendingUp,
  FileText,
  Building2,
  Users,
  Vote,
  Check,
  ChevronRight,
  Play,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Part4Props {
  onComplete: () => void;
  onNext: () => void;
}

interface CollectedSticker {
  id: string;
  name: string;
  tag: string;
  desc: string;
  icon: string;
  rotate: string;
  color: string;
}

export const Part4WhoAreYou: React.FC<Part4Props> = ({ onComplete, onNext }) => {
  // Main state: Active organization
  const [activeOrg, setActiveOrg] = useState<OrgType>('party');

  // PARTY State
  const [bigQuestionAnswer, setBigQuestionAnswer] = useState<'yes' | 'no' | null>(null);
  const [currentMissionIdx, setCurrentMissionIdx] = useState<number>(0);
  const [completedMissions, setCompletedMissions] = useState<Set<number>>(new Set());
  const [collectedStickers, setCollectedStickers] = useState<CollectedSticker[]>([]);
  const [justUnlockedSticker, setJustUnlockedSticker] = useState<CollectedSticker | null>(null);

  // M1 State
  const [m1Selected, setM1Selected] = useState<number | null>(null);

  // M2 State (Scattered bubbles -> Aggregated)
  const [m2Aggregated, setM2Aggregated] = useState<boolean>(false);

  // M3 State (Manifesto Swipe Issue)
  const [m3Issue, setM3Issue] = useState<string>('education');
  const [m3ResponsibilityUnlocked, setM3ResponsibilityUnlocked] = useState<boolean>(false);

  // M4 State (Trending View)
  const [m4TrendingChecked, setM4TrendingChecked] = useState<boolean>(false);

  // M5 State (Reels)
  const [m5ActiveReel, setM5ActiveReel] = useState<number>(0);
  const [m5SocializationUnlocked, setM5SocializationUnlocked] = useState<boolean>(false);

  // M6 State (DM)
  const [m6ChatStep, setM6ChatStep] = useState<number>(1);

  // M7 State (Breaking news)
  const [m7Answered, setM7Answered] = useState<boolean>(false);

  // CIVIC State
  const [civicLikes, setCivicLikes] = useState<Record<string, number>>({
    river: 2481,
    transit: 1892,
    consumer: 3104,
  });
  const [civicUserLiked, setCivicUserLiked] = useState<Record<string, boolean>>({});
  const [civicStickers, setCivicStickers] = useState<string[]>([]);

  // INTEREST State
  const [interestStickers, setInterestStickers] = useState<string[]>([]);

  // Story path mission titles
  const STORY_PATH = [
    { id: 0, title: '01 후보자를 찾습니다', icon: '🗳️' },
    { id: 1, title: '02 국민의 목소리가 쏟아진다', icon: '💬' },
    { id: 2, title: '03 공약이 도착했습니다', icon: '📋' },
    { id: 3, title: '04 지금 뜨는 정치 이슈', icon: '📢' },
    { id: 4, title: '05 우리는 어디서 정치를 배울까?', icon: '🧠' },
    { id: 5, title: '06 목소리는 어디로 갈까?', icon: '🌉' },
    { id: 6, title: '07 선거에서 졌다면?', icon: '👀' },
  ];

  // Helper to unlock sticker
  const unlockSticker = (sticker: CollectedSticker, missionIdx: number) => {
    setCompletedMissions((prev) => new Set(prev).add(missionIdx));
    if (!collectedStickers.some((s) => s.id === sticker.id)) {
      setCollectedStickers((prev) => [...prev, sticker]);
      setJustUnlockedSticker(sticker);
      confetti({ particleCount: 35, spread: 55 });
    }
  };

  const handleCivicLike = (id: string, keyword: string) => {
    setCivicUserLiked((prev) => ({ ...prev, [id]: !prev[id] }));
    setCivicLikes((prev) => ({
      ...prev,
      [id]: prev[id] + (civicUserLiked[id] ? -1 : 1),
    }));
    if (!civicStickers.includes(keyword)) {
      const next = [...civicStickers, keyword];
      setCivicStickers(next);
      confetti({ particleCount: 25, spread: 45 });
    }
  };

  const handleInterestUnlock = (keyword: string) => {
    if (!interestStickers.includes(keyword)) {
      setInterestStickers((prev) => [...prev, keyword]);
      confetti({ particleCount: 30, spread: 50 });
    }
  };

  return (
    <div className="space-y-12 pb-16">
      {/* ============================================================ */}
      {/* 1. TOP PROFILE AVATARS (세 조직 프로필 아바타 네비게이터)      */}
      {/* ============================================================ */}
      <section className="flex flex-col items-center">
        <div className="text-center mb-5">
          <span className="text-[11px] font-mono tracking-widest text-stone-600 uppercase font-semibold">
            EXPLORE THE 3 CIVIC BODIES
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight mt-1">
            누가 사회의 목소리를 만들까?
          </h2>
          <p className="text-xs sm:text-sm text-stone-700 mt-1">
            프로필 아바타를 탭하여 각 조직의 고유한 세계를 탐험하세요.
          </p>
        </div>

        {/* 3 Profile Avatars */}
        <div className="flex items-center justify-center gap-6 sm:gap-12">
          {/* Party Avatar */}
          <button
            onClick={() => setActiveOrg('party')}
            className={`flex flex-col items-center group transition-all duration-300 ${
              activeOrg === 'party' ? 'scale-105' : 'opacity-65 hover:opacity-90'
            }`}
          >
            <div
              className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-3xl sm:text-4xl transition-all duration-300 ${
                activeOrg === 'party'
                  ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/35 ring-4 ring-blue-300/60'
                  : 'bg-blue-100/80 text-blue-800'
              }`}
            >
              🗳️
            </div>
            <div className="mt-2.5 text-center">
              <span className="text-xs font-black tracking-wider text-blue-700 block">
                PARTY
              </span>
              <span className="text-sm font-extrabold text-stone-900">정당</span>
            </div>
          </button>

          {/* Civic Avatar */}
          <button
            onClick={() => setActiveOrg('civic')}
            className={`flex flex-col items-center group transition-all duration-300 ${
              activeOrg === 'civic' ? 'scale-105' : 'opacity-65 hover:opacity-90'
            }`}
          >
            <div
              className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-3xl sm:text-4xl transition-all duration-300 ${
                activeOrg === 'civic'
                  ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-500/35 ring-4 ring-emerald-300/60'
                  : 'bg-emerald-100/80 text-emerald-800'
              }`}
            >
              🌱
            </div>
            <div className="mt-2.5 text-center">
              <span className="text-xs font-black tracking-wider text-emerald-700 block">
                CIVIC
              </span>
              <span className="text-sm font-extrabold text-stone-900">시민단체</span>
            </div>
          </button>

          {/* Interest Avatar */}
          <button
            onClick={() => setActiveOrg('interest')}
            className={`flex flex-col items-center group transition-all duration-300 ${
              activeOrg === 'interest' ? 'scale-105' : 'opacity-65 hover:opacity-90'
            }`}
          >
            <div
              className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-3xl sm:text-4xl transition-all duration-300 ${
                activeOrg === 'interest'
                  ? 'bg-amber-600 text-white shadow-xl shadow-amber-500/35 ring-4 ring-amber-300/60'
                  : 'bg-amber-100/80 text-amber-800'
              }`}
            >
              💼
            </div>
            <div className="mt-2.5 text-center">
              <span className="text-xs font-black tracking-wider text-amber-700 block">
                INTEREST
              </span>
              <span className="text-sm font-extrabold text-stone-900">이익집단</span>
            </div>
          </button>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. PARTY WORLD (정당의 세계)                                  */}
      {/* ============================================================ */}
      {activeOrg === 'party' && (
        <div className="space-y-16 animate-fadeIn">
          {/* 2-1. SNS Profile Style Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 pt-4">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-blue-600 text-white flex flex-col items-center justify-center shadow-xl shadow-blue-600/20 flex-shrink-0">
              <span className="text-4xl">🗳️</span>
              <span className="text-[11px] font-black tracking-widest mt-1">PARTY</span>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <h3 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                  정당
                </h3>
                <span className="text-xs font-semibold text-stone-600">Political Party</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-black">
                  공식 정치 조직
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 mt-2 text-xs font-bold text-blue-700">
                <span className="bg-blue-50 px-2 py-0.5 rounded-md">#선거</span>
                <span className="bg-blue-50 px-2 py-0.5 rounded-md">#공약제시</span>
                <span className="bg-blue-50 px-2 py-0.5 rounded-md">#정권획득</span>
                <span className="bg-blue-50 px-2 py-0.5 rounded-md">#정치적책임</span>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed max-w-xl">
                정치적 견해를 같이하는 사람들이 정권 획득과 정책 실현을 위해 자발적으로 결성한 조직.
                선거를 통해 국가 권력을 획득하고 정책을 실행하는 중심적 주체입니다.
              </p>

              {/* SNS Profile Stats */}
              <div className="flex items-center justify-center md:justify-start gap-6 mt-4 pt-3 border-t border-stone-200/70 font-mono text-stone-800">
                <div>
                  <span className="text-lg font-black text-stone-900">8</span>
                  <span className="text-[11px] text-stone-500 ml-1 font-sans">FUNCTIONS</span>
                </div>
                <div>
                  <span className="text-lg font-black text-stone-900">7</span>
                  <span className="text-[11px] text-stone-500 ml-1 font-sans">MISSIONS</span>
                </div>
                <div>
                  <span className="text-lg font-black text-blue-600">1</span>
                  <span className="text-[11px] text-stone-500 ml-1 font-sans">GOAL (정권 획득)</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2-2. Big Typography Question (No nested borders!) */}
          <div className="text-center py-8 space-y-4">
            <span className="text-xs font-mono font-bold tracking-widest text-stone-500 uppercase">
              BIG QUESTION 01
            </span>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 leading-tight tracking-tight">
              정당은<br />
              <span className="text-blue-600">선거에서 이기기만 하면</span><br />
              끝일까?
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
              많은 사람들이 선거철에만 정당을 떠올립니다. 하지만 정당의 진짜 역할은 선거 전후로 일상 곳곳에 닿아 있습니다.
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setBigQuestionAnswer('yes')}
                className={`px-8 py-3.5 rounded-full text-sm font-black transition-all ${
                  bigQuestionAnswer === 'yes'
                    ? 'bg-stone-300 text-stone-800 scale-95'
                    : 'bg-stone-200/80 hover:bg-stone-300 text-stone-800'
                }`}
              >
                YES 🤔 (선거만 잘하면 끝)
              </button>
              <button
                onClick={() => setBigQuestionAnswer('no')}
                className={`px-8 py-3.5 rounded-full text-sm font-black transition-all shadow-md ${
                  bigQuestionAnswer === 'no'
                    ? 'bg-blue-600 text-white shadow-blue-500/30 scale-105 ring-4 ring-blue-200'
                    : 'bg-stone-900 hover:bg-blue-600 text-white'
                }`}
              >
                NO 👀 (선거 외에도 할 일이 많다)
              </button>
            </div>

            {bigQuestionAnswer === 'no' && (
              <div className="pt-4 max-w-md mx-auto animate-fadeIn">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-black mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>✦ GOOD QUESTION</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-stone-800 leading-relaxed">
                  맞습니다! 정당은 후보자를 발굴하고, 국민의 요구를 모으며, 법과 정책을 만들고, 정부를 감시하는 등 민주주의의 핵심 바퀴를 굴립니다.
                </p>
              </div>
            )}
            {bigQuestionAnswer === 'yes' && (
              <div className="pt-3 max-w-md mx-auto text-xs text-amber-800 font-semibold animate-fadeIn">
                선거에서 이기는 것도 중요하지만, 국민의 목소리를 모으고 정부를 감시하는 일상적 기능이 더 본질적입니다! NO를 누르고 미션을 시작해 보세요.
              </div>
            )}
          </div>

          {/* 2-3. Vertical Story Path Navigation & Interactive Missions */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Story Path (Sticky Navigation on PC) */}
            <div className="lg:col-span-4 bg-white/70 backdrop-blur-sm p-6 rounded-3xl shadow-sm border border-stone-200/60 sticky top-28">
              <span className="text-[11px] font-mono font-black text-stone-600 uppercase tracking-wider block mb-3">
                STORY PATH
              </span>
              <div className="space-y-3">
                {STORY_PATH.map((step, idx) => {
                  const isCurrent = currentMissionIdx === idx;
                  const isDone = completedMissions.has(idx);

                  return (
                    <button
                      key={step.id}
                      onClick={() => setCurrentMissionIdx(idx)}
                      className={`w-full text-left p-3 rounded-2xl transition-all flex items-center justify-between ${
                        isCurrent
                          ? 'bg-stone-900 text-white shadow-md font-bold scale-[1.02]'
                          : isDone
                          ? 'bg-blue-50/80 text-blue-950 font-semibold hover:bg-blue-100/80'
                          : 'text-stone-700 hover:bg-stone-100/80'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 text-xs sm:text-sm">
                        <span>{step.icon}</span>
                        <span className="truncate">{step.title}</span>
                      </div>
                      {isDone && (
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                          ✓ DONE
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Progress Count */}
              <div className="mt-6 pt-4 border-t border-stone-200/70 flex items-center justify-between text-xs">
                <span className="text-stone-700 font-medium">수집한 기능 카드</span>
                <span className="font-mono font-black text-blue-600">
                  {collectedStickers.length} / 8
                </span>
              </div>
            </div>

            {/* Right Interactive Mission Feed */}
            <div className="lg:col-span-8 space-y-6">
              {/* MISSION 01: 후보자를 찾습니다 */}
              {currentMissionIdx === 0 && (
                <div className="bg-white p-7 rounded-3xl shadow-sm border border-stone-200/60 space-y-5 animate-fadeIn">
                  {/* Smartphone Alert */}
                  <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-3">
                    <span className="text-2xl">🔔</span>
                    <div className="flex-1 text-xs">
                      <div className="flex items-center justify-between font-mono font-bold text-amber-900 mb-0.5">
                        <span>ELECTION NOW</span>
                        <span className="text-[10px] text-amber-700 font-normal">2분 전</span>
                      </div>
                      <p className="text-stone-800 font-semibold leading-snug">
                        “국회의원 총선거가 다가옵니다! 각 정당이 지역구에 출마할 후보자를 결정하고 있습니다.”
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="text-[11px] font-mono text-stone-600 font-bold uppercase">
                      MISSION 01
                    </span>
                    <h4 className="text-2xl font-black text-stone-900 tracking-tight mt-1">
                      여기서 정당은 무슨 일을 할까?
                    </h4>
                    <p className="text-xs text-stone-700 mt-1">
                      선거에 출마할 인재를 사회에서 발굴하고 당의 대표 선수(후보자)로 공천하는 행위를 무엇이라 부를까요?
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={() => {
                        setM1Selected(1);
                        unlockSticker(
                          {
                            id: 'recruit',
                            name: '정치적 충원',
                            tag: 'POLITICAL RECRUITMENT',
                            desc: '후보자 발굴 → 선정 → 공천 → 선거 → 공직자 배출',
                            icon: '🗳️',
                            rotate: '-rotate-2',
                            color: 'bg-blue-600 text-white',
                          },
                          0
                        );
                      }}
                      className={`p-5 rounded-2xl text-left transition-all border ${
                        m1Selected === 1
                          ? 'border-blue-600 bg-blue-50/70 shadow-md ring-2 ring-blue-300'
                          : 'border-stone-200 hover:border-stone-400 bg-stone-50/50'
                      }`}
                    >
                      <div className="text-lg mb-1">🗳️ A. 정치적 충원</div>
                      <p className="text-xs text-stone-600 font-medium">
                        능력과 비전을 가진 인재를 발굴하고 공천하여 국가 지도자로 키워냅니다.
                      </p>
                    </button>

                    <button
                      onClick={() => setM1Selected(2)}
                      className={`p-5 rounded-2xl text-left transition-all border ${
                        m1Selected === 2
                          ? 'border-rose-400 bg-rose-50 text-rose-900'
                          : 'border-stone-200 hover:border-stone-400 bg-stone-50/50'
                      }`}
                    >
                      <div className="text-lg mb-1">📢 B. 단순 광고 대행</div>
                      <p className="text-xs text-stone-600 font-medium">
                        단순히 후보자의 현수막과 포스터 홍보만 대신해 줍니다.
                      </p>
                    </button>
                  </div>

                  {m1Selected === 1 && (
                    <div className="p-4 rounded-2xl bg-blue-100/70 text-blue-950 text-xs font-semibold animate-fadeIn">
                      🎉 정답입니다! 정당은 <strong>후보자 공천</strong>을 통해 국가를 이끌 공직자를 배출하는 독점적 통로(정치적 충원)입니다.
                    </div>
                  )}
                  {m1Selected === 2 && (
                    <div className="p-3 rounded-xl bg-rose-100 text-rose-900 text-xs font-semibold animate-fadeIn">
                      정당은 단순 광고 회사가 아닙니다! 정치적 인재를 선발하고 공천하는 <strong>정치적 충원</strong>을 수행합니다.
                    </div>
                  )}
                </div>
              )}

              {/* MISSION 02: 국민의 목소리가 쏟아진다 (SNS 말풍선 흩어짐 -> 이익 집약) */}
              {currentMissionIdx === 1 && (
                <div className="bg-white p-7 rounded-3xl shadow-sm border border-stone-200/60 space-y-6 animate-fadeIn">
                  <div>
                    <span className="text-[11px] font-mono text-stone-600 font-bold uppercase">
                      MISSION 02
                    </span>
                    <h4 className="text-2xl font-black text-stone-900 tracking-tight mt-1">
                      🔥 지금 국민들이 말하는 것
                    </h4>
                    <p className="text-xs text-stone-700 mt-1">
                      선거를 앞두고 온갖 다양한 요구들이 SNS 댓글과 청원으로 쏟아집니다:
                    </p>
                  </div>

                  {/* Scattered Bubbles */}
                  <div className="relative p-6 rounded-3xl bg-stone-100/80 min-h-[220px] flex flex-wrap gap-2.5 items-center justify-center overflow-hidden">
                    <div className="p-3 rounded-2xl bg-white shadow-xs text-xs font-bold text-stone-800 -rotate-2">
                      💬 “교육비 부담 좀 줄여주세요!”
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white shadow-xs text-xs font-bold text-blue-800 rotate-1">
                      💬 “아이 돌봄 시설이 너무 부족합니다.”
                    </div>
                    <div className="p-3 rounded-2xl bg-white shadow-xs text-xs font-bold text-stone-800 rotate-3">
                      💬 “청년 월세와 주거 대책이 시급해요!”
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white shadow-xs text-xs font-bold text-emerald-800 -rotate-1">
                      💬 “탄소 배출 줄이는 기후 정책도 필수예요.”
                    </div>
                    <div className="p-3 rounded-2xl bg-white shadow-xs text-xs font-bold text-amber-800 rotate-2">
                      💬 “소상공인 대출 이자 지원이 절실합니다.”
                    </div>
                  </div>

                  <div className="text-center pt-2 space-y-3">
                    <h5 className="text-lg sm:text-xl font-black text-stone-900">
                      이렇게 서로 다른 국민들의 요구를 정당은 어떻게 할까?
                    </h5>

                    <button
                      onClick={() => {
                        setM2Aggregated(true);
                        unlockSticker(
                          {
                            id: 'aggregate',
                            name: '이익 집약',
                            tag: 'INTEREST AGGREGATION',
                            desc: '분산된 요구 수렴 → 조율 → 하나의 일관된 정책 수립',
                            icon: '🧩',
                            rotate: 'rotate-3',
                            color: 'bg-indigo-600 text-white',
                          },
                          1
                        );
                      }}
                      className="px-6 py-3 rounded-full bg-stone-900 hover:bg-blue-600 text-white text-xs sm:text-sm font-black transition shadow-md"
                    >
                      🧩 다양한 요구를 하나로 묶어 당의 정책으로 조율하기
                    </button>
                  </div>

                  {m2Aggregated && (
                    <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 animate-fadeIn text-xs text-indigo-950 font-semibold space-y-1">
                      <div className="font-black text-sm">✦ 기능 획득: 이익 집약 (Interest Aggregation)</div>
                      <p>
                        사회 구성원들의 다양하고 때로는 충돌하는 요구를 정당 내부에서 토론과 조율을 거쳐,
                        일관성 있는 종합 정책으로 정리해 내는 핵심 기능입니다!
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* MISSION 03: 공약이 도착했습니다 (스와이프 / 이슈 선택) */}
              {currentMissionIdx === 2 && (
                <div className="bg-white p-7 rounded-3xl shadow-sm border border-stone-200/60 space-y-6 animate-fadeIn">
                  <div>
                    <span className="text-[11px] font-mono text-stone-600 font-bold uppercase">
                      MISSION 03
                    </span>
                    <h4 className="text-2xl font-black text-stone-900 tracking-tight mt-1">
                      WHAT'S YOUR ISSUE?
                    </h4>
                    <p className="text-xs text-stone-700 mt-1">
                      관심 있는 사회 이슈를 선택하면 정당의 대표 공약 카드가 펼쳐집니다:
                    </p>
                  </div>

                  {/* Horizontal Issue Chips */}
                  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                    {[
                      { id: 'education', label: '📚 EDUCATION', title: '청소년 교육·진로 바우처 신설' },
                      { id: 'housing', label: '🏠 HOUSING', title: '청년 안심 주택 10만 호 공급' },
                      { id: 'care', label: '👶 CARE', title: '동네 온종일 늘봄 돌봄센터 확충' },
                      { id: 'climate', label: '🌱 CLIMATE', title: '일회용 플라스틱 제로 마일리지' },
                    ].map((issue) => (
                      <button
                        key={issue.id}
                        onClick={() => setM3Issue(issue.id)}
                        className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition ${
                          m3Issue === issue.id
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                        }`}
                      >
                        {issue.label}
                      </button>
                    ))}
                  </div>

                  {/* Party Manifesto Card */}
                  <div className="p-5 rounded-3xl bg-blue-50/70 border border-blue-200 space-y-4">
                    <div className="flex items-center justify-between text-xs text-blue-800 font-mono font-bold">
                      <span>PARTY MANIFESTO 2026</span>
                      <span>공약 번호 #03</span>
                    </div>

                    <h5 className="text-base sm:text-lg font-black text-stone-900">
                      {m3Issue === 'education' && '“사교육비 부담 완화 및 청소년 꿈도전 바우처 지급”'}
                      {m3Issue === 'housing' && '“역세권 청년 1인 가구 반값 공공임대 주택 10만 호 공급”'}
                      {m3Issue === 'care' && '“지자체-학교 연계 초등 온종일 돌봄 전면 무상화”'}
                      {m3Issue === 'climate' && '“도심 친환경 전기트램 확대 및 플라스틱 감축 지원”'}
                    </h5>

                    {/* Cycle Flow: PROMISE -> VOTE -> POLICY -> EVALUATION */}
                    <div className="grid grid-cols-4 gap-1.5 text-center text-[11px] font-bold text-stone-700 pt-2 border-t border-blue-200/60">
                      <div className="p-2 bg-white rounded-xl shadow-2xs">1. PROMISE (공약)</div>
                      <div className="p-2 bg-white rounded-xl shadow-2xs">2. VOTE (선거)</div>
                      <div className="p-2 bg-white rounded-xl shadow-2xs">3. POLICY (집행)</div>
                      <div className="p-2 bg-white rounded-xl shadow-2xs text-blue-700">4. EVALUATION</div>
                    </div>
                  </div>

                  <div className="text-center pt-1 space-y-2">
                    <h5 className="text-sm sm:text-base font-black text-stone-900">
                      “국민은 다음 선거에서 정당의 약속 이행 여부를 반드시 다시 심판합니다.”
                    </h5>
                    <button
                      onClick={() => {
                        setM3ResponsibilityUnlocked(true);
                        unlockSticker(
                          {
                            id: 'manifesto',
                            name: '정책 및 공약 제시',
                            tag: 'POLICY & MANIFESTO',
                            desc: '국민을 위한 미래 정책 대안 제시',
                            icon: '📋',
                            rotate: '-rotate-1',
                            color: 'bg-blue-700 text-white',
                          },
                          2
                        );
                        unlockSticker(
                          {
                            id: 'responsibility',
                            name: '정치적 책임',
                            tag: 'POLITICAL RESPONSIBILITY',
                            desc: '공약 불이행 시 다음 선거에서 심판 수용',
                            icon: '⚖️',
                            rotate: 'rotate-2',
                            color: 'bg-stone-900 text-white',
                          },
                          2
                        );
                      }}
                      className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-black transition shadow-sm"
                    >
                      📋 정책 제시 & ⚖️ 정치적 책임 2개 카드 획득하기
                    </button>
                  </div>
                </div>
              )}

              {/* MISSION 04: 여론 형성 (TRENDING NOW) */}
              {currentMissionIdx === 3 && (
                <div className="bg-white p-7 rounded-3xl shadow-sm border border-stone-200/60 space-y-5 animate-fadeIn">
                  <div>
                    <span className="text-[11px] font-mono text-stone-600 font-bold uppercase">
                      MISSION 04
                    </span>
                    <h4 className="text-2xl font-black text-stone-900 tracking-tight mt-1">
                      TRENDING NOW 🔥
                    </h4>
                    <p className="text-xs text-stone-700 mt-1">
                      실시간 트렌드 검색어와 함께 각 정당의 성명과 여론 설득 캠페인이 올라옵니다:
                    </p>
                  </div>

                  {/* Trends Feed */}
                  <div className="space-y-2.5">
                    <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-rose-500" />
                        <span className="text-xs font-black text-stone-900">#교육개혁법안 12.8K Posts</span>
                      </div>
                      <span className="text-[11px] font-semibold text-blue-600">A당 성명 발표</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-rose-500" />
                        <span className="text-xs font-black text-stone-900">#청년주거지원 8.4K Posts</span>
                      </div>
                      <span className="text-[11px] font-semibold text-blue-600">B당 토론회 개최</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-rose-500" />
                        <span className="text-xs font-black text-stone-900">#돌봄확대 6.9K Posts</span>
                      </div>
                      <span className="text-[11px] font-semibold text-blue-600">여론조사 실시</span>
                    </div>
                  </div>

                  <div className="pt-2 text-center">
                    <button
                      onClick={() => {
                        setM4TrendingChecked(true);
                        unlockSticker(
                          {
                            id: 'public-opinion',
                            name: '여론 형성 및 조직화',
                            tag: 'PUBLIC OPINION FORMATION',
                            desc: '사회적 쟁점을 공론화하고 지지 여론을 결집',
                            icon: '📢',
                            rotate: 'rotate-1',
                            color: 'bg-sky-600 text-white',
                          },
                          3
                        );
                      }}
                      className="px-6 py-3 rounded-full bg-stone-900 hover:bg-blue-600 text-white text-xs sm:text-sm font-black transition shadow-sm"
                    >
                      📢 여론 형성 및 조직화 기능 카드 획득하기
                    </button>
                  </div>
                </div>
              )}

              {/* MISSION 05: 정치사회화 (REELS 숏폼) */}
              {currentMissionIdx === 4 && (
                <div className="bg-white p-7 rounded-3xl shadow-sm border border-stone-200/60 space-y-6 animate-fadeIn">
                  <div>
                    <span className="text-[11px] font-mono text-stone-600 font-bold uppercase">
                      MISSION 05
                    </span>
                    <h4 className="text-2xl font-black text-stone-900 tracking-tight mt-1">
                      60 SEC POLITICS REELS ▶️
                    </h4>
                    <p className="text-xs text-stone-700 mt-1">
                      청소년과 시민들이 정당의 숏폼 영상과 카드뉴스를 보며 정치를 자연스럽게 배웁니다:
                    </p>
                  </div>

                  {/* 3 Reels Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        id: 0,
                        title: '여당 vs 야당 차이점 1분 컷',
                        views: '84.2K',
                        icon: '🏛️',
                        bg: 'bg-slate-900 text-white',
                      },
                      {
                        id: 1,
                        title: '정당별 핵심 교육공약 총정리',
                        views: '112K',
                        icon: '📚',
                        bg: 'bg-blue-900 text-white',
                      },
                      {
                        id: 2,
                        title: '만 18세 청소년 선거 참여 가이드',
                        views: '95.6K',
                        icon: '🗳️',
                        bg: 'bg-indigo-900 text-white',
                      },
                    ].map((reel) => (
                      <div
                        key={reel.id}
                        onClick={() => setM5ActiveReel(reel.id)}
                        className={`p-4 rounded-2xl cursor-pointer transition-all ${reel.bg} flex flex-col justify-between h-44 shadow-sm hover:scale-[1.02]`}
                      >
                        <div className="flex items-center justify-between text-[11px] text-stone-300">
                          <span className="flex items-center gap-1 font-mono">
                            <Play className="w-3 h-3 fill-current" /> REEL
                          </span>
                          <span className="font-mono">{reel.views}</span>
                        </div>
                        <div>
                          <div className="text-2xl mb-1">{reel.icon}</div>
                          <div className="text-xs font-black leading-snug">{reel.title}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center pt-2 space-y-3">
                    <h5 className="text-sm sm:text-base font-black text-stone-900">
                      “시민은 이런 과정을 통해 정치적 지식, 가치관, 참여 방법을 학습합니다.”
                    </h5>

                    <button
                      onClick={() => {
                        setM5SocializationUnlocked(true);
                        unlockSticker(
                          {
                            id: 'socialization',
                            name: '정치사회화',
                            tag: 'POLITICAL SOCIALIZATION',
                            desc: '시민에게 정치적 쟁점과 참여 의식을 교육',
                            icon: '🧠',
                            rotate: '-rotate-2',
                            color: 'bg-purple-600 text-white',
                          },
                          4
                        );
                      }}
                      className="px-6 py-2.5 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-xs font-black transition shadow-md shadow-purple-500/20"
                    >
                      🧠 정치사회화 기능 카드 획득하기
                    </button>
                  </div>

                  {m5SocializationUnlocked && (
                    <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-xs text-purple-950 font-semibold animate-fadeIn">
                      💡 <strong>WAIT! 중요 포인트:</strong> 정치사회화는 정당만의 독점 기능이 아닙니다.
                      시민단체와 이익집단 역시 각자의 방식으로 시민들을 교육하고 의식을 일깨웁니다!
                    </div>
                  )}
                </div>
              )}

              {/* MISSION 06: 매개 기능 (DM 메신저) */}
              {currentMissionIdx === 5 && (
                <div className="bg-white p-7 rounded-3xl shadow-sm border border-stone-200/60 space-y-5 animate-fadeIn">
                  <div>
                    <span className="text-[11px] font-mono text-stone-600 font-bold uppercase">
                      MISSION 06
                    </span>
                    <h4 className="text-2xl font-black text-stone-900 tracking-tight mt-1">
                      PEOPLE ↔ PARTY ↔ GOVERNMENT
                    </h4>
                    <p className="text-xs text-stone-700 mt-1">
                      정당은 시민과 국가 기관 사이에서 양방향 소통의 다리(Bridge)가 되어줍니다:
                    </p>
                  </div>

                  {/* Chat DM UI */}
                  <div className="p-4 rounded-3xl bg-stone-100/90 space-y-3 text-xs font-medium">
                    <div className="flex items-start gap-2">
                      <div className="w-7 h-7 rounded-full bg-stone-300 flex items-center justify-center font-bold">
                        👤
                      </div>
                      <div className="p-3 bg-white rounded-2xl rounded-tl-none shadow-2xs max-w-[80%]">
                        <span className="text-[10px] text-stone-600 font-bold block mb-0.5">시민 청원</span>
                        “우리 동네에 야간 돌봄 센터가 없어서 맞벌이 부모들이 너무 힘듭니다.”
                      </div>
                    </div>

                    <div className="flex items-start gap-2 justify-end">
                      <div className="p-3 bg-blue-600 text-white rounded-2xl rounded-tr-none shadow-xs max-w-[80%]">
                        <span className="text-[10px] text-blue-200 font-bold block mb-0.5">정당 정책위원회</span>
                        “시민 여러분의 의견을 받아 시의회와 국회 상임위에 정식 안건으로 제출했습니다!”
                      </div>
                      <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                        🗳️
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                        🏛️
                      </div>
                      <div className="p-3 bg-white rounded-2xl rounded-tl-none shadow-2xs max-w-[80%]">
                        <span className="text-[10px] text-stone-600 font-bold block mb-0.5">정부·지자체</span>
                        “관련 예산 50억 원을 심의하여 내년 상반기 센터 착공을 확정했습니다.”
                      </div>
                    </div>
                  </div>

                  <div className="text-center pt-2">
                    <button
                      onClick={() => {
                        unlockSticker(
                          {
                            id: 'bridge',
                            name: '매개 기능',
                            tag: 'LINKING CITIZENS & STATE',
                            desc: '국민의 의사를 정부에 전달하고 정책 결과를 국민에게 설명',
                            icon: '🌉',
                            rotate: 'rotate-2',
                            color: 'bg-emerald-600 text-white',
                          },
                          5
                        );
                      }}
                      className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black transition shadow-sm"
                    >
                      🌉 매개 기능 카드 획득하기
                    </button>
                  </div>
                </div>
              )}

              {/* MISSION 07: 정부 감시·견제 (BREAKING NEWS) */}
              {currentMissionIdx === 6 && (
                <div className="bg-white p-7 rounded-3xl shadow-sm border border-stone-200/60 space-y-6 animate-fadeIn">
                  <div>
                    <span className="text-[11px] font-mono text-stone-600 font-bold uppercase">
                      MISSION 07
                    </span>
                    <h4 className="text-2xl font-black text-stone-900 tracking-tight mt-1">
                      BREAKING NEWS 📢
                    </h4>
                    <p className="text-xs text-stone-700 mt-1">
                      정부가 새로운 대형 정책을 발표했습니다. 이때 정당들은 어떻게 반응할까요?
                    </p>
                  </div>

                  {/* 2 Sided View: 여당 vs 야당 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-black text-blue-800">
                        <span>🔵 여당 (정부와 뜻을 같이하는 당)</span>
                      </div>
                      <p className="text-xs text-stone-700 leading-relaxed font-medium">
                        “정부 정책이 차질 없이 추진되도록 당정 협의를 열고 입법과 예산 통과를 전폭 지원하겠습니다.”
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-stone-100/80 border border-stone-300 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-black text-stone-900">
                        <span>⚪ 야당 (정권에 속하지 않은 당)</span>
                      </div>
                      <p className="text-xs text-stone-700 leading-relaxed font-medium">
                        “정책의 부작용과 예산 낭비를 꼼꼼히 감시하고, 국정감사와 청문회를 통해 대안을 제시하겠습니다.”
                      </p>
                    </div>
                  </div>

                  <div className="text-center pt-2 space-y-2">
                    <h5 className="text-sm sm:text-base font-black text-stone-900">
                      “야당이 되면 정당의 역할이 끝날까요? NO!”
                    </h5>
                    <button
                      onClick={() => {
                        setM7Answered(true);
                        unlockSticker(
                          {
                            id: 'check-balance',
                            name: '정부 감시 및 견제',
                            tag: 'GOVERNMENT SCRUTINY',
                            desc: '권력 남용을 방지하고 합리적 대안 제시',
                            icon: '👀',
                            rotate: '-rotate-2',
                            color: 'bg-stone-800 text-white',
                          },
                          6
                        );
                      }}
                      className="px-6 py-2.5 rounded-full bg-stone-900 hover:bg-blue-600 text-white text-xs font-black transition shadow-sm"
                    >
                      👀 정부 감시 및 견제 기능 카드 획득하기
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 2-4. MY COLLECTION: 포토카드 / 스티커 앨범 스타일 (8/8) */}
          <section className="pt-8 border-t border-stone-200/80">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
              <div>
                <span className="text-[11px] font-mono tracking-widest text-stone-600 uppercase font-semibold">
                  PHOTO CARD & STICKER ALBUM
                </span>
                <h3 className="text-2xl font-black text-stone-900 tracking-tight">
                  MY COLLECTION ✦
                </h3>
                <p className="text-xs text-stone-700 mt-0.5">
                  미션을 해결하며 획득한 정당의 8대 핵심 기능 스티커 컬렉션입니다.
                </p>
              </div>

              <div className="font-mono text-sm font-black text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
                {collectedStickers.length} / 8 FUNCTIONS COLLECTED
              </div>
            </div>

            {/* Sticker Grid with Free Rotations and Textures */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { id: 'recruit', name: '정치적 충원', tag: 'POLITICAL RECRUITMENT', icon: '🗳️', rotate: '-rotate-2', color: 'bg-blue-600' },
                { id: 'aggregate', name: '이익 집약', tag: 'INTEREST AGGREGATION', icon: '🧩', rotate: 'rotate-3', color: 'bg-indigo-600' },
                { id: 'manifesto', name: '정책·공약 제시', tag: 'POLICY & MANIFESTO', icon: '📋', rotate: '-rotate-1', color: 'bg-blue-700' },
                { id: 'responsibility', name: '정치적 책임', tag: 'POLITICAL RESPONSIBILITY', icon: '⚖️', rotate: 'rotate-2', color: 'bg-stone-900' },
                { id: 'public-opinion', name: '여론 형성·조직화', tag: 'PUBLIC OPINION', icon: '📢', rotate: '-rotate-2', color: 'bg-sky-600' },
                { id: 'socialization', name: '정치사회화', tag: 'SOCIALIZATION', icon: '🧠', rotate: 'rotate-1', color: 'bg-purple-600' },
                { id: 'bridge', name: '매개 기능', tag: 'LINKING CITIZENS', icon: '🌉', rotate: '-rotate-1', color: 'bg-emerald-600' },
                { id: 'check-balance', name: '정부 감시·견제', tag: 'GOV SCRUTINY', icon: '👀', rotate: 'rotate-2', color: 'bg-stone-800' },
              ].map((item) => {
                const isCollected = collectedStickers.some((s) => s.id === item.id);

                return (
                  <div
                    key={item.id}
                    className={`p-4 rounded-3xl transition-all duration-300 flex flex-col justify-between h-40 ${item.rotate} ${
                      isCollected
                        ? `${item.color} text-white shadow-lg hover:scale-105 hover:rotate-0`
                        : 'bg-stone-200/60 border border-dashed border-stone-300 text-stone-500 grayscale opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono tracking-widest font-semibold">
                      <span>{item.tag}</span>
                      {isCollected && <span>✦</span>}
                    </div>

                    <div className="text-center my-auto">
                      <div className="text-3xl mb-1">{item.icon}</div>
                      <div className="text-sm font-black tracking-tight">{item.name}</div>
                    </div>

                    <div className="text-[10px] text-center font-bold opacity-80">
                      {isCollected ? '수집 완료 ✓' : '미션 진행 중'}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      )}

      {/* ============================================================ */}
      {/* 3. CIVIC WORLD: CAMPAIGN FEED STYLE (시민단체)                */}
      {/* ============================================================ */}
      {activeOrg === 'civic' && (
        <div className="space-y-12 animate-fadeIn">
          {/* Civic Header Profile */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 pt-4">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-emerald-600 text-white flex flex-col items-center justify-center shadow-xl shadow-emerald-600/20 flex-shrink-0">
              <span className="text-4xl">🌱</span>
              <span className="text-[11px] font-black tracking-widest mt-1">CIVIC GROUP</span>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <h3 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                  시민단체
                </h3>
                <span className="text-xs font-semibold text-stone-600">Civic Organization</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                  비영리 공익 결사체
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 mt-2 text-xs font-bold text-emerald-700">
                <span className="bg-emerald-50 px-2 py-0.5 rounded-md">#공익실현</span>
                <span className="bg-emerald-50 px-2 py-0.5 rounded-md">#자발적참여</span>
                <span className="bg-emerald-50 px-2 py-0.5 rounded-md">#비영리성</span>
                <span className="bg-emerald-50 px-2 py-0.5 rounded-md">#정권획득X</span>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed max-w-xl">
                사회 전체의 공동선과 <strong>공익(Public Interest)</strong> 실현을 위해 시민들이 자발적으로 결성한 비영리 조직.
                정권을 획득하려 하지 않으며, 권력을 감시하고 소외된 목소리를 대변합니다.
              </p>
            </div>
          </div>

          {/* Campaign Feed: 3 distinct social feed cards */}
          <div className="space-y-6 max-w-2xl mx-auto">
            <span className="text-[11px] font-mono text-stone-600 font-bold uppercase block text-center">
              LIVE CAMPAIGN FEED
            </span>

            {/* Feed 1: Clean River */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200/80 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                    🌱
                  </div>
                  <div>
                    <div className="text-xs font-black text-stone-900">푸른 하천 지킴이 시민행동</div>
                    <div className="text-[10px] text-stone-600">방금 전 · 환경 공익 캠페인</div>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-black">
                  #공익성
                </span>
              </div>

              <p className="text-sm font-bold text-stone-900 leading-snug">
                “우리 동네 하천에 폐수가 유입되고 있습니다. 아이들과 미래 세대를 위해 10만 서명에 동참해주세요!”
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs text-stone-600">
                <button
                  onClick={() => handleCivicLike('river', '공익성')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition ${
                    civicUserLiked['river'] ? 'bg-rose-50 text-rose-600 font-bold' : 'hover:bg-stone-100'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${civicUserLiked['river'] ? 'fill-current' : ''}`} />
                  <span>{civicLikes.river}</span>
                </button>
                <span className="flex items-center gap-1 font-mono">
                  <MessageCircle className="w-3.5 h-3.5" /> 382
                </span>
                <span className="flex items-center gap-1 font-mono">
                  <Share2 className="w-3.5 h-3.5" /> 공유
                </span>
              </div>
            </div>

            {/* Feed 2: Accessible Transit */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200/80 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs">
                    ♿
                  </div>
                  <div>
                    <div className="text-xs font-black text-stone-900">모두의 이동권 시민연대</div>
                    <div className="text-[10px] text-stone-600">2시간 전 · 인권 공익 캠페인</div>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 text-[10px] font-black">
                  #자발성
                </span>
              </div>

              <p className="text-sm font-bold text-stone-900 leading-snug">
                “누구나 턱 없는 버스를 타고 어디든 자유롭게 이동할 수 있는 도시는 우리 모두의 안전을 위한 일입니다.”
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs text-stone-600">
                <button
                  onClick={() => handleCivicLike('transit', '자발성')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition ${
                    civicUserLiked['transit'] ? 'bg-rose-50 text-rose-600 font-bold' : 'hover:bg-stone-100'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${civicUserLiked['transit'] ? 'fill-current' : ''}`} />
                  <span>{civicLikes.transit}</span>
                </button>
                <span className="flex items-center gap-1 font-mono">
                  <MessageCircle className="w-3.5 h-3.5" /> 194
                </span>
                <span className="flex items-center gap-1 font-mono">
                  <Share2 className="w-3.5 h-3.5" /> 공유
                </span>
              </div>
            </div>

            {/* Feed 3: Consumer Rights */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200/80 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                    🛒
                  </div>
                  <div>
                    <div className="text-xs font-black text-stone-900">소비자 공익 네트워크</div>
                    <div className="text-[10px] text-stone-600">어제 · 권익 보호</div>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-800 text-[10px] font-black">
                  #비영리성
                </span>
              </div>

              <p className="text-sm font-bold text-stone-900 leading-snug">
                “과장 광고와 유해 물질 성분 표시 의무화를 위해 정부에 엄격한 법 개정을 촉구합니다.”
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs text-stone-600">
                <button
                  onClick={() => handleCivicLike('consumer', '비영리성')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition ${
                    civicUserLiked['consumer'] ? 'bg-rose-50 text-rose-600 font-bold' : 'hover:bg-stone-100'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${civicUserLiked['consumer'] ? 'fill-current' : ''}`} />
                  <span>{civicLikes.consumer}</span>
                </button>
                <span className="flex items-center gap-1 font-mono">
                  <MessageCircle className="w-3.5 h-3.5" /> 512
                </span>
                <span className="flex items-center gap-1 font-mono">
                  <Share2 className="w-3.5 h-3.5" /> 공유
                </span>
              </div>
            </div>
          </div>

          {/* Civic Core Takeaway Sticker Box */}
          <div className="p-6 rounded-3xl bg-emerald-50/70 border border-emerald-200 text-center space-y-2 max-w-xl mx-auto">
            <h4 className="text-base font-black text-emerald-950">
              ✦ 시민단체의 3대 핵심 성격 발견
            </h4>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              <span className="px-3.5 py-1.5 rounded-full bg-white text-emerald-900 font-extrabold text-xs shadow-2xs">
                🌱 공익성 (사회 전체 이익)
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white text-emerald-900 font-extrabold text-xs shadow-2xs">
                🤝 자발성 (시민의 자발적 결성)
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white text-emerald-900 font-extrabold text-xs shadow-2xs">
                ⚖️ 비영리성 (이윤 추구 X)
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 4. INTEREST WORLD: NETWORK / BRIEFING STYLE (이익집단)       */}
      {/* ============================================================ */}
      {activeOrg === 'interest' && (
        <div className="space-y-12 animate-fadeIn">
          {/* Interest Header Profile */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 pt-4">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-amber-600 text-white flex flex-col items-center justify-center shadow-xl shadow-amber-600/20 flex-shrink-0">
              <span className="text-4xl">💼</span>
              <span className="text-[11px] font-black tracking-widest mt-1">INTEREST GROUP</span>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <h3 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                  이익집단
                </h3>
                <span className="text-xs font-semibold text-stone-600">Interest Group</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-black">
                  회원 12,840명
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 mt-2 text-xs font-bold text-amber-700">
                <span className="bg-amber-50 px-2 py-0.5 rounded-md">#공통이해관계</span>
                <span className="bg-amber-50 px-2 py-0.5 rounded-md">#정책브리핑</span>
                <span className="bg-amber-50 px-2 py-0.5 rounded-md">#구성원특수이익</span>
                <span className="bg-amber-50 px-2 py-0.5 rounded-md">#입법영향력</span>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed max-w-xl">
                직업, 산업 등 공통된 이해관계를 공유하는 사람들이 모여 <strong>자기 구성원들의 특수한 이익과 권익</strong>을 지키기 위해
                정부와 국회의 정책 결정 과정에 압력을 행사하는 단체입니다.
              </p>
            </div>
          </div>

          {/* Network Briefing Style Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Briefing 1: Policy Brief */}
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-stone-200/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono font-bold text-amber-700 mb-2">
                  <span>📊 POLICY BRIEF</span>
                  <span>긴급 분석</span>
                </div>
                <h4 className="text-sm sm:text-base font-black text-stone-900 leading-snug">
                  “신규 규제 법안이 우리 업계에 미치는 영향 분석”
                </h4>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed font-medium">
                  회원사 보호를 위해 입법안의 부작용을 사전에 파악하고 대안 수정안을 마련했습니다.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] font-bold text-stone-500">
                목적: 회원사 경제적 손실 방지
              </div>
            </div>

            {/* Briefing 2: Opinion Sent */}
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-stone-200/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono font-bold text-blue-700 mb-2">
                  <span>📨 OPINION SENT</span>
                  <span>공식 접수</span>
                </div>
                <h4 className="text-sm sm:text-base font-black text-stone-900 leading-snug">
                  “국회 상임위원회에 공식 건의서 및 의견서 제출 완료”
                </h4>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed font-medium">
                  업계 종사자 5만 명의 서명을 첨부하여 관련 규제 유예 및 정부 지원 조항 반영을 요구했습니다.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] font-bold text-stone-500">
                활동: 정책 결정 과정에 압력 행사
              </div>
            </div>

            {/* Briefing 3: Member Voice */}
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-stone-200/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono font-bold text-emerald-700 mb-2">
                  <span>📣 MEMBER VOICE</span>
                  <span>회원 총회</span>
                </div>
                <h4 className="text-sm sm:text-base font-black text-stone-900 leading-snug">
                  “회원 역량 강화 및 법률 자문 아카데미 개최”
                </h4>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed font-medium">
                  새로 개정된 법률 지식을 교육하고 회원들이 정책 변화에 능동적으로 대처하도록 돕습니다.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] font-bold text-stone-500">
                기능: 구성원의 정치사회화 및 정보 제공
              </div>
            </div>
          </div>

          {/* Interest Core Takeaway */}
          <div className="p-6 rounded-3xl bg-amber-50/70 border border-amber-200 text-center space-y-2 max-w-xl mx-auto">
            <h4 className="text-base font-black text-amber-950">
              ✦ 이익집단의 결정적 차이: “구성원의 특수 이익 실현”
            </h4>
            <p className="text-xs text-stone-700 leading-relaxed">
              시민단체가 사회 전체의 ‘공익’을 도모한다면, 이익집단은 자기 집단 구성원의 ‘특수 이익’을 최우선으로 대변합니다.
            </p>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 5. BOTTOM TRANSITION TO PART 05                              */}
      {/* ============================================================ */}
      <div className="pt-8 flex justify-center">
        <button
          onClick={onNext}
          className="px-8 py-3.5 rounded-full bg-stone-900 hover:bg-blue-600 text-white font-extrabold text-sm shadow-xl shadow-stone-900/20 transition-all flex items-center gap-2 group"
        >
          <span>세 조직의 세계를 만났다면? → PART 05: 세 세계가 만나는 곳 (공통점 & 차이점)</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
