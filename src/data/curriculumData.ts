import {
  PartInfo,
  OrgProfile,
  OrganizationMysteryCase,
  ResidentParticipationCase,
} from '../types';

export const PARTS_META: PartInfo[] = [
  {
    id: 1,
    title: '01 오늘도 시민',
    subtitle: '시민 참여의 의미와 역할',
    timeStr: '08:03 AM',
    iconName: 'Smartphone',
  },
  {
    id: 2,
    title: '02 나 혼자 움직인다면',
    subtitle: '개인적 시민 참여',
    timeStr: '08:20 AM',
    iconName: 'User',
  },
  {
    id: 3,
    title: '03 혼자보다 함께',
    subtitle: '집단적 시민 참여',
    timeStr: '11:30 AM',
    iconName: 'Users',
  },
  {
    id: 4,
    title: '04 WHO ARE YOU?',
    subtitle: '정당 · 시민단체 · 이익집단 탐구',
    timeStr: '01:10 PM',
    iconName: 'Compass',
  },
  {
    id: 5,
    title: '05 같은 문제, 다른 조직',
    subtitle: '세 집단 비교 및 실전 판별',
    timeStr: '03:40 PM',
    iconName: 'GitCompare',
  },
  {
    id: 6,
    title: '06 오늘의 참여 알림',
    subtitle: '공청회 · 간담회 · 봉사 · 입법',
    timeStr: '05:20 PM',
    iconName: 'BellRing',
  },
  {
    id: 7,
    title: '07 우리 동네 참여센터',
    subtitle: '지방자치의 주민 참여 제도',
    timeStr: '07:00 PM',
    iconName: 'MapPin',
  },
  {
    id: 8,
    title: '08 MY CIVIC DAY',
    subtitle: '종합 정리 및 최종 평가',
    timeStr: '08:30 PM',
    iconName: 'Award',
  },
];

export const ORG_PROFILES: Record<string, OrgProfile> = {
  party: {
    type: 'party',
    name: '정당 (Political Party)',
    badge: '🟦 PARTY',
    color: '#2563eb',
    borderColor: 'border-blue-500',
    bgColor: 'bg-blue-600',
    lightBg: 'bg-blue-50',
    textColor: 'text-blue-700',
    corePurpose: '정치권력 획득 + 정책 실현',
    candidateNomination: true,
    seekPower: true,
    mainInterest: '국민의 지지를 얻기 위해 공익을 도모하는 정책과 공약 제시',
  },
  civic: {
    type: 'civic',
    name: '시민단체 (Civic Group / NGO)',
    badge: '🟩 CIVIC',
    color: '#16a34a',
    borderColor: 'border-emerald-500',
    bgColor: 'bg-emerald-600',
    lightBg: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    corePurpose: '공익 실현 (사회 전체의 이익과 문제 해결)',
    candidateNomination: false,
    seekPower: false,
    mainInterest: '사회 전체 또는 폭넓은 시민의 공익 추구',
  },
  interest: {
    type: 'interest',
    name: '이익집단 (Interest Group)',
    badge: '🟧 INTEREST',
    color: '#ea580c',
    borderColor: 'border-amber-500',
    bgColor: 'bg-amber-600',
    lightBg: 'bg-amber-50',
    textColor: 'text-amber-700',
    corePurpose: '구성원의 특수 이익 실현',
    candidateNomination: false,
    seekPower: false,
    mainInterest: '공통된 이해관계를 가진 구성원의 특수한 권익 실현',
  },
};

// Part 4 Party Missions
export const PARTY_MISSIONS_DATA = [
  {
    step: 1,
    id: 'mission1',
    title: '후보자를 찾습니다',
    tag: '정치적 충원 기능',
    alertText: '🗳 공직 선거가 다가오고 있습니다. 각 정당이 선거에 출마할 후보자를 결정하고 있습니다.',
    question: '정당은 공직 선거에 무엇을 할까요?',
    correctAnswer: '후보자를 공천한다.',
    explanation:
      '정당은 정권 획득을 목적으로 공직 선거에 후보자를 공천합니다. 정치 지도자가 될 인물을 발굴·선정하고 선거에 출마시킴으로써 정치 엘리트와 공직자를 충원합니다.',
    flow: ['인물 발굴', '후보자 선정', '공천', '선거 출마', '공직자 충원'],
  },
  {
    step: 2,
    id: 'mission2',
    title: '국민의 요구 5,482건',
    tag: '이익 집약 기능',
    snsItems: [
      { user: '👩🎓 고등학생 민지', text: '교육비 부담과 입시 경쟁 스트레스를 줄여주세요!' },
      { user: '👶 맞벌이 학부모 영수', text: '방과 후 돌봄 서비스를 밤 8시까지 확대해주세요.' },
      { user: '👨💼 동네 상인 진호', text: '골목상권 경제 활성화를 위한 온누리상품권 지원 늘려주세요.' },
      { user: '🌱 청년 기후행동 수아', text: '기후위기 대응을 위해 탄소 배출 규제를 강화해주세요.' },
      { user: '🏠 1인 가구 준혁', text: '청년 주거비 지원과 전세사기 예방 대책이 시급합니다.' },
    ],
    question: '정당은 이 모든 요구를 어떻게 처리할까요?',
    options: [
      { id: 'raw', text: '모든 요구를 있는 그대로 법안으로 다 제출한다', isCorrect: false },
      { id: 'adjust', text: '사회적 갈등을 조정하고 집약하여 정책·공약으로 만든다', isCorrect: true },
    ],
    explanation:
      '정당은 사회의 다양한 요구와 이해관계를 모아 조정하고 집약하여 정책과 공약으로 제시합니다. 특정 집단만의 이익보다는 공익을 도모하는 정책을 제시하여 폭넓은 국민의 지지를 확보하려 합니다.',
    flow: ['다양한 국민 요구', '조정 및 집약', '통합된 정책과 공약'],
  },
  {
    step: 3,
    id: 'mission3',
    title: '공약이 도착했습니다',
    tag: '정책·공약 제시 및 정치적 책임',
    topics: [
      {
        id: 'edu',
        icon: '📚',
        title: '교육',
        promise: '방과후 디지털 AI 학습 무료 바우처 지급 및 청소년 문화카드 지원',
      },
      {
        id: 'housing',
        icon: '🏠',
        title: '주거',
        promise: '청년 안심 공공임대주택 5만호 공급 및 전월세 보증금 이자 지원',
      },
      {
        id: 'welfare',
        icon: '👶',
        title: '복지',
        promise: '국가 책임 온종일 돌봄교실 전면 확대 및 아동수당 지급 연령 상향',
      },
      {
        id: 'job',
        icon: '💼',
        title: '일자리',
        promise: '지역 청년 일자리 매칭 센터 구축 및 미래 신산업 인턴십 지원',
      },
      {
        id: 'env',
        icon: '🌱',
        title: '환경',
        promise: '2030 신재생에너지 전환 가속화 및 일회용기 제로 친환경 특구 지정',
      },
    ],
    question: '정당은 선거에서 왜 공약을 제시할까요?',
    explanation:
      '정당은 선거에서 자신들이 실현하려는 정책과 공약을 국민에게 제시하고 국민의 지지를 얻으려 합니다. 선거 승리 후에는 공약과 정책을 실천하며, 그 결과에 대해 국민의 평가와 정치적 책임을 집니다.',
    flow: ['공약 제시', '국민의 선택 (선거)', '정책 실천', '국민의 평가', '정치적 책임'],
    keyTakeaway: '정당은 자신의 공약과 정책에 대해 정치적 책임을 집니다. 다음 선거는 정당의 정책과 국정 운영에 대한 국민의 엄중한 평가 기회가 됩니다.',
  },
  {
    step: 4,
    id: 'mission4',
    title: '오늘의 정치 뉴스',
    tag: '여론 형성 및 조직화',
    newsSnippet: {
      headline: '📰 고교 맞춤형 교육 개편안 둘러싸고 각 정당 정책 토론 열기 고조',
      source: '2026 데일리 시민뉴스',
      stances: [
        { party: '🟦 희망당', stance: '진로 탐색 중심의 자율 선택 학점제 확대 추진' },
        { party: '⬜ 미래당', stance: '기초 학력 보장과 지역 간 교육 격차 해소 집중 지원' },
      ],
    },
    question: '정당이 사회문제에 대해 정책과 입장을 제시하는 것은 사회에 어떤 영향을 줄까요?',
    concept: '여론 형성 및 조직화',
    explanation:
      '정당은 사회문제에 대한 입장과 정책을 제시하고 토론하면서 국민의 관심을 높이고 여론 형성에 영향을 줍니다. 또한 흩어져 있는 국민의 의견과 요구를 모아 조직화하여 정치 과정에 효과적으로 전달합니다.',
  },
  {
    step: 5,
    id: 'mission5',
    title: '정치를 배우는 순간',
    tag: '정치사회화',
    shortsCards: [
      { tag: '📱 1분 숏폼', title: '이번 선거의 주요 청소년·교육정책 팩트 비교!' },
      { tag: '📱 카드뉴스', title: '청년 주거 정책, 내게 맞는 혜택 1분 정리' },
      { tag: '📱 정책 웹툰', title: '내가 낸 세금, 정당 공약으로 어떻게 쓰일까?' },
    ],
    question: '시민이 이런 과정을 통해 정치적 쟁점과 참여 방법을 배우고 익히는 과정은?',
    concept: '정치사회화 (Political Socialization)',
    caution: '⚠️ 주의: 정치사회화는 정당만의 기능이 아닙니다! 시민단체와 이익집단 역시 시민과 구성원의 정치사회화 기능을 수행할 수 있습니다.',
    explanation:
      '정당은 정치적 정보와 정책을 제공하고 참여 기회를 마련하여 시민이 정치적 지식·가치·태도와 참여 방식을 학습하도록 하는 정치사회화 기능을 수행합니다.',
  },
  {
    step: 6,
    id: 'mission6',
    title: '국민의 목소리는 어디로 갈까?',
    tag: '정부와 의회를 매개',
    flowDiagram: {
      citizen: '👥 국민 ("돌봄 정책과 통학로 안전을 보장해주세요!")',
      party: '🟦 정당 (요구 수렴 및 정책화)',
      gov: '🏛 국회 · 정부 (법률 제정 및 예산 집행)',
    },
    concept: '정부와 의회를 매개하는 다리 (매개 기능)',
    explanation:
      '정당은 국민의 요구와 의견을 정부와 의회에 전달하고, 정부와 의회의 정책과 쟁점을 다시 국민에게 알리면서 국민과 정치권력을 양방향으로 연결하는 핵심 매개체 역할을 합니다.',
  },
  {
    step: 7,
    id: 'mission7',
    title: '선거에서 졌습니다',
    tag: '정부 감시와 견제',
    situation: {
      ruling: '🟦 A당 (여당 - 정권 획득 성공)',
      opposition: '⬜ B당 (야당 - 선거에서 패배)',
    },
    question: '선거에서 패배해 야당이 되면 정당의 역할은 끝날까요?',
    options: [
      { id: 'yes', text: '그렇다, 다음 선거 때까지 아무 역할도 하지 않는다', isCorrect: false },
      { id: 'no', text: '아니다, 정부의 국정 운영을 감시·견제하고 대안을 제시한다', isCorrect: true },
    ],
    explanation:
      '선거에서 패배해도 야당으로서 정부를 감시·비판하고 대안을 제시하는 결정적 역할을 합니다. 여당은 정부와 협력하여 공약을 실현하고, 야당은 권력 남용을 견제하여 민주 정치를 균형 있게 발전시킵니다.',
    comparison: [
      { label: '여당 (Ruling Party)', role: '정부와 협력하여 정책 추진 및 국정 책임' },
      { label: '야당 (Opposition Party)', role: '정부 정책 감시, 비판, 견제 및 창의적 대안 제시' },
    ],
  },
];

// Part 4 Master Board Items
export const PARTY_MASTER_BOARD = [
  { icon: '🗳', title: '정치적 충원', desc: '후보자 발굴·선정·공천 → 공직자 충원' },
  { icon: '🧩', title: '이익 집약', desc: '다양한 요구와 이해관계를 조정·종합하여 정책화' },
  { icon: '📢', title: '여론 형성 및 조직화', desc: '정치적 쟁점 제시 및 국민 의견 형성·조직화' },
  { icon: '🧠', title: '정치사회화', desc: '시민이 정치적 지식·가치·태도와 참여 방법을 학습' },
  { icon: '🌉', title: '매개 기능', desc: '국민 ↔ 정당 ↔ 정부·의회를 연결' },
  { icon: '👀', title: '정부 감시·견제', desc: '야당을 중심으로 정부의 국정 운영을 감시·비판·대안 제시' },
  { icon: '📋', title: '정책·공약 제시', desc: '공익을 도모하는 정책과 공약을 제시하여 국민 지지 확보' },
  { icon: '⚖️', title: '정치적 책임', desc: '공약과 정책의 실천 결과에 대해 국민의 평가를 받음' },
];

// Part 5 Common Ground Checks
export const COMMON_GROUND_OPTIONS = [
  { id: 'c1', text: '시민이 조직을 통해 정치 과정에 참여하는 집단적 시민 참여의 통로가 된다.', isCorrect: true },
  { id: 'c2', text: '시민이나 구성원의 다양한 요구와 이익을 정치 과정에 전달한다.', isCorrect: true },
  { id: 'c3', text: '사회문제와 정책에 대한 여론 형성에 영향을 미칠 수 있다.', isCorrect: true },
  { id: 'c4', text: '시민이나 구성원의 정치사회화에 기여할 수 있다.', isCorrect: true },
  { id: 'c5', text: '정부·의회의 정책 결정 과정에 영향을 미칠 수 있다.', isCorrect: true },
  { id: 'c6', text: '시민과 정치 과정을 연결하는 역할을 할 수 있다.', isCorrect: true },
  { id: 'c7', text: '모두 공직 선거에 후보자를 공천한다.', isCorrect: false },
  { id: 'c8', text: '모두 정권 획득을 목적으로 한다.', isCorrect: false },
  { id: 'c9', text: '모두 사회 전체의 공익만을 추구한다.', isCorrect: false },
];

// Part 5 Exam Trap Questions
export const EXAM_TRAP_QUESTIONS = [
  {
    id: 'q1',
    question: '“정치사회화 기능을 수행한다.” 이것만으로 정당이라고 단정할 수 있을까?',
    options: [
      { id: 'yes', text: 'YES, 정당만의 고유한 기능이다.', isCorrect: false },
      { id: 'no', text: 'NO, 시민단체와 이익집단도 정치사회화 기능을 수행할 수 있다.', isCorrect: true },
    ],
    explanation: '정치사회화는 정당뿐만 아니라 시민단체와 이익집단도 모두 수행할 수 있으므로 이것만으로 특정 집단이라 단정할 수 없습니다.',
  },
  {
    id: 'q2',
    question: '“정부 정책에 영향을 미친다.” 어느 집단에 해당하는가?',
    options: [
      { id: 'party', text: '정당', isCorrect: false },
      { id: 'civic', text: '시민단체', isCorrect: false },
      { id: 'interest', text: '이익집단', isCorrect: false },
      { id: 'cannot', text: '이것만으로 판단할 수 없다 (세 집단 모두 해당)', isCorrect: true },
    ],
    explanation: '정당, 시민단체, 이익집단 모두 정부의 법률 제정과 정책 결정 과정에 강력한 영향을 미치므로 이것만으로는 구별할 수 없습니다.',
  },
  {
    id: 'q3',
    question: '“여론 형성에 영향을 미친다.” 정당만의 고유한 기능이다.',
    options: [
      { id: 'o', text: 'O (그렇다)', isCorrect: false },
      { id: 'x', text: 'X (아니다)', isCorrect: true },
    ],
    explanation: '시민단체의 공론화 캠페인이나 이익집단의 성명 발표 역시 여론 형성에 중대한 영향을 미칩니다.',
  },
  {
    id: 'q4',
    question: '“정부를 감시한다.” 무조건 시민단체이다.',
    options: [
      { id: 'o', text: 'O (그렇다)', isCorrect: false },
      { id: 'x', text: 'X (아니다)', isCorrect: true },
    ],
    explanation: '야당을 비롯한 정당도 국회 국정감사나 대정부 질문 등을 통해 정부를 감시하고 견제합니다.',
  },
  {
    id: 'q5',
    question: '“공직 선거에 후보자를 공천하여 정권 획득을 추구한다.” 해당하는 조직은?',
    options: [
      { id: 'party', text: '정당 (Political Party)', isCorrect: true },
      { id: 'civic', text: '시민단체', isCorrect: false },
      { id: 'interest', text: '이익집단', isCorrect: false },
    ],
    explanation: '후보자 공천과 정권 획득 추구는 오직 정당만의 가장 결정적인 특징입니다!',
  },
  {
    id: 'q6',
    question: '“구성원의 특수한 이익 실현을 목적으로 조직된 집단이다.” 해당하는 조직은?',
    options: [
      { id: 'party', text: '정당', isCorrect: false },
      { id: 'civic', text: '시민단체', isCorrect: false },
      { id: 'interest', text: '이익집단 (Interest Group)', isCorrect: true },
    ],
    explanation: '의사회, 변호사회, 노동조합, 상인연합회처럼 동종 업계나 공통의 특수 이익 실현을 목적으로 하는 집단은 이익집단입니다.',
  },
  {
    id: 'q7',
    question: '“시민의 자발적인 참여를 바탕으로 공익을 추구하는 비영리적 단체이다.” 해당하는 조직은?',
    options: [
      { id: 'party', text: '정당', isCorrect: false },
      { id: 'civic', text: '시민단체 (Civic Group / NGO)', isCorrect: true },
      { id: 'interest', text: '이익집단', isCorrect: false },
    ],
    explanation: '자발성, 비영리성, 공익성을 3대 핵심 요건으로 삼아 사회 전체의 문제를 해결하려는 조직은 시민단체입니다.',
  },
];

// Part 5 6 Mystery Cases (3 simple, 3 tricky)
export const MYSTERY_CASES: OrganizationMysteryCase[] = [
  {
    id: 'case1',
    title: '사례 1: 푸른 지구 지킴이',
    description: '기후위기 극복과 도심 숲 조성을 위해 자발적으로 모인 시민들이 후원금으로 캠페인을 진행하고 있습니다.',
    feedSnippet: '“시민 여러분과 함께 도심 플라스틱 없는 날 서명운동을 전개합니다! 다음 세대를 위한 숲을 지켜주세요.”',
    correctType: 'civic',
    difficulty: 'simple',
    decisiveClues: ['공익 실현'],
    explanation: '자발성, 비영리성, 환경 보호라는 사회 전체의 공익 실현을 목적으로 하므로 시민단체입니다.',
  },
  {
    id: 'case2',
    title: '사례 2: 전국 배달 라이더 연합',
    description: '배달 플랫폼 노동자들의 안전 운행 환경과 최저 기본 배달료 보장을 위해 결성된 모임입니다.',
    feedSnippet: '“플랫폼 기업과 고용노동부에 안전운임제 도입과 라이더 상해보험료 지원 강화를 강력히 촉구합니다!”',
    correctType: 'interest',
    difficulty: 'simple',
    decisiveClues: ['구성원의 특수 이익'],
    explanation: '배달 노동자라는 공통된 직업군 구성원들의 경제적 권익과 특수한 이익을 실현하기 위한 조직이므로 이익집단입니다.',
  },
  {
    id: 'case3',
    title: '사례 3: 내일을 여는 사람들의 모임 (청년미래당)',
    description: '정치적 이념을 함께하는 당원들이 다가오는 국회의원 총선거에 청년 후보 15명을 발굴하여 출마시키기로 의결했습니다.',
    feedSnippet: '“중앙선거관리위원회 후보 등록을 마쳤습니다. 기호 O번을 선택하여 정권 교체와 새로운 대한민국을 열어주십시오!”',
    correctType: 'party',
    difficulty: 'simple',
    decisiveClues: ['공직 선거 후보자 공천', '정권 획득'],
    explanation: '공직 선거에 후보자를 공천하고 정권 획득을 직접적인 목표로 삼고 있으므로 명백한 정당입니다.',
  },
  {
    id: 'case4',
    title: '사례 4: 참된 소비자의 눈 (헷갈리는 사례 A)',
    description: '시중 유통되는 어린이 학용품의 유해물질 수치를 전수 조사하여 보도자료를 내고 정부의 안전기준 강화를 요구했습니다.',
    feedSnippet: '“정부 당국은 유해물질 허용치를 대폭 낮추고 단속을 강화하십시오. 시민 대상 안전 캠페인 카드뉴스를 배포합니다.”',
    correctType: 'civic',
    difficulty: 'tricky',
    decisiveClues: ['공익 실현'],
    explanation: '정책에 영향을 미치고 여론을 형성하고 있지만, 특정 업계의 이익이 아니라 모든 시민·어린이의 안전이라는 "공익 실현"을 위한 비영리 활동이므로 시민단체입니다.',
    trapWarning: '‘정부 정책에 영향’이나 ‘여론 형성’은 세 집단 모두의 공통 특징입니다. 조직의 궁극적 "목적(공익)"을 보아야 합니다!',
  },
  {
    id: 'case5',
    title: '사례 5: 대한 건축사 협의회 (헷갈리는 사례 B)',
    description: '새로운 건축법 개정안이 건축사들의 설계 감리 책임만 가중시킨다며 국회 국토교통위원회에 수정 의견서를 공식 제출했습니다.',
    feedSnippet: '“회원 여러분의 권익 보호를 위해 국회 공청회에 전문가 대표단을 파견하고 법적 자문 자료집을 배포했습니다.”',
    correctType: 'interest',
    difficulty: 'tricky',
    decisiveClues: ['구성원의 특수 이익'],
    explanation: '전문 자료를 제공하고 정부 정책에 영향을 주지만, 핵심 목적이 건축사라는 특정 집단 회원들의 "특수 이익과 권익 보호"이므로 이익집단입니다.',
    trapWarning: '‘전문 자료 제공 및 정책 영향’이라는 활동 방식보다, ‘건축사 회원의 특수 권익 추구’라는 목적이 핵심입니다.',
  },
  {
    id: 'case6',
    title: '사례 6: 함께 동행 포럼 (헷갈리는 사례 C)',
    description: '지역 주민들을 초청하여 청년 일자리 정책 아카데미를 열고 정치 참여 교육을 진행하면서, 다음 지방선거 구청장 후보를 당내 경선으로 선출 중입니다.',
    feedSnippet: '“정치 아카데미 수료식을 마쳤습니다. 이어 다음 달 구청장 선거 승리를 위한 공천 후보자 토론회를 생중계합니다.”',
    correctType: 'party',
    difficulty: 'tricky',
    decisiveClues: ['공직 선거 후보자 공천', '정권 획득'],
    explanation: '시민 교육(정치사회화)과 여론 조성을 하고 있지만, 결정적으로 ‘공직 선거 공천과 선거 승리(정권 획득)’을 추진하므로 정당입니다.',
    trapWarning: '‘정치 교육(정치사회화)’을 한다고 해서 시민단체라고 착각하면 안 됩니다! 공직 선거 공천과 정권 획득이 결정적 단서입니다.',
  },
];

// Part 7 Resident Participation Cases
export const RESIDENT_CASES: ResidentParticipationCase[] = [
  {
    id: 'case1',
    situation: '“우리 구청의 1년 예산 중 일부를 청소년 독서 공간 리모델링에 배정해 달라고 주민들이 직접 제안하고 투표하고 싶어요.”',
    keyword: '💰 예산',
    correctSystem: '주민참여예산제',
    description: '지방자치단체의 예산 편성 과정에 주민이 직접 참여하여 의견을 내고 예산 배정에 반영하도록 하는 제도입니다.',
  },
  {
    id: 'case2',
    situation: '“야간에 어두운 골목길 가로등 설치를 의무화하는 우리 동네 자치 법규(조례)를 새롭게 만들어 달라고 구의회에 주민 청원을 내고 싶어요.”',
    keyword: '📜 조례',
    correctSystem: '조례 제정·개정·폐지 청구',
    description: '지방자치단체의 법규인 조례를 주민들이 일정 수 이상의 서명을 모아 직접 만들거나 바꾸거나 폐지해 달라고 청구하는 제도입니다.',
  },
  {
    id: 'case3',
    situation: '“우리 시에 대규모 산업폐기물 매립장을 유치할지 말지 주민 전체가 투표로 직접 최종 결정하고 싶어요.”',
    keyword: '🗳 중요 정책 결정',
    correctSystem: '주민투표',
    description: '주민에게 중대한 영향을 미치는 지방자치단체의 주요 결정 사항에 대해 주민들이 직접 투표로 결정하는 제도입니다.',
  },
  {
    id: 'case4',
    situation: '“선출된 구청장이 직권을 남용하여 비리를 저질렀습니다. 임기가 끝나기 전에 주민들의 투표로 자리에서 물러나게 하고 싶어요.”',
    keyword: '👤 선출직 해임',
    correctSystem: '주민소환',
    description: '선거로 뽑힌 지방자치단체장이나 지방의회의원 등이 심각한 위법을 저질렀을 때 임기 만료 전 주민 투표로 파면(해임)할 수 있는 제도입니다.',
  },
  {
    id: 'case5',
    situation: '“구청이 특정 업체와 도로 공사 수의계약을 맺으면서 법을 위반한 정황이 의심됩니다. 상급 기관에 철저한 조사를 요구하고 싶어요.”',
    keyword: '🔎 위법·부당한 행정 감시',
    correctSystem: '주민감사청구',
    description: '지방자치단체의 행정 처리가 법에 어긋나거나 공익을 현저히 해친다고 판단될 때 일정 수의 주민 연서로 감사를 청구하는 제도입니다.',
  },
];

// Part 8 Final Check Questions (5 simple)
export const FINAL_CHECK_QUESTIONS = [
  {
    id: 'f1',
    question: '1. 정당·시민단체·이익집단 모두 정치사회화 기능을 수행할 수 있다.',
    type: 'ox',
    correctAnswer: 'O',
    explanation: '정답: O. 셋 다 시민과 구성원에게 정치적 지식과 태도, 참여 방법을 학습하게 하는 정치사회화 기능을 수행할 수 있습니다.',
  },
  {
    id: 'f2',
    question: '2. 정당만의 결정적인 특징으로 가장 적절한 것은?',
    type: 'choice',
    options: [
      'A. 사회문제에 대한 여론 형성',
      'B. 구성원의 정치사회화',
      'C. 정부 정책 결정에 영향 미치기',
      'D. 공직 선거에 후보자를 공천하고 정권 획득을 추구',
    ],
    correctAnswer: 'D. 공직 선거에 후보자를 공천하고 정권 획득을 추구',
    explanation: '정답: D. A, B, C는 세 집단 모두 나타날 수 있는 공통적인 성격이지만, 공직 후보자 공천과 정권 획득은 오직 정당만의 고유한 목적이자 기능입니다.',
  },
  {
    id: 'f3',
    question: '3. 공익 실현을 목적으로 시민이 자발적으로 조직한 비영리 단체는?',
    type: 'choice',
    options: ['정당', '시민단체', '이익집단', '국가인권위원회'],
    correctAnswer: '시민단체',
    explanation: '정답: 시민단체. 자발성, 비영리성, 공익성을 3대 핵심으로 하는 단체입니다.',
  },
  {
    id: 'f4',
    question: '4. 구성원의 특수한 이익을 실현하기 위해 조직된 집단은?',
    type: 'choice',
    options: ['정당', '시민단체', '이익집단', '주민자치회'],
    correctAnswer: '이익집단',
    explanation: '정답: 이익집단. 의사회, 변호사회, 노동조합 등 공통의 직업이나 이해관계를 가진 구성원의 특수한 권익을 추구합니다.',
  },
  {
    id: 'f5',
    question: '5. 정당·시민단체·이익집단을 구별할 때 가장 중요한 질문은?',
    type: 'choice',
    options: [
      '“이 조직은 인터넷 SNS 홍보를 하는가?”',
      '“이 조직은 무엇을 궁극적인 목적으로 활동하는가?”',
      '“이 조직은 정부 정책에 의견을 내는가?”',
      '“이 조직은 서명운동을 벌이는가?”',
    ],
    correctAnswer: '“이 조직은 무엇을 궁극적인 목적으로 활동하는가?”',
    explanation: '정답: “이 조직은 무엇을 궁극적인 목적으로 활동하는가?”. 활동 방식은 셋 다 겹칠 수 있으므로 목적(정권 획득 vs 공익 vs 특수 이익)을 확인해야 합니다.',
  },
];

export const CURRICULUM_PARTS = PARTS_META;

// Comprehensive 10-Question Exam for Part 8
export interface FinalQuizItem {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  explanation: string;
}

export const FINAL_QUIZ_DATA: FinalQuizItem[] = [
  {
    id: 1,
    question: '현대 민주주의 사회에서 ‘시민’에 대한 설명으로 가장 옳은 것은?',
    options: [
      '국가가 제정한 법률과 결정을 무조건 수동적으로 따르기만 하는 사람이다.',
      '선거 당일에만 참여하고 평소 일상에서는 정치에 관여하지 않는 존재이다.',
      '공동체의 주체로서 기본적 권리를 누리고, 사회적 의사 결정에 참여하며 책임을 다하는 주체이다.',
      '오직 공직 선거에 직접 출마하여 정치인이 되는 사람만을 의미한다.',
    ],
    correctAnswer: 2,
    explanation:
      '시민은 민주사회의 주인으로서 자유와 권리를 누릴 뿐 아니라, 일상 속에서 사회문제를 해결하고 공동체의 의사 결정 과정에 주체적으로 참여하며 책임을 다하는 사람입니다.',
  },
  {
    id: 2,
    question: '통학로 신호등 연장을 위해 안전신문고 앱으로 민원을 접수한 활동의 성격은?',
    options: [
      '정권을 획득하기 위한 정당 공천 활동이다.',
      '일상의 구체적인 생활 문제를 개선하기 위한 개별적 시민 참여이다.',
      '공직 선거 후보자를 직접 선출하는 투표 활동이다.',
      '법을 위반하여 사회적 처벌을 감수하는 행위이다.',
    ],
    correctAnswer: 1,
    explanation:
      '안전신문고 민원 제기, 청원 제출, 투표 등은 개별 시민이 일상 속에서 자신의 권리와 공동체의 개선을 위해 실행할 수 있는 개별적 시민 참여입니다.',
  },
  {
    id: 3,
    question: '정당이 공직 선거를 앞두고 유능한 인재를 발굴하여 선거에 출마할 후보자로 결정하는 기능은?',
    options: [
      '정치적 충원 기능',
      '이익 집약 기능',
      '정부 감시 기능',
      '지역 조례 제정 기능',
    ],
    correctAnswer: 0,
    explanation:
      '정당이 공직 선거에 출마할 후보자를 발굴하고 공천하여 국가의 공직자로 충원되도록 하는 것을 ‘정치적 충원 기능’이라고 합니다.',
  },
  {
    id: 4,
    question: '정당의 ‘이익 집약 기능’에 대한 설명으로 가장 적절한 것은?',
    options: [
      '국민들의 모든 요구를 심사 없이 있는 그대로 전부 수용하는 것이다.',
      '사회의 다양하고 상충하는 요구와 이해관계를 모아서 조정·종합하여 정책과 공약으로 제시하는 것이다.',
      '특정 직업 집단의 배타적이고 특수한 이익만을 대변하는 것이다.',
      '정부의 잘못을 상급 감사원에 고발하는 법적 절차이다.',
    ],
    correctAnswer: 1,
    explanation:
      '시민들의 다양한 요구는 서로 충돌할 수 있으므로, 정당은 이를 하나로 모아 조정하고 절충하여 전체 공익을 도모하는 정책과 공약으로 집약합니다.',
  },
  {
    id: 5,
    question: '선거에서 패배하여 정권을 잡지 못한 ‘야당(반대당)’의 올바른 역할은?',
    options: [
      '선거가 끝났으므로 다음 선거 전까지 모든 정치 활동을 중단한다.',
      '행정부와 여당의 정책을 덮어놓고 무조건 전면 찬성만 한다.',
      '정부와 여당의 권력 남용을 감시·비판·견제하고, 합리적인 정책 대안을 제시한다.',
      '법률을 제정할 권한을 완전히 박탈당한다.',
    ],
    correctAnswer: 2,
    explanation:
      '야당은 국민의 또 다른 목소리를 대변하며 정부와 여당의 일방적 독주를 감시·비판하고 대안을 제시함으로써 권력 분립과 민주주의 균형을 유지합니다.',
  },
  {
    id: 6,
    question: '시민단체(Civic Group/NGO)의 본질적 3대 특징으로 바르게 짝지어진 것은?',
    options: [
      '강제성, 영리성, 특수이익 추구',
      '자발성, 비영리성, 사회 전체의 공익 실현',
      '정권 획득 목적, 공직 후보 공천, 당비 납부',
      '직업적 이해관계, 폐쇄적 회원제, 이윤 분배',
    ],
    correctAnswer: 1,
    explanation:
      '시민단체는 시민들이 스스로 ‘자발적’으로 참여하고, 이윤을 추구하지 않는 ‘비영리성’을 띠며, 특정 집단이 아닌 ‘사회 전체의 공익’을 추구합니다.',
  },
  {
    id: 7,
    question: '이익집단(Interest Group)에 대한 이해로 가장 옳지 않은 것은?',
    options: [
      '의사회, 변호사회, 노동조합 등 공통의 이해관계를 가진 사람들이 조직한다.',
      '‘특수 이익’을 추구한다는 말은 이들이 사회적으로 부당하거나 나쁜 일을 한다는 뜻이다.',
      '자신들 구성원의 권익을 위해 정책 결정 과정에 전문적인 자료와 의견을 제시한다.',
      '공직 선거에 자체 후보자를 공천하여 정권을 획득하는 것이 목적이 아니다.',
    ],
    correctAnswer: 1,
    explanation:
      '민주사회에서 ‘특수 이익’은 특정 직업이나 이해관계자들의 고유한 권익을 뜻하며 결코 ‘나쁜 이익’을 의미하는 것이 아닙니다. 다원화된 민주사회에서는 정당한 권익 표출이 보장됩니다.',
  },
  {
    id: 8,
    question: '정당, 시민단체, 이익집단 세 조직 모두의 공통점으로 알맞은 것은?',
    options: [
      '모두 공직 선거에 후보자를 공천한다.',
      '모두 정권 획득을 최고 목표로 한다.',
      '모두 사회 전체의 공익만을 우선시한다.',
      '모두 여론 형성에 영향을 미치고 시민과 구성원의 정치사회화에 기여한다.',
    ],
    correctAnswer: 3,
    explanation:
      '여론 형성, 정치사회화 기여, 정책 결정 과정에 영향력 행사, 집단적 참여의 통로 등은 세 조직 모두가 공통적으로 수행하는 기능입니다.',
  },
  {
    id: 9,
    question: '“구청 예산을 주민들이 원하는 분야에 배정할 수 있도록 직접 제안하고 싶다”에 알맞은 제도는?',
    options: [
      '주민참여예산제',
      '조례 제정·개정·폐지 청구',
      '주민투표',
      '주민소환',
    ],
    correctAnswer: 0,
    explanation:
      '지방자치단체가 예산을 편성하는 과정에 주민이 직접 참여하여 의견을 내고 예산 배정에 반영하도록 하는 제도는 ‘주민참여예산제’입니다.',
  },
  {
    id: 10,
    question: '선출된 지자체장이나 지방의회 의원이 중대한 잘못을 저질렀을 때 임기 만료 전 투표로 해임하는 제도는?',
    options: [
      '주민소환',
      '주민감사청구',
      '주민투표',
      '공청회',
    ],
    correctAnswer: 0,
    explanation:
      '선출직 지방 공직자의 위법·부당한 행위에 대해 주민들이 임기 만료 전 투표를 통해 직위를 상실(파면)시키는 제도는 ‘주민소환’입니다.',
  },
];

