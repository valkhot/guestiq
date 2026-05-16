// src/components/question/Question.jsx
// GuestIQ — Standard Question Component (orchestrator)
// S3-04: EpisodeMap integrated — progress bar and episode nodes on every screen.
// S3-09: Migrated to Tailwind utility classes; tier colours from constants module.

import SingleSelectQuestion from './SingleSelectQuestion';
import ScaleQuestion from './ScaleQuestion';
import EpisodeMap from './EpisodeMap';
import { getTierHex } from '../../constants/tierColors';

// NOTE: multi_select currently routes to SingleSelectQuestion.
// This is tracked in proposed backlog story S3-19 — decide whether to build a
// dedicated MultiSelectQuestion component or remove the misleading mapping.
const QUESTION_RENDERERS = {
  single_select: SingleSelectQuestion,
  multi_select:  SingleSelectQuestion,
  scale_5:       ScaleQuestion,
};

export default function Question({
  question,
  tenseFrame,
  onAnswer,
  questionNumber,
  episodeName,
  tier,
  // S3-04 props
  episodes,
  currentEpisode,
  progressWithinEpisode,
}) {
  const questionText =
    question.text[tenseFrame || 'retrospective'] || question.text.retrospective;

  const Renderer = QUESTION_RENDERERS[question.type];
  const tierColor = getTierHex(tier);

  if (!Renderer) {
    return (
      <div className="p-8 text-semantic-error">
        Unknown question type: {question.type}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas-respondent flex flex-col">
      {/* Top bar — episode map + progress */}
      <div className="pt-3.5 pb-2 border-b border-white/[0.06]">
        {/* Question counter + episode name */}
        <div
          className={
            'flex justify-between items-center max-w-[720px] mx-auto px-6 mb-2'
          }
        >
          <span className="text-xs text-neutral-600">{questionNumber}</span>
          <span className="text-xs text-neutral-600 font-medium">
            {episodeName}
          </span>
        </div>

        {/* Episode map with progress bar */}
        {episodes && episodes.length > 0 ? (
          <EpisodeMap
            episodes={episodes}
            currentEpisode={currentEpisode || 1}
            progressWithinEp={progressWithinEpisode || 0}
            tier={tier}
          />
        ) : (
          // Fallback plain progress bar if episodes not yet available
          <div className="max-w-[720px] mx-auto px-6">
            <div
              className="rounded-sm bg-white/5"
              style={{ height: '3px' }}
            />
          </div>
        )}
      </div>

      {/* Question content */}
      <div className="flex-1 max-w-[720px] w-full mx-auto px-6 py-8">
        <h2
          className={
            'font-semibold text-primary leading-snug ' +
            (question.instruction ? 'mb-2' : 'mb-7')
          }
          style={{ fontSize: 'clamp(1.05rem, 2.5vw, 1.2rem)' }}
        >
          {questionText}
        </h2>

        {question.instruction && (
          <p className="text-sm text-muted mb-7 leading-relaxed">
            {question.instruction}
          </p>
        )}

        <Renderer question={question} onAnswer={onAnswer} tierColor={tierColor} />
      </div>
    </div>
  );
}
