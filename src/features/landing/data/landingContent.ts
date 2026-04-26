export const outreachItems = [
  {
    title: 'Neighborhood + Club Networks',
    description:
      'Local fishing clubs, marina groups, and neighborhood leaders can spread trusted shoreline updates faster than one-off announcements.',
  },
  {
    title: 'State + Local Planning Channels',
    description:
      'Washington communities use Shoreline Master Programs with city/county planners, Tribes, and state agencies to guide safer shoreline decisions.',
  },
  {
    title: 'Digital + Doorstep Outreach',
    description:
      'Use this site, simple neighborhood handouts, and community meetings to turn concern into coordinated action.',
  },
]

export const timelineItems = [
  {
    period: '1950s-1960s',
    title: 'Coastal growth accelerates',
    description:
      'Population growth and shoreline development increase pressure on natural coastal systems across Washington.',
  },
  {
    period: '1970s',
    title: 'Shoreline policy takes shape',
    description:
      'The state builds a stronger shoreline management framework to balance growth, habitat, and long-term public benefit.',
  },
  {
    period: '1980s-1990s',
    title: 'Armoring and alteration expand',
    description:
      'Many areas add hard shoreline structures, reducing short-term exposure in places while creating long-term ecological trade-offs in others.',
  },
  {
    period: '2000s',
    title: 'Warning signs become clearer',
    description:
      'Communities begin seeing more repeated erosion, bluff instability, and coastal flooding around high-impact tide and storm periods.',
  },
  {
    period: '2010s',
    title: 'Climate risk enters local planning',
    description:
      'Regional science and planning groups improve sea level rise projections and support local governments with resilience tools.',
  },
  {
    period: '2020-2025',
    title: 'More communities face direct impacts',
    description:
      'Washington coastal towns report growing infrastructure and property risk from erosion, high water, and shoreline change.',
  },
  {
    period: '2030s (planning horizon)',
    title: 'Adaptation choices become urgent',
    description:
      'Communities compare hard defense, soft stabilization, accommodation, and retreat/avoidance to match local conditions.',
  },
  {
    period: '2050+',
    title: 'Long-term resilience depends on today',
    description:
      'The choices made now will shape flood exposure, habitat quality, and property outcomes for future generations.',
  },
]

export const areaTypes = [
  {
    id: 'stable',
    title: 'Mostly Stable Today',
    description: 'Healthy vegetation, limited erosion, occasional high-water stress.',
    guidance:
      'Great starting point. Prevention-first steps now can keep maintenance costs lower and protect shoreline habitat over time.',
  },
  {
    id: 'eroding',
    title: 'Noticeable Erosion',
    description: 'Shore edge retreat, repeated runoff, and more frequent storm impacts.',
    guidance:
      'Your shoreline is signaling change. A near-term plan with neighbors and local experts can reduce future property losses.',
  },
  {
    id: 'high-risk',
    title: 'High-Risk Shoreline',
    description: 'Frequent flooding/erosion events with visible land or bluff instability.',
    guidance:
      'This area likely needs priority action. Early expert planning can help avoid emergency-only responses that cost much more.',
  },
] as const

export const projectionItems = [
  {
    label: 'By 2050',
    title: 'Exposure grows without adaptation',
    description:
      'Washington analyses estimate thousands of homes and structures could face growing coastal flood exposure this century.',
  },
  {
    label: 'Long-term',
    title: 'Legacy planning matters',
    description:
      'Actions taken now can protect what your family and community inherit: safer shoreline access, habitat, and property value.',
  },
  {
    label: 'Trade-offs',
    title: 'No single fix works everywhere',
    description:
      'Hard armoring, soft stabilization, accommodation, and retreat each have trade-offs in cost, ecology, and long-term effectiveness.',
  },
]

export const financialCards = [
  {
    title: 'Property + Infrastructure Exposure',
    metric: '14,000+ structures',
    description:
      'Washington coastal resilience reporting highlights substantial structures potentially exposed to coastal flooding by 2050.',
  },
  {
    title: 'Asset Value at Stake',
    metric: '$8B+ today',
    description:
      'Current statewide value of potentially exposed homes and structures underscores why early planning can protect family wealth.',
  },
  {
    title: 'Acting Earlier',
    metric: 'Lower long-term burden',
    description:
      'Early action can reduce emergency fixes, improve funding options, and lower long-term strain on household and community budgets.',
  },
]

export const solutionSlides = [
  {
    title: 'Match the Tool to the Shoreline',
    description:
      'Washington guidance compares hard defenses, soft stabilization, accommodation, and retreat/avoidance so communities can choose wisely.',
  },
  {
    title: 'Plan Locally, Coordinate Regionally',
    description:
      'Neighborhood projects work best when aligned with local Shoreline Master Programs, permitting pathways, and Tribal/community priorities.',
  },
  {
    title: 'Build from Real WA Examples',
    description:
      'Coastal communities are testing practical, place-based approaches. Use before/after examples to show progress is possible.',
  },
]

export type SourceReference = {
  label: string
  url: string
}

/** Full list for the “Sources” modal in the informational flow. */
export const sourceModalLinks: SourceReference[] = [
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
  {
    label: 'Wikimedia Commons — Washington Coast photo set',
    url: 'https://commons.wikimedia.org/wiki/File:Washington_Coast_(5652105519)_(2).jpg',
  },
  {
    label: 'Wikimedia Commons — Puget Sound (Federal Way)',
    url: 'https://commons.wikimedia.org/wiki/File:Federal_Way,_Puget_Sound,_Washington.jpg',
  },
  {
    label: 'Wikimedia Commons — Hoh Head, Washington Coast',
    url: 'https://commons.wikimedia.org/wiki/File:Hoh_Head,_Washington_coast.jpg',
  },
  {
    label: 'Wikimedia Commons — Jagged Island, Washington Coast',
    url: 'https://commons.wikimedia.org/wiki/File:Jagged_Island_Washington_coast.jpg',
  },
  {
    label: 'Wikimedia Commons — Lonely Cove shoreline (ca. 1906)',
    url: 'https://commons.wikimedia.org/wiki/File:Beach_and_shoreline_at_Lonely_Cove,_Pacific_Coast,_Washington,_ca_1906_(WASTATE_1707).jpeg',
  },
  {
    label: 'Wikimedia Commons — Washington Coastline (5768933029)',
    url: 'https://commons.wikimedia.org/wiki/File:Washington_Coastline_(5768933029)_(2).jpg',
  },
]

export const landingPageSources: SourceReference[] = [
  {
    label: 'WA Dept. of Ecology — Shoreline & Coastal Planning',
    url: 'https://ecology.wa.gov/water-shorelines/shoreline-coastal-management/shoreline-coastal-planning',
  },
  {
    label: 'WA Dept. of Ecology — Sea Level Rise',
    url: 'https://ecology.wa.gov/air-climate/responding-to-climate-change/sea-level-rise',
  },
  {
    label: 'WDFW — Marine Shorelines',
    url: 'https://wdfw.wa.gov/species-habitats/ecosystems/marine-shorelines',
  },
]

export const ctaPageSources: SourceReference[] = [
  {
    label: 'WA Dept. of Ecology — Shoreline & Coastal Planning',
    url: 'https://ecology.wa.gov/water-shorelines/shoreline-coastal-management/shoreline-coastal-planning',
  },
  {
    label: 'WA Dept. of Ecology — Climate Resilience & Shoreline Management',
    url: 'https://ecology.wa.gov/water-shorelines/shoreline-coastal-management/shoreline-coastal-planning/shoreline-planners-toolbox/climate-resilience-and-shoreline-management',
  },
  {
    label: 'Washington Sea Grant — Shorelines of the Future',
    url: 'https://wsg.washington.edu/sea-levels-are-rising-in-washington-what-will-the-shorelines-of-the-future-be-like/',
  },
]

/**
 * Sources aligned to each informational exhibit panel (Outreach → Solutions).
 */
export const informationalPanelSources: SourceReference[][] = [
  [
    {
      label: 'WA Dept. of Ecology — Shoreline & Coastal Planning',
      url: 'https://ecology.wa.gov/water-shorelines/shoreline-coastal-management/shoreline-coastal-planning',
    },
    {
      label: 'WA Dept. of Ecology — Climate Resilience & Shoreline Management',
      url: 'https://ecology.wa.gov/water-shorelines/shoreline-coastal-management/shoreline-coastal-planning/shoreline-planners-toolbox/climate-resilience-and-shoreline-management',
    },
  ],
  [
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
    {
      label: 'WA Dept. of Ecology — Sea Level Rise',
      url: 'https://ecology.wa.gov/air-climate/responding-to-climate-change/sea-level-rise',
    },
  ],
  [
    {
      label: 'WDFW — Marine Shorelines',
      url: 'https://wdfw.wa.gov/species-habitats/ecosystems/marine-shorelines',
    },
    {
      label: 'WA Dept. of Ecology — Climate Resilience & Shoreline Management',
      url: 'https://ecology.wa.gov/water-shorelines/shoreline-coastal-management/shoreline-coastal-planning/shoreline-planners-toolbox/climate-resilience-and-shoreline-management',
    },
  ],
  [
    {
      label: 'WA Dept. of Ecology — Sea Level Rise',
      url: 'https://ecology.wa.gov/air-climate/responding-to-climate-change/sea-level-rise',
    },
    {
      label: 'UW Climate Impacts Group — WA Coast Climate Impacts',
      url: 'https://cig.uw.edu/publications/impacts-of-climate-change-on-the-coasts-of-washington-state/',
    },
    {
      label: 'Washington Sea Grant — Shorelines of the Future',
      url: 'https://wsg.washington.edu/sea-levels-are-rising-in-washington-what-will-the-shorelines-of-the-future-be-like/',
    },
  ],
  [
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
    {
      label: 'WA Dept. of Ecology — Shoreline & Coastal Planning',
      url: 'https://ecology.wa.gov/water-shorelines/shoreline-coastal-management/shoreline-coastal-planning',
    },
  ],
  [
    {
      label: 'WA Dept. of Ecology — Climate Resilience & Shoreline Management',
      url: 'https://ecology.wa.gov/water-shorelines/shoreline-coastal-management/shoreline-coastal-planning/shoreline-planners-toolbox/climate-resilience-and-shoreline-management',
    },
    {
      label: 'WA Dept. of Ecology — Shoreline & Coastal Planning',
      url: 'https://ecology.wa.gov/water-shorelines/shoreline-coastal-management/shoreline-coastal-planning',
    },
    {
      label: 'WDFW — Marine Shorelines',
      url: 'https://wdfw.wa.gov/species-habitats/ecosystems/marine-shorelines',
    },
  ],
]
