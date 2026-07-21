import { useTranslation } from '../hooks/useTranslation'

export default function BookCard({ book }) {
  const { t } = useTranslation()
  const levelLabel = t(`books.level_${book.level}`)
  const levelClass =
    book.level === 'college'
      ? 'bg-terracotta-light text-terracotta-dark'
      : 'bg-gold-light text-gold'

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-500 overflow-hidden flex flex-col">
      <div className="relative overflow-hidden aspect-[2/3]">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-3 left-3">
          <span className={`text-[11px] font-semibold px-3 py-1 rounded-md ${levelClass}`}>
            {levelLabel}
          </span>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-1 flex-1">
        <h3 className="font-['DM_Sans'] font-bold text-ink text-sm leading-tight">{book.title}</h3>
        <p className="text-stone-light text-xs">{book.author}</p>
      </div>
    </div>
  )
}
