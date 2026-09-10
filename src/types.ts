export type PartId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface PartInfo {
  id: PartId;
  title: string;
  subtitle: string;
  timeStr: string;
  iconName: string;
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation?: string;
}

export interface MultiSelectCheck {
  id: string;
  text: string;
  isCorrect: boolean;
}

export type OrgType = 'party' | 'civic' | 'interest';

export interface OrgProfile {
  type: OrgType;
  name: string;
  badge: string;
  color: string;
  borderColor: string;
  bgColor: string;
  lightBg: string;
  textColor: string;
  corePurpose: string;
  candidateNomination: boolean;
  seekPower: boolean;
  mainInterest: string;
}

export interface OrganizationMysteryCase {
  id: string;
  title: string;
  description: string;
  feedSnippet: string;
  correctType: OrgType;
  difficulty: 'simple' | 'tricky';
  decisiveClues: string[]; // Valid clues that prove this type
  explanation: string;
  trapWarning?: string;
}

export interface ResidentParticipationCase {
  id: string;
  situation: string;
  keyword: string;
  correctSystem: string;
  description: string;
}
