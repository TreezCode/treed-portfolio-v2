'use client'

import { useState } from 'react'
import { Check, LockKeyhole, ArrowRight, Users, Gift, FileImage } from 'lucide-react'

const sharingModes = [
  {
    id: 'profile',
    label: 'Shared profile',
    title: 'The things they choose to share.',
    body: 'An adult’s own gift profile is visible in its chosen circles. Sharing that profile does not share private gift plans.',
    people: ['You', 'Chosen circle', 'Adult recipient'],
    visible: [true, true, true],
  },
  {
    id: 'idea',
    label: 'Private idea',
    title: 'A thought can stay yours.',
    body: 'An unassigned idea belongs to its creator. It is separate from the profile and circle, so you can explore a possibility privately.',
    people: ['You', 'Chosen circle', 'Adult recipient'],
    visible: [true, false, false],
  },
  {
    id: 'plan',
    label: 'Gift plan',
    title: 'Bring in the right people.',
    body: 'A shared plan is visible to you and accepted collaborators. The recipient stays out, and your private notes remain yours.',
    people: ['You', 'Accepted collaborators', 'Adult recipient'],
    visible: [true, true, false],
  },
] as const

export function SharingExample() {
  const [selected, setSelected] = useState(0)
  const mode = sharingModes[selected]
  return (
    <section
      className="case-demo sharing-demo"
      id="interactive-example"
      aria-labelledby="sharing-example-title"
    >
      <div className="case-demo-heading">
        <h2 id="sharing-example-title">Who can see this?</h2>
        <p>Explore PresentSphere’s separate sharing boundaries with an adult recipient.</p>
      </div>
      <div className="case-demo-controls" role="group" aria-label="Choose a sharing example">
        {sharingModes.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={selected === index}
            aria-controls="sharing-result"
            onClick={() => setSelected(index)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="sharing-stage" id="sharing-result" aria-live="polite" aria-atomic="true">
        <div className="sharing-art" aria-hidden="true">
          <Gift size={36} strokeWidth={1.2} />
          <span>{mode.label}</span>
        </div>
        <ul className="sharing-people">
          {mode.people.map((person, i) => (
            <li key={person} data-visible={mode.visible[i]}>
              <span>
                {i === 0 ? (
                  <Users size={18} />
                ) : mode.visible[i] ? (
                  <Check size={18} />
                ) : (
                  <LockKeyhole size={18} />
                )}
                {person}
              </span>
              <strong>{mode.visible[i] ? 'Can see it' : 'Private'}</strong>
            </li>
          ))}
        </ul>
        <div className="sharing-explanation">
          <h3>{mode.title}</h3>
          <p>{mode.body}</p>
        </div>
      </div>
      <noscript>
        <p className="case-demo-note">
          Private ideas are creator-only. Shared gift plans include accepted collaborators, exclude
          the recipient, and keep private notes with their author.
        </p>
      </noscript>
    </section>
  )
}

function filenamePart(value: string, separator: string) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, separator)
    .replace(/^[-_]+|[-_]+$/g, '')
}

export function FilenameExample() {
  const [sku, setSku] = useState('Studio Lamp 08')
  const [view, setView] = useState('Front view')
  const [separator, setSeparator] = useState('-')
  const stem = [filenamePart(sku, separator), filenamePart(view, separator)]
    .filter(Boolean)
    .join(separator)
  const filename = stem ? `${stem}.jpg` : 'Add a product name or view'
  return (
    <section
      className="case-demo filename-demo"
      id="interactive-example"
      aria-labelledby="filename-example-title"
    >
      <div className="case-demo-heading">
        <h2 id="filename-example-title">A name you can predict.</h2>
        <p>Try a small, local example of the product-and-view naming pattern.</p>
      </div>
      <div className="filename-controls">
        <label>
          Product or SKU
          <input
            value={sku}
            maxLength={48}
            onChange={(e) => setSku(e.target.value)}
            autoComplete="off"
          />
        </label>
        <label>
          Image view
          <select value={view} onChange={(e) => setView(e.target.value)}>
            <option>Front view</option>
            <option>Side detail</option>
            <option>In the room</option>
          </select>
        </label>
        <label>
          Separator
          <select value={separator} onChange={(e) => setSeparator(e.target.value)}>
            <option value="-">Hyphen</option>
            <option value="_">Underscore</option>
          </select>
        </label>
      </div>
      <div className="filename-result">
        <span>
          <FileImage size={24} /> DSC_0042.JPG
        </span>
        <ArrowRight aria-hidden="true" />
        <output aria-live="polite">{filename}</output>
      </div>
      <p className="case-demo-note">
        This interactive example previews text only. Your files stay on your device. The full
        Renamerly app handles templates, previews and batch exports.
      </p>
    </section>
  )
}
