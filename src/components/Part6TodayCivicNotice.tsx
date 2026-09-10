import React, { useState } from 'react';
import {
  Bell,
  Megaphone,
  MessageCircle,
  Heart,
  Scroll,
  CheckCircle2,
  ArrowRight,
  Send,
  Sparkles,
  Award,
  Layers,
  ThumbsUp,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Part6Props {
  onComplete: () => void;
  onNext: () => void;
}

export const Part6TodayCivicNotice: React.FC<Part6Props> = ({
  onComplete,
  onNext,
}) => {
  const [visitedNotices, setVisitedNotices] = useState<Set<string>>(new Set());
  const [interactiveOpinion, setInteractiveOpinion] = useState<string>('');
  const [opinionSubmitted, setOpinionSubmitted] = useState<boolean>(false);
  const [likes, setLikes] = useState<Record<string, number>>({
    hearing: 42,
    forum: 28,
    volunteer: 89,
    legislative: 65,
  });
  const [userLiked, setUserLiked] = useState<Record<string, boolean>>({});

  const notices = [
    {
      id: 'hearing',
      type: '공청회 (Public Hearing)',
      icon: '📢',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      timeStr: '16:00',
      pushTitle: '새로운 대중교통 노선 개편 및 청소년 요금 공청회',
      pushContent:
        '새로운 대중교통 정책을 시행하기 전 교통 전문가·운송 이해관계자·학생·시민의 의견을 공개적으로 듣습니다.',
      concept:
        '특정 정책이나 사업 등에 대해 다양한 이해관계자와 전문가, 일반 시민의 의견을 공개적인 자리에서 공식적으로 수렴하는 방식입니다.',
      interactiveHint: '“교통 전문가와 버스 기사님, 학생 대표가 모여 토론 중입니다.”',
      sticker: '📢 공개 토론 참여 배지',
    },
    {
      id: 'forum',
      type: '주민간담회 (Town Hall / Meeting)',
      icon: '💬',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      timeStr: '16:30',
      pushTitle: '우리 동네 어린이·청소년 근린공원 야간 조명 주민간담회',
      pushContent:
        '우리 동네 공원 안전 및 야간 조명 문제에 대해 동네 주민들과 구청 공원녹지과 담당자가 직접 주민센터에서 만나 격의 없이 의견을 나눕니다.',
      concept:
        '지역 주민과 행정 관계자가 직접 대면하여 만나 지역의 생활 속 문제와 실질적 요구에 대해 가깝게 소통하는 방식입니다.',
      interactiveHint: '“이웃 주민들과 구청 계장님이 둘러앉아 이야기를 나누고 있습니다.”',
      sticker: '💬 동네 소통 참여 배지',
    },
    {
      id: 'volunteer',
      type: '자원봉사 (Volunteering)',
      icon: '❤️',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
      timeStr: '17:20',
      pushTitle: '주말 지역 아동센터 학습 및 멘토링 봉사자 모집',
      pushContent:
        '방과 후 돌봄이 필요한 지역 후배 아동들을 위한 기초 학습 지도 및 주말 놀이 활동에 함께할 청소년 봉사자를 모집합니다.',
      concept:
        '공동체의 당면한 문제를 스스로 해결하고 어려움에 처한 이웃을 돕기 위해 시민이 자발적으로 시간과 노력을 들이는 활동입니다.',
      keyTakeaway:
        '📌 중요: 시민 참여는 투표나 정치적 의사 표현에만 한정되지 않습니다! 공동체를 돌보는 자원봉사 역시 훌륭한 시민 참여입니다.',
      sticker: '❤️ 공동체 나눔 배지',
    },
    {
      id: 'legislative',
      type: '입법 과정 참여 (Legislative Participation)',
      icon: '📜',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
      timeStr: '19:00',
      pushTitle: '청소년 디지털 안전 및 통학로 보호에 관한 법률안 입법 예고',
      pushContent:
        '국회 및 지방의회에서 청소년의 생활에 직접적인 영향을 미치는 새로운 법안이 발의되어 국민 의견 수렴을 진행하고 있습니다.',
      concept:
        '시민은 이미 만들어진 법을 수동적으로 따르기만 하는 존재가 아닙니다. 국회 입법예고 시스템, 청원, 의원 면담 등을 통해 법과 정책이 만들어지는 모든 과정에 주체적으로 참여할 수 있습니다.',
      actions: [
        '📝 국회 입법예고 시스템에 찬반 의견 제출',
        '📨 지역구 국회의원 및 시의원에게 정책 제안 이메일 전달',
        '🏛 입법 관련 전문가 공청회에 방청 및 질의 참여',
        '📢 국민동의청원 등록 및 온라인 서명 운동 참여',
      ],
      sticker: '📜 법안 제안 참여 배지',
    },
  ];

  const handleOpenNotice = (id: string) => {
    const updated = new Set(visitedNotices);
    updated.add(id);
    setVisitedNotices(updated);
    if (updated.size >= 4) {
      confetti({ particleCount: 30, spread: 50 });
      onComplete();
    }
  };

  const handleToggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setUserLiked((prev) => {
      const isLiked = !!prev[id];
      setLikes((l) => ({ ...l, [id]: isLiked ? l[id] - 1 : l[id] + 1 }));
      return { ...prev, [id]: !isLiked };
    });
  };

  const handleSendOpinion = () => {
    if (!interactiveOpinion.trim()) return;
    setOpinionSubmitted(true);
    confetti({ particleCount: 40, spread: 60 });
  };

  return (
    <div className="space-y-7 pb-8">
      {/* Header Container */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-2">
          <span className="px-3 py-1 rounded-full bg-slate-100 font-extrabold text-slate-700 flex items-center gap-1.5">
            <Bell className="w-3.5 h-3.5 text-blue-600" />
            <span>05:20 PM · 오후 스마트 알림센터</span>
          </span>
          <span className="text-blue-600 font-black tracking-wider">CIVIC NOTIFICATION FEED</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
          정치 밖에서도, 법이 만들어지는 순간에도!
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
          시민 참여는 정당이나 선거뿐만 아니라, <strong>공청회, 주민간담회, 자원봉사, 입법 참여</strong> 등
          우리 일상의 다양한 모바일 알림 속으로 확장됩니다. 아래 4개의 참여 알림을 탭하여 스티커를 수집하세요!
        </p>

        {/* Sticker Collection Progress Bar */}
        <div className="mt-5 p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-600" />
            <div>
              <div className="text-xs font-black text-indigo-950">
                오늘의 참여 알림 배지 컬렉션 ({visitedNotices.size} / 4)
              </div>
              <div className="text-[11px] text-slate-500">
                각 알림을 탭하여 핵심 개념을 확인하면 스티커가 수집됩니다.
              </div>
            </div>
          </div>
          <div className="flex gap-1.5">
            {notices.map((n) => (
              <span
                key={n.id}
                className={`text-lg p-1.5 rounded-xl border transition ${
                  visitedNotices.has(n.id)
                    ? 'bg-white border-indigo-300 shadow-2xs scale-110'
                    : 'bg-slate-200/60 border-slate-200 opacity-40 grayscale'
                }`}
                title={n.type}
              >
                {n.icon}
              </span>
            ))}
          </div>
        </div>

        {/* 4 Push Notification Cards */}
        <div className="mt-6 space-y-4">
          {notices.map((n) => {
            const isOpened = visitedNotices.has(n.id);
            const isLiked = !!userLiked[n.id];

            return (
              <div
                key={n.id}
                onClick={() => handleOpenNotice(n.id)}
                className={`rounded-3xl border-2 p-5 transition-all cursor-pointer ${
                  isOpened
                    ? 'border-slate-300 bg-slate-50/80 shadow-xs'
                    : 'border-blue-300 bg-blue-50/30 hover:border-blue-500 hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{n.icon}</span>
                    <span className={`px-2.5 py-0.5 rounded-full font-black text-[11px] border ${n.badgeColor}`}>
                      {n.type}
                    </span>
                    {isOpened && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                        수집 완료 ✓
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 font-mono text-xs">
                    <span>{n.timeStr}</span>
                    <button
                      onClick={(e) => handleToggleLike(e, n.id)}
                      className={`flex items-center gap-1 px-2 py-0.5 rounded-full border transition text-[11px] ${
                        isLiked
                          ? 'bg-rose-50 text-rose-600 border-rose-200 font-bold'
                          : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <Heart className={`w-3 h-3 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                      <span>{likes[n.id]}</span>
                    </button>
                  </div>
                </div>

                <h3 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
                  {n.pushTitle}
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-medium">
                  {n.pushContent}
                </p>

                {/* Expanded Concept & Interaction */}
                {isOpened && (
                  <div className="mt-4 pt-4 border-t border-slate-200 space-y-3 animate-fadeIn">
                    <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed shadow-2xs">
                      <span className="font-black text-blue-700">[핵심 개념]: </span>
                      {n.concept}
                    </div>

                    {n.keyTakeaway && (
                      <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-900 font-black flex items-center gap-2">
                        <span>{n.keyTakeaway}</span>
                      </div>
                    )}

                    {n.actions && (
                      <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200">
                        <div className="text-xs font-black text-purple-900 mb-2">
                          시민이 입법 과정에 직접 참여할 수 있는 4가지 방법:
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-800">
                          {n.actions.map((act, idx) => (
                            <div key={idx} className="p-2.5 bg-white rounded-xl border border-purple-100 font-bold shadow-2xs flex items-center gap-1.5">
                              <span>{act}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Interactive 1-line opinion input for legislative case */}
                    {n.id === 'legislative' && (
                      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                        <div className="text-xs font-black text-slate-800 mb-2 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                          <span>[모의 입법 의견 제출] 청소년 통학로 안전 법안에 1줄 의견 남기기</span>
                        </div>
                        {!opinionSubmitted ? (
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={interactiveOpinion}
                              onChange={(e) => setInteractiveOpinion(e.target.value)}
                              placeholder="예: 등하교 시간대 대형 화물차 우회 조항을 반드시 포함해주세요!"
                              className="flex-1 px-3.5 py-2.5 text-xs rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 font-medium"
                            />
                            <button
                              onClick={handleSendOpinion}
                              disabled={!interactiveOpinion.trim()}
                              className="px-5 py-2.5 bg-purple-600 text-white rounded-full text-xs font-bold hover:bg-purple-700 disabled:opacity-40 transition flex items-center gap-1 shadow-sm"
                            >
                              <span>제출</span>
                              <Send className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <div className="p-3 bg-emerald-50 text-emerald-950 rounded-2xl text-xs font-extrabold flex items-center gap-2 border border-emerald-200">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            <span>입법 의견 접수 완료! 국회 상임위원회 공청회 검토 보고서에 기록되었습니다.</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Big Banner */}
        <div className="mt-6 p-5 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white text-center shadow-md">
          <p className="text-sm sm:text-base font-black leading-relaxed">
            “시민은 이미 만들어진 법을 따르기만 하는 수동적 존재가 아닙니다.<br className="hidden sm:inline" />
            법과 정책이 만들어지는 모든 과정에 참여하는 진정한 주체입니다.”
          </p>
        </div>

        {/* Next Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onNext}
            className="px-7 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-blue-500/25 transition hover:gap-3"
          >
            <span>PART 07: 우리 동네 참여센터 (지방자치 주민참여 제도)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
