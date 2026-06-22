import { useMemo, useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";

const prompts = [
  "Che cosa ti viene in mente quando senti la parola Dio?",
  "Dio è una risposta o una domanda?",
  "Si può cercare Dio anche senza sapere se ci si crede?",
  "Che cosa sto diventando mentre cerco una risposta?",
  "L'uomo moderno ha smesso di credere o ha solo cambiato altari?",
];

export default function QuestionDeck() {
  const [index, setIndex] = useState(0);
  const current = useMemo(() => prompts[index], [index]);

  function next() {
    setIndex((value) => (value + 1) % prompts.length);
  }

  function reset() {
    setIndex(0);
  }

  return (
    <section className="interactive-panel" aria-label="Domande guidate">
      <div>
        <p className="eyebrow">Domanda guidata</p>
        <h2 aria-live="polite" aria-atomic="true">
          {current}
        </h2>
      </div>
      <div className="panel-actions">
        <button type="button" onClick={next}>
          <ArrowRight size={18} aria-hidden="true" />
          Nuova domanda
        </button>
        <button type="button" className="ghost-button" onClick={reset}>
          <RotateCcw size={18} aria-hidden="true" />
          Riparti
        </button>
      </div>
    </section>
  );
}
