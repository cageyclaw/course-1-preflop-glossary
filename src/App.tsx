import { useMemo, useState } from 'react'
import './App.css'

const glossaryData = {
  positions: [
    {
      term: 'UTG',
      definition:
        'Under the Gun - First position after the big blind; earliest position to act preflop',
      example: 'UTG / EP: tight and disciplined',
    },
    {
      term: 'EP',
      definition:
        'Early Position - Early positions at the table, typically UTG through UTG+1/2',
      example: 'UTG / EP: tight and disciplined',
    },
    {
      term: 'MP',
      definition: 'Middle Position - Positions between early position and hijack',
      example: 'HJ / MP: widen slightly',
    },
    {
      term: 'HJ',
      definition: 'Hijack - Position one seat before the cutoff',
      example: 'HJ: 66, ATs, KQo',
    },
    {
      term: 'CO',
      definition: 'Cutoff - Position one seat before the button',
      example: 'CO: 55, A9s, KJo',
    },
    {
      term: 'BTN',
      definition: 'Button - Dealer position; the best position at the table',
      example: 'BTN: widest opens',
    },
    {
      term: 'SB',
      definition: 'Small Blind - Position to the left of the button',
      example: 'SB: tricky (out of position the whole hand)',
    },
    {
      term: 'BB',
      definition:
        'Big Blind - Position to the left of the small blind; posts the big blind',
      example: 'Blinds are the only seats where you pay to play',
    },
    {
      term: 'LJ',
      definition: 'Lojack - Position before the hijack',
      example: "LJ limps, you're in the CO",
    },
  ],
  actions: [
    {
      term: 'RFI',
      definition:
        'Raise First In - Being the first player to enter the pot with a raise after everyone folds to you',
      example:
        'RFI (Raise First In) means you are the first player to enter the pot with a raise',
    },
    {
      term: '3-bet',
      definition: 'The re-raise versus a preflop open',
      example: 'A 3-bet is the re-raise versus a preflop open',
    },
    {
      term: '4-bet',
      definition: 'The re-raise versus a 3-bet',
      example: 'You have three options: fold, call, 4-bet',
    },
    {
      term: 'Open',
      definition: 'The first raise preflop (same as RFI)',
      example: 'Open or Fold as first-in',
    },
    {
      term: 'Call',
      definition: 'To match the current bet',
      example: 'Suited broadways... Pocket pairs in position',
    },
    {
      term: 'Fold',
      definition: 'To surrender the hand and forfeit any chips invested',
      example: 'Open or Fold as first-in',
    },
    {
      term: 'Raise',
      definition: 'To increase the bet size',
      example: 'Raise to isolate the limper',
    },
    {
      term: 'Limp',
      definition: 'To call the big blind preflop without raising',
      example: 'ISO raising means raising after someone limps',
    },
    {
      term: 'Squeeze',
      definition:
        'To 3-bet after one or more players have already called the open',
      example: "If there are callers and you're squeezing, size up",
    },
    {
      term: 'ISO',
      definition:
        'Isolation Raise - Raising after someone limps with the goal of isolating the weakest player',
      example:
        'ISO raising means raising after someone limps with the goal of isolating the weakest player',
    },
    {
      term: 'Defend',
      definition: 'To continue in a hand when facing a bet or raise',
      example: 'Defend too tight bleeds chips',
    },
  ],
  hand_notations: [
    {
      term: 'AJo',
      definition: 'Ace Jack offsuit (different suits)',
      example: 'UTG KTo, open CO KTo, open BTN KTo',
    },
    { term: 'AQs', definition: 'Ace Queen suited (same suit)', example: 'AQs as value (3-bet)' },
    { term: 'KQo', definition: 'King Queen offsuit', example: 'KQo - often dominated' },
    { term: 'KQs', definition: 'King Queen suited', example: 'KQs is a classic call' },
    { term: 'KJo', definition: 'King Jack offsuit', example: 'Cut most offsuit Kx/Qx multiway' },
    { term: 'KTs', definition: 'King Ten suited', example: 'Bluffs: A5s–A2s, KTs, QTs' },
    { term: 'KTo', definition: 'King Ten offsuit', example: 'BTN KTo almost always' },
    { term: 'QJs', definition: 'Queen Jack suited', example: 'Suited broadways (KQs, QJs, JTs)' },
    { term: 'QTs', definition: 'Queen Ten suited', example: 'Bluffs: A5s–A2s, KTs, QTs' },
    { term: 'JTs', definition: 'Jack Ten suited', example: 'Defend: JTs, T9s, A5s' },
    { term: 'T9s', definition: 'Ten Nine suited', example: 'Defend: JTs, T9s, A5s' },
    { term: '98s', definition: 'Nine Eight suited', example: 'Strong suited connectors (98s–76s)' },
    { term: '76s', definition: 'Seven Six suited', example: 'Strong suited connectors (98s–76s)' },
    { term: 'A9s-A2s', definition: 'Small suited aces', example: 'Suited aces (AJs down to A2s)' },
    { term: 'A9o', definition: 'Ace Nine offsuit', example: 'Open A9o too early (common mistake)' },
    { term: 'ATo', definition: 'Ace Ten offsuit', example: 'SB: ATo, KJs' },
    { term: 'ATs', definition: 'Ace Ten suited', example: 'HJ: 66, ATs, KQo' },
    {
      term: 'Broadway',
      definition: 'High cards T, J, Q, K, A (also called broadway cards)',
      example: 'Short stacks favor Broadways and pairs',
    },
    {
      term: 'Pocket Pair',
      definition: 'Two cards of the same rank (AA, KK, QQ, etc.)',
      example: 'Pocket pairs in position',
    },
    { term: 'Suited', definition: 'Both cards are the same suit', example: "Suited helps, but it doesn't magically make a hand good" },
    { term: 'Offsuit', definition: 'Cards are different suits', example: 'Avoid dominated offsuit broadways' },
    {
      term: 'Suited Connectors',
      definition: 'Consecutive suited cards like JTs, 98s, 76s',
      example: 'Strong suited connectors (98s–76s)',
    },
  ],
  concepts: [
    {
      term: 'Equity',
      definition: 'Your share of the pot based on your chance to win at showdown',
      example: "Your equity doesn't realize (OOP)",
    },
    {
      term: 'Pot Odds',
      definition: 'The ratio of the call amount to the total pot',
      example: 'Pot odds tell you the minimum equity you need (~27%)',
    },
    {
      term: 'MDF',
      definition:
        'Minimum Defense Frequency - The minimum percentage of hands to continue with to remain unexploitable; MDF = pot / (pot + bet)',
      example: 'MDF is a guardrail, not a religion',
    },
    {
      term: 'Fold Equity',
      definition: 'The expected value gained when your bet causes opponents to fold',
      example: 'Pressure opponents off equity',
    },
    {
      term: 'Implied Odds',
      definition:
        'The additional equity you expect to gain from future betting if you hit your hand',
      example: 'Deep stacks reward hands that can make hidden strong hands',
    },
    {
      term: 'Reverse Implied Odds',
      definition: 'The expected loss when you make a hand that is likely second-best',
      example: 'Dominated hands lead to reverse IO',
    },
    {
      term: 'Equity Realization',
      definition:
        'How much of your raw equity you actually realize based on position and playability',
      example: 'Equity realization drops, especially out of position',
    },
    {
      term: 'SPR',
      definition: 'Stack-to-Pot Ratio - Effective stack size divided by pot size',
      example: 'SPR drops (when facing 3-bet)',
    },
    {
      term: 'Domination/Dominated',
      definition: "When an opponent's hand has you outkicked",
      example: 'Avoid dominated offsuit broadways',
    },
    {
      term: 'Blockers',
      definition: 'Cards you hold that reduce the likelihood of opponent holding certain hands',
      example: 'A5s as a bluff with blockers',
    },
    {
      term: 'Playability',
      definition: 'How well a hand realizes equity postflop',
      example: 'Prioritize playability',
    },
  ],
  strategy_terms: [
    {
      term: 'Linear Range',
      definition:
        'A 3-bet range that includes premiums + strong hands + hands that benefit from protection',
      example: 'Use linear when you expect calls',
    },
    {
      term: 'Polarized Range',
      definition:
        'A 3-bet range at the extremes: strong value hands + semi-bluffs',
      example: 'Use polar when you expect folds, especially in position',
    },
    {
      term: 'Merged Range',
      definition: 'A range that sits between linear and polarized',
      example: 'Merged 3-bets OOP vs tight opens (mistake)',
    },
    {
      term: 'Range',
      definition: 'The entire set of hands a player would take a particular action with',
      example: 'Your range must be defendable',
    },
    {
      term: 'Bottom-of-Range',
      definition: 'The weakest hands in your range',
      example: "Learn the 'bottom of range'",
    },
    {
      term: 'Stack Depth',
      definition: 'How many big blinds are in play',
      example: 'Shallow stacks (under 40bb)',
    },
    {
      term: 'Effective Stack',
      definition: 'The smallest stack between you and your opponent(s)',
      example: '100bb effective stacks',
    },
    {
      term: 'Shallow Stacks',
      definition: 'Short stack depth (typically under 40bb)',
      example: 'Short stacks favor Broadways and pairs',
    },
    {
      term: 'Deep Stacks',
      definition: 'Large stack depth (100bb+)',
      example: 'Deep stacks reward hands that can make hidden strong hands',
    },
    {
      term: 'Heads-Up',
      definition: 'A pot contested by only two players',
      example: 'Heads-up BB vs open: defend wide',
    },
    {
      term: 'Multiway',
      definition: 'A pot with three or more players remaining',
      example: 'Multiway BB: tighten the offsuit trash',
    },
    {
      term: 'ISO',
      definition: 'Isolation - Raising to force limpers out and play heads-up',
      example: 'ISO raising means raising after someone limps',
    },
    {
      term: 'Set-Mining',
      definition: 'Calling preflop with a pocket pair hoping to flop a set',
      example: 'Set-mine/realize IP',
    },
    {
      term: 'Squeeze',
      definition: 'A 3-bet after other players have already called the open',
      example: "If there are callers and you're squeezing, size up",
    },
    {
      term: 'Open Size',
      definition: 'The amount you bet when raising first in',
      example: 'Default RFI size: 2.5x',
    },
    {
      term: '3-bet Size',
      definition: 'The amount you bet when re-raising',
      example: 'IP: 3x, OOP: 3.5x the open',
    },
    {
      term: 'Position',
      definition: 'Your seat relative to the button',
      example: 'Position is the main dial',
    },
    { term: 'IP', definition: 'In Position - Acting after your opponent(s)', example: 'IP 3-bet: 3x' },
    { term: 'OOP', definition: 'Out of Position - Acting before your opponent(s)', example: 'OOP 3-bet: 3.5x' },
    {
      term: 'Rake',
      definition: 'The fee taken by the poker room/online platform',
      example: 'EP mistakes are expensive (rake + OOP + 3-bet pressure)',
    },
    { term: 'Tight', definition: 'Playing fewer hands', example: 'Early position is tight and disciplined' },
    { term: 'Loose', definition: 'Playing more hands', example: 'widen late' },
    { term: 'Aggressive', definition: 'Frequently betting and raising', example: 'Aggressive 3-bettors are behind' },
    { term: 'Passive', definition: 'Frequently calling rather than raising', example: 'If passive nits are behind' },
    { term: 'Nit', definition: 'A very tight player', example: 'Versus a nit: fold more' },
    { term: 'Maniac', definition: 'A very loose and aggressive player', example: 'Versus a maniac: widen continues' },
    { term: 'Sticky', definition: "A player who calls too much and doesn't fold", example: 'If blinds are sticky' },
    { term: 'Over-fold', definition: 'Folding more than optimal', example: 'If the blinds over-fold' },
    { term: 'Under-bluff', definition: 'A player who bluffs less than optimal', example: 'Fold more vs under-bluffers' },
    { term: 'Freeroll', definition: 'A situation where you can win without risking additional chips', example: 'Avoid giving BB a cheap freeroll' },
  ],
}

type TermEntry = {
  term: string
  definition: string
  example?: string
}

type GlossaryItem = TermEntry & {
  category: string
}

const categories = [
  { key: 'positions', label: 'Positions' },
  { key: 'actions', label: 'Actions' },
  { key: 'hand_notations', label: 'Hand Notations' },
  { key: 'concepts', label: 'Concepts' },
  { key: 'strategy_terms', label: 'Strategy Terms' },
] as const

const allItems: GlossaryItem[] = categories.flatMap((category) =>
  glossaryData[category.key].map((entry) => ({
    ...entry,
    category: category.label,
  }))
)

function App() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return allItems.filter((item) => {
      const matchesCategory =
        activeCategory === 'All' || item.category === activeCategory
      if (!matchesCategory) return false
      if (!normalized) return true
      const haystack = `${item.term} ${item.definition} ${item.example ?? ''}`
        .toLowerCase()
        .trim()
      return haystack.includes(normalized)
    })
  }, [query, activeCategory])

  const toggleExpanded = (key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="glossary-app">
      <header className="glossary-header">
        <div>
          <p className="glossary-kicker">Midnight Academy</p>
          <h1>Poker Terms Glossary</h1>
          <p className="glossary-subtitle">
            Tight definitions, clean examples, zero fluff. Search or filter to
            lock in the language.
          </p>
        </div>
        <div className="glossary-meta">
          <div className="meta-card">
            <span className="meta-label">Total Terms</span>
            <span className="meta-value">{allItems.length}</span>
          </div>
          <div className="meta-card">
            <span className="meta-label">Showing</span>
            <span className="meta-value">{filtered.length}</span>
          </div>
        </div>
      </header>

      <section className="glossary-controls">
        <input
          className="search-input"
          placeholder="Search terms, definitions, or examples…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <div className="category-filters">
          {['All', ...categories.map((cat) => cat.label)].map((label) => (
            <button
              key={label}
              className={`filter-button ${
                activeCategory === label ? 'active' : ''
              }`}
              onClick={() => setActiveCategory(label)}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      <section className="glossary-grid">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <h2>No matches</h2>
            <p>Try another keyword or clear the category filter.</p>
          </div>
        ) : (
          filtered.map((item) => {
            const key = `${item.category}-${item.term}`
            const isOpen = expanded[key]
            return (
              <article
                key={key}
                className={`term-card ${isOpen ? 'open' : ''}`}
                onClick={() => toggleExpanded(key)}
              >
                <div className="term-card-header">
                  <div>
                    <span className="term-category">{item.category}</span>
                    <h3>{item.term}</h3>
                  </div>
                  <span className="term-toggle">{isOpen ? '−' : '+'}</span>
                </div>
                <p className="term-definition">
                  {isOpen ? item.definition : `${item.definition.slice(0, 60)}${item.definition.length > 110 ? '…' : ''}`}
                </p>
                {item.example && (
                  <div className="term-example">
                    <span className="example-label">Example</span>
                    <p>{item.example}</p>
                  </div>
                )}
              </article>
            )
          })
        )}
      </section>
    </div>
  )
}

export default App
