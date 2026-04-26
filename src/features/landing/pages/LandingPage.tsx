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
  const [activePanel, setActivePanel] = useState(0)
  const [statusMessage, setStatusMessage] = useState('')
  const [timelineIndex, setTimelineIndex] = useState(0)
  const [financialMode, setFinancialMode] = useState<'act-now' | 'delay'>(
    'act-now',
  )

  const selectedArea = useMemo(
    () => areaTypes.find((areaType) => areaType.id === selectedAreaTypeId),
    [selectedAreaTypeId],
  )

  const financialScenario =
    financialMode === 'act-now'
      ? {
          title: 'If your community acts now',
          value: 'Lower risk, steadier property value',
          detail:
            'Early planning helps avoid emergency repair spikes and can preserve long-term neighborhood value.',
        }
      : {
          title: 'If action is delayed',
          value: 'Higher repair exposure, larger losses',
          detail:
            'Waiting can mean emergency construction, repeat storm damage, and increased financial pressure over time.',
        }

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

  const panelTitles = [
    'Outreach',
    'Timeline',
    'Your Shoreline',
    'Future Outlook',
    'Financial Impact',
    'Solutions',
  ]

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

  const goToNextPanel = () =>
    setActivePanel((current) => (current + 1) % panelTitles.length)
  const goToPreviousPanel = () =>
    setActivePanel((current) => (current - 1 + panelTitles.length) % panelTitles.length)

  return (
    <main className="pb-8">
      <section className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-cyan-500 via-sky-500 to-indigo-500 px-6 py-20 text-white md:py-24">
        <div className="pointer-events-none absolute -left-8 top-10 h-32 w-32 rounded-full bg-white/20 blur-sm" />
        <div className="pointer-events-none absolute right-8 top-16 h-24 w-24 rounded-full bg-emerald-200/30 blur-sm" />
        <div className="pointer-events-none absolute bottom-8 right-20 h-28 w-28 rounded-full bg-fuchsia-200/20 blur-sm" />
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 inline-block rounded-full bg-white/20 px-3 py-1 text-sm font-bold uppercase tracking-wider text-cyan-50">
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
              className="rounded-full bg-white px-6 py-3 font-extrabold text-sky-700 shadow-lg shadow-sky-900/20 transition hover:-translate-y-0.5 hover:bg-cyan-50"
            >
              Explore Shoreline Outlook
            </a>
            <a
              href="#cta"
              className="rounded-full border-2 border-white/80 bg-white/10 px-6 py-3 font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-white/20"
            >
              Request Expert Guidance
            </a>
          </div>
        </div>
      </section>

      <section id="shoreline-quiz" className="flex min-h-screen items-center px-6 py-10">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-5 flex items-center justify-between rounded-3xl border-2 border-cyan-100 bg-white/90 px-4 py-3 shadow-lg shadow-cyan-100/50 backdrop-blur">
            <button
              type="button"
              onClick={goToPreviousPanel}
              className="rounded-full border-2 border-cyan-200 bg-cyan-50 px-5 py-2 font-extrabold text-cyan-700"
            >
              {'\u2190'} Back
            </button>
            <p className="text-sm font-extrabold text-cyan-800">
              {activePanel + 1} of {panelTitles.length}: {panelTitles[activePanel]}
            </p>
            <button
              type="button"
              onClick={goToNextPanel}
              className="rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 px-5 py-2 font-extrabold text-white"
            >
              Next {'\u2192'}
            </button>
          </div>

          <article className="rounded-[2rem] border-2 border-cyan-100 bg-white/95 p-6 shadow-xl shadow-sky-100 md:min-h-[72vh] md:p-8">
            {activePanel === 0 && (
              <>
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
                      className="rounded-3xl border-2 border-cyan-100 bg-gradient-to-br from-cyan-50 to-sky-50 p-5"
                    >
                      <h3 className="text-lg font-semibold text-shoreline-900">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-slate-700">{item.description}</p>
                    </article>
                  ))}
                </div>
              </>
            )}

            {activePanel === 1 && (
              <>
                <h2 className="text-3xl font-bold text-shoreline-900">
                  What Happened? A Quick Timeline
                </h2>
                <p className="mt-3 text-slate-700">
                  Use this timeline slider like an exhibit control.
                </p>
                <div className="mt-8 rounded-3xl border-2 border-cyan-100 bg-cyan-50/70 p-5">
                  <input
                    type="range"
                    min={0}
                    max={timelineItems.length - 1}
                    step={1}
                    value={timelineIndex}
                    onChange={(event) => setTimelineIndex(Number(event.target.value))}
                    className="w-full accent-cyan-500"
                    aria-label="Timeline step"
                  />
                  <article className="mt-4 rounded-2xl bg-white p-5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-shoreline-700">
                      {timelineItems[timelineIndex].period}
                    </p>
                    <h3 className="text-xl font-semibold text-shoreline-900">
                      {timelineItems[timelineIndex].title}
                    </h3>
                    <p className="mt-1 text-slate-700">
                      {timelineItems[timelineIndex].description}
                    </p>
                  </article>
                </div>
              </>
            )}

            {activePanel === 2 && (
              <>
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
                        className={`rounded-3xl border-2 bg-white p-5 text-left shadow-md transition ${
                          isSelected
                            ? 'border-cyan-400 ring-4 ring-cyan-100'
                            : 'border-cyan-100 hover:-translate-y-0.5 hover:border-cyan-300'
                        }`}
                      >
                        <div className="mb-4 h-28 rounded-2xl bg-gradient-to-br from-cyan-200 via-sky-200 to-indigo-200" />
                        <h3 className="text-lg font-semibold text-shoreline-900">
                          {areaType.title}
                        </h3>
                        <p className="mt-1 text-slate-700">{areaType.description}</p>
                      </button>
                    )
                  })}
                </div>
                <p className="mt-5 rounded-2xl border-2 border-cyan-100 bg-gradient-to-r from-cyan-50 to-emerald-50 p-4 text-slate-800">
                  {selectedArea?.guidance ??
                    'Select your shoreline type to see guidance tailored to your situation.'}
                </p>
              </>
            )}

            {activePanel === 3 && (
              <>
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
                      className="rounded-3xl border-2 border-cyan-100 bg-gradient-to-br from-cyan-50 to-emerald-50 p-5"
                    >
                      <p className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-extrabold tracking-wide text-emerald-800">
                        {item.label}
                      </p>
                      <h3 className="mt-3 text-lg font-semibold text-shoreline-900">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-slate-700">{item.description}</p>
                    </article>
                  ))}
                </div>
              </>
            )}

            {activePanel === 4 && (
              <>
                <h2 className="text-3xl font-bold text-shoreline-900">
                  Why This Matters Financially
                </h2>
                <p className="mt-3 max-w-3xl text-slate-700">
                  Waiting usually costs more. Early planning can help protect
                  property value and avoid larger emergency expenses.
                </p>
                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  {financialCards.map((card) => (
                    <article
                      key={card.title}
                      className="rounded-3xl border-2 border-rose-100 bg-gradient-to-br from-rose-50 to-orange-50 p-5"
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
                <div className="mt-6 rounded-3xl border-2 border-rose-200 bg-white p-5">
                  <p className="text-sm font-bold text-rose-700">
                    Interactive Cost Simulator
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setFinancialMode('act-now')}
                      className={`rounded-full px-4 py-2 text-sm font-extrabold ${
                        financialMode === 'act-now'
                          ? 'bg-emerald-500 text-white'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      Act now
                    </button>
                    <button
                      type="button"
                      onClick={() => setFinancialMode('delay')}
                      className={`rounded-full px-4 py-2 text-sm font-extrabold ${
                        financialMode === 'delay'
                          ? 'bg-rose-500 text-white'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      Delay action
                    </button>
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-shoreline-900">
                    {financialScenario.title}
                  </h3>
                  <p className="mt-1 text-lg font-extrabold text-rose-700">
                    {financialScenario.value}
                  </p>
                  <p className="mt-2 text-slate-700">{financialScenario.detail}</p>
                </div>
              </>
            )}

            {activePanel === 5 && (
              <>
                <h2 className="text-3xl font-bold text-shoreline-900">
                  Solutions Communities Are Using
                </h2>
                <p className="mt-3 max-w-3xl text-slate-700">
                  Inspired by successful community efforts, these options can be
                  tailored to your shoreline type and neighborhood priorities.
                </p>
                <article className="mt-8 rounded-3xl border-2 border-violet-100 bg-gradient-to-br from-violet-50 to-fuchsia-50 p-6">
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
                      className="rounded-full border-2 border-violet-200 bg-white px-5 py-2 font-extrabold text-violet-700 shadow-sm"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveSlide(
                          (current) => (current + 1) % solutionSlides.length,
                        )
                      }
                      className="rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-2 font-extrabold text-white"
                    >
                      Next
                    </button>
                  </div>
                </article>
              </>
            )}
          </article>
        </div>
      </section>

      <section id="cta" className="flex min-h-screen items-center px-6 py-16">
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-gradient-to-br from-cyan-600 via-sky-600 to-indigo-600 p-8 text-white shadow-2xl shadow-sky-300/30 md:p-10">
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
              className="rounded-2xl border-2 border-white/40 bg-white/95 px-4 py-3 text-slate-900 placeholder:text-slate-500"
            />
            <input
              name="email"
              required
              type="email"
              placeholder="Email address"
              className="rounded-2xl border-2 border-white/40 bg-white/95 px-4 py-3 text-slate-900 placeholder:text-slate-500"
            />
            <select
              name="coastlineType"
              required
              className="rounded-2xl border-2 border-white/40 bg-white/95 px-4 py-3 text-slate-900 md:col-span-2"
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
              className="min-h-28 rounded-2xl border-2 border-white/40 bg-white/95 px-4 py-3 text-slate-900 placeholder:text-slate-500 md:col-span-2"
            />
            <button
              type="submit"
              className="rounded-2xl bg-white px-5 py-3 font-extrabold text-sky-700 shadow-lg md:col-span-2"
            >
              Request Shoreline Expert Consultation
            </button>
          </form>

          <p className="mt-4 text-sm font-medium text-emerald-100">{statusMessage}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            <a
              href={shareLinks.email}
              className="rounded-full border-2 border-white/40 bg-white/10 px-4 py-2 text-sm font-extrabold text-white"
            >
              Share by Email
            </a>
            <a
              href={shareLinks.x}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border-2 border-white/40 bg-white/10 px-4 py-2 text-sm font-extrabold text-white"
            >
              Share on X
            </a>
            <button
              type="button"
              onClick={copyNeighborTemplate}
              className="rounded-full border-2 border-white/40 bg-white/10 px-4 py-2 text-sm font-extrabold text-white"
            >
              Copy Neighbor Outreach Template
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
