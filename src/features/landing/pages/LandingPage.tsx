import { outreachItems } from '../data/landingContent'

export function LandingPage() {
  return (
    <main>
      <section className="bg-gradient-to-br from-shoreline-900 to-sky-800 px-6 py-20 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-emerald-200">
            Shoreline Conservation
          </p>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">
            Protect Your Shoreline. Protect Your Legacy.
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-emerald-50/95">
            A web-first movement to help Washington communities understand risk,
            coordinate action, and avoid higher future costs.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              className="rounded-full bg-white px-5 py-3 font-semibold text-shoreline-900 transition hover:bg-emerald-50"
            >
              Explore Shoreline Outlook
            </button>
            <button
              type="button"
              className="rounded-full border border-white/70 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Join Community Outreach
            </button>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-shoreline-900">
            Outreach Strategy
          </h2>
          <p className="mt-3 max-w-3xl text-slate-700">
            This first iteration translates your concept into a scalable landing
            framework. Next, we can add timeline, projections, financial
            modeling, and action workflows.
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
    </main>
  )
}
