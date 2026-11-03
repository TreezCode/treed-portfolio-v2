import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import './playground-story.css'

export default function KeeperStoryPreview() {
  return (
    <section className="playground-story folio-container" aria-labelledby="keeper-story-title">
      <Link
        href="/work/portal-keeper"
        className="playground-story-image"
        aria-label="Read The Portal Keeper case study"
      >
        <Image
          src="/portfolio/portal-keeper/awake.png"
          alt="Light reaches the receiver and reveals a garden inside the awakened portal"
          width={960}
          height={641}
          sizes="(max-width: 760px) calc(100vw - 40px), 32vw"
        />
      </Link>
      <div>
        <h2 id="keeper-story-title">Inside The Portal Keeper.</h2>
        <p>
          How a miniature world becomes a working puzzle. Explore the reflected light, the garden
          inside a doorway, and the decisions behind both ways to play.
        </p>
        <Link className="folio-text-link" href="/work/portal-keeper">
          Read the case study <ArrowUpRight size={18} />
        </Link>
      </div>
    </section>
  )
}
