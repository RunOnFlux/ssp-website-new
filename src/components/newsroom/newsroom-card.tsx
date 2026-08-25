import { Clock } from 'lucide-react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { cmsMediaUrl } from '@/lib/cms-media'
import type { NewsroomPost } from '@/types/newsroom'

function formatDate(d: string): string {
  return new Date(d).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

interface NewsroomCardProps {
  post: NewsroomPost
  href?: string
}

export function NewsroomCard({ post, href }: NewsroomCardProps) {
  const link =
    href ??
    (post.section === 'academy' && post.category
      ? `/academy/${post.category}/${post.slug}`
      : `/newsroom/${post.slug}`)
  const cardImage = post.imageSquare || post.image
  const cardImageAlt = post.imageSquare ? post.imageSquareAlt || post.imageAlt : post.imageAlt
  return (
    // h-full lets the card fill its grid cell; the column layout below then
    // pins the meta row to the bottom so every card in a row ends level,
    // regardless of how long its title or description happens to be.
    <Link href={link} className='group block h-full'>
      <article className='rounded-card dark:border-dark-700 dark:bg-dark-800 flex h-full flex-col overflow-hidden border border-gray-200 bg-white transition-transform duration-200 group-hover:scale-[1.02]'>
        {/* Fixed 16:9 box rather than a fixed pixel height, so the image scales
            with the column instead of dominating narrow ones. */}
        <div className='relative aspect-[16/9] shrink-0 overflow-hidden'>
          <Image
            src={cmsMediaUrl(cardImage)}
            alt={cardImageAlt ?? ''}
            fill
            className='object-cover'
            sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
          />
        </div>
        <div className='flex flex-1 flex-col p-5'>
          <h3 className='mb-2 line-clamp-2 text-lg leading-snug font-bold text-gray-900 md:text-xl dark:text-white'>
            {post.title}
          </h3>
          <p className='mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600 md:text-base dark:text-gray-300'>
            {post.description}
          </p>
          <div className='mt-auto flex items-center justify-between gap-3'>
            <time
              dateTime={post.date}
              className='text-xs font-medium text-gray-500 md:text-sm dark:text-gray-400'
            >
              {formatDate(post.date)}
            </time>
            <div className='rounded-pill bg-primary-500/15 flex shrink-0 items-center gap-1.5 px-3 py-1'>
              <Clock className='text-primary-600 dark:text-primary-400 h-3.5 w-3.5' />
              <span className='text-primary-700 dark:text-primary-300 text-xs font-semibold'>
                {post.readTime} min
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
