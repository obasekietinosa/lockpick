import '../../App.css';

interface JoinFormProps {
  playerName: string;
  inviteCode: string;
  statusTone: 'success' | 'error' | 'info';
  statusMessage: string | null;
  onPlayerNameChange: (value: string) => void;
  onInviteCodeChange: (value: string) => void;
  onJoin: (code: string) => void;
}

export function JoinForm({
  inviteCode,
  playerName,
  statusMessage,
  statusTone,
  onInviteCodeChange,
  onJoin,
  onPlayerNameChange,
}: JoinFormProps) {
  return (
    <section className="config" aria-label="Join game form">
      <div className="config-grid">
        <div className="config-card">
          <div className="field">
            <label htmlFor="join-name">Player name</label>
            <input
              id="join-name"
              name="join-name"
              value={playerName}
              onChange={(event) => onPlayerNameChange(event.target.value)}
              placeholder="Ada the Analyst"
              autoComplete="name"
            />
          </div>

          <div className="field">
            <label htmlFor="invite-code">Invite code</label>
            <input
              id="invite-code"
              name="invite-code"
              value={inviteCode}
              onChange={(event) => onInviteCodeChange(event.target.value)}
              placeholder="Example: 4FD2-91C"
              autoCapitalize="characters"
            />
            <p className="field-help">Paste the code shared from the configuration screen.</p>
          </div>

          <div className="cta-row">
            <button className="primary" type="button" onClick={() => onJoin(inviteCode.trim())}>
              Join lobby
            </button>
            <button className="ghost" type="button" onClick={() => onInviteCodeChange('')}>
              Clear code
            </button>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-head">
            <div>
              <p className="eyebrow">Quick tip</p>
              <h3>Stay synced</h3>
            </div>
            <span className="badge muted">Realtime</span>
          </div>
          <p className="section-lede">
            We will keep names, invites, and rounds in sync once everyone has joined. Use the same name you chose on the
            configuration page so others recognise you.
          </p>

          {statusMessage && (
            <div className={`status-banner ${statusTone}`} role="status">
              {statusMessage}
            </div>
          )}

          {!statusMessage && inviteCode && (
            <div className="status-banner info" role="status">
              Invite ready. Share <strong>{inviteCode}</strong> with the friend you want to play.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
