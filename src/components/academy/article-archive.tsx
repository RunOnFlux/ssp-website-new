'use client'

import { Search, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useMemo, useState } from 'react'
import { NewsroomCard } from '@/components/newsroom/newsroom-card'
import type { NewsroomPost } from '@/types/newsroom'

interface ArticleArchiveProps {
  posts: NewsroomPost[]
  /** [slug, translated label] pairs, so the client never re-derives category names. */
  categories: Array<{ slug: string; title: string }>
}

/** Fold accents and case so "solana" matches "Solana" and "cafe" matches "café". */
function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
}

export function ArticleArchive({ posts, categories }: ArticleArchiveProps) {
  const t = useTranslations('Academy')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<string | null>(null)

  // Pre-compute the haystack once per post rather than on every keystroke.
  const indexed = useMemo(
    () =>
      posts.map(p => ({
        post: p,
        haystack: normalize(`${p.title} ${p.description} ${(p.tags ?? []).join(' ')}`),
      })),
    [posts]
  )

  const results = useMemo(() => {
    const q = normalize(query.trim())
    const terms = q.length > 0 ? q.split(/\s+/) : []
    return indexed
      .filter(({ post }) => (category ? post.category === category : true))
      .filter(({ haystack }) => terms.every(term => haystack.includes(term)))
      .map(({ post }) => post)
  }, [indexed, query, category])

  const isFiltered = query.trim().length > 0 || category !== null

  return (
    <div>
      <div className='mb-8 flex flex-col gap-4'>
        <div className='relative'>
          <Search
            aria-hidden='true'
            className='pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400'
          />
          <input
            type='search'
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            aria-label={t('searchLabel')}
            className='rounded-pill dark:border-dark-700 dark:bg-dark-800 focus:border-primary-500 focus:ring-primary-500/30 w-full border border-gray-200 bg-white py-3 pr-4 pl-12 text-base text-gray-900 focus:ring-2 focus:outline-none dark:text-white'
          />
        </div>

        <div className='flex flex-wrap items-center gap-2'>
          <button
            type='button'
            onClick={() => setCategory(null)}
            aria-pressed={category === null}
            className={`rounded-pill px-4 py-1.5 text-sm font-semibold transition-colors ${
              category === null
                ? 'bg-primary-500 text-white'
                : 'dark:bg-dark-800 bg-gray-100 text-gray-700 hover:bg-gray-200 dark:text-gray-300'
            }`}
          >
            {t('allTopics')}
          </button>
          {categories.map(c => (
            <button
              key={c.slug}
              type='button'
              onClick={() => setCategory(category === c.slug ? null : c.slug)}
              aria-pressed={category === c.slug}
              className={`rounded-pill px-4 py-1.5 text-sm font-semibold transition-colors ${
                category === c.slug
                  ? 'bg-primary-500 text-white'
                  : 'dark:bg-dark-800 bg-gray-100 text-gray-700 hover:bg-gray-200 dark:text-gray-300'
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>

        <div className='flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400'>
          <span aria-live='polite'>{t('resultCount', { count: results.length })}</span>
          {isFiltered && (
            <button
              type='button'
              onClick={() => {
                setQuery('')
                setCategory(null)
              }}
              className='hover:text-primary-600 dark:hover:text-primary-400 inline-flex items-center gap-1 font-medium underline underline-offset-2'
            >
              <X className='h-3.5 w-3.5' />
              {t('clearFilters')}
            </button>
          )}
        </div>
      </div>

      {results.length === 0 ? (
        <p className='py-16 text-center text-lg text-gray-500 dark:text-gray-400'>
          {t('noResults')}
        </p>
      ) : (
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {results.map(p => (
            <NewsroomCard
              key={`${p.category ?? 'newsroom'}-${p.slug}`}
              post={p}
              href={p.category ? `/academy/${p.category}/${p.slug}` : `/newsroom/${p.slug}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
