import '../App.css';

export function StepsSection() {
  return (
    <section className="steps" aria-label="How it works">
      <div className="section-head">
        <div>
          <p className="eyebrow">Quick start</p>
          <h2>Three steps and you're in</h2>
        </div>
        <p className="section-lede">
          Configure, lock in your digits, and start guessing with haptic-friendly controls that keep you in the flow.
        </p>
      </div>
      <ol className="step-list">
        <li>
          <div className="step-number">1</div>
          <div>
            <h3>Pick your rules</h3>
            <p>Length, hints, and timers set the tone for the match.</p>
          </div>
        </li>
        <li>
          <div className="step-number">2</div>
          <div>
            <h3>Share or queue</h3>
            <p>Drop a link to a friend or find a rival who wants the same rules.</p>
          </div>
        </li>
        <li>
          <div className="step-number">3</div>
          <div>
            <h3>Guess the pin</h3>
            <p>Type, swipe, and submit. Fast feedback keeps each round tense.</p>
          </div>
        </li>
      </ol>
    </section>
  );
}
