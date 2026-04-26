import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import {
  areaTypes,
  ctaPageSources,
  informationalPanelSources,
  landingPageSources,
  projectionItems,
  solutionSlides,
  sourceModalLinks,
  timelineItems,
  type SourceReference,
} from '../data/landingContent'

function PanelSourcesFooter({
  sources,
  variant = 'onLight',
}: {
  sources: SourceReference[]
  variant?: 'onLight' | 'onDark'
}) {
  if (sources.length === 0) return null

  const isDark = variant === 'onDark'

  return (
    <footer
      className={
        isDark
          ? 'mt-6 border-t border-white/25 pt-4'
          : 'mt-8 border-t border-slate-200 pt-4'
      }
    >
      <p
        className={
          isDark
            ? 'text-xs font-extrabold uppercase tracking-wide text-cyan-100/90'
            : 'text-xs font-extrabold uppercase tracking-wide text-slate-500'
        }
      >
        Sources for this page
      </p>
      <ul className="mt-2 list-none space-y-1.5 p-0">
        {sources.map((source) => (
          <li key={source.url}>
            <a
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className={
                isDark
                  ? 'text-xs font-semibold text-white underline decoration-cyan-200/80 underline-offset-2 hover:text-cyan-50'
                  : 'text-xs font-semibold text-sky-700 underline decoration-sky-300 underline-offset-2 hover:text-sky-800'
              }
            >
              {source.label}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  )
}

export function LandingPage() {
  const [selectedAreaTypeId, setSelectedAreaTypeId] = useState<
    (typeof areaTypes)[number]['id'] | null
  >(null)
  const [activePanel, setActivePanel] = useState(0)
  const [activeAppPage, setActiveAppPage] = useState(0)
  const [appDragStartX, setAppDragStartX] = useState<number | null>(null)
  const [panelDragStartX, setPanelDragStartX] = useState<number | null>(null)
  const [isSourcesOpen, setIsSourcesOpen] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const [timelinePosition, setTimelinePosition] = useState(0)
  const [activeHotspotId, setActiveHotspotId] = useState('shoreline-edge')

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
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        pageUrl,
      )}&quote=${encodeURIComponent(text)}`,
      x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
    }
  }, [])

  const panelTitles = [
    'Timeline',
    'Your Shoreline',
    'Future Outlook',
    'Financial Impact',
    'Solutions',
  ]

  const shorelineHotspots = [
    {
      id: 'shoreline-edge',
      label: 'Shoreline Edge',
      top: '66%',
      left: '22%',
      title: 'Erosion zone',
      impact:
        'This is where wave energy and sediment loss often show up first during king tides and storm events.',
      action:
        'Track visible shoreline retreat season-to-season and discuss nature-based stabilization options with a shoreline expert.',
    },
    {
      id: 'bluff-slope',
      label: 'Bluff/Slope',
      top: '38%',
      left: '48%',
      title: 'Bluff and slope stress',
      impact:
        'Drainage changes and storm intensity can increase slope instability and bluff erosion over time.',
      action:
        'Prioritize slope-friendly drainage and vegetation strategies before emergency repairs become necessary.',
    },
    {
      id: 'yard-infrastructure',
      label: 'Yard + Utilities',
      top: '53%',
      left: '67%',
      title: 'Property systems at risk',
      impact:
        'Repeated high-water exposure can affect septic, drainage, and nearshore infrastructure performance.',
      action:
        'Document repeated water impacts and include utility/septic considerations in your adaptation planning conversation.',
    },
    {
      id: 'nearshore-habitat',
      label: 'Nearshore Habitat',
      top: '73%',
      left: '77%',
      title: 'Habitat connection point',
      impact:
        'Nearshore habitat supports forage fish, salmon food webs, and the broader Puget Sound ecosystem.',
      action:
        'Choose options that protect sediment movement and support habitat health while reducing shoreline risk.',
    },
  ] as const

  const selectedHotspot =
    shorelineHotspots.find((hotspot) => hotspot.id === activeHotspotId) ??
    shorelineHotspots[0]

  const activeTimelineIndex = Math.min(
    timelineItems.length - 1,
    Math.max(0, Math.round(timelinePosition)),
  )

  const panelImages = [
    {
      src: '/images/wa-coast-1.jpg',
      alt: 'Washington shoreline with coastal homes and water.',
    },
    {
      src: '/images/puget-sound-federal-way.jpg',
      alt: 'Puget Sound style coastline and tide movement.',
    },
    {
      src: '/images/hoh-head-coast.jpg',
      alt: 'Eroding beach and bluff edge along a coastal area.',
    },
    {
      src: '/images/jagged-island-coast.jpg',
      alt: 'Pacific Northwest coastal landscape with shoreline habitat.',
    },
    {
      src: '/images/wa-coast-2.jpg',
      alt: 'Coastal flood risk visual near homes and infrastructure.',
    },
    {
      src: '/images/wa-coast-1.jpg',
      alt: 'Shoreline restoration and habitat-focused coastal scene.',
    },
  ]

  const timelineImages = [
    {
      src: '/images/timeline-01-lonely-cove-1906.jpeg',
      alt: 'Historic Washington Pacific coast beach and shoreline from early 1900s.',
      caption: 'Historic shoreline view (early 1900s)',
    },
    {
      src: '/images/timeline-02-washington-coast.jpg',
      alt: 'Natural Washington coast with wave-exposed shoreline and sediment movement.',
      caption: 'Natural coastal systems under wave energy',
    },
    {
      src: '/images/timeline-03-washington-coastline-2.jpg',
      alt: 'Washington shoreline showing developed coastal edge and altered beach profile.',
      caption: 'Shoreline change under development pressure',
    },
    {
      src: '/images/timeline-04-washington-coastline-5768.jpg',
      alt: 'Washington coastline with visible erosion and high-energy shoreline processes.',
      caption: 'Erosion signals become more visible',
    },
    {
      src: '/images/timeline-05-puget-sound-federal-way.jpg',
      alt: 'Puget Sound shoreline with residential areas and marine water.',
      caption: 'Shoreline risk becomes a community planning issue',
    },
    {
      src: '/images/timeline-06-hoh-head.jpg',
      alt: 'Hoh Head on Washington coast showing exposed coastal bluff and shoreline.',
      caption: 'Current hazards: bluff stress and coastal exposure',
    },
    {
      src: '/images/timeline-07-jagged-island.jpg',
      alt: 'Washington coastal habitat landscape illustrating dynamic nearshore systems.',
      caption: 'Adaptation era: protect habitat while reducing risk',
    },
    {
      src: '/images/timeline-05-puget-sound-federal-way.jpg',
      alt: 'Puget Sound shoreline exposed to higher water and increasing flood pressure.',
      caption: '2030s-2040s: the adaptation window narrows',
    },
    {
      src: '/images/timeline-08-2050-outlook.jpg',
      alt: 'Washington coastal outlook image representing future resilience planning horizon.',
      caption: '2050+ outlook: long-term resilience depends on decisions now',
    },
  ] as const

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

  function snapTimelineToNearestPoint() {
    setTimelinePosition((current) =>
      Math.min(timelineItems.length - 1, Math.max(0, Math.round(current))),
    )
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

  function isInteractiveTarget(targetElement: EventTarget | null) {
    const target = targetElement as HTMLElement | null
    return Boolean(target?.closest('input,textarea,select,button,a'))
  }

  function handleAppPointerDown(
    clientX: number,
    targetElement: EventTarget | null,
  ) {
    if (isInteractiveTarget(targetElement)) {
      setAppDragStartX(null)
      return
    }
    setAppDragStartX(clientX)
  }

  function handleAppPointerUp(clientX: number) {
    if (appDragStartX === null) return

    const deltaX = clientX - appDragStartX
    const threshold = 45

    if (deltaX <= -threshold && activeAppPage < 2) {
      setActiveAppPage((current) => Math.min(current + 1, 2))
    } else if (deltaX >= threshold && activeAppPage > 0) {
      setActiveAppPage((current) => Math.max(current - 1, 0))
    }

    setAppDragStartX(null)
  }

  function handlePanelPointerDown(
    clientX: number,
    targetElement: EventTarget | null,
  ) {
    if (isInteractiveTarget(targetElement)) {
      setPanelDragStartX(null)
      return
    }
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
          className="relative flex h-full w-screen items-center overflow-hidden bg-white px-6 py-20 text-slate-900 md:py-24"
          onPointerDown={(event) =>
            handleAppPointerDown(event.clientX, event.target)
          }
          onPointerUp={(event) => handleAppPointerUp(event.clientX)}
          onPointerCancel={() => setAppDragStartX(null)}
        >
          <div
            className="pointer-events-none absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/LandingPage.jpg')" }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-white/58"
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute -left-8 top-10 h-32 w-32 rounded-full bg-white/20 blur-sm" />
          <div className="pointer-events-none absolute right-8 top-16 h-24 w-24 rounded-full bg-emerald-200/30 blur-sm" />
          <div className="pointer-events-none absolute bottom-8 right-20 h-28 w-28 rounded-full bg-fuchsia-200/20 blur-sm" />
          <div className="absolute right-8 top-8 z-20 md:right-14 md:top-10">
            <img
              src="/images/Washington_State_Department_of_Fish_and_Wildlife_(logo).svg"
              alt="Washington Department of Fish and Wildlife logo"
              className="h-24 w-auto rounded-xl bg-white/80 p-2.5 shadow-lg shadow-slate-500/35 md:h-36"
              loading="eager"
              decoding="async"
            />
          </div>
          <div className="relative z-10 mx-auto w-full max-w-6xl">
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl rounded-3xl border border-white/70 bg-white/38 p-5 shadow-lg shadow-slate-600/10 backdrop-blur-[1px] md:p-6">
                <p className="mb-3 inline-block rounded-full border border-[#3f7a3f] bg-white/85 px-3 py-1 text-sm font-bold uppercase tracking-wider text-teal-800">
                  Washington Department of Fish and Wildlife
                </p>
                <h1 className="text-4xl font-extrabold leading-tight text-slate-900 md:text-6xl">
                  Protect Your Shoreline. Protect Your Legacy.
                </h1>
                <p className="mt-5 text-lg text-slate-800">
                  Washington shorelines support homes, habitat, and local economies.
                  Let&apos;s make this practical: what is changing, what it means for
                  your property, and what you can do next.
                </p>
                <div className="mt-8 flex justify-end md:mt-12">
                  <button
                    type="button"
                    onClick={() => setActiveAppPage(1)}
                    className="inline-flex flex-col items-center gap-2 text-slate-900"
                    aria-label="Go to shoreline informational pages"
                  >
                    <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-3xl font-black text-teal-700 shadow-lg shadow-sky-900/20 transition hover:-translate-y-0.5 hover:bg-teal-50">
                      {'\u2192'}
                    </span>
                    <span className="text-sm font-extrabold uppercase tracking-wide text-slate-800">
                      See how
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-2 left-2 z-20 max-w-[calc(100%-1rem)] overflow-x-auto">
            <div className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-[11px] font-semibold text-slate-700 shadow-sm">
              <span className="font-extrabold uppercase tracking-wide text-slate-600">Sources:</span>
              {landingPageSources.map((source) => (
                <a
                  key={source.url}
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-sky-300 underline-offset-2 hover:text-sky-700"
                >
                  {source.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="shoreline-quiz" className="relative h-full w-screen overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/LandingPage.jpg')" }}
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute inset-0 bg-white/58" aria-hidden="true" />
          <div className="pointer-events-none absolute -left-8 top-10 h-32 w-32 rounded-full bg-white/20 blur-sm" />
          <div className="pointer-events-none absolute right-8 top-16 h-24 w-24 rounded-full bg-emerald-200/30 blur-sm" />
          <div className="pointer-events-none absolute bottom-8 right-20 h-28 w-28 rounded-full bg-fuchsia-200/20 blur-sm" />

          <div className="absolute left-6 top-1/2 z-20 hidden -translate-y-1/2 md:block">
            <button
              type="button"
              onClick={goToPreviousPanel}
              className="inline-flex flex-col items-center gap-2 text-slate-800"
            >
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl font-black text-sky-700 shadow-lg shadow-sky-900/20">
                {'\u2190'}
              </span>
              <span className="text-xs font-extrabold uppercase tracking-wide text-slate-700">
                {activePanel === 0 ? 'Landing' : 'Back'}
              </span>
            </button>
          </div>

          <div className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 md:block">
            <button
              type="button"
              onClick={goToNextPanel}
              className="inline-flex flex-col items-center gap-2 text-slate-800"
            >
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl font-black text-sky-700 shadow-lg shadow-sky-900/20">
                {'\u2192'}
              </span>
              <span className="text-xs font-extrabold uppercase tracking-wide text-slate-700">
                Next
              </span>
            </button>
          </div>

          <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 rounded-full bg-white/15 px-3 py-2 backdrop-blur md:hidden">
            <button
              type="button"
              onClick={goToPreviousPanel}
              className="rounded-full bg-white px-3 py-2 text-sm font-black text-sky-700"
            >
              {'\u2190'}
            </button>
            <button
              type="button"
              onClick={goToNextPanel}
              className="rounded-full bg-white px-3 py-2 text-sm font-black text-sky-700"
            >
              {'\u2192'}
            </button>
          </div>

          <div className="absolute bottom-6 left-6 z-20">
            <button
              type="button"
              onClick={() => setIsSourcesOpen(true)}
              className="rounded-full border-2 border-slate-300 bg-white/75 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-slate-700 backdrop-blur hover:bg-white/90"
            >
              Sources
            </button>
          </div>

          <div
            className="flex h-full w-[500vw] transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activePanel * 100}vw)` }}
            onPointerDown={(event) =>
              handlePanelPointerDown(event.clientX, event.target)
            }
            onPointerUp={(event) => handlePanelPointerUp(event.clientX)}
            onPointerCancel={() => setPanelDragStartX(null)}
          >
            <div className="flex h-full w-screen items-center px-6 py-16">
              <article className="mx-auto max-h-[86vh] w-full max-w-6xl overflow-y-auto rounded-[2rem] border-2 border-cyan-100 bg-white/95 p-6 shadow-xl shadow-sky-100 md:p-7">
                <h2 className="text-3xl font-bold text-shoreline-900">
                  Shoreline Timelapse
                </h2>
                <img
                  src={timelineImages[activeTimelineIndex].src}
                  alt={timelineImages[activeTimelineIndex].alt}
                  loading="lazy"
                  decoding="async"
                  className="mt-5 h-52 w-full rounded-3xl object-cover"
                />
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-cyan-700">
                  {timelineImages[activeTimelineIndex].caption}
                </p>
                <p className="mt-3 text-slate-700">
                  Use this timeline slider like an exhibit control.
                </p>
                <div className="mt-8 rounded-3xl border-2 border-cyan-100 bg-cyan-50/70 p-5">
                  <input
                    type="range"
                    min={0}
                    max={timelineItems.length - 1}
                    step={0.01}
                    value={timelinePosition}
                    onChange={(event) => setTimelinePosition(Number(event.target.value))}
                    onMouseUp={snapTimelineToNearestPoint}
                    onTouchEnd={snapTimelineToNearestPoint}
                    onKeyUp={snapTimelineToNearestPoint}
                    className="w-full accent-cyan-500"
                    aria-label="Timeline step"
                  />
                  <article className="mt-4 rounded-2xl bg-white p-5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-shoreline-700">
                      {timelineItems[activeTimelineIndex].period}
                    </p>
                    <h3 className="text-xl font-semibold text-shoreline-900">
                      {timelineItems[activeTimelineIndex].title}
                    </h3>
                    <p className="mt-1 text-slate-700">
                      {timelineItems[activeTimelineIndex].description}
                    </p>
                  </article>
                </div>
                <PanelSourcesFooter sources={informationalPanelSources[0]} />
              </article>
            </div>

            <div className="flex h-full w-screen items-center px-6 py-16">
              <article className="mx-auto max-h-[86vh] w-full max-w-6xl overflow-y-auto rounded-[2rem] border-2 border-cyan-100 bg-white/95 p-6 shadow-xl shadow-sky-100 md:p-7">
                <h2 className="text-3xl font-bold text-shoreline-900">
                  Which One Looks More Like Your View?
                </h2>
                <img
                  src={panelImages[2].src}
                  alt={panelImages[2].alt}
                  loading="lazy"
                  decoding="async"
                  className="mt-5 h-52 w-full rounded-3xl object-cover"
                />
                <p className="mt-3 max-w-3xl text-slate-700">
                  Pick the option that best matches your current shoreline setup.
                  We will personalize next-step guidance based on your selection.
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
                <div className="mt-6 rounded-3xl border-2 border-cyan-100 bg-white p-4 md:p-5">
                  <p className="text-sm font-bold uppercase tracking-wide text-cyan-700">
                    Interactive Shoreline Hotspots
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Tap/click a point to see what it means and what you can do next.
                  </p>

                  <div className="mt-4 grid gap-4 lg:grid-cols-[1.35fr_1fr]">
                    <div className="relative h-64 rounded-2xl overflow-hidden border-2 border-cyan-100 md:h-72">
                      <img
                        src={panelImages[2].src}
                        alt={panelImages[2].alt}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                      {shorelineHotspots.map((hotspot) => (
                        <button
                          key={hotspot.id}
                          type="button"
                          onClick={() => setActiveHotspotId(hotspot.id)}
                          className={`group absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 px-2 py-1 text-[10px] font-extrabold uppercase tracking-wide shadow-md transition ${
                            activeHotspotId === hotspot.id
                              ? 'border-sky-700 bg-sky-700 text-white'
                              : 'border-white/90 bg-white text-sky-700 hover:bg-sky-50'
                          }`}
                          style={{ top: hotspot.top, left: hotspot.left }}
                          aria-label={`Show hotspot info for ${hotspot.label}`}
                        >
                          {hotspot.label}
                        </button>
                      ))}
                    </div>

                    <div className="rounded-2xl border-2 border-cyan-100 bg-cyan-50 p-4">
                      <p className="text-xs font-extrabold uppercase tracking-wide text-cyan-700">
                        {selectedHotspot.title}
                      </p>
                      <p className="mt-2 text-sm text-slate-700">
                        <span className="font-bold text-slate-800">What this means: </span>
                        {selectedHotspot.impact}
                      </p>
                      <p className="mt-3 text-sm text-slate-700">
                        <span className="font-bold text-slate-800">Suggested next step: </span>
                        {selectedHotspot.action}
                      </p>
                    </div>
                  </div>
                </div>
                <PanelSourcesFooter sources={informationalPanelSources[1]} />
              </article>
            </div>

            <div className="flex h-full w-screen items-center px-6 py-16">
              <article className="mx-auto max-h-[86vh] w-full max-w-6xl overflow-y-auto rounded-[2rem] border-2 border-cyan-100 bg-white/95 p-6 shadow-xl shadow-sky-100 md:p-7">
                <h2 className="text-3xl font-bold text-shoreline-900">
                  Future Outlook in 50-Year Steps
                </h2>
                <img
                  src={panelImages[3].src}
                  alt={panelImages[3].alt}
                  loading="lazy"
                  decoding="async"
                  className="mt-5 h-52 w-full rounded-3xl object-cover"
                />
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
                <PanelSourcesFooter sources={informationalPanelSources[2]} />
              </article>
            </div>

            <div className="flex h-full w-screen items-center px-6 py-16">
              <article className="mx-auto max-h-[86vh] w-full max-w-6xl overflow-y-auto rounded-[2rem] border-2 border-rose-200 bg-white/95 p-6 shadow-xl shadow-rose-100 md:p-7">
                <h2 className="text-3xl font-bold text-shoreline-900">
                  Why This Matters
                </h2>
                <img
                  src={panelImages[4].src}
                  alt={panelImages[4].alt}
                  loading="lazy"
                  decoding="async"
                  className="mt-3 h-36 w-full rounded-3xl object-cover md:h-40"
                />
                <p className="mt-2 max-w-3xl text-slate-700">
                  Shoreline decisions affect more than one property line. They shape
                  household finances, habitat health, and how resilient the whole
                  neighborhood is over time.
                </p>
                <div className="mt-5 grid gap-4 lg:grid-cols-2">
                  <article className="rounded-3xl border-2 border-rose-100 bg-gradient-to-br from-rose-50 to-orange-50 p-5">
                    <p className="text-xs font-extrabold uppercase tracking-wide text-rose-700">
                      Financially
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-shoreline-900">
                      Shoreline risk becomes household and statewide cost
                    </h3>
                    <p className="mt-3 text-slate-700">
                      Erosion, flooding, and shoreline instability can lower property
                      value, increase insurance and repair costs, and force emergency
                      fixes that are often more expensive than planned adaptation.
                    </p>
                    <p className="mt-3 text-slate-700">
                      At scale, repeated damage also strains public infrastructure,
                      local budgets, and long-term economic resilience across
                      Washington communities.
                    </p>
                  </article>

                  <article className="rounded-3xl border-2 border-emerald-100 bg-gradient-to-br from-emerald-50 to-cyan-50 p-5">
                    <p className="text-xs font-extrabold uppercase tracking-wide text-emerald-700">
                      Ecologically
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-shoreline-900">
                      Unsustainable fixes create knockdown effects
                    </h3>
                    <p className="mt-3 text-slate-700">
                      Choices that interrupt sediment flow or damage nearshore habitat
                      can reduce beach function, stress forage fish and salmon food
                      webs, and weaken the natural shoreline systems that protect
                      communities over time.
                    </p>
                    <p className="mt-3 text-slate-700">
                      One property cannot solve this alone. If only one household
                      adopts shoreline-friendly solutions while neighbors do not, the
                      benefits are limited. Lasting resilience improves when
                      neighborhoods coordinate and chip in together.
                    </p>
                  </article>
                </div>
                <PanelSourcesFooter sources={informationalPanelSources[3]} />
              </article>
            </div>

            <div className="flex h-full w-screen items-center px-6 py-16">
              <article className="mx-auto max-h-[86vh] w-full max-w-6xl overflow-y-auto rounded-[2rem] border-2 border-violet-200 bg-white/95 p-6 shadow-xl shadow-violet-100 md:p-7">
                <h2 className="text-3xl font-bold text-shoreline-900">
                  Solutions Communities Are Using
                </h2>
                <img
                  src={panelImages[5].src}
                  alt={panelImages[5].alt}
                  loading="lazy"
                  decoding="async"
                  className="mt-5 h-52 w-full rounded-3xl object-cover"
                />
                <p className="mt-3 max-w-3xl text-slate-700">
                  Inspired by successful community efforts, these options can be
                  tailored to your shoreline type and neighborhood priorities.
                </p>
                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  {solutionSlides.map((solution) => (
                    <article
                      key={solution.title}
                      className="rounded-3xl border-2 border-violet-100 bg-gradient-to-br from-violet-50 to-fuchsia-50 p-5"
                    >
                      <h3 className="text-xl font-bold text-shoreline-900">
                        {solution.title}
                      </h3>
                      <p className="mt-2 text-slate-700">{solution.description}</p>
                    </article>
                  ))}
                </div>
                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                  <article className="rounded-3xl border-2 border-violet-100 bg-white p-4 shadow-sm">
                    <h3 className="text-base font-bold text-shoreline-900">
                      Kitsap Shore Friendly Partner
                    </h3>
                    <div className="mt-3 overflow-hidden rounded-2xl">
                      <iframe
                        title="Kitsap Shore Friendly Partner video"
                        src="https://player.vimeo.com/video/184808518?h=ab450e06a2"
                        className="aspect-video w-full"
                        frameBorder="0"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                        allowFullScreen
                      />
                    </div>
                  </article>

                  <article className="rounded-3xl border-2 border-violet-100 bg-white p-4 shadow-sm">
                    <h3 className="text-base font-bold text-shoreline-900">
                      Thurston Shore Friendly Partner - the Powell Family
                    </h3>
                    <div className="mt-3 overflow-hidden rounded-2xl">
                      <iframe
                        title="Thurston Shore Friendly partner the Powell Family video"
                        src="https://www.youtube.com/embed/UWnr6XaRCho?si=g38akwU8j-aL8anD"
                        className="aspect-video w-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    </div>
                  </article>
                </div>
                <PanelSourcesFooter sources={informationalPanelSources[4]} />
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
                  {sourceModalLinks.map((source) => (
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

        <section
          id="cta"
          className="relative flex h-full w-screen items-center overflow-hidden bg-white px-6 py-12 text-white md:py-16"
          onPointerDown={(event) =>
            handleAppPointerDown(event.clientX, event.target)
          }
          onPointerUp={(event) => handleAppPointerUp(event.clientX)}
          onPointerCancel={() => setAppDragStartX(null)}
        >
          <div
            className="pointer-events-none absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/LandingPage.jpg')" }}
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute inset-0 bg-white/58" aria-hidden="true" />
          <div className="pointer-events-none absolute -left-8 top-10 h-32 w-32 rounded-full bg-white/20 blur-sm" />
          <div className="pointer-events-none absolute right-8 top-16 h-24 w-24 rounded-full bg-emerald-200/30 blur-sm" />
          <div className="pointer-events-none absolute bottom-8 right-20 h-28 w-28 rounded-full bg-fuchsia-200/20 blur-sm" />

          <div className="absolute left-6 top-1/2 z-20 hidden -translate-y-1/2 md:block">
            <button
              type="button"
              onClick={() => setActiveAppPage(1)}
              className="inline-flex flex-col items-center gap-2 text-slate-800"
            >
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl font-black text-sky-700 shadow-lg shadow-sky-900/20">
                {'\u2190'}
              </span>
              <span className="text-xs font-extrabold uppercase tracking-wide text-slate-700">
                Back
              </span>
            </button>
          </div>

          <article className="mx-auto max-h-[86vh] w-full max-w-6xl overflow-y-auto rounded-[2rem] border-2 border-white/40 bg-slate-900/45 p-6 shadow-xl shadow-sky-900/20 backdrop-blur-sm md:p-7">
            <h2 className="text-4xl font-bold md:text-5xl">Take Action with Your Community</h2>
            <p className="mt-4 max-w-3xl text-cyan-50">
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

            <div className="mt-4 rounded-2xl border-2 border-white/30 bg-white/10 p-4 text-sm text-cyan-50">
              <p className="font-extrabold uppercase tracking-wide text-white">
                What happens when you submit?
              </p>
              <p className="mt-2">
                This request is your first step toward a shoreline stewardship
                conversation. You&apos;ll share basic context so local coordinators
                and nature-based technical experts can follow up with guidance on
                practical next steps for your shoreline type.
              </p>
              <p className="mt-2">
                Expected outcome: a clearer action path (for you and your
                neighbors) that prioritizes habitat-friendly options over
                last-minute emergency fixes.
              </p>
              <p className="mt-3 rounded-xl border border-emerald-200/50 bg-emerald-500/15 px-3 py-2 text-emerald-50">
                Encouraging note: Some Shore Friendly Partners offer
                mini-grants of up to $15,000 for Shore Friendly (armor
                alternative) projects that do not require extensive Shore
                Friendly assistance. Programs vary by Partner, so availability,
                eligibility, and process can differ by location.
              </p>
            </div>

            <div className="mt-4 rounded-2xl border-2 border-amber-200/60 bg-amber-500/10 p-4 text-sm text-amber-50">
              <p className="font-extrabold uppercase tracking-wide text-amber-100">
                Choosing a Shoreline Contractor
              </p>
              <p className="mt-2">
                Important: many contractors advertise shoreline protection, but
                that does not always mean Shore Friendly protection. Ask
                specifically about armor alternatives, not just bulkhead
                installation.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-amber-50">
                <li>
                  Verify the business license and registration status before
                  signing any contract.
                </li>
                <li>
                  Ask what experience they have with alternatives to bulkheads
                  (soft shore protection, vegetation-based approaches, and
                  beach nourishment where appropriate).
                </li>
                <li>
                  Ask whether they have completed relevant coastal training
                  (for example, Alternatives to Bulkheads training through
                  coastal training programs).
                </li>
                <li>
                  Ask if they coordinate with shoreline planners, natural
                  resource specialists, and coastal engineers when project
                  conditions require it.
                </li>
                <li>
                  Ask how they handle transitions at property edges (for
                  example, where a neighboring bulkhead remains) so your
                  project does not create new erosion pressure next door.
                </li>
              </ul>
              <p className="mt-3">
                Shore Friendly Partners focus on armor alternatives. The best
                outcomes usually come from neighborhood-scale coordination, not
                one-off parcel fixes.
              </p>
            </div>

            <p className="mt-4 text-sm font-medium text-cyan-50">{statusMessage}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              <a
                href={shareLinks.email}
                className="rounded-full border-2 border-white/40 bg-white/10 px-4 py-2 text-sm font-extrabold text-white"
              >
                Share by Email
              </a>
              <a
                href={shareLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border-2 border-white/40 bg-white/10 px-4 py-2 text-sm font-extrabold text-white"
              >
                Share on Facebook
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

            <PanelSourcesFooter sources={ctaPageSources} variant="onDark" />
          </article>
        </section>
      </div>
    </main>
  )
}
