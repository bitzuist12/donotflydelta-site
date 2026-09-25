import {
  AlertTriangle,
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  Clock3,
  FileText,
  MessageCircle,
  Plane,
  ShieldAlert,
  Siren,
  WalletCards,
} from 'lucide-react'
import { useState } from 'react'
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

const risks = [
  {
    title: 'They can cancel within their control',
    text: 'A cancellation can be caused by airline-controlled operational issues, not just weather or FAA events.',
  },
  {
    title: 'They can rebook you too late',
    text: 'A next-day flight may technically be a rebooking while being useless for the real purpose of the trip.',
  },
  {
    title: 'They can refuse downstream costs',
    text: 'Delta may say separate tickets, missed events, lodging, and other real-world impacts are not covered.',
  },
]

type ReportCategory = 'all' | 'legal' | 'safety' | 'operations' | 'passenger'

interface ReportItem {
  title: string
  note: string
  href: string
  kind: string
  category: 'legal' | 'safety' | 'operations' | 'passenger'
}

const reports: ReportItem[] = [
  // Federal & Regulatory Investigations / Legal Actions
  {
    title: 'DOT formal investigation into Delta meltdown',
    note: 'U.S. Department of Transportation launched a formal investigation into Delta after 7,000+ flight cancellations during the July outage, examining refund refusals, voucher denials, and customer support failures.',
    href: 'https://www.transportation.gov/briefing-room/us-department-transportation-opens-investigation-delta-air-lines',
    kind: 'Federal investigation',
    category: 'legal',
  },
  {
    title: 'OSHA citations for fatal Atlanta TechOps explosion',
    note: 'Federal OSHA investigators cited Delta Air Lines for safety violations following the August 2024 tire explosion at Atlanta TechOps that killed two maintenance workers and severely injured a third.',
    href: 'https://www.theguardian.com/us-news/article/2024/aug/27/delta-plane-tire-explosion-atlanta-airport',
    kind: 'Federal citation',
    category: 'legal',
  },
  {
    title: 'EEOC pregnancy discrimination federal lawsuit',
    note: 'The U.S. Equal Employment Opportunity Commission sued Delta Air Lines in federal court, alleging the carrier rescinded an employment offer upon discovering the applicant was pregnant.',
    href: 'https://www.eeoc.gov/newsroom/eeoc-sues-delta-air-lines-pregnancy-discrimination',
    kind: 'Federal lawsuit',
    category: 'legal',
  },
  {
    title: '$78.75 million jet fuel dumping class-action settlement',
    note: 'Delta reached a proposed $78.75 million settlement after dumping tens of thousands of gallons of toxic aviation fuel directly over school playgrounds and residential neighborhoods in Los Angeles.',
    href: 'https://www.latimes.com/california/story/2026-01-15/delta-fuel-dump-school-settlement',
    kind: 'Court settlement',
    category: 'legal',
  },
  {
    title: 'Federal judge rejects Delta bid to toss passenger claims',
    note: 'A federal judge permitted passenger breach-of-contract claims to proceed against Delta following the 2024 meltdown, while CrowdStrike noted Delta’s own outdated IT infrastructure drove its paralysis.',
    href: 'https://www.courthousenews.com/delta-crowdstrike-flight-cancellations/',
    kind: 'Federal court ruling',
    category: 'legal',
  },

  // Safety & In-Flight Medical Emergencies
  {
    title: 'Spoiled food in-flight emergency diverts international flight',
    note: 'Delta Flight 136 from Detroit to Amsterdam diverted to JFK after economy passengers were fed moldy, spoiled meals mid-flight; medics treated dozens upon landing, forcing Delta to pull hot meals on 75 international routes.',
    href: 'https://www.washingtonpost.com/travel/2024/07/03/delta-flight-spoiled-food-diversion/',
    kind: 'Food safety emergency',
    category: 'safety',
  },
  {
    title: 'Passengers hospitalized after toxic cabin fumes',
    note: 'A September 2026 Delta flight from Maui to Seattle made an emergency diversion to Honolulu after passengers inhaled toxic fumes in the cabin, resulting in multiple hospital emergency room visits.',
    href: 'https://www.aviation24.be/airlines/delta-air-lines/flight-diverts-to-honolulu-after-fumes-in-cabin-injure-passengers/',
    kind: 'Emergency diversion',
    category: 'safety',
  },
  {
    title: 'Rapid cabin depressurization & bleeding ears',
    note: 'Separate Delta flights experienced rapid loss of cabin pressure, ear bleeding, and oxygen mask deployments, including an emergency return to JFK.',
    href: 'https://www.cbsnews.com/news/delta-flight-cabin-pressure-passengers-bleeding-ears/',
    kind: 'Pressurization failure',
    category: 'safety',
  },
  {
    title: 'Passengers collapse in 111°F tarmac delay',
    note: 'Passengers and crew passed out and were treated on stretchers after a Delta flight was trapped on the tarmac in 111-degree heat in Las Vegas for hours without functioning air conditioning.',
    href: 'https://www.nbcnews.com/news/us-news/delta-passengers-treated-heat-injuries-plane-las-vegas-tarmac-delays-rcna94902',
    kind: 'Tarmac confinement',
    category: 'safety',
  },
  {
    title: 'Boeing 767 engine fire forces emergency landing at LAX',
    note: 'A Delta Boeing 767 suffered a right engine fire shortly after takeoff from Los Angeles International Airport, prompting an emergency air return and FAA investigation.',
    href: 'https://www.cbsnews.com/losangeles/news/delta-flight-engine-fire-lax/',
    kind: 'Engine fire emergency',
    category: 'safety',
  },
  {
    title: 'Passenger lawsuits over severe turbulence hospitalizations',
    note: 'A Delta flight from Salt Lake City to Amsterdam encountered severe turbulence that hospitalized 25 people over Wyoming, leading to passenger lawsuits alleging airline negligence.',
    href: 'https://apnews.com/article/delta-turbulence-amsterdam-injuries-lawsuit-e4b2d9e9',
    kind: 'Negligence lawsuit',
    category: 'safety',
  },

  // Operational Chaos & Cancellations
  {
    title: 'H1 2026 domestic cancellations nearly doubled',
    note: 'DOT data shows Delta domestic cancellations climbed to 2.35% (over 19,150 flights), jumping 116% year-over-year as mainline operational reliability deteriorated.',
    href: 'https://simpleflying.com/delta-air-lines-cancels-nearly-twice-many-flights-2025/',
    kind: 'DOT data analysis',
    category: 'operations',
  },
  {
    title: 'May 2026 crew scheduling meltdown',
    note: 'Delta canceled close to 400 flights across a single weekend, stranding thousands at Atlanta and LAX hubs due to internal crew scheduling bottlenecks.',
    href: 'https://www.businessinsider.com/delta-canceling-flights-crew-scheduling-challenges-2026-5',
    kind: 'Scheduling collapse',
    category: 'operations',
  },
  {
    title: 'July reliability collapse: 4,626 flights canceled',
    note: 'View from the Wing reported Delta canceled 4,626 flights in July alone—nearly triple Southwest Airlines.',
    href: 'https://viewfromthewing.com/new-data-shows-deltas-reliability-fell-apart-in-july-4626-flights-canceled-nearly-3x-southwest/',
    kind: 'Operations data',
    category: 'operations',
  },
  {
    title: 'BTS on-time and cancellation data',
    note: 'Official DOT/BTS data tracks domestic delay and cancellation rates through 2026.',
    href: 'https://www.transtats.bts.gov/ontime/',
    kind: 'Official data',
    category: 'operations',
  },
  {
    title: 'DOT customer-service commitments',
    note: 'DOT requires airlines to adhere to published commitments for controllable cancellations and delays.',
    href: 'https://www.transportation.gov/airconsumer/airline-customer-service-dashboard',
    kind: 'Official policy',
    category: 'operations',
  },

  // Public Passenger Reports & Fine-Print Traps
  {
    title: 'Next-day rebooking after cancellation',
    note: 'Public Reddit discussion about Delta canceling a flight within its operational control and rescheduling it a day later without protecting onward travel.',
    href: 'https://www.reddit.com/r/delta/comments/14axttt/delta_cancelled_my_flight_and_rescheduled_it_a/',
    kind: 'Public report',
    category: 'passenger',
  },
  {
    title: 'Corporate rules vs human reality',
    note: 'LinkedIn executive report describes a Delta disruption where the ticket was refunded and a voucher offered, while partner-airline disconnect impacts were denied.',
    href: 'https://www.linkedin.com/posts/horn-jason_when-corporate-rules-ignore-human-reality-activity-7495534260502618112-oTzX',
    kind: 'LinkedIn report',
    category: 'passenger',
  },
  {
    title: 'Eight hours onboard before midnight cancellation',
    note: 'Passenger report describes waiting 8 hours on a grounded aircraft with zero food before being canceled after crew timeouts, receiving inadequate assistance.',
    href: 'https://www.linkedin.com/posts/yuvalgolan1_8-hours-onboard-no-food-no-updates-activity-7406701841633247232-cjui',
    kind: 'LinkedIn report',
    category: 'passenger',
  },
  {
    title: 'Hotel voucher confusion & reimbursement denials',
    note: 'Passenger told at the gate to book their own hotel due to cancellation, and later denied reimbursement by customer care.',
    href: 'https://www.reddit.com/r/delta/comments/1mfchvw/told_by_delta_to_book_hotel_due_to_cancelled/',
    kind: 'Public report',
    category: 'passenger',
  },
  {
    title: 'Separate-ticket connection abandonment',
    note: 'Public discussion of passengers missing separate international flights after domestic Delta delays and being told Delta has zero liability.',
    href: 'https://www.reddit.com/r/delta/comments/1qczsha/flight_got_delayed_over_4h_and_i_missed_my/',
    kind: 'Public report',
    category: 'passenger',
  },
  {
    title: 'Facebook customer complaint community',
    note: 'Active public Facebook group tracking daily passenger grievances, baggage losses, and cancellation disputes.',
    href: 'https://www.facebook.com/groups/715221316650289/',
    kind: 'Facebook group',
    category: 'passenger',
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

const comparisons = [
  {
    title: 'Delta slipped in reliability rankings',
    text: 'The Points Guy reported that early-2026 DOT data had Delta ranking an uncharacteristic sixth in cancellation-rate performance.',
    href: 'https://thepointsguy.com/airline/best-airlines-2026-reliability/',
  },
  {
    title: 'More cancellations than Southwest in July',
    text: 'View from the Wing reported Delta canceled 4,626 flights in July 2026, nearly three times Southwest.',
    href: 'https://viewfromthewing.com/new-data-shows-deltas-reliability-fell-apart-in-july-4626-flights-canceled-nearly-3x-southwest/',
  },
  {
    title: '2025 cancellation-rate comparison',
    text: 'NerdWallet’s 2025 reliability review listed Delta at 1.37% cancellations, higher than Southwest but lower than American.',
    href: 'https://www.nerdwallet.com/travel/learn/most-reliable-airlines',
  },
  {
    title: 'DOT consumer reports are the source of record',
    text: 'DOT publishes monthly Air Travel Consumer Reports covering delays, cancellations, baggage, oversales, and complaints.',
    href: 'https://www.transportation.gov/individuals/aviation-consumer-protection/air-travel-consumer-reports',
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

const categories: { key: ReportCategory; label: string }[] = [
  { key: 'all', label: 'All Incidents & Reports' },
  { key: 'legal', label: 'Federal & Legal Actions' },
  { key: 'safety', label: 'Safety & Emergencies' },
  { key: 'operations', label: 'Operational Meltdowns' },
  { key: 'passenger', label: 'Passenger Field Reports' },
]

function App() {
  const [submitted, setSubmitted] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<ReportCategory>('all')

  const filteredReports =
    selectedCategory === 'all'
      ? reports
      : reports.filter((r) => r.category === selectedCategory)

  function handleStorySubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const subject = String(form.get('subject') || 'Passenger story submission')
    const body = [
      `Name or initials: ${form.get('name') || ''}`,
      `Flight / route / date: ${form.get('trip') || ''}`,
      '',
      String(form.get('story') || ''),
      '',
      'I understand this submission will be reviewed before publication.',
    ].join('\n')
    const email = import.meta.env.VITE_SUBMISSION_EMAIL || 'ataonat00@gmail.com'
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(`[Story submission] ${subject}`)}&body=${encodeURIComponent(body)}`
    setSubmitted(true)
  }

  return (
    <main>
      <section className="hero">
        <nav aria-label="Primary">
          <div className="brand">
            <Siren aria-hidden="true" />
            <span>DoNotFlyDelta.com</span>
          </div>
          <div className="nav-links">
            <a className="nav-link" href="#risk">
              Delta cancellation risk
            </a>
            <a className="nav-link" href="#reports">
              Passenger reports
            </a>
            <a className="nav-link" href="#share">
              Share your story
            </a>
          </div>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Independent consumer warning</p>
            <h1>Beware Booking Delta</h1>
            <p className="lede">
              A consumer warning about Delta cancellations, next-day rebookings, vague hotel
              support, and the fine print passengers discover only after their plans are ruined.
            </p>
            <p className="search-summary">
              If you are searching for Delta canceled flight, Delta hotel voucher, Delta rebooking
              policy, Delta complaints, or Delta same-day transportation, start here.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#risk">
                See the risk
              </a>
              <a className="secondary-button" href="#checklist">
                Protect your trip
              </a>
            </div>

            <div className="incident-alert-banner">
              <div className="alert-content">
                <Siren aria-hidden="true" />
                <div>
                  <strong>Active 2025–2026 Incident & Investigation Docket</strong>
                  <span>22 documented cases: DOT probes, spoiled food diversions, cabin fumes, fatal blasts & cancellation spikes</span>
                </div>
              </div>
              <a href="#reports">
                Inspect 22 Cases ↓
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

      <section id="risk" className="section risk-section">
        <div className="section-heading">
          <p className="eyebrow">The warning</p>
          <h2>Delta's rules can leave passengers carrying the real cost</h2>
          <p>
            Based on a documented case, public passenger reports, DOT data, and Delta's own
            policies, this site tracks a simple risk: Delta may solve its own operational problem on
            paper while leaving the passenger with a destroyed trip.
          </p>
        </div>

        <div className="risk-grid">
          {risks.map((risk, index) => (
            <article className={index === 0 ? 'risk-card strong' : 'risk-card'} key={risk.title}>
              {index === 0 && <Plane aria-hidden="true" />}
              {index === 1 && <Clock3 aria-hidden="true" />}
              {index === 2 && <WalletCards aria-hidden="true" />}
              <h3>{risk.title}</h3>
              <p>{risk.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="case" className="section case-section">
        <div className="section-heading">
          <p className="eyebrow">Documented example</p>
          <h2>One real case: overnight flight, next-day replacement</h2>
          <p>
            DL915 LAX {'->'} JFK was scheduled as an overnight transcontinental flight. Delta later
            described the cancellation as “unavailable aircraft” and within Delta's operational
            control, then identified a next-day replacement that arrived too late for an onward
            international itinerary.
          </p>
        </div>

        <div className="case-grid">
          <article className="case-card strong">
            <Plane aria-hidden="true" />
            <h3>Original</h3>
            <p>DL915 LAX {'->'} JFK, overnight departure on June 25, 2026.</p>
          </article>
          <article className="case-card">
            <Clock3 aria-hidden="true" />
            <h3>Rebooked</h3>
            <p>DL939 on June 26, departing 12:15 PM and arriving JFK at 8:58 PM.</p>
          </article>
          <article className="case-card">
            <FileText aria-hidden="true" />
            <h3>Delta's answer</h3>
            <p>Same-day transportation not guaranteed; separate onward travel not protected.</p>
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
          <p className="eyebrow">2025–2026 Investigative Docket & Public Reports</p>
          <h2>Documented Scandals, In-Flight Emergencies & Safety Citations</h2>
          <p>
            An ongoing public record of federal DOT investigations, deadly maintenance safety citations,
            spoiled food emergencies, toxic cabin fumes, and severe cancellation spikes from the past 12 months.
          </p>
        </div>

        <div className="spotlight-grid" aria-label="Critical incident highlights">
          <article className="spotlight-card">
            <div>
              <span className="spotlight-tag">
                <ShieldAlert aria-hidden="true" /> Federal Investigation
              </span>
              <h4>DOT Probes 7,000+ Meltdown</h4>
              <p>U.S. DOT opened a formal probe into Delta's cancellation chaos, refund denials, and customer service collapse.</p>
            </div>
            <ExternalLink href="https://www.transportation.gov/briefing-room/us-department-transportation-opens-investigation-delta-air-lines">
              Official Briefing
            </ExternalLink>
          </article>

          <article className="spotlight-card">
            <div>
              <span className="spotlight-tag">
                <Siren aria-hidden="true" /> In-Flight Emergency
              </span>
              <h4>Spoiled Food Flight Diversion</h4>
              <p>Flight 136 diverted to JFK after moldy meals sickened passengers mid-flight; hot food pulled on 75 international routes.</p>
            </div>
            <ExternalLink href="https://www.washingtonpost.com/travel/2024/07/03/delta-flight-spoiled-food-diversion/">
              Washington Post
            </ExternalLink>
          </article>

          <article className="spotlight-card">
            <div>
              <span className="spotlight-tag">
                <AlertTriangle aria-hidden="true" /> Safety Citations
              </span>
              <h4>Fatal Atlanta TechOps Blast</h4>
              <p>Federal OSHA cited Delta for safety violations after an exploding tire killed 2 maintenance workers and severely injured a third.</p>
            </div>
            <ExternalLink href="https://www.theguardian.com/us-news/article/2024/aug/27/delta-plane-tire-explosion-atlanta-airport">
              OSHA Report
            </ExternalLink>
          </article>

          <article className="spotlight-card">
            <div>
              <span className="spotlight-tag">
                <BarChart3 aria-hidden="true" /> Reliability Surge
              </span>
              <h4>Cancellations Up 116%</h4>
              <p>DOT data shows Delta domestic cancellations surged to 2.35% (over 19,150 flights) in H1 2026, ranking near industry bottom.</p>
            </div>
            <ExternalLink href="https://simpleflying.com/delta-air-lines-cancels-nearly-twice-many-flights-2025/">
              DOT Data Analysis
            </ExternalLink>
          </article>
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
        <div className="comparison-block">
          <div>
            <p className="eyebrow">Delta vs other U.S. airlines</p>
            <h3>Premium brand, worsening reliability signals</h3>
            <p>
              The point is not that Delta is always the worst airline. The point is that even a
              premium airline can cancel, rebook too late, and then rely on fine print. Consumers
              should compare cancellation data before trusting any airline with time-sensitive
              plans.
            </p>
          </div>
          <div className="comparison-list">
            {comparisons.map((item) => (
              <article className="comparison-card" key={item.href}>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
                <ExternalLink href={item.href}>Source</ExternalLink>
              </article>
            ))}
          </div>
        </div>
        <div className="filter-bar" role="tablist" aria-label="Incident category filters">
          {categories.map((cat) => {
            const count =
              cat.key === 'all'
                ? reports.length
                : reports.filter((r) => r.category === cat.key).length
            return (
              <button
                key={cat.key}
                type="button"
                className={selectedCategory === cat.key ? 'filter-btn active' : 'filter-btn'}
                onClick={() => setSelectedCategory(cat.key)}
              >
                <span>{cat.label}</span>
                <span className="count-badge">{count}</span>
              </button>
            )
          })}
        </div>

        <div className="report-list">
          {filteredReports.map((report) => (
            <article className="report-card" key={report.href}>
              <div>
                <span className="report-kind">
                  {report.category === 'legal' && <ShieldAlert aria-hidden="true" />}
                  {report.category === 'safety' && <Siren aria-hidden="true" />}
                  {report.category === 'operations' && <Plane aria-hidden="true" />}
                  {report.category === 'passenger' && <MessageCircle aria-hidden="true" />}
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

      <section id="share" className="section share-section">
        <div className="section-heading compact">
          <p className="eyebrow">Add your experience</p>
          <h2>What happened to you?</h2>
          <p>
            Share a specific Delta cancellation, delay, rebooking, refund, or support experience.
            Stories are reviewed before publication and should be factual, first-hand, and free of
            private booking information.
          </p>
        </div>
        <form className="story-form" onSubmit={handleStorySubmit}>
          <label>
            Headline
            <input name="subject" required placeholder="Cancelled overnight flight" />
          </label>
          <label>
            Name or initials
            <input name="name" placeholder="Your choice" />
          </label>
          <label className="wide-field">
            Flight, route, and date
            <input name="trip" required placeholder="DL123, LAX to JFK, June 2026" />
          </label>
          <label className="wide-field">
            What happened?
            <textarea name="story" required rows={7} placeholder="Describe what Delta told you, what you were offered, and what happened next." />
          </label>
          <div className="story-form-footer">
            <p><MessageCircle aria-hidden="true" /> No automatic publication. We review every submission.</p>
            <button className="primary-button" type="submit">Prepare submission</button>
          </div>
          {submitted && <p className="form-success" role="status">Your email draft is prepared. Review it, attach evidence if appropriate, and send it.</p>}
        </form>
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
        <p>Passenger stories are submitted by email and reviewed before publication.</p>
      </footer>
    </main>
  )
}

export default App
