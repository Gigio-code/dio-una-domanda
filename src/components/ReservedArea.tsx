import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Lock, ShieldCheck } from "lucide-react";

const ACCESS_CODE = "domanda";

const previewMaterials = [
  {
    title: "Schede classe",
    body: "Piste brevi per aprire una discussione, leggere un testo, osservare un'immagine.",
  },
  {
    title: "Attività in 20 minuti",
    body: "Domande a bruciapelo, piccoli casi, scelte da difendere senza risposte preconfezionate.",
  },
  {
    title: "Immagini-stimolo",
    body: "Simboli, scene, parole e materiali visivi per far partire il confronto.",
  },
];

const materials = [
  {
    title: "1ª - Mito, sacro, origine",
    body: "Dio in una parola, miti di creazione, sacro/profano, immagini di Dio, laboratorio crea una religione.",
  },
  {
    title: "2ª - Riti, corpo, identità",
    body: "Preghiera, cibo, feste, appartenenza, telefono sacro/profano, creare un rito.",
  },
  {
    title: "3ª - Libertà, coscienza, conflitto",
    body: "Fratture religiose, libertà religiosa, identità, legge sacra, scelta personale.",
  },
  {
    title: "4ª - Legge, potere, responsabilità",
    body: "Kohlberg, tentazione, bene e male, obbedire o interpretare, casi morali.",
  },
  {
    title: "5ª - Limite, crisi, futuro",
    body: "Morte, destino, Stato-Chiesa, bioetica, IA, dati, corpo, potere.",
  },
];

export default function ReservedArea() {
  const [code, setCode] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");
  const unlockedHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (unlocked) {
      unlockedHeadingRef.current?.focus();
    }
  }, [unlocked]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (code.trim().toLowerCase() === ACCESS_CODE) {
      setUnlocked(true);
      setError("");
      return;
    }
    setError("Codice non corretto. Questa prima versione usa una protezione leggera.");
  }

  if (unlocked) {
    return (
      <section className="reserved unlocked" aria-live="polite">
        <div className="reserved-heading">
          <ShieldCheck size={28} aria-hidden="true" />
          <div>
            <p className="eyebrow">Materiali per la classe</p>
            <h2 ref={unlockedHeadingRef} tabIndex={-1}>
              Percorsi didattici non sensibili
            </h2>
          </div>
        </div>
        <div className="card-grid">
          {materials.map((item) => (
            <article className="card" key={item.title}>
              <p className="eyebrow">{item.title.split(" - ")[0]}</p>
              <h3>{item.title.split(" - ")[1]}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="reserved" aria-label="Materiali per la classe">
      <div className="reserved-heading">
        <Lock size={28} aria-hidden="true" />
        <div>
          <p className="eyebrow">Materiali per la classe</p>
          <h2>Prima guarda cosa c'è dentro</h2>
        </div>
      </div>
      <p>
        Dentro trovi schede, immagini guida, attività brevi e materiali per aprire la discussione. Non ci sono voti, foto, dati personali o elaborati identificabili.
      </p>
      <div className="preview-grid" aria-label="Anteprima materiali">
        {previewMaterials.map((item) => (
          <article className="card" key={item.title}>
            <p className="eyebrow">Anteprima</p>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
      <p className="security-note">
        Nota tecnica: questo codice classe è una protezione leggera, adatta solo a materiali didattici non sensibili.
      </p>
      <form onSubmit={submit} className="access-form">
        <label htmlFor="access-code">Codice classe</label>
        <div>
          <input
            id="access-code"
            type="password"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="Inserisci codice"
            autoComplete="current-password"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "access-code-error" : undefined}
          />
          <button type="submit">Entra nei materiali</button>
        </div>
        {error && (
          <p className="form-error" id="access-code-error" role="alert">
            {error}
          </p>
        )}
      </form>
    </section>
  );
}
