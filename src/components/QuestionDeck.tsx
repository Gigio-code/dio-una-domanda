import { useMemo, useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";

const entries = [
  {
    label: "Una paura",
    question: "Che cosa fai quando una domanda ti mette paura, ma continua a tornare?",
    href: "/la-domanda",
  },
  {
    label: "Un dubbio",
    question: "Credere, dubitare, non sapere: quale di queste parole ti assomiglia oggi?",
    href: "/filosofia",
  },
  {
    label: "Un gesto",
    question: "Quando un'abitudine diventa rito e inizia a dire chi sei?",
    href: "/religioni",
  },
  {
    label: "Un'origine",
    question: "Quale storia racconti quando vuoi spiegare da dove vieni?",
    href: "/mito-e-sacro",
  },
  {
    label: "Uno schermo",
    question: "Quanto vali quando nessuno reagisce?",
    href: "/nuovi-sacri",
  },
];

export default function QuestionDeck() {
  const [index, setIndex] = useState(0);
  const current = useMemo(() => entries[index], [index]);

  function choose(nextIndex: number) {
    setIndex(nextIndex);
  }

  function next() {
    setIndex((value) => (value + 1) % entries.length);
  }

  function reset() {
    setIndex(0);
  }

  return (
    <section className="interactive-panel question-deck" aria-label="Domande guidate">
      <div>
        <p className="eyebrow">Domanda guidata</p>
        <h2>Oggi parti da...</h2>
      </div>
      <div className="question-choices" aria-label="Scegli un punto di partenza">
        {entries.map((entry, entryIndex) => (
          <button
            type="button"
            className={entryIndex === index ? "choice-button active" : "choice-button"}
            onClick={() => choose(entryIndex)}
            key={entry.label}
          >
            {entry.label}
          </button>
        ))}
      </div>
      <div className="question-result">
        <p className="eyebrow">Prova a portare questa in classe</p>
        <h3 aria-live="polite" aria-atomic="true">
          {current.question}
        </h3>
      </div>
      <div className="panel-actions">
        <a className="button" href={current.href}>
          <ArrowRight size={18} aria-hidden="true" />
          Entra da qui
        </a>
        <button type="button" className="ghost-button" onClick={next}>
          Cambiami domanda
        </button>
        <button type="button" className="ghost-button" onClick={reset} aria-label="Riparti dalla prima domanda">
          <RotateCcw size={18} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
