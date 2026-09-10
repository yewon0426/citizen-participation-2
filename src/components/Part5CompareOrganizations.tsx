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
  ChevronDown,
  ChevronUp,
  Award,
  Bell,
  Check,
  Search,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Part5Props {
  onComplete: () => void;
  onNext: () => void;
}

export const Part5CompareOrganizations: React.FC<Part5Props> = ({
  onComplete,
  onNext,
}) => {
  // Step 1: Issue Matching
  const [issueMatches, setIssueMatches] = useState<Record<string, OrgType | null>>({
    party: null,
    civic: null,
    interest: null,
  });

  // Step 2: Common Ground Checks
  const [commonChecks, setCommonChecks] = useState<Record<string, boolean>>({});
  const [commonSubmitted, setCommonSubmitted] = useState(false);

  // Step 4: Table View Mode
  const [showCompleteTable, setShowCompleteTable] = useState(false);

  // Step 5: Exam Trap Answers
  const [trapAnswers, setTrapAnswers] = useState<Record<string, string>>({});
  const [trapSubmitted, setTrapSubmitted] = useState<Record<string, boolean>>({});

  // Step 6: Final Mystery Cases
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

  // Helper for issue match
  const handleAssignIssue = (slot: string, org: OrgType) => {
    setIssueMatches((prev) => ({ ...prev, [slot]: org }));
  };

  const isIssueMatchedCorrectly =
    issueMatches.party === 'party' &&
    issueMatches.civic === 'civic' &&
    issueMatches.interest === 'interest';

  // Common Ground Submit
  const handleCommonSubmit = () => {
    setCommonSubmitted(true);
    confetti({ particleCount: 40, spread: 60 });
  };

  // Trap Answer
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
      [currentCase.id]: {
        ...caseState,
        selectedClues: updated,
      },
    }));
  };

  const selectOrgForCase = (org: OrgType) => {
    if (caseState.isSubmitted) return;
    setCaseAnswers((prev) => ({
      ...prev,
      [currentCase.id]: {
        ...caseState,
        selectedOrg: org,
      },
    }));
  };

  const submitCaseAnswer = () => {
    if (!caseState.selectedOrg || caseState.selectedClues.length === 0) return;
    setCaseAnswers((prev) => ({
      ...prev,
      [currentCase.id]: {
        ...caseState,
        isSubmitted: true,
      },
    }));

    if (caseState.selectedOrg === currentCase.correctType) {
      confetti({ particleCount: 40, spread: 50 });
    }

    // If last case completed
    if (currentCaseIdx === MYSTERY_CASES.length - 1) {
      onComplete();
    }
  };

  return (
    <div className="space-y-7 pb-8">
      {/* ============================================================ */}
      {/* 1. TODAY'S ISSUE (실시간 이슈 시뮬레이션)                     */}
      {/* ============================================================ */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-2">
          <span className="px-3 py-1 rounded-full bg-slate-100 font-extrabold text-slate-700 flex items-center gap-1.5">
            <Bell className="w-3.5 h-3.5 text-blue-600" />
            <span>03:40 PM · 긴급 정책 뉴스 알림</span>
          </span>
          <span className="text-blue-600 font-black tracking-wider">TODAY'S ISSUE</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
          “일회용 플라스틱 사용을 대폭 줄이는 법안이 논의되고 있습니다.”
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          스마트폰에 세 조직으로부터 거의 동시에 알림이 팝업되었습니다!
        </p>

        {/* 3 Mobile Notification Cards */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Party alert */}
          <div className="p-4 rounded-3xl bg-blue-50/70 border border-blue-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold text-blue-800 bg-blue-100/80 px-2.5 py-0.5 rounded-full">
                  🟦 정당 (A당 대변인실)
                </span>
                <span className="text-[10px] text-slate-400 font-mono">방금 전</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                “환경 보호와 친환경 산업 육성을 아우르는 플라스틱 감축 정책을 우리 당의 대표 공약으로 총선에서 국민의 선택을 받겠습니다.”
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-blue-200/80 text-[11px] font-black text-blue-900">
              목적: 선거 지지 → 정권 획득 및 정책 실현
            </div>
          </div>

          {/* Civic alert */}
          <div className="p-4 rounded-3xl bg-emerald-50/70 border border-emerald-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                  🟩 환경 시민단체
                </span>
                <span className="text-[10px] text-slate-400 font-mono">1분 전</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                “플라스틱 오염으로부터 바다 생태계를 지키기 위해 시민 10만 서명 캠페인을 전개하고 정부에 강력한 규제 법안 통과를 촉구합니다.”
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-emerald-200/80 text-[11px] font-black text-emerald-900">
              목적: 사회 전체의 공익(환경보호) 실현
            </div>
          </div>

          {/* Interest alert */}
          <div className="p-4 rounded-3xl bg-amber-50/70 border border-amber-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-full">
                  🟧 제조업·소상공인 협회
                </span>
                <span className="text-[10px] text-slate-400 font-mono">2분 전</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                “대책 없는 규제는 제조업과 자영업자의 생존권을 위협합니다! 규제 시행 시기 유예와 지원금 지급을 강력히 요구합니다.”
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-amber-200/80 text-[11px] font-black text-amber-900">
              목적: 구성원의 특수한 권익 실현
            </div>
          </div>
        </div>

        {/* Interactive Match Drill */}
        <div className="mt-5 p-5 rounded-3xl bg-slate-50 border border-slate-200">
          <h3 className="text-sm sm:text-base font-black text-slate-900 mb-1">
            셋 다 같은 법안에 영향을 미치는데, 왜 서로 다른 조직일까요?
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            각 조직의 핵심 목적에 알맞은 집단을 클릭하여 매칭하세요:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Slot 1: Power & Policy */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between shadow-2xs">
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">목적 A</div>
                <div className="text-xs font-black text-slate-900">
                  정권 획득 + 정책 실현
                </div>
              </div>
              <div className="mt-3 flex gap-1">
                {(['party', 'civic', 'interest'] as OrgType[]).map((org) => (
                  <button
                    key={org}
                    onClick={() => handleAssignIssue('party', org)}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-extrabold border transition ${
                      issueMatches.party === org
                        ? org === 'party'
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-rose-100 text-rose-800 border-rose-300'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-transparent'
                    }`}
                  >
                    {org === 'party' ? '정당' : org === 'civic' ? '시민' : '이익'}
                  </button>
                ))}
              </div>
            </div>

            {/* Slot 2: Public Interest */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between shadow-2xs">
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">목적 B</div>
                <div className="text-xs font-black text-slate-900">
                  사회 전체의 공익 실현
                </div>
              </div>
              <div className="mt-3 flex gap-1">
                {(['party', 'civic', 'interest'] as OrgType[]).map((org) => (
                  <button
                    key={org}
                    onClick={() => handleAssignIssue('civic', org)}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-extrabold border transition ${
                      issueMatches.civic === org
                        ? org === 'civic'
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-rose-100 text-rose-800 border-rose-300'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-transparent'
                    }`}
                  >
                    {org === 'party' ? '정당' : org === 'civic' ? '시민' : '이익'}
                  </button>
                ))}
              </div>
            </div>

            {/* Slot 3: Special Interest */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between shadow-2xs">
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">목적 C</div>
                <div className="text-xs font-black text-slate-900">
                  구성원의 특수한 이익 실현
                </div>
              </div>
              <div className="mt-3 flex gap-1">
                {(['party', 'civic', 'interest'] as OrgType[]).map((org) => (
                  <button
                    key={org}
                    onClick={() => handleAssignIssue('interest', org)}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-extrabold border transition ${
                      issueMatches.interest === org
                        ? org === 'interest'
                          ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                          : 'bg-rose-100 text-rose-800 border-rose-300'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-transparent'
                    }`}
                  >
                    {org === 'party' ? '정당' : org === 'civic' ? '시민' : '이익'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {isIssueMatchedCorrectly && (
            <div className="mt-4 p-3.5 rounded-2xl bg-emerald-100 text-xs font-extrabold text-emerald-950 flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
              <span>정확합니다! 세 조직은 같은 정책 현안이라도 설립 근거와 궁극적 목적이 완전히 다릅니다.</span>
            </div>
          )}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. 세 집단의 공통점 찾기 (COMMON ZONE)                      */}
      {/* ============================================================ */}
      <div className="rounded-3xl border-2 border-indigo-500 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-black tracking-wider flex items-center gap-1 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>COMMON ZONE ⭐</span>
          </span>
          <h3 className="text-base sm:text-lg font-black text-slate-900">
            정당 · 시민단체 · 이익집단의 공통점 스티커 찾기
          </h3>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          세 집단 모두에 공통적으로 나타날 수 있는 특징을 모두 탭하여 선택하세요:
        </p>

        <div className="space-y-2">
          {COMMON_GROUND_OPTIONS.map((opt) => {
            const isChecked = !!commonChecks[opt.id];
            return (
              <label
                key={opt.id}
                onClick={() => {
                  if (commonSubmitted) return;
                  setCommonChecks((prev) => ({ ...prev, [opt.id]: !prev[opt.id] }));
                }}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition ${
                  isChecked
                    ? 'border-indigo-500 bg-indigo-50/70 text-indigo-950 font-bold shadow-2xs'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {}}
                  className="w-4 h-4 rounded text-indigo-600"
                />
                <span className="text-xs sm:text-sm">{opt.text}</span>
              </label>
            );
          })}
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            onClick={handleCommonSubmit}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-indigo-500/20 transition"
          >
            공통점 채점 및 배지 확인하기
          </button>

          {commonSubmitted && (
            <div className="text-xs font-extrabold text-indigo-900 bg-indigo-100 px-3.5 py-2 rounded-xl">
              앞의 6개 항목이 공통점이며, 뒤의 3개(후보자 공천, 정권 획득, 공익만 추구)는 공통점이 아닙니다!
            </div>
          )}
        </div>

        {/* Revealed Common Points Badges */}
        {commonSubmitted && (
          <div className="mt-5 p-5 rounded-3xl bg-indigo-50/60 border border-indigo-200 animate-fadeIn">
            <h4 className="text-xs font-black text-indigo-900 mb-3 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-indigo-600" />
              <span>[세 집단의 6대 공통점 배지 컬렉션]</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="p-3 bg-white rounded-2xl border border-indigo-100 font-extrabold text-slate-800 shadow-2xs">
                👥 집단적 정치 참여의 통로
              </div>
              <div className="p-3 bg-white rounded-2xl border border-indigo-100 font-extrabold text-slate-800 shadow-2xs">
                📣 요구와 이익의 표출
              </div>
              <div className="p-3 bg-white rounded-2xl border border-indigo-100 font-extrabold text-slate-800 shadow-2xs">
                💬 여론 형성에 영향
              </div>
              <div className="p-3 bg-white rounded-2xl border border-indigo-100 font-extrabold text-slate-800 shadow-2xs">
                🧠 구성원·시민의 정치사회화
              </div>
              <div className="p-3 bg-white rounded-2xl border border-indigo-100 font-extrabold text-slate-800 shadow-2xs">
                🏛 정책 결정 과정에 영향
              </div>
              <div className="p-3 bg-white rounded-2xl border border-indigo-100 font-extrabold text-slate-800 shadow-2xs">
                🌉 시민과 정치 과정의 연결
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* 3. 정치사회화 ZOOM IN                                         */}
      {/* ============================================================ */}
      <div className="rounded-3xl border border-purple-300 bg-purple-50/50 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full bg-purple-600 text-white text-xs font-black">
            ZOOM IN
          </span>
          <h3 className="text-base sm:text-lg font-black text-slate-900">
            정치사회화, 세 조직에서 어떻게 나타날까?
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
          <div className="p-4 rounded-2xl bg-white border border-purple-200">
            <span className="text-xs font-black text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
              🟦 정당
            </span>
            <p className="text-xs text-slate-700 mt-2 leading-relaxed">
              정책·공약 설명회, 선거 유세, 당원 아카데미 등을 통해 시민이 정치적 쟁점과 참여 방법을 학습하도록 지원
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-purple-200">
            <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              🟩 시민단체
            </span>
            <p className="text-xs text-slate-700 mt-2 leading-relaxed">
              공익 캠페인, 시민 교육, 청원 및 서명 운동 참여를 통해 사회문제에 대한 비판적 의식과 참여 경험을 체득
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-purple-200">
            <span className="text-xs font-black text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
              🟧 이익집단
            </span>
            <p className="text-xs text-slate-700 mt-2 leading-relaxed">
              회원 대상 법령 설명회, 업계 정책 포럼 및 총회를 통해 회원들이 법과 정책에 관심을 갖고 참여 역량을 기르도록 함
            </p>
          </div>
        </div>

        {/* Highlight Alert Banner */}
        <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-purple-800 to-indigo-900 text-white text-center shadow-md">
          <h4 className="text-sm sm:text-base font-black">
            “정치사회화는 정당만의 고유한 기능이 아닙니다!”
          </h4>
          <p className="text-xs text-purple-200 mt-1 max-w-xl mx-auto">
            정당의 중요한 역할 중 하나이지만, <strong>시민단체와 이익집단도 각자의 방식으로 정치사회화 기능을 수행</strong>할 수 있음을 꼭 기억하세요!
          </p>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 4. 공통점과 차이점 최종 비교 (TABLE)                         */}
      {/* ============================================================ */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              세 조직 공통점과 차이점 완벽 비교표
            </h3>
            <p className="text-xs text-slate-500">
              수능·내신에 단골 출제되는 핵심 비교 기준 정리
            </p>
          </div>

          <button
            onClick={() => setShowCompleteTable(!showCompleteTable)}
            className="px-3.5 py-1.5 rounded-full border text-xs font-extrabold text-blue-600 bg-blue-50 hover:bg-blue-100 flex items-center gap-1 transition"
          >
            <span>{showCompleteTable ? '표 접기' : '완성된 비교표 전체 보기'}</span>
            {showCompleteTable ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-slate-700">
                <th className="p-3.5 font-black">비교 기준</th>
                <th className="p-3.5 font-black text-blue-800">🟦 정당</th>
                <th className="p-3.5 font-black text-emerald-800">🟩 시민단체</th>
                <th className="p-3.5 font-black text-amber-800">🟧 이익집단</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold bg-slate-50/50">집단적 시민 참여</td>
                <td className="p-3.5 font-extrabold text-blue-600">O</td>
                <td className="p-3.5 font-extrabold text-emerald-600">O</td>
                <td className="p-3.5 font-extrabold text-amber-600">O</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold bg-slate-50/50">정치사회화 기능</td>
                <td className="p-3.5 font-extrabold text-blue-600">O</td>
                <td className="p-3.5 font-extrabold text-emerald-600">O</td>
                <td className="p-3.5 font-extrabold text-amber-600">O</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold bg-slate-50/50">여론 형성 영향</td>
                <td className="p-3.5 font-extrabold text-blue-600">O</td>
                <td className="p-3.5 font-extrabold text-emerald-600">O</td>
                <td className="p-3.5 font-extrabold text-amber-600">O</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold bg-slate-50/50">정책 결정에 영향</td>
                <td className="p-3.5 font-extrabold text-blue-600">O</td>
                <td className="p-3.5 font-extrabold text-emerald-600">O</td>
                <td className="p-3.5 font-extrabold text-amber-600">O</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold bg-slate-50/50">요구·이익의 정치과정 전달</td>
                <td className="p-3.5 font-extrabold text-blue-600">O</td>
                <td className="p-3.5 font-extrabold text-emerald-600">O</td>
                <td className="p-3.5 font-extrabold text-amber-600">O</td>
              </tr>
              <tr className="bg-blue-50/40 hover:bg-blue-50/60">
                <td className="p-3.5 font-black text-slate-900">핵심 목적 (결정적 차이)</td>
                <td className="p-3.5 font-black text-blue-700">정권 획득 + 정책 실현</td>
                <td className="p-3.5 font-black text-emerald-700">공익 실현</td>
                <td className="p-3.5 font-black text-amber-700">구성원의 특수 이익 실현</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold bg-slate-50/50">공직 선거 후보자 공천</td>
                <td className="p-3.5 font-black text-blue-600">O (유일)</td>
                <td className="p-3.5 font-bold text-slate-400">X</td>
                <td className="p-3.5 font-bold text-slate-400">X</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold bg-slate-50/50">정권 획득 추구</td>
                <td className="p-3.5 font-black text-blue-600">O (유일)</td>
                <td className="p-3.5 font-bold text-slate-400">X</td>
                <td className="p-3.5 font-bold text-slate-400">X</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold bg-slate-50/50">공익성 추구</td>
                <td className="p-3.5">지지 확보 위해 공익 공약 제시</td>
                <td className="p-3.5 font-black text-emerald-700">핵심 목적</td>
                <td className="p-3.5 text-slate-500">구성원의 특수 이익이 중심</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold bg-slate-50/50">정부 감시 및 견제</td>
                <td className="p-3.5">O (특히 야당 중심)</td>
                <td className="p-3.5 font-black text-emerald-700">O (주요 활동)</td>
                <td className="p-3.5">가능 (관련 정책 분야)</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold bg-slate-50/50">비영리·자발적 시민 조직</td>
                <td className="p-3.5 text-slate-500">고유 특징 아님</td>
                <td className="p-3.5 font-black text-emerald-700">핵심 특징</td>
                <td className="p-3.5 text-slate-500">고유 특징 아님</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Key takeaway equation */}
        <div className="mt-4 p-4 rounded-2xl bg-slate-900 text-white text-center font-black text-xs sm:text-sm shadow-md">
          💡 핵심 공식: “활동 방식만 보지 말고, ‘조직의 궁극적 목적’을 확인하라!”
        </div>
      </div>

      {/* ============================================================ */}
      {/* 5. 시험 함정 CHECK (Q1 ~ Q7)                                  */}
      {/* ============================================================ */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-black">
            TRAP CHECK
          </span>
          <h3 className="text-base sm:text-lg font-black text-slate-900">
            시험 함정 CHECK (Q1 ~ Q7)
          </h3>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          학생들이 시험에서 가장 많이 헷갈려 하는 함정 선지들을 직접 풀어보세요:
        </p>

        <div className="space-y-4">
          {EXAM_TRAP_QUESTIONS.map((q, idx) => {
            const isAnswered = !!trapSubmitted[q.id];
            const currentSelected = trapAnswers[q.id];

            return (
              <div key={q.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-snug">
                    {q.question}
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-mono font-bold">
                    Q{idx + 1}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((opt) => {
                    const isPicked = currentSelected === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleAnswerTrap(q.id, opt.id)}
                        disabled={isAnswered}
                        className={`p-3 rounded-xl text-xs font-bold text-left border transition ${
                          isPicked
                            ? opt.isCorrect
                              ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                              : 'bg-rose-600 text-white border-rose-600 shadow-xs'
                            : isAnswered && opt.isCorrect
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {opt.text}
                      </button>
                    );
                  })}
                </div>

                {isAnswered && (
                  <div className="mt-2.5 p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 leading-relaxed animate-fadeIn">
                    <span className="font-black text-slate-900">해설: </span>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 6. FINAL 조직 판별 (가상 조직 6개 - 단순 3개 + 헷갈리는 3개)   */}
      {/* ============================================================ */}
      <div className="rounded-3xl border-2 border-indigo-500 bg-white p-6 shadow-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-black flex items-center gap-1 shadow-xs">
              <Search className="w-3.5 h-3.5" />
              <span>FINAL DRILL</span>
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              실전 조직 판별관 (6개 가상 조직)
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-indigo-600">
            사례 {currentCaseIdx + 1} / {MYSTERY_CASES.length}
          </span>
        </div>

        {/* Case Card */}
        <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-black text-slate-900">
              {currentCase.title}
            </span>
            <span
              className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
                currentCase.difficulty === 'simple'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {currentCase.difficulty === 'simple' ? '기본 사례' : '헷갈리는 심화 사례'}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
            {currentCase.description}
          </p>

          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-xs text-indigo-900 font-mono italic shadow-2xs">
            {currentCase.feedSnippet}
          </div>

          {/* Question 1: Select Organization */}
          <div className="pt-2">
            <p className="text-xs font-bold text-slate-900 mb-2">
              1단계: 이 단체는 어떤 집단일까요?
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => selectOrgForCase('party')}
                disabled={caseState.isSubmitted}
                className={`py-3 px-3 rounded-2xl border text-xs font-black transition flex items-center justify-center gap-1 ${
                  caseState.selectedOrg === 'party'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-[1.02]'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>🟦</span>
                <span>정당</span>
              </button>

              <button
                onClick={() => selectOrgForCase('civic')}
                disabled={caseState.isSubmitted}
                className={`py-3 px-3 rounded-2xl border text-xs font-black transition flex items-center justify-center gap-1 ${
                  caseState.selectedOrg === 'civic'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md scale-[1.02]'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>🟩</span>
                <span>시민단체</span>
              </button>

              <button
                onClick={() => selectOrgForCase('interest')}
                disabled={caseState.isSubmitted}
                className={`py-3 px-3 rounded-2xl border text-xs font-black transition flex items-center justify-center gap-1 ${
                  caseState.selectedOrg === 'interest'
                    ? 'bg-amber-600 text-white border-amber-600 shadow-md scale-[1.02]'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>🟧</span>
                <span>이익집단</span>
              </button>
            </div>
          </div>

          {/* Question 2: Decisive Clue Selection */}
          <div className="pt-2">
            <p className="text-xs font-bold text-slate-900 mb-2">
              2단계: 어떤 결정적인 단서로 판단했나요? (복수 선택)
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                '공직 선거 후보자 공천',
                '정권 획득',
                '공익 실현',
                '구성원의 특수 이익',
                '정치사회화',
                '여론 형성',
                '정책 결정에 영향',
              ].map((clue) => {
                const isSelected = caseState.selectedClues.includes(clue);
                return (
                  <button
                    key={clue}
                    onClick={() => toggleClue(clue)}
                    disabled={caseState.isSubmitted}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {clue}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit or Result */}
          {!caseState.isSubmitted ? (
            <div className="pt-3 flex justify-end">
              <button
                onClick={submitCaseAnswer}
                disabled={!caseState.selectedOrg || caseState.selectedClues.length === 0}
                className="px-6 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs sm:text-sm disabled:opacity-40 transition shadow-md shadow-indigo-500/20"
              >
                판별 결과 제출하기
              </button>
            </div>
          ) : (
            <div className="pt-3 space-y-3 animate-fadeIn">
              <div
                className={`p-4 rounded-2xl border text-xs sm:text-sm ${
                  caseState.selectedOrg === currentCase.correctType
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-rose-50 border-rose-300 text-rose-950'
                }`}
              >
                <div className="font-black mb-1">
                  {caseState.selectedOrg === currentCase.correctType
                    ? '🎉 정답입니다!'
                    : '❌ 오답입니다!'}
                </div>
                <p className="leading-relaxed">{currentCase.explanation}</p>
              </div>

              {/* Clue Warning Check */}
              {(() => {
                const onlyCommon =
                  caseState.selectedClues.length > 0 &&
                  caseState.selectedClues.every((c) =>
                    ['정치사회화', '여론 형성', '정책 결정에 영향'].includes(c)
                  );

                if (onlyCommon) {
                  return (
                    <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-xs text-amber-950 font-semibold flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <p>
                        ⚠️ [단서 주의] 선택하신 “정치사회화·여론 형성·정책 영향”은 세 집단 모두가 공통으로 수행할 수 있는 특징입니다!
                        세 집단을 구별할 때는 반드시 조직의 궁극적 ‘목적(정권획득 vs 공익 vs 특수이익)’을 근거로 삼아야 합니다.
                      </p>
                    </div>
                  );
                }
                return null;
              })()}

              {/* Next Case Button */}
              <div className="flex justify-end gap-2 pt-2">
                {currentCaseIdx < MYSTERY_CASES.length - 1 ? (
                  <button
                    onClick={() => setCurrentCaseIdx(currentCaseIdx + 1)}
                    className="px-5 py-2.5 rounded-full bg-slate-900 text-white text-xs sm:text-sm font-extrabold hover:bg-slate-800 transition"
                  >
                    다음 판별 사례 풀기 ({currentCaseIdx + 2} / {MYSTERY_CASES.length})
                  </button>
                ) : (
                  <button
                    onClick={onNext}
                    className="px-7 py-3 rounded-full bg-blue-600 text-white text-xs sm:text-sm font-extrabold hover:bg-blue-700 transition flex items-center gap-2 shadow-lg shadow-blue-500/25"
                  >
                    <span>6개 사례 모두 판별 완료! → PART 06: 오늘의 참여 알림 탐구하기</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
