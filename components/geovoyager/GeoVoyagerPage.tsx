const REGISTER_URL = "https://forms.gle/Krxn8JrbbVwUHWSz7";

export default function GeoVoyagerPage() {
  return (
    <div className="geovoyager-root">
      <nav>
        <a href="#" className="nav-logo">
          <div className="nav-globe" />
          GeoVoyager
        </a>
        <ul className="nav-links">
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#format">Format</a>
          </li>
          <li>
            <a href="#rules">Rules</a>
          </li>
          <li>
            <a href={REGISTER_URL} className="nav-cta" target="_blank" rel="noreferrer">
              Register
            </a>
          </li>
        </ul>
      </nav>

      <section className="hero" id="about">
        <div className="hero-orb" />
        <div className="hero-rings">
          <div className="ring" />
          <div className="ring" />
          <div className="ring" />
        </div>

        <div className="event-tag">Technovation 4.0 - Mirai · DSAII Club</div>

        <h1>
          Geo<span>Voyager</span>
        </h1>

        <p className="hero-sub">
          A live geography challenge on GeoGuessr. Two players, one screen,
          infinite world. Identify locations from Street View images - fastest and
          most accurate team wins.
        </p>

        <div className="hero-meta">
          <div className="meta-item">
            <div className="meta-dot" />
            <span>
              <strong>April 5, 2026</strong> - Morning Session
            </span>
          </div>
          <div className="meta-item">
            <div className="meta-dot" />
            <span>DY Patil Institute of Technology, Pimpri</span>
          </div>
          <div className="meta-item">
            <div className="meta-dot" />
            <span>₹149 per team</span>
          </div>
          <div className="meta-item">
            <div className="meta-dot" />
            <span>₹6000 Prize Pool</span>
          </div>
        </div>

        <div className="hero-btns">
          <a
            href={REGISTER_URL}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            Register Now -&gt;
          </a>
        </div>
      </section>

      <hr className="divider" />

      <section id="register">
        <div className="container">
          <div className="section-label">Registration</div>
          <h2 className="section-title">How to join</h2>

          <div className="reg-grid">
            <div className="reg-card">
              <div className="reg-card-icon">👥</div>
              <h3>Team Size</h3>
              <p>
                <span className="highlight">2 players per team.</span> Both
                players sit together on one device during live rounds. No solo
                entries.
              </p>
            </div>
            <div className="reg-card">
              <div className="reg-card-icon">💳</div>
              <h3>Entry Fee</h3>
              <p>
                <span className="highlight">₹149 per team.</span> Pay at
                registration. Covers all three rounds - Qualifier, Semi-Final, and
                Grand Final.
              </p>
            </div>
            <div className="reg-card">
              <div className="reg-card-icon">🌍</div>
              <h3>GeoGuessr Account</h3>
              <p>
                Create a <span className="highlight">free account at geoguessr.com</span>
                before April 5. Set your display name to your exact registered team
                name.
              </p>
            </div>
            <div className="reg-card">
              <div className="reg-card-icon">⚠️</div>
              <h3>Name Matching</h3>
              <p>
                Your GeoGuessr display name <span className="highlight">must exactly match</span>
                your registered team name - verified before room entry. Mismatches =
                not allowed in.
              </p>
            </div>
            <div className="reg-card">
              <div className="reg-card-icon">💻</div>
              <h3>Bring Your Laptop</h3>
              <p>
                Bring a <span className="highlight">fully charged laptop</span> on
                event day. Charging is not guaranteed in labs. One device per team,
                no switching mid-round.
              </p>
            </div>
            <div className="reg-card">
              <div className="reg-card-icon">📲</div>
              <h3>Stay Active</h3>
              <p>
                Room codes and round timings are shared in the
                <span className="highlight"> WhatsApp group only.</span> Be ready
                15 minutes before your round starts.
              </p>
            </div>
          </div>
        </div>
      </section>

      <hr className="divider" />

      <section id="format">
        <div className="container">
          <div className="section-label">Tournament</div>
          <h2 className="section-title">Round format</h2>

          <div className="format-track">
            <div className="round-row round-qualifier">
              <div className="round-icon">Q</div>
              <div className="round-content">
                <div className="round-title">Qualifier - All Teams</div>
                <div className="round-desc">
                  Every registered team competes. Identify 10 locations with 2 full
                  minutes per location. Top 50% advance.
                </div>
                <div className="round-pills">
                  <span className="pill pill-green">10 locations</span>
                  <span className="pill pill-green">2 min each</span>
                  <span className="pill pill-green">Top 50% advance</span>
                </div>
              </div>
            </div>

            <div className="round-row round-semi">
              <div className="round-icon">SF</div>
              <div className="round-content">
                <div className="round-title">Semi-Final - Top 50%</div>
                <div className="round-desc">
                  The pace picks up - only 1 minute per location. Top 10 teams by
                  total score move on to the Grand Final.
                </div>
                <div className="round-pills">
                  <span className="pill pill-amber">10 locations</span>
                  <span className="pill pill-amber">1 min each</span>
                  <span className="pill pill-amber">Top 10 advance</span>
                </div>
              </div>
            </div>

            <div className="round-row round-final">
              <div className="round-icon">GF</div>
              <div className="round-content">
                <div className="round-title">Grand Final - Top 10</div>
                <div className="round-desc">
                  30 seconds per location. Pure instinct. Highest cumulative score
                  across all 10 locations wins the championship.
                </div>
                <div className="round-pills">
                  <span className="pill pill-red">10 locations</span>
                  <span className="pill pill-red">30 sec each</span>
                  <span className="pill pill-red">Highest score wins</span>
                </div>
              </div>
            </div>

            <div className="round-row round-tb">
              <div className="round-icon">TB</div>
              <div className="round-content">
                <div className="round-title">Tiebreaker - Sudden Death</div>
                <div className="round-desc">
                  If scores are tied after the final, one location, 30 seconds. If
                  still tied - closest pin distance in metres decides the winner.
                </div>
                <div className="round-pills">
                  <span className="pill pill-dim">1 location</span>
                  <span className="pill pill-dim">30 sec</span>
                  <span className="pill pill-dim">Closest pin wins</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="divider" />

      <section>
        <div className="container">
          <div className="section-label">Scoring</div>
          <h2 className="section-title">How points work</h2>

          <div className="scoring-grid">
            <div className="score-card">
              <div className="score-num">5,000</div>
              <div className="score-label">Max points per location</div>
            </div>
            <div className="score-card">
              <div className="score-num">50,000</div>
              <div className="score-label">Max score per round</div>
            </div>
            <div className="score-card">
              <div className="score-num">10</div>
              <div className="score-label">Locations per round</div>
            </div>
          </div>

          <div className="reminder-banner" style={{ borderLeftColor: "var(--green)" }}>
            <div className="reminder-icon">📌</div>
            <div>
              <div className="reminder-title">Closer pin = higher score</div>
              <div className="reminder-desc">
                Each location is scored out of 5,000 points on GeoGuessr&apos;s
                standard scale. The closer your pin drop is to the actual location,
                the more points you earn. Your total score across all 10 locations
                determines your rank for that round.
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="divider" />

      <section id="rules">
        <div className="container">
          <div className="section-label">Official Rules</div>
          <h2 className="section-title">Rules of play</h2>

          <div className="rules-list">
            <div className="rule-item">
              <div className="rule-num">1</div>
              <div className="rule-text">
                Only <strong style={{ color: "var(--text)" }}>1 device per team</strong> -
                both players sit together on one screen. No switching devices
                mid-round.
              </div>
            </div>
            <div className="rule-item">
              <div className="rule-num">2</div>
              <div className="rule-text">
                Your <strong style={{ color: "var(--text)" }}>GeoGuessr name must match</strong>
                your registered team name - verified before room entry.
              </div>
            </div>
            <div className="rule-item">
              <div className="rule-num">3</div>
              <div className="rule-text">
                <strong style={{ color: "var(--text)" }}>No external aids</strong> - no
                Google Maps, satellite tools, or any other aids. Phones must be face
                down.
              </div>
            </div>
            <div className="rule-item">
              <div className="rule-num">4</div>
              <div className="rule-text">
                <strong style={{ color: "var(--text)" }}>No communication</strong> with
                other teams during a live round.
              </div>
            </div>
            <div className="rule-item">
              <div className="rule-num">5</div>
              <div className="rule-text">
                <strong style={{ color: "var(--text)" }}>Room code is private</strong> -
                shared in this group only. Do not share outside.
              </div>
            </div>
            <div className="rule-item">
              <div className="rule-num">6</div>
              <div className="rule-text">
                Be ready <strong style={{ color: "var(--text)" }}>15 minutes before</strong>
                your round starts. Late teams may forfeit their slot.
              </div>
            </div>
            <div className="rule-item">
              <div className="rule-num">7</div>
              <div className="rule-text">
                <strong style={{ color: "var(--text)" }}>Device crash mid-round</strong> -
                no restarts allowed. Score up to that point stands.
              </div>
            </div>
            <div className="rule-item">
              <div className="rule-num">8</div>
              <div className="rule-text">
                <strong style={{ color: "var(--text)" }}>Do not start guessing</strong>
                before the organizer&apos;s go-ahead signal.
              </div>
            </div>
            <div className="rule-item">
              <div className="rule-num">9</div>
              <div className="rule-text">
                <strong style={{ color: "var(--text)" }}>Organizer&apos;s decision is final</strong>
                in all disputes. No exceptions.
              </div>
            </div>
            <div className="rule-item">
              <div className="rule-num">10</div>
              <div className="rule-text">
                <strong style={{ color: "var(--text)" }}>Create your GeoGuessr account</strong>
                before April 5. Account setup on event day is not guaranteed.
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="divider" />

      <section>
        <div className="container">
          <div className="section-label">Reminders</div>
          <h2 className="section-title">Before you arrive</h2>

          <div className="reminder-banner">
            <div className="reminder-icon">🌍</div>
            <div>
              <div className="reminder-title">
                Create your GeoGuessr account before April 5
              </div>
              <div className="reminder-desc">
                Visit geoguessr.com and create a free account. Set your display name
                to your exact registered team name - this is mandatory for room
                entry.
              </div>
            </div>
          </div>

          <div className="reminder-banner" style={{ borderLeftColor: "var(--amber)" }}>
            <div className="reminder-icon">💻</div>
            <div>
              <div className="reminder-title">Bring a fully charged laptop</div>
              <div className="reminder-desc">
                Charging points in the labs are not guaranteed. Arrive with a full
                battery. One device per team - no switching mid-round under any
                circumstances.
              </div>
            </div>
          </div>

          <div className="reminder-banner" style={{ borderLeftColor: "var(--red)" }}>
            <div className="reminder-icon">📲</div>
            <div>
              <div className="reminder-title">Stay active in the group</div>
              <div className="reminder-desc">
                Room codes and round timings are shared in the WhatsApp group only.
                Missing the code means missing your round. Be ready 15 minutes early.
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-logo">GeoVoyager</div>
        <div className="footer-sub">Technovation 4.0 - Mirai · DSAII Club 🌍</div>
        <div className="footer-info">
          <strong>April 5, 2026</strong> - Morning Session
          <br />
          DY Patil Institute of Technology, Pimpri
          <br />
          <br />
          Entry fee ₹149 per team · Teams of 2 · One device per team
          <br />
          Organizer&apos;s decision is final in all disputes.
        </div>
      </footer>
    </div>
  );
}
