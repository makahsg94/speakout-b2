import { Link } from 'react-router-dom'
import { BOOK, unitLabel } from '../content/book'
import Reveal from '../components/Reveal'
import {
  IconBook,
  IconChevronRight,
  IconHome,
  IconLayers,
  IconList,
  IconTarget,
} from '../components/Icons'

const BANK_ICONS: Record<string, React.ReactNode> = {
  grammar: <IconTarget size={22} />,
  vocabulary: <IconList size={22} />,
  writing: <IconBook size={22} />,
}

export default function ReviewPage() {
  const reviewLessons = BOOK.units.flatMap((unit) =>
    unit.lessons
      .filter((lesson) => lesson.code.endsWith('R'))
      .map((lesson) => ({ unit, lesson })),
  )

  return (
    <div className="fade-up book-page mx-auto w-full max-w-4xl space-y-10 px-6 py-8 sm:px-10">
      <div className="running-head">
        <span>{BOOK.title} · Level {BOOK.level}</span>
        <span className="rh-right">Review</span>
      </div>

      <nav className="flex items-center gap-1 text-sm text-[var(--ink-faint)]">
        <Link to="/" className="inline-flex items-center gap-1 hover:text-[var(--ink)]">
          <IconHome size={14} /> Home <span className="text-[var(--ink-faint)]">الرئيسية</span>
        </Link>
        <IconChevronRight size={13} />
        <span className="text-[var(--ink)]">Review <span className="text-[var(--ink-faint)]">مراجعة</span></span>
      </nav>

      <header className="title-page mx-auto max-w-xl text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--ink-faint)]">
          Revision <span className="font-normal normal-case tracking-normal">مراجعة</span>
        </p>
        <h1 className="display mt-3 text-4xl tracking-tight sm:text-5xl">Review <span className="text-2xl font-normal text-[var(--ink-faint)] sm:text-3xl">مراجعة B2</span></h1>
        <p className="mt-4 text-[15px] leading-relaxed text-[var(--ink-soft)]">
          دروس المراجعة والبنوك المرجعية كما في كتاب الطالب · Unit reviews & reference banks.
        </p>
      </header>

      <section>
        <div className="section-divider">
          <span>
            <IconLayers size={12} className="mr-1 inline" />
            Review lessons <span className="font-normal normal-case tracking-normal">دروس المراجعة</span>
          </span>
        </div>
        <ol className="space-y-1">
          {reviewLessons.map(({ unit, lesson }, i) => (
            <Reveal key={lesson.id} delay={i * 40}>
              <li>
                <Link
                  to={`/unit/${unit.id}/lesson/${lesson.id}`}
                  className="group flex items-baseline gap-3 rounded-lg px-2 py-2 text-[15px] transition-colors hover:bg-[var(--line)]"
                >
                  <span className="font-display text-lg font-bold leading-none text-brand-600">
                    {unit.number}
                  </span>
                  <span className="min-w-0 flex-1 truncate">
                    <span className="font-semibold transition-colors group-hover:text-brand-700 dark:group-hover:text-brand-300">
                      {unitLabel(unit)} review · {lesson.title}
                    </span>
                    <span className="ml-2 text-xs text-[var(--ink-faint)]">{unit.title}</span>
                  </span>
                  <span className="toc-dots" aria-hidden />
                  <span className="toc-page shrink-0">
                    {lesson.pages[0]}–{lesson.pages[1]}
                  </span>
                </Link>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section>
        <div className="section-divider">
          <span>Banks <span className="font-normal normal-case tracking-normal">البنوك المرجعية</span></span>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {BOOK.banks.map((bank) => (
            <Link
              key={bank.id}
              to={`/bank/${bank.id}`}
              className="group flex flex-col rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4 transition-all hover:-translate-y-0.5 hover:border-brand-400 hover:shadow-sm"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-brand-600 text-white">
                {BANK_ICONS[bank.id] ?? <IconBook size={22} />}
              </span>
              <span className="mt-3 font-semibold group-hover:text-brand-700 dark:group-hover:text-brand-300">
                {bank.title}
              </span>
              <span className="mt-1 flex-1 text-[13px] leading-snug text-[var(--ink-soft)]">
                {bank.description}
              </span>
              <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-brand-700 dark:text-brand-300">
                Pages {bank.pages[0]}–{bank.pages[1]}
                <IconChevronRight size={13} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
        <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[var(--ink-faint)]">
          <IconBook size={13} />
          Note <span className="font-normal normal-case tracking-normal">ملاحظة</span>
        </p>
        <p className="mt-2 text-[14px] leading-relaxed text-[var(--ink-soft)]">
          لا يتضمن كتاب الطالب مفتاح إجابات، لذا استخدم دروس المراجعة والتسجيلات والبنوك للمراجعة الذاتية.
          <span className="block mt-1 text-[var(--ink-faint)]">No answer key in the source book — use the review lessons, audio, and banks to self-check.</span>
        </p>
      </section>
    </div>
  )
}
