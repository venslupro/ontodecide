import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/Reveal';

type Cell = 'full' | 'limited' | 'included' | 'notIncluded';

interface Row {
  readonly key: string;
  readonly community: Cell;
  readonly commercial: Cell;
}

const ROWS: Row[] = [
  { key: 'dataFusion', community: 'full', commercial: 'full' },
  { key: 'ontologyModeling', community: 'included', commercial: 'full' },
  { key: 'cockpit', community: 'included', commercial: 'full' },
  { key: 'aiSimulation', community: 'limited', commercial: 'full' },
  { key: 'usageLimit', community: 'limited', commercial: 'full' },
  { key: 'communitySupport', community: 'included', commercial: 'included' },
  { key: 'sla', community: 'notIncluded', commercial: 'full' },
  { key: 'security', community: 'notIncluded', commercial: 'full' },
  { key: 'training', community: 'notIncluded', commercial: 'full' },
  { key: 'multiTenant', community: 'notIncluded', commercial: 'full' },
  { key: 'privateDeploy', community: 'notIncluded', commercial: 'full' },
  { key: 'industryOntology', community: 'notIncluded', commercial: 'full' },
];

export function Editions(): JSX.Element {
  const t = useTranslations('editions');

  return (
    <section id="editions" className="relative overflow-hidden bg-slate-50 py-20 sm:py-24">
      <div
        className="pointer-events-none absolute top-0 right-0 h-80 w-80 rounded-full bg-brand-400/15 blur-3xl"
        aria-hidden="true"
      />
      <div className="container-page relative">
        <Reveal>
          <p className="section-eyebrow">{t('eyebrow')}</p>
          <h2 className="section-title">{t('title')}</h2>
          <p className="section-subtitle">{t('subtitle')}</p>
        </Reveal>

        {/* Clean comparison table */}
        <Reveal delay={60}>
          <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] table-fixed border-collapse text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-brand-50 to-accent-50">
                    <th className="w-[44%] px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                      {t('tableTitle')}
                    </th>
                    <th className="w-[28%] px-4 py-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200">
                          <ShieldIcon className="h-3.5 w-3.5 text-slate-500" />
                          {t('communityLabel')}
                        </span>
                      </div>
                    </th>
                    <th className="w-[28%] px-4 py-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className="inline-flex items-center gap-1 rounded-full bg-brand-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
                          <BuildingIcon className="h-3.5 w-3.5" />
                          {t('commercialLabel')}
                        </span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((row, idx) => (
                    <tr
                      key={row.key}
                      className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}
                    >
                      <td className="border-t border-slate-100 px-6 py-4 font-medium text-slate-700">
                        {t(`rows.${row.key}`)}
                      </td>
                      <td className="border-t border-slate-100 px-4 py-4 text-center">
                        <CellBadge cell={row.community} />
                      </td>
                      <td className="border-t border-slate-100 px-4 py-4 text-center">
                        <CellBadge cell={row.commercial} highlight />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CellBadge({
  cell,
  highlight = false,
}: {
  readonly cell: Cell;
  readonly highlight?: boolean;
}): JSX.Element {
  const t = useTranslations('editions');

  const styles: Record<Cell, string> = {
    full: highlight
      ? 'inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200'
      : 'inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700',
    included: highlight
      ? 'inline-flex items-center gap-1 rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-semibold text-brand-700 ring-1 ring-brand-200'
      : 'inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700',
    limited: 'inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700',
    notIncluded: 'inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-400',
  };

  return (
    <span className={styles[cell]}>
      {cell === 'notIncluded' ? (
        <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      ) : (
        <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12l4 4L19 6" />
        </svg>
      )}
      {t(cell)}
    </span>
  );
}

function ShieldIcon({ className }: { readonly className?: string }): JSX.Element {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2l8 3v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V5l8-3z" />
    </svg>
  );
}

function BuildingIcon({ className }: { readonly className?: string }): JSX.Element {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 21h18M5 21V8l7-5 7 5v13" />
      <path d="M9 21v-5h6v5" />
    </svg>
  );
}
