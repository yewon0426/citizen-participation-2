import React, { useState } from 'react';
import { OrgType } from '../types';
import {
  PARTY_MISSIONS_DATA,
  PARTY_MASTER_BOARD,
} from '../data/curriculumData';
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Award,
  Heart,
  Share2,
  TrendingUp,
  X,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Part4Props {
  onComplete: () => void;
  onNext: () => void;
}

// Function unlocked popup data
interface UnlockedPopup {
  title: string;
  icon: string;
  badge: string;
  desc: string;
  flow?: string[];
}

export const Part4WhoAreYou: React.FC<Part4Props> = ({ onComplete, onNext }) => {
  const [activeOrg, setActiveOrg] = useState<OrgType>('party');

  // Party State
  const [partyIntroChoice, setPartyIntroChoice] = useState<'yes' | 'no' | null>(null);
  const [partyMissionIndex, setPartyMissionIndex] = useState<number>(0);
  const [selectedPromiseTopic, setSelectedPromiseTopic] = useState<string>('edu');
  const [partyMissionCompleted, setPartyMissionCompleted] = useState<Set<number>>(new Set());

  // Function Unlocked Modal State
  const [unlockedPopup, setUnlockedPopup] = useState<UnlockedPopup | null>(null);

  // Mission 1 nomination answered
  const [mission1Answered, setMission1Answered] = useState(false);
  // Mission 2 raw vs adjust
  const [mission2Choice, setMission2Choice] = useState<'raw' | 'adjust' | null>(null);
  // Mission 7 opposition role
  const [mission7Choice, setMission7Choice] = useState<'yes' | 'no' | null>(null);

  // Civic Group State
  const [civicMissionChecks, setCivicMissionChecks] = useState<Record<string, boolean>>({
    survey: false,
    campaign: false,
    policyReq: false,
    monitor: false,
    infoShare: false,
    nominateCandidate: false,
  });
  const [civicSubmitted, setCivicSubmitted] = useState(false);
  const [civicLikes, setCivicLikes] = useState<Record<string, number>>({
    env: 3420,
    child: 2180,
    barrier: 4890,
    consumer: 1540,
  });
  const [hasLiked, setHasLiked] = useState<Record<string, boolean>>({});

  // Completion tracking
  const [completedOrgs, setCompletedOrgs] = useState<Set<OrgType>>(new Set());

  const triggerUnlock = (data: UnlockedPopup, missionIdx: number) => {
    setUnlockedPopup(data);
    setPartyMissionCompleted((prev) => new Set(prev).add(missionIdx));
    confetti({ particleCount: 45, spread: 60, origin: { y: 0.5 } });
  };

  const handleCompleteOrg = (type: OrgType) => {
    const updated = new Set(completedOrgs);
    updated.add(type);
    setCompletedOrgs(updated);
    if (updated.size >= 3) {
      confetti({ particleCount: 70, spread: 75, origin: { y: 0.5 } });
      onComplete();
    }
  };

  const handleCivicCheckSubmit = () => {
    setCivicSubmitted(true);
    const isCorrect =
      civicMissionChecks.survey &&
      civicMissionChecks.campaign &&
      civicMissionChecks.policyReq &&
      civicMissionChecks.monitor &&
      civicMissionChecks.infoShare &&
      !civicMissionChecks.nominateCandidate;

    if (isCorrect) {
      confetti({ particleCount: 50, spread: 60 });
      handleCompleteOrg('civic');
    }
  };

  const toggleCivicLike = (key: string) => {
    setHasLiked((prev) => ({ ...prev, [key]: !prev[key] }));
    setCivicLikes((prev) => ({
      ...prev,
      [key]: hasLiked[key] ? prev[key] - 1 : prev[key] + 1,
    }));
  };

  // Sticker titles for Party 7 missions
  const PARTY_MISSION_STICKERS = [
    { emoji: '🗳️', title: '후보자를 찾습니다', tag: '정치적 충원' },
    { emoji: '💬', title: '국민의 요구가 쏟아진다', tag: '이익 집약' },
    { emoji: '📋', title: '공약이 도착했습니다', tag: '정책·공약 제시' },
    { emoji: '📢', title: '오늘의 정치 뉴스', tag: '여론 형성' },
    { emoji: '🧠', title: '정치를 배우는 순간', tag: '정치사회화' },
    { emoji: '🌉', title: '국민의 목소리는 어디로?', tag: '정부·의회 매개' },
    { emoji: '👀', title: '선거에서 졌습니다', tag: '정부 감시·견제' },
  ];

  return (
    <div className="space-y-6 pb-8 relative">
      {/* Function Unlocked Modal Popup */}
      {unlockedPopup && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl border-4 border-blue-500 relative transform transition-all animate-scaleUp">
            <button
              onClick={() => setUnlockedPopup(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center text-3xl mx-auto shadow-lg shadow-blue-300 mb-3">
              {unlockedPopup.icon}
            </div>

            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-[11px] font-extrabold tracking-wider uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>FUNCTION UNLOCKED</span>
            </div>

            <h3 className="text-xl font-black text-slate-900 mb-1">
              {unlockedPopup.title}
            </h3>
            <p className="text-xs font-semibold text-blue-600 mb-3">
              {unlockedPopup.badge}
            </p>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 bg-slate-50 p-3 rounded-2xl border border-slate-100">
              {unlockedPopup.desc}
            </p>

            {unlockedPopup.flow && (
              <div className="mb-5 p-3 rounded-2xl bg-blue-50/60 border border-blue-100">
                <div className="text-[11px] font-bold text-blue-900 mb-1.5">[핵심 프로세스]</div>
                <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px] font-semibold text-blue-800">
                  {unlockedPopup.flow.map((step, idx) => (
                    <React.Fragment key={step}>
                      <span className="px-2 py-0.5 rounded-md bg-white border border-blue-200">
                        {step}
                      </span>
                      {idx < (unlockedPopup.flow?.length || 0) - 1 && (
                        <span className="text-blue-400 font-bold">→</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => setUnlockedPopup(null)}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold text-sm shadow-md shadow-blue-500/25 hover:from-blue-700 hover:to-indigo-700 transition"
            >
              기능 배지 획득 완료 ✨
            </button>
          </div>
        </div>
      )}

      {/* 3 Top Sub-Tabs: SNS Profile Chips (Requirement 3) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Chip 1: Party */}
        <button
          onClick={() => setActiveOrg('party')}
          className={`p-4 rounded-3xl text-left transition-all relative overflow-hidden border-2 ${
            activeOrg === 'party'
              ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-blue-500 shadow-lg shadow-blue-500/25 scale-[1.02]'
              : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-slate-50/80 shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider ${
                activeOrg === 'party' ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-800'
              }`}
            >
              🟦 PARTY
            </span>
            {completedOrgs.has('party') && (
              <span
                className={`text-[11px] font-bold flex items-center gap-0.5 ${
                  activeOrg === 'party' ? 'text-white' : 'text-emerald-600'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" /> 완료
              </span>
            )}
          </div>
          <div className="text-base sm:text-lg font-black">정당</div>
          <div
            className={`text-xs mt-1 font-mono flex flex-wrap gap-1 ${
              activeOrg === 'party' ? 'text-blue-100' : 'text-slate-500'
            }`}
          >
            <span>#선거</span> <span>#공약</span> <span>#정권획득</span>
          </div>
        </button>

        {/* Chip 2: Civic */}
        <button
          onClick={() => setActiveOrg('civic')}
          className={`p-4 rounded-3xl text-left transition-all relative overflow-hidden border-2 ${
            activeOrg === 'civic'
              ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-emerald-500 shadow-lg shadow-emerald-500/25 scale-[1.02]'
              : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-slate-50/80 shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider ${
                activeOrg === 'civic' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
              }`}
            >
              🟩 CIVIC
            </span>
            {completedOrgs.has('civic') && (
              <span
                className={`text-[11px] font-bold flex items-center gap-0.5 ${
                  activeOrg === 'civic' ? 'text-white' : 'text-emerald-600'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" /> 완료
              </span>
            )}
          </div>
          <div className="text-base sm:text-lg font-black">시민단체</div>
          <div
            className={`text-xs mt-1 font-mono flex flex-wrap gap-1 ${
              activeOrg === 'civic' ? 'text-emerald-100' : 'text-slate-500'
            }`}
          >
            <span>#공익</span> <span>#자발성</span> <span>#비영리</span>
          </div>
        </button>

        {/* Chip 3: Interest */}
        <button
          onClick={() => setActiveOrg('interest')}
          className={`p-4 rounded-3xl text-left transition-all relative overflow-hidden border-2 ${
            activeOrg === 'interest'
              ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white border-amber-500 shadow-lg shadow-amber-500/25 scale-[1.02]'
              : 'bg-white text-slate-700 border-slate-200 hover:border-amber-300 hover:bg-slate-50/80 shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider ${
                activeOrg === 'interest' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800'
              }`}
            >
              🟧 INTEREST
            </span>
            {completedOrgs.has('interest') && (
              <span
                className={`text-[11px] font-bold flex items-center gap-0.5 ${
                  activeOrg === 'interest' ? 'text-white' : 'text-emerald-600'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" /> 완료
              </span>
            )}
          </div>
          <div className="text-base sm:text-lg font-black">이익집단</div>
          <div
            className={`text-xs mt-1 font-mono flex flex-wrap gap-1 ${
              activeOrg === 'interest' ? 'text-amber-100' : 'text-slate-500'
            }`}
          >
            <span>#특수이익</span> <span>#이해관계</span> <span>#정책영향</span>
          </div>
        </button>
      </div>

      {/* ============================================================ */}
      {/* 🟦 SECTION 1: 정당 (POLITICAL PARTY)                         */}
      {/* ============================================================ */}
      {activeOrg === 'party' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Party Header Profile Card (Requirement 4) */}
          <div className="rounded-3xl border border-blue-200/80 bg-white p-6 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-blue-600 text-white tracking-wider flex items-center gap-1.5 shadow-xs">
                <span>🟦</span>
                <span>PARTY PROFILE</span>
              </span>
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/70">
                정치 조직
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              정당 <span className="text-sm sm:text-base font-medium text-slate-500 font-sans">(Political Party)</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-700 mt-2 leading-relaxed font-medium">
              “정치적 견해를 같이하는 사람들이 <strong>정권 획득</strong>과 <strong>정책 실현</strong>을 위해 조직한 정치 집단”
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs font-mono font-semibold text-blue-600">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-100">#공천</span>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-100">#공약</span>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-100">#정권획득</span>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-100">#정치적책임</span>
            </div>

            {/* Intro Question (Requirement 4) */}
            <div className="mt-5 p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                <span>💡</span>
                <span>Q. 정당은 단순히 선거에서 이기는 일만 할까요?</span>
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setPartyIntroChoice('yes')}
                  className={`py-2.5 px-3 rounded-2xl text-xs font-bold border transition ${
                    partyIntroChoice === 'yes'
                      ? 'bg-slate-200 text-slate-700 border-slate-300'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  YES (선거 승리만 한다)
                </button>
                <button
                  onClick={() => setPartyIntroChoice('no')}
                  className={`py-2.5 px-3 rounded-2xl text-xs font-bold border transition ${
                    partyIntroChoice === 'no'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-white border-blue-300 text-blue-700 hover:bg-blue-50'
                  }`}
                >
                  NO (정치에서 다양한 핵심 기능을 수행한다)
                </button>
              </div>

              {partyIntroChoice && (
                <div className="mt-3 p-3.5 rounded-2xl bg-white text-xs text-blue-950 border border-blue-200 animate-fadeIn">
                  <p className="font-extrabold text-sm text-blue-900 mb-1">
                    정답은 NO!
                  </p>
                  <p className="leading-relaxed text-slate-700">
                    선거 승리는 수단일 뿐! 후보자 발굴·공천, 국민의 다양한 요구 집약, 공약 제시, 여론 형성, 정치사회화, 정부 감시까지 민주주의의 중추 역할을 담당합니다.
                    아래의 <strong>7대 탐구 미션</strong>을 클리어하고 기능 배지를 모아보세요!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Party 7 Missions Navigation Stepper - Sticker Pills (Requirement 5) */}
          <div className="rounded-3xl bg-white border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>PARTY MISSIONS (7대 미션 탐구)</span>
              </span>
              <span className="text-blue-600 font-bold font-mono">
                {partyMissionIndex + 1} / 7
              </span>
            </div>

            {/* Sticker Badges Row */}
            <div className="overflow-x-auto pb-2 flex gap-2 scrollbar-none">
              {PARTY_MISSION_STICKERS.map((stk, idx) => {
                const isCurrent = idx === partyMissionIndex;
                const isDone = partyMissionCompleted.has(idx);

                return (
                  <button
                    key={idx}
                    onClick={() => setPartyMissionIndex(idx)}
                    className={`flex-shrink-0 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all border flex items-center gap-1.5 ${
                      isCurrent
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20 ring-2 ring-blue-400/40'
                        : isDone
                        ? 'bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>{stk.emoji}</span>
                    <span className="whitespace-nowrap">MISSION 0{idx + 1}</span>
                    {isDone && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-extrabold ml-0.5">
                        획득!
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Active Mission Card Container */}
            {(() => {
              const currentMission = PARTY_MISSIONS_DATA[partyMissionIndex];
              const sticker = PARTY_MISSION_STICKERS[partyMissionIndex];

              return (
                <div className="mt-4 border border-blue-100 rounded-2xl p-5 bg-gradient-to-b from-blue-50/40 via-white to-white">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 flex items-center gap-1">
                      <span>{sticker.emoji}</span>
                      <span>MISSION 0{currentMission.step} · {sticker.title}</span>
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      기능: {sticker.tag}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-slate-900 mt-2 mb-3">
                    {currentMission.title}
                  </h3>

                  {/* ================= MISSION 01 ================= */}
                  {currentMission.step === 1 && (
                    <div className="space-y-4">
                      {/* Smartphone Notification Card (Requirement 6) */}
                      <div className="p-4 rounded-2xl bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm flex items-start gap-3 shadow-xs">
                        <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl flex-shrink-0 border border-blue-100">
                          🔔
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-extrabold text-blue-700 text-xs">선거 알림</span>
                            <span className="text-[10px] font-mono text-slate-400">방금 전</span>
                          </div>
                          <p className="font-bold text-slate-900 mt-1">{currentMission.alertText}</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            공직 선거가 다가오고 있습니다. 각 정당이 선거에 출마할 후보자를 발표했습니다.
                          </p>
                        </div>
                      </div>

                      {/* Question Card (Requirement 7) */}
                      <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200">
                        <h4 className="text-sm sm:text-base font-extrabold text-blue-950 mb-3 text-center">
                          정당은 공직 선거에 무엇을 할까?
                        </h4>

                        {!mission1Answered ? (
                          <button
                            onClick={() => {
                              setMission1Answered(true);
                              triggerUnlock(
                                {
                                  title: '정치적 충원',
                                  icon: '🗳️',
                                  badge: '정당의 8대 기능 #1',
                                  desc: '정당은 유능한 정치인을 발굴하고 선거 후보자로 추천(공천)하여 시민의 대표자인 공직자로 활동하게 만듭니다.',
                                  flow: ['후보자 발굴', '후보자 선정', '공천', '선거', '공직자 충원'],
                                },
                                0
                              );
                            }}
                            className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm sm:text-base transition shadow-md shadow-blue-500/25 flex items-center justify-center gap-2"
                          >
                            <span>🗳️ 후보자를 공천한다</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        ) : (
                          <div className="space-y-3 animate-fadeIn">
                            <div className="p-3.5 bg-white rounded-2xl border border-blue-200 text-sm font-black text-blue-700 flex items-center gap-2">
                              <CheckCircle2 className="w-5 h-5 text-blue-600" />
                              <span>정답: 후보자를 공천한다! (정치적 충원 기능)</span>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white/70 p-3.5 rounded-2xl border border-blue-100">
                              {currentMission.explanation}
                            </p>

                            <div className="pt-2">
                              <p className="text-xs font-bold text-slate-600 mb-2">
                                [정치적 충원 기능 프로세스]
                              </p>
                              <div className="flex flex-wrap items-center gap-2 text-xs">
                                {currentMission.flow?.map((item, idx) => (
                                  <React.Fragment key={item}>
                                    <span className="px-3 py-1.5 rounded-xl bg-white border border-blue-200 text-blue-800 font-extrabold shadow-2xs">
                                      {item}
                                    </span>
                                    {idx < (currentMission.flow?.length || 0) - 1 && (
                                      <span className="text-blue-400 font-bold">→</span>
                                    )}
                                  </React.Fragment>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* ================= MISSION 02 ================= */}
                  {currentMission.step === 2 && (
                    <div className="space-y-4">
                      {/* Live SNS Voice Comments (Requirement 10) */}
                      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-3 border-b border-slate-100 pb-2">
                          <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                            <span>LIVE VOICE (실시간 SNS 댓글 피드)</span>
                          </span>
                          <span className="text-blue-600 font-bold font-mono">5,482건의 요구</span>
                        </div>

                        <div className="space-y-2">
                          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs flex items-start gap-2.5">
                            <span className="text-base">👩‍🎓</span>
                            <div>
                              <span className="font-bold text-slate-800">고등학생 민지:</span>{' '}
                              <span className="text-slate-600 font-medium">“학생들의 교육비 부담을 줄여주세요.”</span>
                            </div>
                          </div>
                          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs flex items-start gap-2.5">
                            <span className="text-base">👶</span>
                            <div>
                              <span className="font-bold text-slate-800">워킹맘 지현:</span>{' '}
                              <span className="text-slate-600 font-medium">“맞벌이 가정을 위한 돌봄 서비스를 획기적으로 확대해주세요.”</span>
                            </div>
                          </div>
                          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs flex items-start gap-2.5">
                            <span className="text-base">🏠</span>
                            <div>
                              <span className="font-bold text-slate-800">청년 준호:</span>{' '}
                              <span className="text-slate-600 font-medium">“청년들의 주거비 부담이 너무 커요. 임대주택을 늘려주세요.”</span>
                            </div>
                          </div>
                          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs flex items-start gap-2.5">
                            <span className="text-base">🌱</span>
                            <div>
                              <span className="font-bold text-slate-800">에코시민 동호:</span>{' '}
                              <span className="text-slate-600 font-medium">“탄소 감축과 환경 정책을 강화해주세요.”</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Question Card */}
                      <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200">
                        <h4 className="text-sm sm:text-base font-extrabold text-blue-950 mb-3 text-center">
                          정당은 이 다양한 요구를 어떻게 처리할까?
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <button
                            onClick={() => setMission2Choice('raw')}
                            className={`p-3.5 rounded-2xl border text-xs font-bold text-left transition ${
                              mission2Choice === 'raw'
                                ? 'bg-rose-50 border-rose-300 text-rose-800'
                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            ❌ 그대로 모두 법안으로 반영한다
                          </button>
                          <button
                            onClick={() => {
                              setMission2Choice('adjust');
                              triggerUnlock(
                                {
                                  title: '이익 집약',
                                  icon: '🧩',
                                  badge: '정당의 8대 기능 #2',
                                  desc: '국민의 다양한 요구를 그대로 쏟아내면 충돌이 발생합니다. 정당은 서로 다른 이해관계를 조정하고 종합(집약)하여 일관된 정책으로 만듭니다.',
                                  flow: ['다양한 요구 분출', '갈등 조정', '종합·집약', '단일 정책화'],
                                },
                                1
                              );
                            }}
                            className={`p-3.5 rounded-2xl border text-xs font-bold text-left transition ${
                              mission2Choice === 'adjust'
                                ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                                : 'bg-white border-slate-200 text-slate-700 hover:bg-blue-50'
                            }`}
                          >
                            ⭕ 갈등을 조정하고 종합(집약)한다
                          </button>
                        </div>

                        {mission2Choice === 'adjust' && (
                          <div className="mt-4 p-4 rounded-2xl bg-white border border-blue-200 text-xs sm:text-sm text-slate-700 space-y-2 animate-fadeIn">
                            <p className="font-extrabold text-blue-800">
                              👉 정답: 갈등을 조정하고 집약한다 (이익 집약 기능)
                            </p>
                            <p className="leading-relaxed">{currentMission.explanation}</p>
                            <div className="flex items-center gap-2 pt-1 font-bold text-xs text-blue-600">
                              <span>다양한 요구</span> → <span>조정·집약</span> → <span>정책과 공약 제시</span>
                            </div>
                          </div>
                        )}
                        {mission2Choice === 'raw' && (
                          <div className="mt-2 text-xs font-bold text-rose-600 bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                            모든 요구를 여과 없이 제출하면 사회적 대혼란이 발생합니다! 정당의 핵심은 ‘이익 집약’입니다.
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* ================= MISSION 03 ================= */}
                  {currentMission.step === 3 && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>선거철 정당의 공약 피드:</span>
                        <span className="font-mono text-blue-600">#정책실현 #정치적책임</span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                        {currentMission.topics?.map((topic) => (
                          <button
                            key={topic.id}
                            onClick={() => {
                              setSelectedPromiseTopic(topic.id);
                              if (!partyMissionCompleted.has(2)) {
                                triggerUnlock(
                                  {
                                    title: '정책·공약 제시 및 정치적 책임',
                                    icon: '📋',
                                    badge: '정당의 8대 기능 #3, #4',
                                    desc: '정당은 선거에서 당선되기 위해 공약을 국민에게 약속하고, 당선 후 그 공약을 실천한 결과에 대해 다음 선거에서 국민의 엄중한 평가와 책임을 집니다.',
                                    flow: ['공약 개발', '선거 제시', '정권 획득 후 집행', '선거로 정치적 책임'],
                                  },
                                  2
                                );
                              }
                            }}
                            className={`p-3 rounded-2xl border text-center transition ${
                              selectedPromiseTopic === topic.id
                                ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-[1.02]'
                                : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <div className="text-2xl mb-1">{topic.icon}</div>
                            <div className="text-xs font-extrabold">{topic.title}</div>
                          </button>
                        ))}
                      </div>

                      {/* Selected Promise Detail */}
                      {(() => {
                        const currentTopic = currentMission.topics?.find((t) => t.id === selectedPromiseTopic);
                        return (
                          <div className="p-4 rounded-2xl bg-white border border-blue-200 shadow-xs">
                            <div className="text-xs font-extrabold text-blue-600 mb-1 flex items-center gap-1">
                              <span>{currentTopic?.icon}</span>
                              <span>{currentTopic?.title} 분야 정당 대표 공약</span>
                            </div>
                            <p className="text-sm sm:text-base font-bold text-slate-800">
                              “{currentTopic?.promise}”
                            </p>
                          </div>
                        );
                      })()}

                      {/* Political Responsibility */}
                      <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-xs sm:text-sm text-slate-700 space-y-2">
                        <h4 className="font-extrabold text-indigo-950">
                          정당은 공약을 왜 지켜야 할까요? (정치적 책임)
                        </h4>
                        <p className="leading-relaxed">{currentMission.explanation}</p>
                        <div className="p-3 bg-white rounded-xl border border-indigo-200 font-extrabold text-indigo-900 text-xs">
                          {currentMission.keyTakeaway}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ================= MISSION 04 ================= */}
                  {currentMission.step === 4 && (
                    <div className="space-y-4">
                      {/* Trending News Card (Requirement 11) */}
                      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                        <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
                          <span className="flex items-center gap-1 font-bold text-blue-600">
                            <TrendingUp className="w-4 h-4" />
                            <span>TRENDING NOW</span>
                          </span>
                          <span>#교육정책 #청년주거 #돌봄정책</span>
                        </div>

                        <h4 className="text-base font-black text-slate-900 mb-3">
                          {currentMission.newsSnippet?.headline}
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {currentMission.newsSnippet?.stances.map((s, idx) => (
                            <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                              <span className="font-black text-blue-700">{s.party}:</span>
                              <p className="mt-1 text-slate-700 font-medium">{s.stance}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Question Card */}
                      <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200">
                        <h4 className="text-sm sm:text-base font-extrabold text-blue-950 mb-2 text-center">
                          이런 활동은 국민의 생각에 어떤 영향을 줄까?
                        </h4>
                        <p className="text-xs text-slate-600 text-center mb-4 leading-relaxed">
                          정당이 쟁점을 제기하고 토론을 벌임으로써 국민들이 문제에 관심을 갖고 여론을 형성하게 됩니다.
                        </p>

                        {!partyMissionCompleted.has(3) ? (
                          <button
                            onClick={() => {
                              triggerUnlock(
                                {
                                  title: '여론 형성 및 조직화',
                                  icon: '📢',
                                  badge: '정당의 8대 기능 #5',
                                  desc: '정당은 사회적 쟁점에 대해 대안을 제시하고 논쟁을 이끌어, 흩어져 있는 국민들의 여론을 하나로 모으고 조직화합니다.',
                                  flow: ['사회적 쟁점 발굴', '정당 입장 발표', '국민 여론 형성', '여론 조직화'],
                                },
                                3
                              );
                            }}
                            className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm transition shadow-md shadow-blue-500/20"
                          >
                            📢 기능 발견: 여론 형성 및 조직화 획득하기
                          </button>
                        ) : (
                          <div className="p-3 bg-white rounded-xl border border-blue-200 text-xs font-bold text-blue-700 text-center">
                            ✅ 여론 형성 및 조직화 기능 배지 획득 완료!
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* ================= MISSION 05 ================= */}
                  {currentMission.step === 5 && (
                    <div className="space-y-4">
                      {/* Short-form cards (Requirement 12) */}
                      <div className="p-4 rounded-2xl bg-white border border-slate-200">
                        <p className="text-xs font-bold text-slate-500 mb-3">
                          스마트폰 숏폼 & 피드로 쉽게 배우는 정치:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-blue-50/50 transition">
                            <span className="text-[10px] font-extrabold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                              ▶ 1분 정책
                            </span>
                            <h5 className="text-xs font-extrabold text-slate-900 mt-2">
                              청년 주거 정책 핵심 정리
                            </h5>
                            <p className="text-[11px] text-slate-500 mt-1">월세 지원 조건 및 신청 방법</p>
                          </div>

                          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-blue-50/50 transition">
                            <span className="text-[10px] font-extrabold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                              ▶ 선거 한눈에
                            </span>
                            <h5 className="text-xs font-extrabold text-slate-900 mt-2">
                              정당별 공약 30초 비교
                            </h5>
                            <p className="text-[11px] text-slate-500 mt-1">교육·일자리 정책 차이점</p>
                          </div>

                          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-blue-50/50 transition">
                            <span className="text-[10px] font-extrabold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                              ▶ 정치용어
                            </span>
                            <h5 className="text-xs font-extrabold text-slate-900 mt-2">
                              여당과 야당의 차이는?
                            </h5>
                            <p className="text-[11px] text-slate-500 mt-1">행정부 담당 여부에 따른 구분</p>
                          </div>
                        </div>
                      </div>

                      {/* Question Card */}
                      <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200">
                        <h4 className="text-sm sm:text-base font-extrabold text-purple-950 mb-2 text-center">
                          시민이 이런 콘텐츠를 통해 정치와 참여 방법을 배우는 것은?
                        </h4>

                        {!partyMissionCompleted.has(4) ? (
                          <button
                            onClick={() => {
                              triggerUnlock(
                                {
                                  title: '정치사회화',
                                  icon: '🧠',
                                  badge: '정당의 8대 기능 #6',
                                  desc: '시민들이 정치 과정에 관심을 갖고, 정치적 지식·태도·참여 방법을 습득하도록 돕는 교육적 기능을 의미합니다.',
                                  flow: ['정보 제공', '정치 지식 습득', '참여 방법 체득', '성숙한 시민 성장'],
                                },
                                4
                              );
                            }}
                            className="w-full py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-sm transition shadow-md shadow-purple-500/20"
                          >
                            🧠 기능 발견: 정치사회화 배지 획득하기
                          </button>
                        ) : (
                          <div className="p-3 bg-white rounded-xl border border-purple-200 text-xs font-bold text-purple-800 text-center">
                            ✅ 정치사회화 기능 배지 획득 완료!
                          </div>
                        )}

                        {/* Crucial Caution Note (Requirement 12) */}
                        <div className="mt-4 p-3.5 rounded-2xl bg-white border-2 border-rose-300 text-xs sm:text-sm text-rose-950 font-bold flex items-start gap-2.5">
                          <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-extrabold">💡 시험 함정 주의: 정치사회화는 정당만의 고유 기능이 아닙니다!</p>
                            <p className="text-xs font-normal text-slate-600 mt-1">
                              시민단체(공익 캠페인·시민강좌)와 이익집단(법령 설명회·정책 포럼)도 각자의 방식으로 정치사회화 기능을 수행합니다!
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ================= MISSION 06 ================= */}
                  {currentMission.step === 6 && (
                    <div className="space-y-4">
                      {/* Messenger Transmission Flow (Requirement 13) */}
                      <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
                        <div className="text-xs font-bold text-slate-500 text-center mb-2">
                          [국민의 목소리가 정책이 되는 양방향 전달 구조]
                        </div>

                        {/* Chat step 1 */}
                        <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                          <span className="text-2xl">👥</span>
                          <div>
                            <div className="text-xs font-bold text-slate-800">시민의 요구</div>
                            <p className="text-xs text-slate-600 font-medium mt-0.5">
                              💬 “학생 통학로 안전 조례와 보행 신호 시간 연장이 시급합니다!”
                            </p>
                          </div>
                        </div>

                        {/* Arrow down */}
                        <div className="flex justify-center text-blue-600 font-bold text-xs">
                          ↓ 의견 접수 및 법안화
                        </div>

                        {/* Chat step 2 */}
                        <div className="flex items-start gap-3 bg-blue-50 p-3.5 rounded-2xl border border-blue-200">
                          <span className="text-2xl">🟦</span>
                          <div>
                            <div className="text-xs font-extrabold text-blue-900">정당의 매개 역할</div>
                            <p className="text-xs text-blue-800 font-medium mt-0.5">
                              📨 “시민들의 의견을 공식 수렴하여 관련 법률 개정안을 발의하고 정부에 건의하겠습니다.”
                            </p>
                          </div>
                        </div>

                        {/* Arrow down */}
                        <div className="flex justify-center text-blue-600 font-bold text-xs">
                          ↓ 국회 의결 및 정부 집행
                        </div>

                        {/* Chat step 3 */}
                        <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                          <span className="text-2xl">🏛️</span>
                          <div>
                            <div className="text-xs font-bold text-slate-800">국회 및 행정부</div>
                            <p className="text-xs text-slate-600 font-medium mt-0.5">
                              📜 “보행자 신호 최적화 법안 통과 및 전국 스쿨존 예산 배정 완료”
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Question Card */}
                      <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200">
                        <h4 className="text-sm sm:text-base font-extrabold text-blue-950 mb-2 text-center">
                          시민과 국가 권력을 연결해 주는 이 역할을 무엇이라고 할까?
                        </h4>

                        {!partyMissionCompleted.has(5) ? (
                          <button
                            onClick={() => {
                              triggerUnlock(
                                {
                                  title: '정부와 의회 매개 기능',
                                  icon: '🌉',
                                  badge: '정당의 8대 기능 #7',
                                  desc: '정당은 국민의 요구를 의회와 정부에 전달하고, 반대로 정부의 정책을 국민에게 설명하는 양방향 가교(소통의 다리) 역할을 합니다.',
                                  flow: ['국민의 소리', '정당의 집약', '정부·국회 전달', '정책 환류'],
                                },
                                5
                              );
                            }}
                            className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm transition shadow-md shadow-blue-500/20"
                          >
                            🌉 기능 발견: 정부와 의회 매개 기능 획득하기
                          </button>
                        ) : (
                          <div className="p-3 bg-white rounded-xl border border-blue-200 text-xs font-bold text-blue-700 text-center">
                            ✅ 정부와 의회 매개 기능 배지 획득 완료!
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* ================= MISSION 07 ================= */}
                  {currentMission.step === 7 && (
                    <div className="space-y-4">
                      {/* Opposition role card */}
                      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                        <h4 className="text-sm font-extrabold text-slate-900 mb-2">
                          선거 결과: 여당과 야당의 탄생
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-xs">
                            <span className="font-extrabold text-blue-900">🟦 A당 (여당)</span>
                            <p className="text-slate-700 mt-1 leading-relaxed">
                              선거 승리로 정권을 획득하여 국정을 책임지고 공약을 실천하는 정당
                            </p>
                          </div>
                          <div className="p-3.5 rounded-2xl bg-slate-100 border border-slate-200 text-xs">
                            <span className="font-extrabold text-slate-800">⬜ B당 (야당)</span>
                            <p className="text-slate-700 mt-1 leading-relaxed">
                              선거에서 패배하여 정권을 잡지 못한 정당 → 과연 야당의 역할은 끝난 것일까?
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Question Card */}
                      <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200">
                        <h4 className="text-sm sm:text-base font-extrabold text-blue-950 mb-3 text-center">
                          선거에서 패배해 야당이 되면 정당의 역할은 끝날까?
                        </h4>

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => setMission7Choice('yes')}
                            className={`py-3 rounded-2xl border text-xs font-bold transition ${
                              mission7Choice === 'yes'
                                ? 'bg-rose-100 text-rose-800 border-rose-300'
                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            O (역할이 끝난다)
                          </button>
                          <button
                            onClick={() => {
                              setMission7Choice('no');
                              triggerUnlock(
                                {
                                  title: '정부 감시 및 견제 기능',
                                  icon: '👀',
                                  badge: '정당의 8대 기능 #8',
                                  desc: '야당은 권력의 독주와 부패를 감시하고 비판하며, 더 나은 정책 대안을 제시하여 다음 선거에서 국민의 지지를 받기 위해 노력합니다.',
                                  flow: ['선거 패배', '야당 위치', '정부 권력 감시·견제', '정책 대안 제시'],
                                },
                                6
                              );
                            }}
                            className={`py-3 rounded-2xl border text-xs font-bold transition ${
                              mission7Choice === 'no'
                                ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                                : 'bg-white border-blue-300 text-blue-700 hover:bg-blue-50'
                            }`}
                          >
                            X (정부 감시와 대안 제시를 한다)
                          </button>
                        </div>

                        {mission7Choice === 'no' && (
                          <div className="mt-4 p-4 rounded-2xl bg-white border border-blue-200 text-xs sm:text-sm text-slate-700 space-y-2 animate-fadeIn">
                            <p className="font-extrabold text-blue-900">
                              👉 정답: X (정부 감시 및 비판 기능)
                            </p>
                            <p className="leading-relaxed">{currentMission.explanation}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs">
                              <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-200">
                                <strong>여당:</strong> 정부와 협력 · 정책 집행 · 국정 책임
                              </div>
                              <div className="p-2.5 bg-slate-100 rounded-xl border border-slate-200">
                                <strong>야당:</strong> 정부 감시 · 비판 · 권력 견제 · 대안 제시
                              </div>
                            </div>
                          </div>
                        )}
                        {mission7Choice === 'yes' && (
                          <div className="mt-2 text-xs font-bold text-rose-600 bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                            야당도 국민의 표를 받은 막중한 헌법기관입니다! 권력 감시와 견제는 민주주의의 핵심입니다.
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Stepper Navigation Buttons */}
                  <div className="mt-5 pt-3 border-t border-slate-200 flex items-center justify-between">
                    <button
                      onClick={() => setPartyMissionIndex(Math.max(0, partyMissionIndex - 1))}
                      disabled={partyMissionIndex === 0}
                      className="px-4 py-2 rounded-full border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-30"
                    >
                      이전 미션
                    </button>

                    {partyMissionIndex < 6 ? (
                      <button
                        onClick={() => setPartyMissionIndex(partyMissionIndex + 1)}
                        className="px-5 py-2 rounded-full bg-blue-600 text-white text-xs font-extrabold hover:bg-blue-700 transition flex items-center gap-1 shadow-xs"
                      >
                        <span>다음 미션</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <span className="text-xs font-extrabold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-4 h-4" /> 7개 미션 모두 완료!
                      </span>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Master Board: PARTY FUNCTION COLLECTION (Requirement 8) */}
          <div className="rounded-3xl border-2 border-blue-500 bg-white p-6 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-extrabold tracking-wide flex items-center gap-1 shadow-xs">
                  <Award className="w-3.5 h-3.5" />
                  <span>PARTY FUNCTION COLLECTION</span>
                </span>
              </div>
              <span className="text-xs font-mono font-black text-blue-600">
                {partyMissionCompleted.size} / 8 UNLOCKED
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              미션을 클리어할 때마다 모아지는 정당의 8대 핵심 기능 포토카드 스티커 컬렉션입니다:
            </p>

            {/* 8 Photocard/Badge items */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {PARTY_MASTER_BOARD.map((item, idx) => {
                const isUnlocked = partyMissionCompleted.has(idx) || partyMissionCompleted.size >= 6;
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-3xl border-2 transition-all relative overflow-hidden flex flex-col justify-between ${
                      isUnlocked
                        ? 'bg-gradient-to-br from-blue-50 to-indigo-50/50 border-blue-300 shadow-sm'
                        : 'bg-slate-50/60 border-slate-200 opacity-60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{item.icon}</span>
                        {isUnlocked ? (
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-blue-600 text-white shadow-2xs">
                            획득 완료
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-500">
                            잠김
                          </span>
                        )}
                      </div>
                      <h4 className="text-xs sm:text-sm font-black text-slate-900 mt-1">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Short Memo Card with Hashtags (Requirement 9) */}
            <div className="mt-5 p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-slate-700 flex items-start gap-2.5">
              <span className="text-lg">💡</span>
              <div>
                <span className="font-extrabold text-blue-900">핵심 포인트: </span>
                <span>
                  정당의 궁극적 목표는 <strong>정권 획득</strong>을 통해 자신들의 정책을 국정에 반영하는 것이며, 그 결과에 대해 국민에게 <strong>정치적 책임</strong>을 집니다.
                </span>
                <div className="mt-2 flex gap-1 font-mono text-[11px] font-bold text-blue-700">
                  <span>#정권획득</span> <span>#정책실현</span> <span>#정치적책임</span> <span>#후보공천</span>
                </div>
              </div>
            </div>

            {/* Next Group Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  handleCompleteOrg('party');
                  setActiveOrg('civic');
                }}
                className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-blue-500/25 transition"
              >
                <span>정당 탐구 완료! → 🟩 CIVIC: 시민단체 피드로 이동</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 🟩 SECTION 2: 시민단체 (CIVIC GROUP / NGO)                    */}
      {/* ============================================================ */}
      {activeOrg === 'civic' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Civic Header Profile Card */}
          <div className="rounded-3xl border border-emerald-200 bg-white p-6 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-600 text-white tracking-wider flex items-center gap-1.5 shadow-xs">
                <span>🟩</span>
                <span>CIVIC GROUP PROFILE</span>
              </span>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                공익 조직
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              시민단체 <span className="text-sm sm:text-base font-medium text-slate-500 font-sans">(Civic Group / NGO)</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-700 mt-2 leading-relaxed font-medium">
              “시민들이 <strong>자발적</strong>으로 조직하여 사회 전체의 <strong>공익</strong>을 실현하려는 <strong>비영리</strong> 단체”
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs font-mono font-semibold text-emerald-700">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-100">#공익실현</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-100">#자발성</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-100">#비영리</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-100">#권력감시</span>
            </div>

            {/* 3 Core Keywords (Requirement 14) */}
            <div className="mt-5 grid grid-cols-3 gap-2.5 text-center">
              <div className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-200/80">
                <div className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider">KEYWORD 1</div>
                <div className="text-sm sm:text-base font-black text-emerald-700 mt-0.5">자발성</div>
                <div className="text-[11px] text-slate-500 mt-0.5">시민 스스로 참여</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-200/80">
                <div className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider">KEYWORD 2</div>
                <div className="text-sm sm:text-base font-black text-emerald-700 mt-0.5">비영리성</div>
                <div className="text-[11px] text-slate-500 mt-0.5">이윤 추구 배제</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-200/80">
                <div className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider">KEYWORD 3</div>
                <div className="text-sm sm:text-base font-black text-emerald-700 mt-0.5">공익성</div>
                <div className="text-[11px] text-slate-500 mt-0.5">사회 전체의 이익</div>
              </div>
            </div>
          </div>

          {/* CIVIC FEED (SNS Campaign Feed with Interactive Actions) (Requirement 14) */}
          <div className="rounded-3xl bg-white border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-2">
              <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                <span>📱</span>
                <span>CIVIC CAMPAIGN FEED (실시간 공익 캠페인)</span>
              </span>
              <span className="text-emerald-600 font-mono font-bold">#함께하는변화</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {/* Campaign Card 1 */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    🌱 환경보호
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">10분 전</span>
                </div>
                <h4 className="text-sm font-extrabold text-slate-900">우리 동네 탄천 살리기 줍깅 캠페인</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  미세플라스틱과 쓰레기로 몸살을 앓는 하천을 지키기 위해 시민 100명이 함께 정화 활동을 시작했습니다.
                </p>
                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <button
                    onClick={() => toggleCivicLike('env')}
                    className={`flex items-center gap-1 font-bold ${
                      hasLiked.env ? 'text-rose-600' : 'text-slate-500 hover:text-rose-500'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${hasLiked.env ? 'fill-current' : ''}`} />
                    <span>응원 {civicLikes.env}</span>
                  </button>
                  <button className="flex items-center gap-1 text-slate-500 hover:text-emerald-600 font-bold">
                    <Share2 className="w-3.5 h-3.5" />
                    <span>공유하기</span>
                  </button>
                  <button className="px-3 py-1 rounded-full bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-700">
                    참여하기
                  </button>
                </div>
              </div>

              {/* Campaign Card 2 */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    ♿ 이동권 보장
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">1시간 전</span>
                </div>
                <h4 className="text-sm font-extrabold text-slate-900">지하철역 리프트 없는 출구 실태조사</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  휠체어 이용자와 유모차를 위한 승강기 설치를 촉구하는 1만 시민 온라인 청원을 진행 중입니다.
                </p>
                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <button
                    onClick={() => toggleCivicLike('barrier')}
                    className={`flex items-center gap-1 font-bold ${
                      hasLiked.barrier ? 'text-rose-600' : 'text-slate-500 hover:text-rose-500'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${hasLiked.barrier ? 'fill-current' : ''}`} />
                    <span>응원 {civicLikes.barrier}</span>
                  </button>
                  <button className="flex items-center gap-1 text-slate-500 hover:text-emerald-600 font-bold">
                    <Share2 className="w-3.5 h-3.5" />
                    <span>공유하기</span>
                  </button>
                  <button className="px-3 py-1 rounded-full bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-700">
                    참여하기
                  </button>
                </div>
              </div>

              {/* Campaign Card 3 */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    🛒 소비자 권익
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">3시간 전</span>
                </div>
                <h4 className="text-sm font-extrabold text-slate-900">편의점·배달음식 과대광고 실태 보고</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  용량 눈속임(슈링크플레이션) 현장 조사를 실시하고 정부 공정거래위원회에 규제 지침 마련을 요청했습니다.
                </p>
                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <button
                    onClick={() => toggleCivicLike('consumer')}
                    className={`flex items-center gap-1 font-bold ${
                      hasLiked.consumer ? 'text-rose-600' : 'text-slate-500 hover:text-rose-500'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${hasLiked.consumer ? 'fill-current' : ''}`} />
                    <span>응원 {civicLikes.consumer}</span>
                  </button>
                  <button className="flex items-center gap-1 text-slate-500 hover:text-emerald-600 font-bold">
                    <Share2 className="w-3.5 h-3.5" />
                    <span>공유하기</span>
                  </button>
                  <button className="px-3 py-1 rounded-full bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-700">
                    참여하기
                  </button>
                </div>
              </div>

              {/* Campaign Card 4 */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    👶 아동 권리
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">5시간 전</span>
                </div>
                <h4 className="text-sm font-extrabold text-slate-900">방과 후 안전한 돌봄 공간 확충 요구</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  지역 아동센터 및 청소년 쉼터 운영 예산 확충을 촉구하는 시민 의견서를 교육청에 전달했습니다.
                </p>
                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <button
                    onClick={() => toggleCivicLike('child')}
                    className={`flex items-center gap-1 font-bold ${
                      hasLiked.child ? 'text-rose-600' : 'text-slate-500 hover:text-rose-500'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${hasLiked.child ? 'fill-current' : ''}`} />
                    <span>응원 {civicLikes.child}</span>
                  </button>
                  <button className="flex items-center gap-1 text-slate-500 hover:text-emerald-600 font-bold">
                    <Share2 className="w-3.5 h-3.5" />
                    <span>공유하기</span>
                  </button>
                  <button className="px-3 py-1 rounded-full bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-700">
                    참여하기
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* CIVIC MISSION: 하천 오염 문제 활동 선택 */}
          <div className="rounded-3xl bg-emerald-50/60 border border-emerald-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-xs font-extrabold">
                CIVIC MISSION
              </span>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                “우리 지역 하천 오염 문제가 심각해졌습니다.”
              </h3>
            </div>
            <p className="text-xs text-slate-600 mb-4">
              시민단체가 할 수 있는 올바른 공익 활동을 모두 선택하세요:
            </p>

            <div className="space-y-2">
              {[
                { id: 'survey', text: '오염 실태 조사 및 수질 측정 결과 공개' },
                { id: 'campaign', text: '시민 대상 하천 살리기 환경 캠페인 진행' },
                { id: 'policyReq', text: '지자체와 환경청에 하천 정화 정책 개선 공식 요구' },
                { id: 'monitor', text: '폐수 무단 방류 관련 기업 활동 감시 및 고발' },
                { id: 'infoShare', text: '시민들에게 하천 오염 실태와 대처법 정보 제공' },
                {
                  id: 'nominateCandidate',
                  text: '선거에 직접 후보자를 공천하여 정권 획득을 추구한다',
                  isTrap: true,
                },
              ].map((item) => {
                const checked = !!civicMissionChecks[item.id];
                return (
                  <label
                    key={item.id}
                    onClick={() => {
                      if (civicSubmitted) return;
                      setCivicMissionChecks((prev) => ({ ...prev, [item.id]: !prev[item.id] }));
                    }}
                    className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition ${
                      checked
                        ? item.isTrap
                          ? 'bg-rose-50 border-rose-300 text-rose-900'
                          : 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-2xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {}}
                      className="w-4 h-4 rounded text-emerald-600"
                    />
                    <span className="text-xs sm:text-sm">
                      {item.text}
                      {item.isTrap && <span className="text-rose-500 font-bold ml-1.5">(주의!)</span>}
                    </span>
                  </label>
                );
              })}
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                onClick={handleCivicCheckSubmit}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-500/20 transition"
              >
                선택 결과 확인하기
              </button>

              {civicSubmitted && (
                <div
                  className={`text-xs font-bold px-3.5 py-2 rounded-xl ${
                    !civicMissionChecks.nominateCandidate &&
                    civicMissionChecks.survey &&
                    civicMissionChecks.campaign &&
                    civicMissionChecks.policyReq &&
                    civicMissionChecks.monitor &&
                    civicMissionChecks.infoShare
                      ? 'bg-emerald-100 text-emerald-900'
                      : 'bg-amber-100 text-amber-900'
                  }`}
                >
                  {!civicMissionChecks.nominateCandidate ? (
                    '🎉 정확합니다! 시민단체는 후보자를 공천하거나 정권을 획득하지 않고 공익만을 추구합니다.'
                  ) : (
                    '⚠️ 주의! 후보자 공천과 정권 획득은 오직 "정당"만의 고유한 목적입니다. 시민단체는 공천하지 않습니다.'
                  )}
                </div>
              )}
            </div>

            {/* Next Group Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  handleCompleteOrg('civic');
                  setActiveOrg('interest');
                }}
                className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-emerald-500/25 transition"
              >
                <span>시민단체 탐구 완료! → 🟧 INTEREST: 이익집단 탐구하기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 🟧 SECTION 3: 이익집단 (INTEREST GROUP)                        */}
      {/* ============================================================ */}
      {activeOrg === 'interest' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Interest Header Profile Card */}
          <div className="rounded-3xl border border-amber-200 bg-white p-6 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-600 text-white tracking-wider flex items-center gap-1.5 shadow-xs">
                <span>🟧</span>
                <span>INTEREST GROUP PROFILE</span>
              </span>
              <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                특수 이익 조직
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              이익집단 <span className="text-sm sm:text-base font-medium text-slate-500 font-sans">(Interest Group)</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-700 mt-2 leading-relaxed font-medium">
              “공통된 이해관계를 가진 사람들이 <strong>구성원의 특수한 이익</strong>을 실현하기 위해 정책 결정 과정에 영향을 미치는 집단”
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs font-mono font-semibold text-amber-800">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-100">#특수이익</span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-100">#공통이해관계</span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-100">#전문자료제공</span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-100">#정책영향</span>
            </div>

            {/* Crucial Misconception Buster Callout (Requirement 15) */}
            <div className="mt-5 p-4 rounded-2xl bg-amber-50/80 border-2 border-amber-300 text-amber-950 flex items-start gap-3 shadow-2xs">
              <div className="p-2 rounded-xl bg-amber-500 text-white mt-0.5 flex-shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-extrabold text-amber-950">
                  ⚠️ 오개념 바로잡기: ‘특수 이익’은 결코 ‘나쁜 이익’이라는 뜻이 아닙니다!
                </p>
                <p className="text-xs text-amber-900/80 mt-1 leading-relaxed">
                  다원화된 민주사회에서 노동자, 의사, 소상공인, 버스기사 등 다양한 직업군이 자신들의 정당한 권익을 보호하고 현장의 전문적인 목소리를 법과 정책에 전달할 권리는 헌법상 보장된 지극히 자연스러운 자유입니다.
                </p>
              </div>
            </div>
          </div>

          {/* INTEREST FEED (Association App style) (Requirement 15) */}
          <div className="rounded-3xl bg-white border border-slate-200 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-2">
              <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                <span>📱</span>
                <span>INTEREST NETWORK (협회 및 단체 활동 타임라인)</span>
              </span>
              <span className="text-amber-700 font-mono font-bold">#전문분야권익대변</span>
            </div>

            <div className="space-y-2.5">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <span className="text-2xl">💼</span>
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">업계 정책 브리핑 및 개선 요구</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    “소상공인 카드 수수료율 인하 및 야간 안전운행 지원금 지급을 지자체와 정부에 건의했습니다.”
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <span className="text-2xl">📊</span>
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">정책 결정자에게 전문 통계·자료 제공</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    “국회 입법조사처 및 관련 부처에 업계 현장 실태 분석 보고서를 공식 제출하여 합리적 기준 마련을 요청했습니다.”
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <span className="text-2xl">🏛️</span>
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">국회 공청회 참석 및 의견서 제출</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    “관련 법안 심의 시 협회 대표단을 파견하여 상임위원회 공청회에서 현업 종사자의 입장을 피력했습니다.”
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <span className="text-2xl">📢</span>
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">공동 성명 발표 및 이익 표출</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    “회원들의 권익 침해 방지를 촉구하는 긴급 기자회견을 열고 공동 성명서를 발표했습니다.”
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Takeaways Card */}
          <div className="p-6 rounded-3xl bg-amber-50/70 border border-amber-200 space-y-4">
            <h4 className="font-extrabold text-amber-950 text-sm flex items-center gap-1.5">
              <span>📌</span>
              <span>이익집단의 주요 기능 및 한계 요약</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              <div className="p-3 bg-white rounded-2xl border border-amber-200">
                <strong>이익 표출 및 조직화:</strong> 구성원의 요구를 체계적으로 조직화하여 전달
              </div>
              <div className="p-3 bg-white rounded-2xl border border-amber-200">
                <strong>정책 결정 영향:</strong> 전문 자료 제공 및 청원으로 정책 반영 유도
              </div>
              <div className="p-3 bg-white rounded-2xl border border-amber-200">
                <strong>여론 형성:</strong> 관련 현안에 대한 입장을 공표하여 여론에 영향
              </div>
              <div className="p-3 bg-white rounded-2xl border border-amber-200">
                <strong>정치사회화:</strong> 구성원에게 정책 정보 제공 및 정치 참여 경험 부여
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-amber-300 text-xs sm:text-sm">
              <p className="font-extrabold text-amber-900">
                💡 결정적 구분: 이익집단도 정책에 엄청난 영향력을 행사합니다!
              </p>
              <p className="text-slate-600 mt-1">
                그러나 <span className="text-rose-600 font-extrabold">공직 선거에 후보자를 공천하여 정권을 획득하는 것이 결코 아닙니다.</span>
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  handleCompleteOrg('interest');
                  onNext();
                }}
                className="px-7 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-slate-900/20 transition"
              >
                <span>세 조직 모두 마스터 완료! → PART 05: 세 집단 비교 & 판별관</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
