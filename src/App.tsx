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
    <div className="min-h-screen bg-[#FAF8F5] text-stone-800 font-sans flex flex-col relative overflow-x-hidden selection:bg-amber-100 selection:text-amber-900">
      {/* Ambient background pastel blobs for organic life */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed top-1/3 right-10 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-10 left-10 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Navigation Header */}
      <Header
        currentPart={currentPart}
        parts={CURRICULUM_PARTS}
        onSelectPart={(id) => setCurrentPart(id)}
        completedParts={completedParts}
        isPhoneFrame={isPhoneFrame}
        onTogglePhoneFrame={() => setIsPhoneFrame(!isPhoneFrame)}
        onResetProgress={handleResetProgress}
      />

      {/* Main Content Area (Spacious 900~1050px Feed / Magazine Layout) */}
      <main className="flex-1 flex justify-center px-4 py-6 sm:py-10 md:py-12">
        <div
          className={`w-full transition-all duration-300 ${
            isPhoneFrame
              ? 'max-w-md bg-white/95 rounded-[2.5rem] shadow-2xl border-8 border-stone-800 p-5 sm:p-7 overflow-hidden'
              : 'max-w-5xl'
          }`}
        >
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
            <Part8CivicReport onResetAll={handleResetProgress} />
          )}
        </div>
      </main>
    </div>
  );
}
