/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PartId } from './types';
import { CURRICULUM_PARTS } from './data/curriculumData';
import { Header } from './components/Header';
import { Part1CitizenIntro } from './components/Part1CitizenIntro';
import { Part2IndividualAction } from './components/Part2IndividualAction';
import { Part3CollectiveIntro } from './components/Part3CollectiveIntro';
import { Part4WhoAreYou } from './components/Part4WhoAreYou';
import { Part5CompareOrganizations } from './components/Part5CompareOrganizations';
import { Part6TodayCivicNotice } from './components/Part6TodayCivicNotice';
import { Part7LocalCenter } from './components/Part7LocalCenter';
import { Part8CivicReport } from './components/Part8CivicReport';

export default function App() {
  const [currentPart, setCurrentPart] = useState<PartId>(1);
  const [completedParts, setCompletedParts] = useState<Set<PartId>>(new Set());
  const [isPhoneFrame, setIsPhoneFrame] = useState<boolean>(false);

  // Scroll to top on part change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPart]);

  const handleCompletePart = (partId: PartId) => {
    setCompletedParts((prev) => {
      const next = new Set(prev);
      next.add(partId);
      return next;
    });
  };

  const handleNextPart = () => {
    if (currentPart < 8) {
      setCurrentPart((prev) => (prev + 1) as PartId);
    }
  };

  const handleResetProgress = () => {
    if (window.confirm('시뮬레이션을 처음부터 다시 시작하시겠습니까?')) {
      setCurrentPart(1);
      setCompletedParts(new Set());
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans flex flex-col">
      {/* Top Mobile Status Bar & Navigation Header */}
      <Header
        currentPart={currentPart}
        parts={CURRICULUM_PARTS}
        onSelectPart={(id) => setCurrentPart(id)}
        completedParts={completedParts}
        isPhoneFrame={isPhoneFrame}
        onTogglePhoneFrame={() => setIsPhoneFrame(!isPhoneFrame)}
        onResetProgress={handleResetProgress}
      />

      {/* Main Container (Responsive Full or Phone Frame) */}
      <main className="flex-1 flex justify-center p-3 sm:p-5 md:p-8">
        <div
          className={`w-full transition-all duration-300 ${
            isPhoneFrame
              ? 'max-w-md bg-white rounded-3xl shadow-2xl border-4 border-slate-800 p-4 sm:p-6 overflow-hidden'
              : 'max-w-4xl'
          }`}
        >
          {/* Content Switching based on currentPart */}
          {currentPart === 1 && (
            <Part1CitizenIntro
              onComplete={() => handleCompletePart(1)}
              onNext={handleNextPart}
            />
          )}

          {currentPart === 2 && (
            <Part2IndividualAction
              onComplete={() => handleCompletePart(2)}
              onNext={handleNextPart}
            />
          )}

          {currentPart === 3 && (
            <Part3CollectiveIntro
              onComplete={() => handleCompletePart(3)}
              onNext={handleNextPart}
            />
          )}

          {currentPart === 4 && (
            <Part4WhoAreYou
              onComplete={() => handleCompletePart(4)}
              onNext={handleNextPart}
            />
          )}

          {currentPart === 5 && (
            <Part5CompareOrganizations
              onComplete={() => handleCompletePart(5)}
              onNext={handleNextPart}
            />
          )}

          {currentPart === 6 && (
            <Part6TodayCivicNotice
              onComplete={() => handleCompletePart(6)}
              onNext={handleNextPart}
            />
          )}

          {currentPart === 7 && (
            <Part7LocalCenter
              onComplete={() => handleCompletePart(7)}
              onNext={handleNextPart}
            />
          )}

          {currentPart === 8 && (
            <Part8CivicReport
              onResetAll={() => {
                setCurrentPart(1);
                setCompletedParts(new Set());
              }}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-400">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>고등학교 1학년 통합사회2 · 정치 과정과 시민 참여 시뮬레이션</span>
          <span>© 2026 오늘도 시민입니다 | 내 선택이 사회에 닿는 방법</span>
        </div>
      </footer>
    </div>
  );
}

