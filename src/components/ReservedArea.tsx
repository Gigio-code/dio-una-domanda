import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Lock, ShieldCheck } from "lucide-react";

const ACCESS_CODE = "domanda";

const materials = [
  {
    title: "1ª - Mito, sacro, origine",
    body: "Tracce per aprire il percorso: mito, simbolo, sacro, racconti di origine.",
  },
  {
    title: "2ª - Riti, corpo, identità",
    body: "Schede per osservare pratiche religiose, feste, gesti, luoghi e appartenenza.",
  },
  {
    title: "3ª - Libertà religiosa",
    body: "Domande per discutere scelta, pluralismo, dialogo e coscienza.",
  },
  {
    title: "4ª - Legge, potere, interpretazione",
    body: "Materiali per ragionare su autorità, bene, norma e responsabilità.",
  },
  {
    title: "5ª - Limite, crisi, futuro",
    body: "Percorsi su morte, tecnologia, IA, crisi del sacro e futuro dell'umano.",
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
    setError("Codice non corretto. Questa prima versione usa una password semplice.");
  }

  if (unlocked) {
    return (
      <section className="reserved unlocked" aria-live="polite">
        <div className="reserved-heading">
          <ShieldCheck size={28} aria-hidden="true" />
          <div>
            <p className="eyebrow">Accesso classi</p>
            <h2 ref={unlockedHeadingRef} tabIndex={-1}>
              Materiali didattici non sensibili
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
    <section className="reserved" aria-label="Area riservata">
      <div className="reserved-heading">
        <Lock size={28} aria-hidden="true" />
        <div>
          <p className="eyebrow">Area riservata</p>
          <h2>Accesso leggero per materiali di classe</h2>
        </div>
      </div>
      <p>
        Questa sezione non raccoglie dati personali, voti, foto di minori o
        elaborati identificabili. Per iniziare contiene solo materiali
        didattici e percorsi.
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
          <button type="submit">Entra</button>
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
