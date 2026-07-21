import { useTranslation } from '../hooks/useTranslation'
import { books } from '../data/books'
import BookCard from '../components/BookCard'

export default function BooksSection() {
  const { t } = useTranslation()

  return (
    <section id="books" className="py-20 md:py-28 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink">
            {t('books.title')}
          </h2>
          <div className="mt-5 w-16 h-0.5 bg-gradient-to-r from-terracotta to-gold rounded-full mx-auto" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </section>
  )
}
