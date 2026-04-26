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
  whidbeyStorySources,
  type SourceReference,
} from '../data/landingContent'

const WDFW_SHORELINE_EMAIL = 'webmaster@dfw.wa.gov'

const COASTLINE_TYPE_LABELS: Record<string, string> = {
  bay: 'Bay',
  'river-mouth': 'River mouth',
  bluff: 'Bluff / coastal slope',
  estuary: 'Estuary / wetland edge',
}

/** Horizontal app pages: 0 landing, 1 info, 2 Whidbey story, 3 CTA */
const APP_PAGE_LAST_INDEX = 3

/** Nine `/images/timeline/` assets in chronological order (matches `timelineItems` indices 0–8). */
const TIMELINE_IMAGE_FILES = [
  '1850.png',
  '1900s_1940s.png',
  '1950s_1970s.png',
  '1980s_1990s.png',
  '2000s_2010s.png',
  '2020s.png',
  '2030s_2040s.png',
  '2050.png',
  '2050Plus.png',
] as const

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
  const [activeHotspotId, setActiveHotspotId] = useState('bluff-structures')

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
    'Interactive Hotspots',
    'Financial Impact',
    'Solutions',
  ]
  const showFutureOutlookPanel = false


  /** Positions tuned to `/images/InteractiveHotspot.png` (bluff-top cabins, eroding face, beach, estuary). */
  const shorelineHotspots = [
    {
      id: 'bluff-structures',
      label: 'Structures',
      top: '40%',
      left: '20%',
      title: 'Buildings close to the bluff edge',
      impact:
        'Cabins and outbuildings this near an active bluff have shrinking setback as the bank recedes; king tides and storms accelerate loss at the toe, which works back up the slope.',
      action:
        'Ask for a Shore Friendly or local planner review before expanding pads or utilities; map how far the edge has moved over a few seasons.',
    },
    {
      id: 'bank-top',
      label: 'Bank top',
      top: '48%',
      left: '34%',
      title: 'Lawn, fence, and the break in slope',
      impact:
        'This line is where everyday use meets gravity: mowing to the edge, foot traffic, and downspouts can concentrate flow and weaken the lip of the bluff.',
      action:
        'Buffer the edge with deep-rooted native plants, keep heavy equipment back, and route roof and yard water away from the face.',
    },
    {
      id: 'bluff-erosion',
      label: 'Erosion',
      top: '66%',
      left: '46%',
      title: 'Exposed, actively eroding bluff face',
      impact:
        'Bare soil and vertical scars show sediment feeding the beach below. Hard fixes at the toe alone can starve neighbors’ drift cells and stress nearshore habitat.',
      action:
        'Prioritize geotech or shoreline expertise for slope-wide fixes; compare managed retreat, soft stabilization, and timing of any hard armor to Ecology and local SMP rules.',
    },
    {
      id: 'slope-vegetation',
      label: 'Vegetation',
      top: '54%',
      left: '58%',
      title: 'Shrubs and grass on the slope',
      impact:
        'Patches of vegetation slow runoff, knit soil, and provide cover; they are part of the same system that supports forage fish habitat off the beach when sediment moves naturally.',
      action:
        'Expand native plantings from stable pockets toward bare areas; avoid clearing “for the view” without a replanting plan.',
    },
    {
      id: 'beach-surf',
      label: 'Beach',
      top: '62%',
      left: '74%',
      title: 'Sand, surf, and high-tide reach',
      impact:
        'This zone delivers wave energy to the bluff toe and shapes which beaches can support spawning forage fish and nearshore rearing for juvenile salmon.',
      action:
        'Track wood, cobble, and berm changes after storms; discuss beach nourishment or soft protection only with designs that keep sediment sharing intact.',
    },
    {
      id: 'estuary-channel',
      label: 'Estuary',
      top: '86%',
      left: '88%',
      title: 'River mouth and mixing zone',
      impact:
        'Channels like this move freshwater, wood, and fine sediment; they are ecologically distinct from open-coast bluffs and often need different permits and partners.',
      action:
        'Involve WDFW, Tribal co-managers, and Ecology early for mouth work; plan for flooding, migration, and changing flow with sea level rise.',
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
      src: '/images/InteractiveHotspot.png',
      alt:
        'Washington-style coastal bluff with wooden cabins near the edge, exposed eroding bank, sandy beach, surf, and a small estuary channel on the right.',
    },
    {
      src: '/images/jagged-island-coast.jpg',
      alt: 'Pacific Northwest coastal landscape with shoreline habitat.',
    },
    {
      src: '/images/Ecology1.png',
      alt:
        'Southern Resident killer whale carrying a salmon, illustrating the link from healthy nearshore food webs to orca survival.',
    },
    {
      src: '/images/CommunitySolutions.png',
      alt: 'Community-led shoreline and habitat solutions along a Washington coast.',
    },
  ]

  const timelineImages = useMemo(
    () =>
      timelineItems.map((item, index) => ({
        src: `/images/timeline/${TIMELINE_IMAGE_FILES[index]}`,
        alt: `${item.period} — ${item.title}. Puget Sound shoreline timeline illustration.`,
        caption: `${item.period} · ${item.title}`,
      })),
    [],
  )

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') ?? 'Neighbor')
    const email = String(formData.get('email') ?? '')
    const coastlineValue = String(formData.get('coastlineType') ?? '')
    const coastlineLabel =
      (COASTLINE_TYPE_LABELS[coastlineValue] ?? coastlineValue) || 'Not specified'
    const notes = String(formData.get('notes') ?? '').trim()
    const subject = `Shoreline support request from ${name}`
    const body = [
      `Hello Washington Department of Fish and Wildlife,`,
      ``,
      `I am requesting shoreline support information.`,
      ``,
      `Name: ${name}`,
      `My email (reply to): ${email}`,
      `Coastline type: ${coastlineLabel}`,
      `Observed changes: ${notes || 'Not provided'}`,
      ``,
      `Please share recommended Shore Friendly next steps and any relevant local partner contacts.`,
    ].join('\n')

    const gmailComposeUrl = new URL('https://mail.google.com/mail/')
    gmailComposeUrl.searchParams.set('view', 'cm')
    gmailComposeUrl.searchParams.set('fs', '1')
    gmailComposeUrl.searchParams.set('to', WDFW_SHORELINE_EMAIL)
    gmailComposeUrl.searchParams.set('su', subject)
    gmailComposeUrl.searchParams.set('body', body)

    window.open(gmailComposeUrl.toString(), '_blank', 'noopener,noreferrer')
    setStatusMessage(
      `Thanks, ${name}. A Gmail compose tab should open with your draft to WDFW. Sign in to Gmail if prompted, then review and send.`,
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

    if (deltaX <= -threshold && activeAppPage < APP_PAGE_LAST_INDEX) {
      setActiveAppPage((current) =>
        Math.min(current + 1, APP_PAGE_LAST_INDEX),
      )
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
        className="flex h-full w-[400vw] transition-transform duration-500 ease-in-out"
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
          <div className="pointer-events-none absolute right-8 top-16 h-24 w-24 rounded-full bg-sky-200/30 blur-sm" />
          <div className="pointer-events-none absolute bottom-8 right-20 h-28 w-28 rounded-full bg-indigo-200/20 blur-sm" />
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
            className={`flex h-full transition-transform duration-500 ease-in-out ${
              showFutureOutlookPanel ? 'w-[600vw]' : 'w-[500vw]'
            }`}
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
                <div className="relative mx-auto mt-5 aspect-video w-full max-w-2xl overflow-hidden rounded-3xl sm:max-w-3xl">
                  <img
                    src={timelineImages[activeTimelineIndex].src}
                    alt={timelineImages[activeTimelineIndex].alt}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
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
                  Which image describes your property?
                </h2>
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
                        <div className="mb-4 overflow-hidden rounded-2xl border-2 border-cyan-100">
                          <img
                            src={areaType.imageSrc}
                            alt={areaType.imageAlt}
                            loading="lazy"
                            decoding="async"
                            className="h-28 w-full object-cover"
                          />
                        </div>
                        <h3 className="text-lg font-semibold text-shoreline-900">
                          {areaType.title}
                        </h3>
                        <p className="mt-1 text-slate-700">{areaType.description}</p>
                      </button>
                    )
                  })}
                </div>
                {selectedArea && (
                  <div className="mt-6 flex justify-center">
                    <img
                      src={selectedArea.imageSrc}
                      alt={selectedArea.imageAlt}
                      loading="lazy"
                      decoding="async"
                      className="max-h-64 w-full max-w-3xl rounded-2xl object-contain md:max-h-72"
                    />
                  </div>
                )}
                {selectedArea?.guidance && (
                  <p className="mt-5 rounded-2xl border-2 border-cyan-100 bg-gradient-to-r from-cyan-50 to-sky-50 p-4 text-slate-800">
                    {selectedArea.guidance}
                  </p>
                )}
                <article className="mt-4 rounded-3xl border-2 border-sky-200 bg-sky-50/70 p-4 md:p-5">
                  <p className="text-xs font-extrabold uppercase tracking-wide text-sky-700">
                    Bluff shoreline note
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-shoreline-900">
                    Bluff edges need slope-aware planning
                  </h3>
                  <p className="mt-2 text-sm text-slate-700">
                    Bluff shorelines are dynamic by nature. Drainage changes, vegetation
                    loss, and intense storm cycles can increase bluff stress and sediment
                    movement over time.
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    If your property includes a bluff, prioritize slope-friendly drainage,
                    deep-rooted native plants, and early technical review before emergency
                    repairs become the default path.
                  </p>
                </article>
                <PanelSourcesFooter sources={informationalPanelSources[1]} />
              </article>
            </div>

            <div className="flex h-full w-screen items-center px-6 py-16">
              <article className="mx-auto max-h-[86vh] w-full max-w-6xl overflow-y-auto rounded-[2rem] border-2 border-cyan-100 bg-white/95 p-6 shadow-xl shadow-sky-100 md:p-7">
                <h2 className="text-3xl font-bold text-shoreline-900">
                  Interactive Shoreline Hotspots
                </h2>
                <p className="mt-4 max-w-3xl text-slate-700">
                  Tap or click a point on the scene to see what it means for your shoreline and
                  what you can do next.
                </p>

                <div className="mt-6 rounded-3xl border-2 border-cyan-100 bg-white p-4 md:p-5">
                  <div className="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
                    <div className="relative h-64 overflow-hidden rounded-2xl border-2 border-cyan-100 md:h-72">
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
                <PanelSourcesFooter sources={informationalPanelSources[2]} />
              </article>
            </div>

            {showFutureOutlookPanel && (
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
                        className="rounded-3xl border-2 border-cyan-100 bg-gradient-to-br from-cyan-50 to-sky-50 p-5"
                      >
                        <p className="inline-block rounded-full bg-sky-100 px-3 py-1 text-xs font-extrabold tracking-wide text-sky-800">
                          {item.label}
                        </p>
                        <h3 className="mt-3 text-lg font-semibold text-shoreline-900">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-slate-700">{item.description}</p>
                      </article>
                    ))}
                  </div>
                  <PanelSourcesFooter sources={informationalPanelSources[3]} />
                </article>
              </div>
            )}

            <div className="flex h-full w-screen items-center px-6 py-16">
              <article className="mx-auto max-h-[86vh] w-full max-w-6xl overflow-y-auto rounded-[2rem] border-2 border-cyan-200 bg-white/95 p-6 shadow-xl shadow-cyan-100 md:p-7">
                <h2 className="text-3xl font-bold text-shoreline-900">
                  Why This Matters
                </h2>
                <div className="relative mx-auto mt-5 aspect-video w-full max-w-xl overflow-hidden rounded-3xl bg-gradient-to-b from-slate-100 to-slate-200/90 sm:max-w-2xl">
                  <img
                    src={panelImages[4].src}
                    alt={panelImages[4].alt}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 m-auto h-full w-full object-contain"
                  />
                </div>
                <p className="mt-2 max-w-3xl text-slate-700">
                  Shoreline decisions affect more than one property line. They shape
                  household finances, habitat health, and how resilient the whole
                  neighborhood is over time.
                </p>
                <div className="mt-5 grid gap-4 lg:grid-cols-2">
                  <article className="rounded-3xl border-2 border-cyan-100 bg-gradient-to-br from-cyan-50 to-sky-50 p-5">
                    <p className="text-xs font-extrabold uppercase tracking-wide text-cyan-700">
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

                  <article className="rounded-3xl border-2 border-sky-100 bg-gradient-to-br from-sky-50 to-indigo-50 p-5">
                    <p className="text-xs font-extrabold uppercase tracking-wide text-sky-700">
                      Ecologically
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-shoreline-900">
                      Unsustainable fixes create knockdown effects
                    </h3>
                    <img
                      src="/images/Ecology2.png"
                      alt="Spawning salmon over a natural rocky riverbed, showing habitat supported by intact shorelines and connected waterways."
                      loading="lazy"
                      decoding="async"
                      className="mt-4 h-44 w-full rounded-2xl border-2 border-sky-200/80 object-cover"
                    />
                    <p className="mt-3 text-slate-700">
                      Choices that interrupt sediment flow or damage nearshore habitat
                      can reduce beach function, stress forage fish and salmon food
                      webs, and weaken the natural shoreline systems that protect
                      communities over time.
                    </p>
                    <p className="mt-3 text-slate-700">
                      Forage fish need suitable sediment; some beaches can be starved
                      of it when shoreline processes are disrupted. These are the fish
                      that spawn in beach sediments—eggs hatch in the nearshore, and
                      those tiny fish help feed endangered Chinook salmon. Juvenile
                      Chinook use the nearshore just off the beach. Southern Resident
                      killer whales rely heavily on Chinook—a tight link from healthy
                      beach sediment to whales offshore.
                    </p>
                    <p className="mt-3 text-slate-700">
                      One property cannot solve this alone. If only one household
                      adopts shoreline-friendly solutions while neighbors do not, the
                      benefits are limited. Lasting resilience improves when
                      neighborhoods coordinate and chip in together.
                    </p>
                  </article>
                </div>
                <PanelSourcesFooter sources={informationalPanelSources[4]} />
              </article>
            </div>

            <div className="flex h-full w-screen items-center px-6 py-16">
              <article className="mx-auto max-h-[86vh] w-full max-w-6xl overflow-y-auto rounded-[2rem] border-2 border-cyan-200 bg-white/95 p-6 shadow-xl shadow-cyan-100 md:p-7">
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
                      className="rounded-3xl border-2 border-sky-100 bg-gradient-to-br from-sky-50 to-indigo-50 p-5"
                    >
                      <h3 className="text-xl font-bold text-shoreline-900">
                        {solution.title}
                      </h3>
                      <p className="mt-2 text-slate-700">{solution.description}</p>
                    </article>
                  ))}
                </div>
                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                  <article className="rounded-3xl border-2 border-sky-100 bg-white p-4 shadow-sm">
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

                  <article className="rounded-3xl border-2 border-sky-100 bg-white p-4 shadow-sm">
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
                <PanelSourcesFooter sources={informationalPanelSources[5]} />
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
          id="whidbey-sunlight-shores"
          className="relative flex h-full w-screen items-center overflow-hidden bg-white px-6 py-12 text-slate-900 md:py-16"
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
          <div className="pointer-events-none absolute right-8 top-16 h-24 w-24 rounded-full bg-sky-200/30 blur-sm" />
          <div className="pointer-events-none absolute bottom-8 right-20 h-28 w-28 rounded-full bg-indigo-200/20 blur-sm" />

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
                Exhibit
              </span>
            </button>
          </div>

          <div className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 md:block">
            <button
              type="button"
              onClick={() => setActiveAppPage(3)}
              className="inline-flex flex-col items-center gap-2 text-slate-800"
            >
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl font-black text-sky-700 shadow-lg shadow-sky-900/20">
                {'\u2192'}
              </span>
              <span className="text-xs font-extrabold uppercase tracking-wide text-slate-700">
                Take action
              </span>
            </button>
          </div>

          <article className="relative z-10 mx-auto max-h-[86vh] w-full max-w-6xl overflow-y-auto rounded-[2rem] border-2 border-cyan-200 bg-white/95 p-6 shadow-xl shadow-cyan-100 md:p-7">
            <p className="text-xs font-extrabold uppercase tracking-wide text-cyan-700">
              Real story · Whidbey Island, WA · 2018
            </p>
            <h2 className="mt-2 text-3xl font-bold text-shoreline-900 md:text-4xl">
              Sunlight Shores — community-led beach restoration
            </h2>
            <p className="mt-3 max-w-3xl text-slate-700">
              A neighborhood&apos;s failing bulkhead became a catalyst for one of
              Island County&apos;s most celebrated restoration projects.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2 md:gap-6">
              <div className="rounded-3xl border-2 border-cyan-100 bg-white p-4 shadow-sm">
                <p className="text-xs font-extrabold uppercase tracking-wide text-slate-600">
                  Before
                </p>
                <p className="mt-1 text-sm font-semibold text-shoreline-900">
                  Creosote piles, angular rock &amp; rubble
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  About 350 ft of creosote piles, angular boulders, and concrete
                  rubble along the shore.
                </p>
                <img
                  src="/images/newPage/CreosotePiles.png"
                  alt="Before restoration: creosote piles and rubble along the shoreline at Sunlight Shores."
                  loading="lazy"
                  decoding="async"
                  className="mt-3 w-full rounded-2xl object-contain"
                />
                <a
                  href="https://nwstraitsfoundation.org/projects/sunlight-shores-shoreline-restoration-and-armor-removal-2/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-block text-sm font-bold text-sky-700 underline decoration-sky-300 underline-offset-2"
                >
                  View Northwest Straits Foundation project page
                </a>
              </div>
              <div className="rounded-3xl border-2 border-cyan-100 bg-white p-4 shadow-sm">
                <p className="text-xs font-extrabold uppercase tracking-wide text-slate-600">
                  After
                </p>
                <p className="mt-1 text-sm font-semibold text-shoreline-900">
                  Salt marsh, dune grass &amp; drift logs
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Salt marsh, about 1,500 dune grass plugs, native plants, and
                  drift logs — rebuilt habitat and a healthier beach.
                </p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <img
                    src="/images/newPage/SaltMarsh1.png"
                    alt="After restoration: salt marsh and native shoreline plantings at Sunlight Shores."
                    loading="lazy"
                    decoding="async"
                    className="w-full rounded-2xl object-contain"
                  />
                  <img
                    src="/images/newPage/SaltMarsh2.png"
                    alt="After restoration: additional view of restored shoreline habitat at Sunlight Shores."
                    loading="lazy"
                    decoding="async"
                    className="w-full rounded-2xl object-contain"
                  />
                </div>
                <a
                  href="https://www.youtube.com/watch?v=Srvg7F1Qwjc"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-block text-sm font-bold text-sky-700 underline decoration-sky-300 underline-offset-2"
                >
                  View armor removal timelapse (YouTube)
                </a>
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border-2 border-cyan-100 bg-slate-900">
              <iframe
                title="Sunlight Shores armor removal timelapse"
                src="https://www.youtube.com/embed/Srvg7F1Qwjc"
                className="aspect-video w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: 'Shoreline restored', value: '350 ft' },
                { label: 'Nearshore habitat', value: '0.25 ac created' },
                { label: 'Plants installed', value: '1,800+ by 18 volunteers' },
                { label: 'Native species', value: '12+ planted' },
              ].map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-2xl border-2 border-sky-200 bg-gradient-to-br from-sky-50 to-cyan-50 p-4 text-center shadow-sm"
                >
                  <p className="text-2xl font-extrabold text-sky-800">{fact.value}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-600">
                    {fact.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-3xl border-2 border-cyan-100 bg-cyan-50/60 p-5 md:p-6">
              <h3 className="text-xl font-bold text-shoreline-900">
                Solutions communities are using: native vegetation stabilization
              </h3>
              <p className="mt-2 text-slate-700">
                Native plants are often the most affordable piece of a shoreline
                project and frequently support every other approach you choose.
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
                <li>
                  Plan for survival: many programs plant roughly three to five
                  plants for every one that is expected to mature — harsh
                  waterfront conditions mean some loss is normal.
                </li>
                <li>
                  <a
                    href="https://piercecd.org/DocumentCenter/View/1964/TAM-32_Plants-Protect-Shorelines"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-sky-800 underline decoration-sky-300"
                  >
                    Pierce Conservation District — TAM-32, Plants protect
                    shorelines
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.kitsap.gov/dcd/PEP%20Documents/Shore%20Friendly%20Plants%20Handout%20april%202%202017.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-sky-800 underline decoration-sky-300"
                  >
                    Kitsap — Shore Friendly plants handout (PDF)
                  </a>
                </li>
                <li>
                  <a
                    href="https://apps.ecology.wa.gov/publications/documents/9330.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-sky-800 underline decoration-sky-300"
                  >
                    WA Dept. of Ecology — Slope stabilization &amp; erosion
                    control using vegetation (Pub. 93-30 / 9330 PDF)
                  </a>
                </li>
              </ul>
            </div>

            <PanelSourcesFooter sources={whidbeyStorySources} />
          </article>
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
          <div className="pointer-events-none absolute right-8 top-16 h-24 w-24 rounded-full bg-sky-200/30 blur-sm" />
          <div className="pointer-events-none absolute bottom-8 right-20 h-28 w-28 rounded-full bg-indigo-200/20 blur-sm" />

          <div className="absolute left-6 top-1/2 z-20 hidden -translate-y-1/2 md:block">
            <button
              type="button"
              onClick={() => setActiveAppPage(2)}
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
                Email WDFW Shoreline Support Team
              </button>
            </form>

            <div className="mt-4 rounded-2xl border-2 border-white/30 bg-white/10 p-4 text-sm text-cyan-50">
              <p className="font-extrabold uppercase tracking-wide text-white">
                What happens when you submit?
              </p>
              <p className="mt-2">
                When you use the button below, we open Gmail with a pre-filled draft
                to WDFW using the details you entered. Sign in if needed, review the
                message, then send when you are ready.
              </p>
              <p className="mt-2">
                Expected outcome: a clearer action path (for you and your
                neighbors) that prioritizes habitat-friendly options over
                last-minute emergency fixes.
              </p>
              <p className="mt-3 rounded-xl border border-sky-200/50 bg-sky-500/15 px-3 py-2 text-sky-50">
                Encouraging note: Some Shore Friendly Partners offer
                mini-grants of up to $15,000 for Shore Friendly (armor
                alternative) projects that do not require extensive Shore
                Friendly assistance. Programs vary by Partner, so availability,
                eligibility, and process can differ by location.
              </p>
            </div>

            <div className="mt-4 rounded-2xl border-2 border-indigo-200/60 bg-indigo-500/10 p-4 text-sm text-sky-50">
              <p className="font-extrabold uppercase tracking-wide text-sky-100">
                Choosing a Shoreline Contractor
              </p>
              <p className="mt-2">
                Important: many contractors advertise shoreline protection, but
                that does not always mean Shore Friendly protection. Ask
                specifically about armor alternatives, not just bulkhead
                installation.
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sky-50">
                <li>
                  Ask for references or testimonials from past clients with
                  similar shoreline work.
                </li>
                <li>
                  Ask for photos or documentation of past projects, especially
                  armor-alternative or soft-shoreline work.
                </li>
                <li>
                  Verify the business license and registration status before
                  signing any contract.
                </li>
                <li>
                  Ask for evidence of proper insurance. Contractors hired to
                  perform work under a Shore Friendly Partner project, according
                  to that Partner&apos;s specifications, are expected to carry
                  their own insurance and to be appropriately licensed and
                  bonded—confirm this in writing for your project.
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
              <p className="mt-4 font-extrabold uppercase tracking-wide text-sky-100">
                Who to contact next
              </p>
              <p className="mt-2">
                Start with your local Shore Friendly program to learn what
                applies in your area and how to request a site visit or
                assessment:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>
                  <a
                    href="https://www.shorefriendly.org/resources/resources-in-your-area/"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-white underline decoration-sky-200 underline-offset-2 hover:text-sky-100"
                  >
                    Resources in Your Area | Shore Friendly
                  </a>
                </li>
                <li>
                  <a
                    href="https://wdfw.wa.gov/species-habitats/habitat-recovery/puget-sound/shore-friendly"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-white underline decoration-sky-200 underline-offset-2 hover:text-sky-100"
                  >
                    WDFW — Puget Sound Shore Friendly (local programs &amp;
                    context)
                  </a>
                </li>
              </ul>
              <p className="mt-4 font-extrabold uppercase tracking-wide text-sky-100">
                Types of Shore Friendly support (varies by Partner)
              </p>
              <p className="mt-2">
                Depending on your location and program, support may include:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sky-50">
                <li>Workshops and landowner education</li>
                <li>Mini-grants for eligible armor-alternative projects</li>
                <li>
                  Site assessments or site visits (request through your local
                  Partner—often linked from Resources in Your Area)
                </li>
                <li>
                  Project management support, including coordination between the
                  contractor and the property owner
                </li>
                <li>Help identifying and arranging grants</li>
                <li>Permit assistance and shepherding through review steps</li>
                <li>
                  Support navigating cultural resources review requirements when
                  they apply
                </li>
              </ul>
              <p className="mt-3">
                Some Partners offer straight mini-grants (for example up to
                about $15,000) for Shore Friendly armor-alternative projects
                that need limited hands-on assistance—each Partner sets its own
                rules, so check locally.
              </p>
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
