import Link from 'next/link'
import pkg from '../package.json'
import styles from './page.module.css'

const description =
  'Philoset is a zero-dependency CLI that adds curated engineering principles to any project as plain Markdown — version them in Git, edit them like code, and browse them here.'

export const metadata = {
  title: 'Philoset — Engineering principles as editable Markdown',
  description,
  openGraph: {
    title: 'Philoset — Engineering principles as editable Markdown',
    description,
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Philoset — Engineering principles as editable Markdown',
    description
  }
}

const FEATURES = [
  {
    title: 'Documented principles',
    body: 'Capture engineering decisions in a format that survives team turnover and every onboarding cycle.',
    icon: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="9" y1="13" x2="15" y2="13" />
        <line x1="9" y1="17" x2="15" y2="17" />
      </>
    )
  },
  {
    title: 'Shared vocabulary',
    body: 'Establish common language so reviews, RFCs, and design docs always speak the same dialect across teams.',
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
      </>
    )
  },
  {
    title: 'Architectural clarity',
    body: 'Codify service boundaries, layering, and trade-offs up front — before they become expensive to undo.',
    icon: (
      <>
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </>
    )
  },
  {
    title: 'Lessons preserved',
    body: 'Lock in post-mortem wisdom — the failed approaches and hard-won trade-offs that shaped the system.',
    icon: (
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    )
  }
]

const STATS = [
  { n: '0', l: 'Dependencies' },
  { n: 'MIT', l: 'Licensed' },
  { n: '100%', l: 'Markdown' },
  { n: 'npx', l: 'One command' }
]

export default function HomePage() {
  return (
    <main className={styles.landing}>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <span className={styles.badge}>
          <span className={styles.badgeChip}>v{pkg.version}</span>
          Curated engineering principles
        </span>

        <h1 className={styles.title}>
          Build software on <span className={styles.accent}>clear principles</span>, not folklore.
        </h1>

        <p className={styles.lede}>
          Philoset is a zero-dependency CLI that adds curated engineering
          principles to any project as plain Markdown — version them in Git,
          edit them like code, and browse them right here.
        </p>

        <div className={styles.ctas}>
          <a
            className={`${styles.btn} ${styles.btnPrimary}`}
            href="https://www.npmjs.com/package/philoset"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Get on npm
            <span className={styles.srOnly}> (opens in a new tab)</span>
          </a>

          <Link className={`${styles.btn} ${styles.btnOutline}`} href="/philosophy">
            Browse philosophy
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className={styles.terminal}>
          <div className={styles.trmBar} aria-hidden="true">
            <span className={styles.trmDots}>
              <span className={`${styles.trmDot} ${styles.dRed}`} />
              <span className={`${styles.trmDot} ${styles.dYel}`} />
              <span className={`${styles.trmDot} ${styles.dGrn}`} />
            </span>
            <span className={styles.trmLabel}>philoset — zsh</span>
          </div>
          <pre className={styles.trmBody}>
            <span className={styles.tp} aria-hidden="true">❯ </span>
            <span className={styles.tc}>npm install </span>
            <span className={styles.tf}>philoset</span>
            {'\n\n'}
            <span className={styles.tp} aria-hidden="true">❯ </span>
            <span className={styles.tc}>npx philoset </span>
            <span className={styles.tf}>list</span>
            {'\n'}
            <span className={styles.td}>  # list all available documents</span>
            {'\n\n'}
            <span className={styles.tp} aria-hidden="true">❯ </span>
            <span className={styles.tc}>npx philoset </span>
            <span className={styles.tf}>add</span>
            {'\n'}
            <span className={styles.td}>  # open the interactive picker</span>
            {'\n\n'}
            <span className={styles.tp} aria-hidden="true">❯ </span>
            <span className={styles.tc}>npx philoset </span>
            <span className={styles.tf}>add backend</span>
            {'\n'}
            <span className={styles.td}>  # add a specific document directly</span>
          </pre>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────── */}
      <ul className={styles.stats} aria-label="Project facts">
        {STATS.map((s) => (
          <li className={styles.stat} key={s.l}>
            <span className={styles.statN}>{s.n}</span>
            <span className={styles.statL}>{s.l}</span>
          </li>
        ))}
      </ul>

      {/* ── Why Philoset ─────────────────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.secHead}>
          <span className={styles.eyebrow}>
            <span className={styles.ebrowLine} aria-hidden="true" />
            Why it matters
            <span className={styles.ebrowLine} aria-hidden="true" />
          </span>
          <h2 className={styles.secTitle}>Document the why, not just the what</h2>
          <p className={styles.secSub}>
            Most decisions behind a codebase never get written down. Philoset
            captures the reasoning so the next engineer doesn&apos;t have to
            re-derive it.
          </p>
        </div>

        <ul className={styles.grid}>
          {FEATURES.map((f) => (
            <li className={styles.card} key={f.title}>
              <span className={styles.featIcon} aria-hidden="true">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {f.icon}
                </svg>
              </span>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardText}>{f.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
