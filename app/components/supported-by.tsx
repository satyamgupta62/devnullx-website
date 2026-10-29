const supporters = [
  {
    name: "SIIC at IIT Kanpur",
    src: "/supporters/siic.webp",
    width: 481,
    height: 105,
  },
  {
    name: "STPI NEXT",
    src: "/supporters/stpinext.webp",
    width: 640,
    height: 100,
  },
  {
    name: "Kalpataru CoE",
    src: "/supporters/kalpataru.webp",
    width: 540,
    height: 620,
  },
  {
    name: "Startup India",
    src: "/supporters/startupindia.webp",
    width: 222,
    height: 82,
  },
  {
    name: "Startup UP",
    src: "/supporters/startinup.webp",
    width: 219,
    height: 72,
  },
  {
    name: "MSME",
    src: "/supporters/msme.webp",
    width: 640,
    height: 352,
  },
  {
    name: "STPI CoE",
    src: "/supporters/stpicoe.webp",
    width: 300,
    height: 144,
  },
  {
    name: "SPTBI",
    src: "/supporters/sptbi.svg",
    width: 300,
    height: 120,
  },
] as const;

export function SupportedBy() {
  return (
    <section aria-labelledby="supported-title" className="supported-by">
      <span className="section-kicker">Institutional backing</span>
      <h2 id="supported-title">Incubated and supported by</h2>
      <ul className="supported-by__grid">
        {supporters.map((supporter) => (
          <li key={supporter.name}>
            <span className="supported-by__chip">
              {/* biome-ignore lint/performance/noImgElement: vinext's image optimizer requires an unavailable worker ASSETS binding; these pre-optimized logos are served directly. */}
              <img
                alt={`${supporter.name} logo`}
                decoding="async"
                height={supporter.height}
                loading="lazy"
                src={supporter.src}
                width={supporter.width}
              />
            </span>
            <small>{supporter.name}</small>
          </li>
        ))}
      </ul>
    </section>
  );
}
