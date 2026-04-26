import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import {
  areaTypes,
  financialCards,
  outreachItems,
  projectionItems,
  solutionSlides,
  timelineItems,
} from '../data/landingContent'

export function LandingPage() {
  const [selectedAreaTypeId, setSelectedAreaTypeId] = useState<
    (typeof areaTypes)[number]['id'] | null
  >(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const [statusMessage, setStatusMessage] = useState('')

  const selectedArea = useMemo(
    () => areaTypes.find((areaType) => areaType.id === selectedAreaTypeId),
    [selectedAreaTypeId],
  )

  const shareLinks = useMemo(() => {
    const pageUrl = 'https://example.org'
    const text =
      "Our Washington shoreline future depends on what we do today. Let's protect our properties and legacy together."

    return {
      email: `mailto:?subject=${encodeURIComponent(
        'Washington Shoreline: Let’s take action together',
      )}&body=${encodeURIComponent(
        `I found a community page about shoreline conservation in Washington.\n\n${pageUrl}`,
      )}`,
      x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
    }
  }, [])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') ?? 'Neighbor')
    const coastlineType = String(formData.get('coastlineType') ?? 'shoreline')

    setStatusMessage(
      `Thanks, ${name}. We recorded your request for a shoreline consultation for your ${coastlineType} area.`,
    )
    event.currentTarget.reset()
  }

  async function copyNeighborTemplate() {
    const template =
      'Hi neighbors, I just requested a shoreline expert consultation to better protect our Washington shoreline and property values. Would you join a short neighborhood conversation this month?'

    try {
      await navigator.clipboard.writeText(template)
      setStatusMessage('Neighbor outreach template copied to your clipboard.')
    } catch {
      setStatusMessage(`Copy this message manually: ${template}`)
    }
  }

  return (
    <main className="pb-14">
      <section className="bg-gradient-to-br from-shoreline-900 to-sky-800 px-6 py-20 text-white md:py-24">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-emerald-200">
            Washington Shoreline Conservation
          </p>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">
            Protect Your Shoreline. Protect Your Legacy.
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-emerald-50/95">
            If we act now, we can protect the places we call home, reduce future
            costs, and preserve what we pass on to our kids and grandkids.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#shoreline-quiz"
              className="rounded-full bg-white px-5 py-3 font-semibold text-shoreline-900 transition hover:bg-emerald-50"
            >
              Explore Shoreline Outlook
            </a>
            <a
              href="#cta"
              className="rounded-full border border-white/70 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Request Expert Guidance
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-shoreline-900">
            How Outreach Happens Today
          </h2>
          <p className="mt-3 max-w-3xl text-slate-700">
            We meet residents where they already are: trusted clubs, agency
            channels, neighborhood communication, and a clear mobile-friendly
            website.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {outreachItems.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-shoreline-100 bg-white p-5 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-shoreline-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-slate-700">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-shoreline-900">
            What Happened? A Quick Timeline
          </h2>
          <div className="mt-8 space-y-4 border-l-4 border-shoreline-500 pl-5">
            {timelineItems.map((item) => (
              <article key={item.period}>
                <p className="text-sm font-semibold uppercase tracking-wide text-shoreline-700">
                  {item.period}
                </p>
                <h3 className="text-xl font-semibold text-shoreline-900">
                  {item.title}
                </h3>
                <p className="mt-1 text-slate-700">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="shoreline-quiz" className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-shoreline-900">
            Which One Looks More Like Your View?
          </h2>
          <p className="mt-3 max-w-3xl text-slate-700">
            Pick the option that best matches your shoreline area. We will
            personalize the next step guidance.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {areaTypes.map((areaType) => {
              const isSelected = selectedAreaTypeId === areaType.id
              return (
                <button
                  key={areaType.id}
                  type="button"
                  onClick={() => setSelectedAreaTypeId(areaType.id)}
                  className={`rounded-2xl border bg-white p-5 text-left shadow-sm transition ${
                    isSelected
                      ? 'border-shoreline-500 ring-2 ring-shoreline-100'
                      : 'border-shoreline-100 hover:border-shoreline-300'
                  }`}
                >
                  <div className="mb-4 h-28 rounded-xl bg-gradient-to-br from-sky-200 to-cyan-300" />
                  <h3 className="text-lg font-semibold text-shoreline-900">
                    {areaType.title}
                  </h3>
                  <p className="mt-1 text-slate-700">{areaType.description}</p>
                </button>
              )
            })}
          </div>
          <p className="mt-5 rounded-xl bg-white p-4 text-slate-800 shadow-sm">
            {selectedArea?.guidance ??
              'Select your shoreline type to see guidance tailored to your situation.'}
          </p>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-shoreline-900">
            Future Outlook in 50-Year Steps
          </h2>
          <p className="mt-3 max-w-3xl text-slate-700">
            Helping residents visualize long-term change can make policy,
            planning, and funding decisions easier to understand.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {projectionItems.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-shoreline-100 bg-shoreline-50 p-5"
              >
                <p className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold tracking-wide text-emerald-800">
                  {item.label}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-shoreline-900">
                  {item.title}
                </h3>
                <p className="mt-1 text-slate-700">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-shoreline-900">
            Why This Matters Financially
          </h2>
          <p className="mt-3 max-w-3xl text-slate-700">
            Waiting usually costs more. Early planning can help protect property
            value and avoid larger emergency expenses.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {financialCards.map((card) => (
              <article
                key={card.title}
                className="rounded-2xl border border-shoreline-100 bg-white p-5 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-shoreline-900">
                  {card.title}
                </h3>
                <p className="mt-3 text-2xl font-extrabold text-rose-700">
                  {card.metric}
                </p>
                <p className="mt-2 text-slate-700">{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-shoreline-900">
            Solutions Communities Are Using
          </h2>
          <p className="mt-3 max-w-3xl text-slate-700">
            Inspired by successful community efforts, these options can be
            tailored to your shoreline type and neighborhood priorities.
          </p>
          <article className="mt-8 rounded-2xl border border-shoreline-100 bg-shoreline-50 p-6">
            <h3 className="text-2xl font-bold text-shoreline-900">
              {solutionSlides[activeSlide].title}
            </h3>
            <p className="mt-3 text-slate-700">
              {solutionSlides[activeSlide].description}
            </p>
            <div className="mt-6 flex gap-2">
              <button
                type="button"
                onClick={() =>
                  setActiveSlide(
                    (current) =>
                      (current - 1 + solutionSlides.length) % solutionSlides.length,
                  )
                }
                className="rounded-lg bg-white px-4 py-2 font-semibold text-shoreline-900 shadow-sm"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() =>
                  setActiveSlide((current) => (current + 1) % solutionSlides.length)
                }
                className="rounded-lg bg-shoreline-500 px-4 py-2 font-semibold text-white"
              >
                Next
              </button>
            </div>
          </article>
        </div>
      </section>

      <section id="cta" className="px-6 py-16">
        <div className="mx-auto max-w-5xl rounded-3xl bg-shoreline-900 p-8 text-white md:p-10">
          <h2 className="text-3xl font-bold">Take Action with Your Community</h2>
          <p className="mt-3 max-w-3xl text-emerald-100">
            Share this effort, talk with your neighbors, and connect with a
            trusted professional before small issues turn into expensive ones.
          </p>

          <form className="mt-8 grid gap-3 md:grid-cols-2" onSubmit={handleSubmit}>
            <input
              name="name"
              required
              placeholder="Full name"
              className="rounded-xl border border-white/30 bg-white/95 px-4 py-3 text-slate-900 placeholder:text-slate-500"
            />
            <input
              name="email"
              required
              type="email"
              placeholder="Email address"
              className="rounded-xl border border-white/30 bg-white/95 px-4 py-3 text-slate-900 placeholder:text-slate-500"
            />
            <select
              name="coastlineType"
              required
              className="rounded-xl border border-white/30 bg-white/95 px-4 py-3 text-slate-900 md:col-span-2"
              defaultValue=""
            >
              <option value="" disabled>
                What type of coastline do you live on?
              </option>
              <option value="bay">Bay</option>
              <option value="river-mouth">River mouth</option>
              <option value="bluff">Bluff / coastal slope</option>
              <option value="estuary">Estuary / wetland edge</option>
            </select>
            <textarea
              name="notes"
              placeholder="What changes have you observed over the last few years?"
              className="min-h-28 rounded-xl border border-white/30 bg-white/95 px-4 py-3 text-slate-900 placeholder:text-slate-500 md:col-span-2"
            />
            <button
              type="submit"
              className="rounded-xl bg-white px-5 py-3 font-semibold text-shoreline-900 md:col-span-2"
            >
              Request Shoreline Expert Consultation
            </button>
          </form>

          <p className="mt-4 text-sm font-medium text-emerald-100">{statusMessage}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            <a
              href={shareLinks.email}
              className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white"
            >
              Share by Email
            </a>
            <a
              href={shareLinks.x}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white"
            >
              Share on X
            </a>
            <button
              type="button"
              onClick={copyNeighborTemplate}
              className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white"
            >
              Copy Neighbor Outreach Template
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
