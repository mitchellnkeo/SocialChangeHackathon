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
    period: 'Pre-1850s',
    title: 'Intact Puget Sound shoreline',
    description:
      'Miles of unarmored beaches, bluffs, eelgrass beds, and ancient drift cells fed sediment freely to the coast. Indigenous communities lived sustainably along the shore for thousands of years. Forage fish laid eggs in undisturbed beach sediments.',
  },
  {
    period: '1850s-1900s',
    title: 'Logging and early settlement reshape the coast',
    description:
      'Settlers logged bluffs and cleared shoreline vegetation, dramatically accelerating erosion. Early sawmills and docks cut off sediment supply. The first bulkheads appeared as homeowners tried to protect newly built structures from wave action.',
  },
  {
    period: '1900s-1940s',
    title: 'Industrialization and the bulkhead era begins',
    description:
      "Rapid urban and industrial growth along Tacoma, Seattle, and Olympia waterfronts led to widespread shoreline filling, dredging, and armoring. Railroads and roads were built right at the water's edge, permanently cutting off feeder bluffs from beaches.",
  },
  {
    period: '1950s-1970s',
    title: 'Post-war development: bulkheads become the norm',
    description:
      'The post-war housing boom brought tens of thousands of new waterfront homes to Puget Sound. Concrete and riprap bulkheads became the default solution for shore protection. By the 1970s, an estimated 27% of Puget Sound shoreline was armored.',
  },
  {
    period: '1980s-1990s',
    title: 'Science reveals the hidden cost of armoring',
    description:
      'Research confirmed that bulkheads deflect wave energy, scour beach sediment, and starve downstream drift cells. Chinook salmon and Southern Resident orca populations began their steep decline, linked partly to degraded nearshore habitat and collapsing forage fish populations.',
  },
  {
    period: '2000s-2010s',
    title: 'Shore Friendly movement launches',
    description:
      'WDFW and partners launched the Shore Friendly program to educate waterfront owners about armor alternatives. Bulkhead removal and beach restoration projects began. New research mapped drift cells and feeder bluffs, giving planners tools to prioritize high-impact sites.',
  },
  {
    period: '2020s',
    title: 'Sea level rise enters the equation',
    description:
      'Sea level in Seattle has risen about 10 inches since 1900 and is accelerating. New rules under development will incorporate sea level rise into shoreline permits by 2027. Parcel-scale vulnerability maps now help owners understand their own flood exposure. Armor removal projects are increasingly paired with native planting and beach nourishment.',
  },
  {
    period: '2030s-2040s',
    title: 'The window for action narrows',
    description:
      'Projected sea level rise of 6 to 18 inches by 2050 will increase storm surge and flood frequency across low-lying Puget Sound shores. Properties with armor face mounting maintenance costs as wave energy increases. Properties with restored, vegetated shores and active drift cells are projected to fare significantly better.',
  },
  {
    period: '2050+',
    title: 'Long-term resilience depends on today',
    description:
      'The choices made now - armor alternatives, vegetation restoration, beach nourishment, or doing nothing - will shape flood exposure, habitat quality, and property outcomes for future generations. Drift cells that receive sediment today will support resilient beaches for decades to come.',
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
