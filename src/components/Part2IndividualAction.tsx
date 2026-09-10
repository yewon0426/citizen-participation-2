import React, { useState } from 'react';
import {
  Smartphone,
  FileText,
  Send,
  Bell,
  Users,
  CheckCircle,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Part2Props {
  onComplete: () => void;
  onNext: () => void;
}

export const Part2IndividualAction: React.FC<Part2Props> = ({ onComplete, onNext }) => {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [showCollectiveNotice, setShowCollectiveNotice] = useState<boolean>(false);

  const actions = [
    {
      id: 'civil_complaint',
      icon: '📱',
      title: '담당 기관에 민원 제기',
      subtitle: '구청 교통안전과 또는 국민신문고 앱 접수',
      detail: '“등교 시간(08:00~08:40) 보행자 신호 시간을 기존 15초에서 25초로 연장 요청합니다.”',
      appMock: '안전신문고 / 국민신문고',
    },
    {
      id: 'online_forum',
      icon: '📝',
      title: '온라인 의견 제출',
      subtitle: '시민 소통 참여 플랫폼 게시판에 제안 글 작성',
      detail: '“우리 학교 앞 어린이·청소년 보호구역 신호주기 개편 의견을 올렸습니다. 학생들의 안전을 지켜주세요.”',
      appMock: '시민참여 포털 열린제안',
    },
    {
      id: 'chat_request',
      icon: '💬',
      title: '관계 기관에 개선 요청',
      subtitle: '관할 경찰서 교통과 챗봇 또는 전화로 현장 방문 건의',
      detail: '“경찰관님, 등교 시간 현장 점검과 보행 신호 조정을 부탁드립니다.”',
      appMock: '교통경찰 민원 챗봇',
    },
    {
      id: 'policy_mail',
      icon: '📨',
      title: '관련 정책에 의견 전달',
      subtitle: '청소년 참여위원회 및 구의원 이메일 의견 전달',
      detail: '“청소년 안전 조례 개정 시 통학로 보행 신호 최적화 조항 신설을 건의합니다.”',
      appMock: '청소년 정책 제안함',
    },
  ];

  const handleSelectAction = (id: string) => {
    setSelectedAction(id);
    setTimeout(() => {
      setShowCollectiveNotice(true);
      onComplete();
      confetti({ particleCount: 30, spread: 50 });
    }, 500);
  };

  return (
    <div className="space-y-12 pb-16">
      {/* 08:20 Crosswalk Situation Card */}
      <div className="space-y-6">
        <div className="flex items-center justify-between text-xs font-mono text-stone-600">
          <span className="px-3 py-1 rounded-full bg-stone-100 font-bold text-stone-800">
            08:20 AM · 학교 앞 횡단보도
          </span>
          <span className="text-blue-600 font-bold">실시간 등굣길 상황</span>
        </div>

        {/* Big Typography Question */}
        <div className="space-y-3">
          <span className="text-4xl">🚸</span>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 leading-tight tracking-tight">
            “신호가 바뀌기 전에<br />
            뛰어야 해!”
          </h2>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed max-w-xl">
            등교 시간마다 수많은 학생들이 빨간 불로 바뀌기 전에 불안하게 뛰어 횡단보도를 건넙니다.
            보행 신호 시간이 너무 짧다는 의견이 학생과 학부모들 사이에서 빗발치고 있습니다.
          </p>
        </div>

        {/* Action Choice Feed */}
        <div className="pt-4 space-y-3">
          <h3 className="text-sm font-black text-stone-900">
            💡 “개인인 내가 당장 실천할 수 있는 참여 방식은?”
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {actions.map((act) => {
              const isSelected = selectedAction === act.id;
              return (
                <button
                  key={act.id}
                  onClick={() => handleSelectAction(act.id)}
                  className={`p-5 rounded-3xl text-left border transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/70 shadow-md ring-2 ring-blue-300'
                      : 'border-stone-200/80 bg-white hover:border-stone-400 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{act.icon}</span>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 font-bold font-mono">
                      {act.appMock}
                    </span>
                  </div>
                  <h4 className="text-sm font-black text-stone-900">{act.title}</h4>
                  <p className="text-xs text-stone-600 mt-1 leading-snug">{act.subtitle}</p>

                  {isSelected && (
                    <div className="mt-3 p-3 rounded-2xl bg-blue-100/70 text-xs text-blue-950 font-semibold animate-fadeIn leading-relaxed">
                      {act.detail}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Concept Discovery */}
      {selectedAction && (
        <div className="space-y-8 animate-fadeIn">
          <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-sm space-y-2">
            <span className="text-[11px] font-mono text-blue-600 font-bold uppercase">
              KEY CONCEPT 02
            </span>
            <h3 className="text-xl font-black text-stone-900">
              개인적 시민 참여 (Individual Citizen Participation)
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              시민이 <strong>개인의 자격</strong>으로 자신의 의견이나 요구를 정치·사회 과정에 직접 표현하는 참여 형태입니다.
              (안전신문고 민원 제기, 청원, 1인 의견 제출, 공공기관 면담 요청 등)
            </p>
          </div>

          {/* Sudden Notification: 1,284 other citizens experiencing the same issue */}
          {showCollectiveNotice && (
            <div className="rounded-[2.5rem] bg-gradient-to-br from-stone-900 via-indigo-950 to-stone-900 text-white p-7 sm:p-9 shadow-xl space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between text-xs text-indigo-300 font-mono">
                <span className="flex items-center gap-1.5 font-sans font-bold text-amber-300">
                  <Bell className="w-4 h-4 animate-bounce" />
                  실시간 네트워크 알림
                </span>
                <span>방금 도착</span>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/10 border border-white/15">
                <div className="w-11 h-11 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center font-black text-xl flex-shrink-0">
                  👥
                </div>
                <div>
                  <div className="text-base font-black text-white">
                    같은 불편을 겪는 시민 1,284명이 모였습니다!
                  </div>
                  <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                    “나 혼자 민원을 낼 수도 있지만, 같은 뜻을 가진 시민들이 지속적으로 힘을 합쳐 움직인다면 어떻게 될까요?”
                  </p>
                </div>
              </div>

              <div className="text-center py-2 space-y-2">
                <span className="text-[11px] font-mono tracking-widest text-indigo-300 uppercase font-semibold">
                  NEXT DISCOVERY
                </span>
                <h4 className="text-2xl sm:text-3xl font-black text-white">
                  “혼자가 아니라 함께 움직인다면?”
                </h4>
                <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs font-black">
                  집단적 시민 참여 (Collective Citizen Participation)
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={onNext}
                  className="px-7 py-3 rounded-full bg-white hover:bg-stone-100 text-stone-900 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all group"
                >
                  <span>PART 03: 혼자보다 함께 (집단적 참여 탐구)</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
