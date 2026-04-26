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
  const [activeAppPage, setActiveAppPage] = useState(0)
  const [panelDragStartX, setPanelDragStartX] = useState<number | null>(null)
  const [isSourcesOpen, setIsSourcesOpen] = useState(false)
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
          value: 'Reduce risk before costs spike',
          detail:
            'Early planning improves options: phased upgrades, smarter permitting, and better long-term protection for homes and infrastructure.',
        }
      : {
          title: 'If action is delayed',
          value: 'Higher emergency exposure, fewer options',
          detail:
            'Waiting often pushes communities into reactive fixes after damage occurs, which can increase both direct repair and indirect costs.',
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

  const sourceLinks = [
    {
      label: 'WA Dept. of Ecology — Shoreline & Coastal Planning',
      url: 'https://ecology.wa.gov/water-shorelines/shoreline-coastal-management/shoreline-coastal-planning',
    },
    {
      label: 'WA Dept. of Ecology — Sea Level Rise',
      url: 'https://ecology.wa.gov/air-climate/responding-to-climate-change/sea-level-rise',
    },
    {
      label: 'WA Dept. of Ecology — Climate Resilience & Shoreline Management',
      url: 'https://ecology.wa.gov/water-shorelines/shoreline-coastal-management/shoreline-coastal-planning/shoreline-planners-toolbox/climate-resilience-and-shoreline-management',
    },
    {
      label: 'WDFW — Marine Shorelines',
      url: 'https://wdfw.wa.gov/species-habitats/ecosystems/marine-shorelines',
    },
    {
      label: 'UW Climate Impacts Group — WA Coast Climate Impacts',
      url: 'https://cig.uw.edu/publications/impacts-of-climate-change-on-the-coasts-of-washington-state/',
    },
    {
      label: 'Washington Sea Grant — Shorelines of the Future',
      url: 'https://wsg.washington.edu/sea-levels-are-rising-in-washington-what-will-the-shorelines-of-the-future-be-like/',
    },
    {
      label: 'TVW — Coastal Town Erosion (2025)',
      url: 'https://tvw.org/2025/05/coastal-town-erosion-waves-sand-and-human-intervention/',
    },
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
    setActivePanel((current) => {
      if (current < panelTitles.length - 1) {
        return current + 1
      }

      setActiveAppPage(2)
      return current
    })

  const goToPreviousPanel = () => {
    if (activePanel === 0) {
      setActiveAppPage(0)
      return
    }

    setActivePanel((current) => (current > 0 ? current - 1 : current))
  }

  function handlePanelPointerDown(clientX: number) {
    setPanelDragStartX(clientX)
  }

  function handlePanelPointerUp(clientX: number) {
    if (panelDragStartX === null) return

    const deltaX = clientX - panelDragStartX
    const threshold = 45

    if (deltaX <= -threshold) {
      goToNextPanel()
    } else if (deltaX >= threshold) {
      goToPreviousPanel()
    }

    setPanelDragStartX(null)
  }

  return (
    <main className="h-screen overflow-hidden">
      <div
        className="flex h-full w-[300vw] transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${activeAppPage * 100}vw)` }}
      >
        <section
          id="landing-hero"
          className="relative flex h-full w-screen items-center overflow-hidden bg-gradient-to-br from-cyan-500 via-sky-500 to-indigo-500 px-6 py-20 text-white md:py-24"
        >
          <div className="pointer-events-none absolute -left-8 top-10 h-32 w-32 rounded-full bg-white/20 blur-sm" />
          <div className="pointer-events-none absolute right-8 top-16 h-24 w-24 rounded-full bg-emerald-200/30 blur-sm" />
          <div className="pointer-events-none absolute bottom-8 right-20 h-28 w-28 rounded-full bg-fuchsia-200/20 blur-sm" />
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="mb-3 inline-block rounded-full bg-white/20 px-3 py-1 text-sm font-bold uppercase tracking-wider text-cyan-50">
                Washington Shoreline Conservation
              </p>
              <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
                Protect Your Shoreline. Protect Your Legacy.
              </h1>
              <p className="mt-5 text-lg text-emerald-50/95">
                Washington shorelines support homes, habitat, and local economies.
                Let&apos;s make this practical: what is changing, what it means for
                your property, and what you can do next.
              </p>
              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => setActiveAppPage(2)}
                  className="rounded-full border-2 border-white/80 bg-white/10 px-6 py-3 font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-white/20"
                >
                  Request Expert Guidance
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveAppPage(1)}
              className="inline-flex flex-col items-center gap-2 text-white md:mb-2"
              aria-label="Go to shoreline informational pages"
            >
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-3xl font-black text-sky-700 shadow-lg shadow-sky-900/20 transition hover:-translate-y-0.5 hover:bg-cyan-50">
                {'\u2192'}
              </span>
              <span className="text-sm font-extrabold uppercase tracking-wide text-cyan-50">
                Explore Shoreline Outlook
              </span>
            </button>
          </div>
        </section>

        <section id="shoreline-quiz" className="relative h-full w-screen overflow-hidden">
          <div className="pointer-events-none absolute -left-8 top-10 h-32 w-32 rounded-full bg-white/20 blur-sm" />
          <div className="pointer-events-none absolute right-8 top-16 h-24 w-24 rounded-full bg-emerald-200/30 blur-sm" />
          <div className="pointer-events-none absolute bottom-8 right-20 h-28 w-28 rounded-full bg-fuchsia-200/20 blur-sm" />

          <div className="absolute left-6 top-1/2 z-20 hidden -translate-y-1/2 md:block">
            <button
              type="button"
              onClick={goToPreviousPanel}
              className="inline-flex flex-col items-center gap-2 text-white"
            >
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl font-black text-sky-700 shadow-lg shadow-sky-900/20">
                {'\u2190'}
              </span>
              <span className="text-xs font-extrabold uppercase tracking-wide text-cyan-50">
                {activePanel === 0 ? 'Landing' : 'Back'}
              </span>
            </button>
          </div>

          <div className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 md:block">
            <button
              type="button"
              onClick={goToNextPanel}
              className="inline-flex flex-col items-center gap-2 text-white"
            >
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl font-black text-sky-700 shadow-lg shadow-sky-900/20">
                {'\u2192'}
              </span>
              <span className="text-xs font-extrabold uppercase tracking-wide text-cyan-50">
                Next
              </span>
            </button>
          </div>

          <div className="absolute left-1/2 top-6 z-20 hidden -translate-x-1/2 md:block">
            <p className="rounded-full bg-white/20 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-cyan-50">
              {activePanel + 1} / {panelTitles.length}
            </p>
          </div>

          <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 rounded-full bg-white/15 px-3 py-2 backdrop-blur md:hidden">
            <button
              type="button"
              onClick={goToPreviousPanel}
              className="rounded-full bg-white px-3 py-2 text-sm font-black text-sky-700"
            >
              {'\u2190'}
            </button>
            <p className="text-xs font-extrabold uppercase tracking-wide text-cyan-50">
              {activePanel + 1}/{panelTitles.length}
            </p>
            <button
              type="button"
              onClick={goToNextPanel}
              className="rounded-full bg-white px-3 py-2 text-sm font-black text-sky-700"
            >
              {'\u2192'}
            </button>
          </div>

          <div className="absolute right-6 top-6 z-20">
            <button
              type="button"
              onClick={() => setIsSourcesOpen(true)}
              className="rounded-full border-2 border-white/40 bg-white/15 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-cyan-50 backdrop-blur hover:bg-white/25"
            >
              Sources
            </button>
          </div>

          <div
            className="flex h-full w-[600vw] transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activePanel * 100}vw)` }}
            onPointerDown={(event) => handlePanelPointerDown(event.clientX)}
            onPointerUp={(event) => handlePanelPointerUp(event.clientX)}
            onPointerCancel={() => setPanelDragStartX(null)}
          >
            <div className="flex h-full w-screen items-center bg-gradient-to-br from-cyan-500 via-sky-500 to-indigo-500 px-6 py-24 text-white">
              <article className="mx-auto w-full max-w-6xl rounded-[2rem] border-2 border-cyan-100 bg-white/95 p-6 shadow-xl shadow-sky-100 md:p-8">
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
              </article>
            </div>

            <div className="flex h-full w-screen items-center bg-gradient-to-br from-cyan-500 via-sky-500 to-indigo-500 px-6 py-24 text-white">
              <article className="mx-auto w-full max-w-6xl rounded-[2rem] border-2 border-cyan-100 bg-white/95 p-6 shadow-xl shadow-sky-100 md:p-8">
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
              </article>
            </div>

            <div className="flex h-full w-screen items-center bg-gradient-to-br from-cyan-500 via-sky-500 to-indigo-500 px-6 py-24 text-white">
              <article className="mx-auto w-full max-w-6xl rounded-[2rem] border-2 border-cyan-100 bg-white/95 p-6 shadow-xl shadow-sky-100 md:p-8">
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
              </article>
            </div>

            <div className="flex h-full w-screen items-center bg-gradient-to-br from-cyan-500 via-sky-500 to-indigo-500 px-6 py-24 text-white">
              <article className="mx-auto w-full max-w-6xl rounded-[2rem] border-2 border-cyan-100 bg-white/95 p-6 shadow-xl shadow-sky-100 md:p-8">
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
              </article>
            </div>

            <div className="flex h-full w-screen items-center bg-gradient-to-br from-cyan-500 via-sky-500 to-indigo-500 px-6 py-24 text-white">
              <article className="mx-auto w-full max-w-6xl rounded-[2rem] border-2 border-rose-200 bg-white/95 p-6 shadow-xl shadow-rose-100 md:p-8">
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
              </article>
            </div>

            <div className="flex h-full w-screen items-center bg-gradient-to-br from-cyan-500 via-sky-500 to-indigo-500 px-6 py-24 text-white">
              <article className="mx-auto w-full max-w-6xl rounded-[2rem] border-2 border-violet-200 bg-white/95 p-6 shadow-xl shadow-violet-100 md:p-8">
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
              </article>
            </div>
          </div>

          {isSourcesOpen && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-slate-950/60 px-6">
              <div className="w-full max-w-3xl rounded-3xl border-2 border-cyan-100 bg-white p-6 shadow-2xl">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-shoreline-900">
                      Information Sources
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      Core references used for shoreline facts in this experience.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsSourcesOpen(false)}
                    className="rounded-full border-2 border-slate-200 px-3 py-1 text-sm font-bold text-slate-700"
                  >
                    Close
                  </button>
                </div>

                <ul className="space-y-2">
                  {sourceLinks.map((source) => (
                    <li key={source.url}>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-semibold text-sky-700 underline decoration-sky-300 underline-offset-2"
                      >
                        {source.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </section>

        <section id="cta" className="flex h-full w-screen items-center px-6 py-16">
          <div className="mx-auto max-w-5xl rounded-[2rem] bg-gradient-to-br from-cyan-600 via-sky-600 to-indigo-600 p-8 text-white shadow-2xl shadow-sky-300/30 md:p-10">
            <div className="mb-5 flex">
              <button
                type="button"
                onClick={() => setActiveAppPage(1)}
                className="rounded-full border-2 border-white/40 bg-white/10 px-5 py-2 text-sm font-extrabold text-white"
              >
                {'\u2190'} Back to Info
              </button>
            </div>

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
      </div>
    </main>
  )
}
