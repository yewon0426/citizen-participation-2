import React, { useState } from 'react';
import {
  Smartphone,
  FileText,
  MessageSquareQuote,
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
    // After selecting an action, trigger the 1,284 people notification
    setTimeout(() => {
      setShowCollectiveNotice(true);
      onComplete();
    }, 600);
  };

  return (
    <div className="space-y-6 pb-8">
      {/* 08:20 Crosswalk Situation Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm overflow-hidden relative">
        <div className="flex items-center justify-between text-xs text-slate-500 font-mono mb-3">
          <span className="px-2 py-0.5 rounded-full bg-slate-100 font-semibold text-slate-700">
            08:20 AM · 학교 앞 횡단보도
          </span>
          <span className="text-blue-600 font-medium">실시간 등굣길 상황</span>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-2xl flex-shrink-0 shadow-sm shadow-amber-200">
            🚸
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 leading-snug">
              “신호가 바뀌기 전에 뛰어야 해!”
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
              등교 시간마다 수많은 학생들이 빨간 불로 바뀌기 전에 불안하게 뛰어 횡단보도를 건넙니다.
              보행 신호 시간이 너무 짧다는 의견이 학부모와 학생들 사이에서 빗발치고 있습니다.
            </p>
          </div>
        </div>

        <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
          <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-1.5">
            <span>💡</span>
            <span>“개인인 내가 할 수 있는 참여는 무엇일까?”</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {actions.map((act) => {
              const isSelected = selectedAction === act.id;
              return (
                <button
                  key={act.id}
                  onClick={() => handleSelectAction(act.id)}
                  className={`p-4 rounded-xl text-left border transition-all relative ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/80 ring-2 ring-blue-300 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xl">{act.icon}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                      {act.appMock}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{act.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{act.subtitle}</p>

                  {isSelected && (
                    <div className="mt-2.5 pt-2 border-t border-blue-200 text-xs text-blue-900 bg-blue-100/50 p-2 rounded-lg font-medium">
                      {act.detail}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Concept Discovery: Individual Citizen Participation */}
      {selectedAction && (
        <div className="space-y-6 animate-fadeIn">
          <div className="rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-5 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-700 mb-1">
              <span>개념 발견</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1.5">
              개인적 시민 참여 (Individual Citizen Participation)
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              시민이 <strong>개인의 자격</strong>으로 자신의 의견이나 요구를 정치·사회 과정에 직접 표현하는 참여 형태입니다.
              (민원 제기, 청원, 1인 의견 제출, 담당자 면담 요청 등)
            </p>
          </div>

          {/* Sudden Notification: 1,284 other citizens experiencing the same issue */}
          {showCollectiveNotice && (
            <div className="rounded-3xl border border-indigo-200 bg-gradient-to-b from-indigo-900 via-indigo-950 to-slate-950 text-white p-6 shadow-xl relative overflow-hidden animate-fadeIn">
              <div className="flex items-center justify-between text-xs text-indigo-300 mb-4 font-mono">
                <span className="flex items-center gap-1.5 font-sans font-bold text-amber-400">
                  <Bell className="w-4 h-4 animate-bounce" />
                  긴급 실시간 네트워크 알림
                </span>
                <span>방금 도착</span>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center font-bold text-lg flex-shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">
                      🔔 같은 문제를 겪고 있는 시민 1,284명이 있습니다!
                    </div>
                    <p className="text-xs text-indigo-200 mt-1">
                      “나 혼자 민원을 낼 수도 있지만, 같은 뜻을 가진 시민들이 지속적으로 힘을 합쳐 움직인다면?”
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center py-2">
                <p className="text-xs uppercase tracking-wider text-indigo-300 font-semibold mb-1">
                  Next Step
                </p>
                <h4 className="text-xl font-bold text-white">
                  “혼자가 아니라 함께 움직인다면?”
                </h4>
                <div className="inline-block mt-3 px-4 py-1.5 rounded-full bg-blue-500/30 border border-blue-400 text-blue-200 text-sm font-bold">
                  ⬇ 집단적 시민 참여 (Collective Citizen Participation)
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={onNext}
                  className="px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm flex items-center gap-2 shadow-lg transition hover:gap-3"
                >
                  <span>PART 03: 혼자보다 함께 탐구하기</span>
                  <ArrowRight className="w-4 h-4 text-blue-600" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
