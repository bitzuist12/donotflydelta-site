import {
  AlertTriangle,
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  Clock3,
  FileText,
  Newspaper,
  Plane,
  ShieldAlert,
  Siren,
} from 'lucide-react'
import './App.css'

const officialSources = [
  {
    label: 'Delta Contract of Carriage',
    href: 'https://www.delta.com/us/en/legal/contract-of-carriage-dgr',
  },
  {
    label: 'Delta Customer Service Plan',
    href: 'https://www.delta.com/us/en/legal/customer-commitment',
  },
  {
    label: 'DOT Airline Customer Service Dashboard',
    href: 'https://www.transportation.gov/airconsumer/airline-customer-service-dashboard',
  },
]

const timeline = [
  ['June 25, 2026', 'DL915 LAX -> JFK was scheduled as an overnight transcontinental flight.'],
  ['June 26, 2026', 'Delta rebooked to DL939 departing 12:15 PM and arriving JFK 8:58 PM.'],
  ['June 26, 2026', 'Turkish Airlines itinerary changed after the JFK plan became unusable.'],
  ['July-August 2026', 'Delta denied reimbursement and later called the matter final.'],
]

const reports = [
  {
    title: 'BTS on-time and cancellation data',
    note: 'Official DOT/BTS data shows airline delay and cancellation rates through June 2026.',
    href: 'https://www.transtats.bts.gov/ontime/',
    kind: 'Official data',
  },
  {
    title: 'DOT customer-service commitments',
    note: 'DOT says airlines must adhere to their controllable cancellation commitments.',
    href: 'https://www.transportation.gov/airconsumer/airline-customer-service-dashboard',
    kind: 'Official policy',
  },
  {
    title: 'Delta 2026 cancellations reporting',
    note: 'Simple Flying reported Delta cancellations nearly doubled in the first half of 2026, citing DOT data.',
    href: 'https://simpleflying.com/delta-air-lines-cancels-nearly-twice-many-flights-2025/',
    kind: 'Travel news',
  },
  {
    title: 'Crew and scheduling disruption reporting',
    note: 'Business Insider reported Delta cancellations tied to crew scheduling challenges in 2026.',
    href: 'https://www.businessinsider.com/delta-canceling-flights-crew-scheduling-challenges-2026-5',
    kind: 'News report',
  },
  {
    title: 'Next-day rebooking after cancellation',
    note: 'Public Reddit discussion about a Delta cancellation and next-day rebooking.',
    href: 'https://www.reddit.com/r/delta/comments/14axttt/delta_cancelled_my_flight_and_rescheduled_it_a/',
    kind: 'Public report',
  },
  {
    title: 'What is a reasonable hotel cost?',
    note: 'Passenger asks how Delta defines reasonable hotel reimbursement after a delay.',
    href: 'https://www.reddit.com/r/delta/comments/1ea1gm9/delta_delay_hotel_reimbursement_what_is_a/',
    kind: 'Public report',
  },
  {
    title: 'Separate-ticket connection risk',
    note: 'Public discussion of missed onward travel when tickets are separate.',
    href: 'https://www.reddit.com/r/delta/comments/1qczsha/flight_got_delayed_over_4h_and_i_missed_my/',
    kind: 'Public report',
  },
  {
    title: 'Hotel voucher confusion',
    note: 'Passenger report about being told to book a hotel and later facing reimbursement issues.',
    href: 'https://www.reddit.com/r/delta/comments/1mfchvw/told_by_delta_to_book_hotel_due_to_cancelled/',
    kind: 'Public report',
  },
  {
    title: 'Facebook complaint community',
    note: 'A public Facebook group exists specifically for Delta Air Lines customer complaints.',
    href: 'https://www.facebook.com/groups/715221316650289/',
    kind: 'Facebook',
  },
  {
    title: 'X posts tracking Delta cancellations',
    note: 'Public X posts circulated DOT-based claims about Delta cancellations in early 2026.',
    href: 'https://x.com/AirlineHub1/status/2087648992125448559',
    kind: 'X / Twitter',
  },
  {
    title: 'Corporate rules vs human reality',
    note: 'LinkedIn post describes a Delta disruption where the ticket was refunded and a voucher offered, while partner-airline disconnect impacts remained disputed.',
    href: 'https://www.linkedin.com/posts/horn-jason_when-corporate-rules-ignore-human-reality-activity-7495534260502618112-oTzX',
    kind: 'LinkedIn',
  },
  {
    title: 'Eight hours onboard, then cancellation',
    note: 'LinkedIn passenger report describes a long onboard delay, crew timeout, cancellation, and limited voucher support.',
    href: 'https://www.linkedin.com/posts/yuvalgolan1_8-hours-onboard-no-food-no-updates-activity-7406701841633247232-cjui',
    kind: 'LinkedIn',
  },
  {
    title: 'Delta says vouchers can exist',
    note: 'Delta CEO public post after the 2024 disruption referenced meal vouchers, hotel accommodations, and transportation where available.',
    href: 'https://www.linkedin.com/posts/edbastian_like-many-companies-worldwide-delta-air-activity-7220856278506422272-Nc3m',
    kind: 'Delta statement',
  },
]

const reliability = [
  {
    value: '1.71%',
    label: 'cancelled',
    note: 'BTS delay-cause page displayed a 1.71% cancellation figure for June 2026 airline on-time performance.',
  },
  {
    value: '73.12%',
    label: 'on time',
    note: 'BTS displayed 73.12% on-time performance in the same June 2026 delay-cause view.',
  },
  {
    value: '2.35%',
    label: 'reported Delta 1H 2026 cancellation rate',
    note: 'Simple Flying reported Delta’s domestic cancellation rate rose to 2.35% in H1 2026, citing DOT data.',
  },
]

const checklist = [
  'Do not rely on a tight separate-ticket connection if timing matters.',
  'Screenshot every cancellation notice, rebooking option, chat, and receipt.',
  'Ask directly whether the reason is within the airline’s control.',
  'Ask for hotel, meal, and ground-transportation vouchers before leaving the airport.',
  'File a DOT complaint if the airline gives a vague or final non-answer.',
]

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
      <ArrowUpRight aria-hidden="true" />
    </a>
  )
}

function App() {
  return (
    <main>
      <section className="hero">
        <nav aria-label="Primary">
          <div className="brand">
            <Siren aria-hidden="true" />
            <span>DoNotFlyDelta.com</span>
          </div>
          <a className="nav-link" href="#reports">
            Passenger reports
          </a>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Independent consumer warning</p>
            <h1>Beware Booking Delta</h1>
            <p className="lede">
              Delta can cancel a flight within its control, rebook you too late, and still say
              same-day transportation is not guaranteed.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#case">
                Read the DL915 case
              </a>
              <a className="secondary-button" href="#checklist">
                Protect your trip
              </a>
            </div>
          </div>

          <aside className="signal-panel" aria-label="Key warning">
            <div className="status-row">
              <AlertTriangle aria-hidden="true" />
              <span>Time-sensitive travel risk</span>
            </div>
            <p>
              If your Delta flight is the positioning leg for a graduation, meeting, medical
              appointment, wedding, or international connection, a next-day rebooking may be useless.
            </p>
            <dl>
              <div>
                <dt>Delta stated</dt>
                <dd>Same-day transport is not guaranteed</dd>
              </div>
              <div>
                <dt>Delta stated</dt>
                <dd>Separate onward travel is not protected</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="warning-band">
        <ShieldAlert aria-hidden="true" />
        <p>
          This site is not affiliated with Delta Air Lines. It publishes factual criticism,
          documented cases, public passenger reports, and links to official airline / DOT policies.
        </p>
      </section>

      <section id="case" className="section case-section">
        <div className="section-heading">
          <p className="eyebrow">Anchor case</p>
          <h2>DL915: canceled overnight, rebooked too late</h2>
          <p>
            This case is documented with Delta correspondence, DOT complaint records, flight-change
            evidence, and official policy links.
          </p>
        </div>

        <div className="case-grid">
          <article className="case-card strong">
            <Plane aria-hidden="true" />
            <h3>The flight</h3>
            <p>
              DL915 LAX {'->'} JFK was an overnight transcontinental flight scheduled for June 25,
              2026. Delta later described the cancellation reason as “unavailable aircraft” and
              within Delta’s operational control.
            </p>
          </article>
          <article className="case-card">
            <Clock3 aria-hidden="true" />
            <h3>The replacement</h3>
            <p>
              Delta identified DL939 on June 26, departing LAX at 12:15 PM and arriving JFK at
              8:58 PM. For an onward JFK {'->'} Istanbul itinerary, that was too late to be useful.
            </p>
          </article>
          <article className="case-card">
            <FileText aria-hidden="true" />
            <h3>The final position</h3>
            <p>
              Delta stated same-day transportation is not guaranteed, separate onward travel is not
              protected, and refunding the unused Delta ticket was the final remedy.
            </p>
          </article>
        </div>
      </section>

      <section className="section timeline-section">
        <div className="section-heading compact">
          <p className="eyebrow">Timeline</p>
          <h2>How the disruption unfolded</h2>
        </div>
        <div className="timeline">
          {timeline.map(([date, text]) => (
            <div className="timeline-item" key={`${date}-${text}`}>
              <span>{date}</span>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="reports" className="section reports-section">
        <div className="section-heading">
          <p className="eyebrow">Not a unique case</p>
          <h2>Other data and reports point to the same risk</h2>
          <p>
            This section mixes official sources, news reporting, and public passenger reports.
            Third-party passenger stories are not independently verified by this site; they are
            included so readers can inspect recurring patterns for themselves.
          </p>
        </div>
        <div className="reliability-grid" aria-label="Reliability data points">
          {reliability.map((item) => (
            <article className="metric-card" key={item.label}>
              <BarChart3 aria-hidden="true" />
              <strong>{item.value}</strong>
              <span>{item.label}</span>
              <p>{item.note}</p>
            </article>
          ))}
        </div>
        <div className="report-list">
          {reports.map((report) => (
            <article className="report-card" key={report.href}>
              <div>
                <span className="report-kind">
                  <Newspaper aria-hidden="true" />
                  {report.kind}
                </span>
                <h3>{report.title}</h3>
                <p>{report.note}</p>
              </div>
              <ExternalLink href={report.href}>Read report</ExternalLink>
            </article>
          ))}
        </div>
      </section>

      <section id="checklist" className="section checklist-section">
        <div className="section-heading compact">
          <p className="eyebrow">Protect yourself</p>
          <h2>Before you trust Delta with time-sensitive travel</h2>
        </div>
        <div className="checklist">
          {checklist.map((item) => (
            <div className="check-item" key={item}>
              <BadgeCheck aria-hidden="true" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section source-section">
        <div className="section-heading compact">
          <p className="eyebrow">Official sources</p>
          <h2>Read the fine print yourself</h2>
        </div>
        <div className="source-row">
          {officialSources.map((source) => (
            <ExternalLink key={source.href} href={source.href}>
              {source.label}
            </ExternalLink>
          ))}
        </div>
      </section>

      <footer>
        <p>
          Independent consumer criticism site. Not affiliated with, sponsored by, or endorsed by
          Delta Air Lines.
        </p>
        <p>More documented cases and a story-submission form are coming next.</p>
      </footer>
    </main>
  )
}

export default App
