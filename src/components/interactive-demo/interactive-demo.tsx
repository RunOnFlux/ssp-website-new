'use client'

import { animate, AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion'
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  Eye,
  Lock,
  RotateCcw,
  ScanLine,
  Server,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Fragment, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useTheme } from '@/hooks/use-theme'
import { Link } from '@/i18n/navigation'

interface InteractiveDemoProps {
  isOpen: boolean
  onClose: () => void
}

type Device = 'wallet' | 'key'
type Act = 'create' | 'pair' | 'send'
type StepId =
  | 'password'
  | 'seed'
  | 'challenge'
  | 'personalize'
  | 'pairing'
  | 'sync'
  | 'verify'
  | 'sendDetails'
  | 'review'
  | 'approve'
  | 'done'

interface StepDef {
  id: StepId
  act: Act
  active: Device | 'both'
  /** Terminal celebration screen — not counted in the act's step total. */
  finale?: boolean
}

// Phase model (matches SSP v2):
//   Create Wallet : password → seed → word-challenge → personalize
//   Pair Key      : pairing QR → slide-to-approve on phone → 6-word verify
//   Send          : details → review → approve on phone
const STEPS: StepDef[] = [
  { id: 'password', act: 'create', active: 'wallet' },
  { id: 'seed', act: 'create', active: 'wallet' },
  { id: 'challenge', act: 'create', active: 'wallet' },
  { id: 'personalize', act: 'create', active: 'wallet' },
  { id: 'pairing', act: 'pair', active: 'wallet' },
  { id: 'sync', act: 'pair', active: 'key' },
  { id: 'verify', act: 'pair', active: 'both' },
  { id: 'sendDetails', act: 'send', active: 'wallet' },
  { id: 'review', act: 'send', active: 'wallet' },
  { id: 'approve', act: 'send', active: 'key' },
  { id: 'done', act: 'send', active: 'both', finale: true },
]

type ActTitleKey = 'actCreateTitle' | 'actPairTitle' | 'actSendTitle'
type ActSubtitleKey = 'actCreateSubtitle' | 'actPairSubtitle' | 'actSendSubtitle'

const ACTS: { id: Act; titleKey: ActTitleKey; subtitleKey: ActSubtitleKey }[] = [
  { id: 'create', titleKey: 'actCreateTitle', subtitleKey: 'actCreateSubtitle' },
  { id: 'pair', titleKey: 'actPairTitle', subtitleKey: 'actPairSubtitle' },
  { id: 'send', titleKey: 'actSendTitle', subtitleKey: 'actSendSubtitle' },
]

const ACCENT_COLORS = ['#FBBF24', '#F97316', '#22C55E', '#14B8A6', '#3B82F6', '#A855F7', '#EC4899']

const VERIFY_WORDS = ['harvest', 'pledge', 'orbit', 'canyon', 'velvet', 'sparrow']
const VERIFY_ACCENTS = ['#f59e0b', '#22c55e', '#3b82f6', '#a855f7', '#ec4899', '#14b8a6']

// A plausible-looking 24-word BIP39 phrase — for the simulation only.
const SEED_WORDS = [
  'ridge',
  'harvest',
  'cabin',
  'orbit',
  'pledge',
  'velvet',
  'canyon',
  'sparrow',
  'timber',
  'meadow',
  'anchor',
  'shadow',
  'copper',
  'nectar',
  'summit',
  'gallery',
  'quartz',
  'lantern',
  'marble',
  'thunder',
  'willow',
  'cobalt',
  'ember',
  'harbor',
]

interface ChainDef {
  id: 'bitcoin' | 'ethereum' | 'solana' | 'bnb' | 'polygon'
  nameKey: 'chainBitcoin' | 'chainEthereum' | 'chainSolana' | 'chainBnb' | 'chainPolygon'
  color: string
  symbol: string
}

const CHAINS: ChainDef[] = [
  { id: 'bitcoin', nameKey: 'chainBitcoin', color: '#F7931A', symbol: '₿' },
  { id: 'ethereum', nameKey: 'chainEthereum', color: '#627EEA', symbol: 'Ξ' },
  { id: 'solana', nameKey: 'chainSolana', color: '#14F195', symbol: '◎' },
  { id: 'bnb', nameKey: 'chainBnb', color: '#F0B90B', symbol: '⬡' },
  { id: 'polygon', nameKey: 'chainPolygon', color: '#8247E5', symbol: '⬢' },
]

const DEMO_RECIPIENT = 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq'
const DEMO_AMOUNT = '0.05'
const DEMO_FEE = '0.00012'
const DEMO_HASH = '9f3a…c71e'
// Derived 2-of-2 P2WSH vault address — both devices independently derive the
// same address, so showing it under the matched words reinforces the match.
const DEMO_VAULT_ADDRESS = 'bc1qy3ke5vd7wq9m2s4hla8n6xr0uc3tpf5zjv8g2'

/* ------------------------------------------------------------------ */
/* Small presentational helpers                                        */
/* ------------------------------------------------------------------ */

function Identicon({ seed, color, size = 40 }: { seed: string; color: string; size?: number }) {
  // Deterministic 5x5 symmetric pattern derived from the seed string.
  const cells = useMemo(() => {
    let h = 0
    for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0
    const grid: boolean[] = []
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 3; c++) {
        const bit = (h >> ((r * 3 + c) % 31)) & 1
        grid[r * 5 + c] = bit === 1
        grid[r * 5 + (4 - c)] = bit === 1
      }
    }
    return grid
  }, [seed])
  const unit = size / 5
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className='rounded-lg'>
      <rect
        width={size}
        height={size}
        rx={size * 0.18}
        className='fill-black/5 dark:fill-white/10'
      />
      {cells.map((on, i) =>
        on ? (
          <rect
            key={i}
            x={(i % 5) * unit}
            y={Math.floor(i / 5) * unit}
            width={unit}
            height={unit}
            fill={color}
            rx={unit * 0.2}
          />
        ) : null
      )}
    </svg>
  )
}

function QrCode() {
  const modules = useMemo(() => {
    const out: boolean[] = []
    for (let i = 0; i < 441; i++) {
      const row = Math.floor(i / 21)
      const col = i % 21
      let on = false
      const finder = (r0: number, c0: number) =>
        row >= r0 && row <= r0 + 6 && col >= c0 && col <= c0 + 6
      if (finder(0, 0) || finder(0, 14) || finder(14, 0)) {
        const lr = (row >= 14 ? row - 14 : row) % 7
        const lc = (col >= 14 ? col - 14 : col) % 7
        on =
          lr === 0 || lr === 6 || lc === 0 || lc === 6 || (lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4)
      } else {
        const s = row * 21 + col
        on = (s % 3 === 0 || s % 7 === 1 || (row + col) % 5 === 2) && (row + col) % 11 !== 0
      }
      out.push(on)
    }
    return out
  }, [])
  return (
    <div className='relative rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/10'>
      <div className='grid grid-cols-21 gap-px' style={{ width: 132, height: 132 }}>
        {modules.map((on, i) => (
          <div key={i} className={on ? 'bg-neutral-900' : 'bg-white'} />
        ))}
      </div>
      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='rounded-md bg-white p-1 shadow ring-1 ring-black/10'>
          <Image src='/ssp-logo-black.svg' alt='SSP' width={20} height={20} />
        </div>
      </div>
    </div>
  )
}

function SlideToApprove({
  label,
  doneLabel,
  onApprove,
  accent = '#FBBF24',
  testId,
}: {
  label: string
  doneLabel: string
  onApprove: () => void
  accent?: string
  testId?: string
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const [max, setMax] = useState(0)
  const [done, setDone] = useState(false)
  const fillWidth = useTransform(x, v => v + 52)

  useLayoutEffect(() => {
    const measure = () => {
      const el = trackRef.current
      if (el) setMax(Math.max(0, el.clientWidth - 56))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const handleEnd = () => {
    if (done) return
    // Only commits past ~82% of the track — releasing early springs back.
    if (x.get() >= max * 0.82 && max > 0) {
      setDone(true)
      animate(x, max, { type: 'spring', stiffness: 500, damping: 45 })
      onApprove()
    } else {
      animate(x, 0, { type: 'spring', stiffness: 500, damping: 40 })
    }
  }

  return (
    <div
      ref={trackRef}
      data-testid={testId}
      className='relative flex h-14 w-full items-center overflow-hidden rounded-full bg-neutral-200/80 p-1 dark:bg-neutral-700/70'
    >
      <motion.div
        style={{ width: fillWidth, backgroundColor: accent }}
        className='absolute inset-y-1 left-1 rounded-full opacity-90'
      />
      <span className='pointer-events-none absolute inset-0 flex items-center justify-center text-sm font-semibold text-neutral-700 dark:text-neutral-200'>
        {done ? (
          <span className='flex items-center gap-2 text-neutral-900'>
            <Check className='h-4 w-4' /> {doneLabel}
          </span>
        ) : (
          <span className='pl-6'>{label}</span>
        )}
      </span>
      {!done && (
        <motion.span
          aria-hidden
          className='pointer-events-none absolute right-4 flex items-center gap-0.5 text-neutral-400'
          animate={{ opacity: [0.25, 1, 0.25], x: [0, 4, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronRight className='h-4 w-4' />
          <ChevronRight className='-ml-2.5 h-4 w-4' />
        </motion.span>
      )}
      <motion.button
        type='button'
        aria-label={label}
        drag={done ? false : 'x'}
        dragConstraints={{ left: 0, right: max }}
        dragElastic={0}
        dragMomentum={false}
        onDragEnd={handleEnd}
        style={{ x }}
        whileTap={{ scale: 0.96 }}
        className='relative z-10 flex h-12 w-12 flex-shrink-0 cursor-grab items-center justify-center rounded-full bg-white shadow-md active:cursor-grabbing dark:bg-neutral-900'
      >
        {done ? (
          <Check className='h-5 w-5' style={{ color: accent }} />
        ) : (
          <ChevronsRight className='h-5 w-5 text-neutral-800 dark:text-neutral-100' />
        )}
      </motion.button>
    </div>
  )
}

function StatusChip({
  label,
  tone,
}: {
  label: string
  tone: 'idle' | 'active' | 'pending' | 'good'
}) {
  const styles =
    tone === 'active'
      ? 'bg-primary-100 text-primary-800 dark:bg-primary-400/20 dark:text-primary-200'
      : tone === 'good'
        ? 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300'
        : 'bg-neutral-200 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300'
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${styles}`}
    >
      {tone === 'active' && (
        <motion.span
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          className='bg-primary-500 h-1.5 w-1.5 rounded-full'
        />
      )}
      {tone === 'pending' && (
        <motion.span
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          className='h-1.5 w-1.5 rounded-full bg-neutral-400 dark:bg-neutral-400'
        />
      )}
      {tone === 'good' && <span className='h-1.5 w-1.5 rounded-full bg-green-500' />}
      {label}
    </span>
  )
}

function DeviceShell({
  kind,
  active,
  title,
  status,
  isDark,
  children,
}: {
  kind: Device
  active: boolean
  title: string
  status: React.ReactNode
  isDark: boolean
  children: React.ReactNode
}) {
  const ring = active
    ? 'ring-2 ring-primary-400 shadow-xl shadow-primary-400/20'
    : 'ring-1 ring-black/5 dark:ring-white/10 opacity-55 saturate-[.6]'
  if (kind === 'wallet') {
    return (
      <motion.div
        layout
        animate={{ scale: active ? 1 : 0.97 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        className={`flex w-full max-w-[360px] flex-col overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 ${ring}`}
      >
        <div className='flex items-center gap-2 border-b border-black/5 bg-neutral-50 px-3 py-2 dark:border-white/10 dark:bg-neutral-800'>
          <div className='flex gap-1.5'>
            <span className='h-2.5 w-2.5 rounded-full bg-red-400' />
            <span className='h-2.5 w-2.5 rounded-full bg-amber-400' />
            <span className='h-2.5 w-2.5 rounded-full bg-green-400' />
          </div>
          <div className='ml-1 flex items-center gap-1.5'>
            <Image
              src={isDark ? '/ssp-logo-white.svg' : '/ssp-logo-black.svg'}
              alt='SSP'
              width={13}
              height={13}
            />
            <span className='text-[11px] font-medium text-neutral-500 dark:text-neutral-400'>
              {title}
            </span>
          </div>
          <div className='ml-auto'>{status}</div>
        </div>
        <div className='flex min-h-[356px] flex-1 flex-col p-4'>{children}</div>
      </motion.div>
    )
  }
  return (
    <motion.div
      layout
      animate={{ scale: active ? 1 : 0.97 }}
      transition={{ type: 'spring', stiffness: 260, damping: 26 }}
      className={`relative flex w-[248px] flex-shrink-0 flex-col rounded-[2rem] bg-neutral-950 p-2 ${ring}`}
    >
      <div className='flex flex-1 flex-col overflow-hidden rounded-[1.6rem] bg-white dark:bg-neutral-900'>
        <div className='relative flex h-7 items-center justify-center bg-neutral-950'>
          <div className='h-1.5 w-14 rounded-full bg-neutral-700' />
        </div>
        <div className='flex items-center justify-between px-3 py-2'>
          <div className='flex items-center gap-1.5'>
            <Image
              src={isDark ? '/ssp-logo-white.svg' : '/ssp-logo-black.svg'}
              alt='SSP'
              width={13}
              height={13}
            />
            <span className='text-[11px] font-medium text-neutral-500 dark:text-neutral-400'>
              {title}
            </span>
          </div>
          {status}
        </div>
        <div className='flex min-h-[356px] flex-1 flex-col px-3 pb-4'>{children}</div>
      </div>
    </motion.div>
  )
}

function RelaySegment({ active, reverse }: { active: boolean; reverse?: boolean }) {
  return (
    <div className='relative hidden h-px w-16 bg-gradient-to-r from-transparent via-neutral-300 to-transparent lg:block dark:via-neutral-600'>
      {active && (
        <motion.span
          className='bg-primary-400 absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full'
          animate={{ left: reverse ? ['100%', '0%'] : ['0%', '100%'] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </div>
  )
}

function RelayLink({
  label,
  active,
  matched,
}: {
  label: string
  active: boolean
  matched?: boolean
}) {
  return (
    <div className='flex flex-row items-center gap-1 lg:flex-col'>
      <RelaySegment active={active} />
      {matched ? (
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 320, damping: 18 }}
          className='flex items-center gap-1.5 rounded-full bg-green-500 px-2.5 py-1 text-[10px] font-bold text-white shadow-sm shadow-green-500/40'
        >
          <Check className='h-3 w-3' /> 6/6
        </motion.div>
      ) : (
        <div className='flex items-center gap-1.5 rounded-full bg-neutral-100 px-2.5 py-1 text-[10px] font-medium text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400'>
          <Server className='h-3 w-3' />
          {label}
        </div>
      )}
      <RelaySegment active={active} reverse />
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className='block'>
      <span className='mb-1 block text-left text-xs font-medium text-neutral-500 dark:text-neutral-400'>
        {label}
      </span>
      {children}
    </label>
  )
}

function Row({
  label,
  value,
  strong,
  mono,
}: {
  label: string
  value: string
  strong?: boolean
  mono?: boolean
}) {
  return (
    <div className='flex items-center justify-between'>
      <span className='text-xs text-neutral-500 dark:text-neutral-400'>{label}</span>
      <span
        className={`${mono ? 'font-mono text-xs' : 'text-sm'} ${strong ? 'font-semibold text-neutral-900 dark:text-white' : 'text-neutral-700 dark:text-neutral-200'}`}
      >
        {value}
      </span>
    </div>
  )
}

function VerifyWords({ matched }: { matched?: boolean }) {
  return (
    <div
      className={`rounded-xl p-1 transition-colors ${
        matched ? 'bg-green-500/10 ring-1 ring-green-400/50' : ''
      }`}
    >
      <div className='grid grid-cols-2 gap-1.5'>
        {VERIFY_WORDS.map((w, i) => (
          <motion.div
            key={i}
            animate={matched ? { scale: [1, 1.05, 1] } : { scale: 1 }}
            transition={{ delay: matched ? i * 0.05 : 0, duration: 0.35 }}
            className={`flex items-center gap-1.5 rounded-lg border px-2 py-1.5 ${
              matched
                ? 'border-green-300 bg-white dark:border-green-500/40 dark:bg-neutral-800'
                : 'border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-800'
            }`}
          >
            <span
              className='flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-white'
              style={{ background: VERIFY_ACCENTS[i] }}
            >
              {i + 1}
            </span>
            <span className='text-xs font-medium text-neutral-800 dark:text-neutral-100'>{w}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function VaultAddressPreview({ label, matched }: { label: string; matched?: boolean }) {
  return (
    <div
      className={`flex items-center gap-2 rounded-xl border px-2.5 py-2 transition-colors ${
        matched
          ? 'border-green-300 bg-green-50 dark:border-green-500/40 dark:bg-green-500/10'
          : 'border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800/60'
      }`}
    >
      <span
        className={`flex-shrink-0 rounded-md px-1.5 py-0.5 text-[9px] font-bold tracking-wide transition-colors ${
          matched
            ? 'bg-green-500 text-white'
            : 'bg-primary-100 text-primary-700 dark:bg-primary-400/20 dark:text-primary-300'
        }`}
      >
        2-of-2
      </span>
      <div className='min-w-0 flex-1 text-left'>
        <div className='text-[9px] font-medium tracking-wide text-neutral-400 uppercase'>
          {label}
        </div>
        <div className='truncate font-mono text-[11px] text-neutral-700 dark:text-neutral-200'>
          {DEMO_VAULT_ADDRESS}
        </div>
      </div>
      {matched && <Check className='h-3.5 w-3.5 flex-shrink-0 text-green-500' />}
    </div>
  )
}

function SendStepBar({ labels, active }: { labels: string[]; active: number }) {
  return (
    <div className='mb-3 flex items-center gap-1'>
      {labels.map((l, i) => (
        <div key={l} className='flex flex-1 items-center gap-1'>
          <div
            className={`flex-1 rounded-full py-1 text-center text-[10px] font-medium transition-colors ${
              i === active
                ? 'bg-primary-400 text-black'
                : i < active
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-400/20 dark:text-primary-300'
                  : 'bg-neutral-100 text-neutral-400 dark:bg-neutral-800'
            }`}
          >
            {l}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

export function InteractiveDemo({ isOpen, onClose }: InteractiveDemoProps) {
  const t = useTranslations('InteractiveDemo')
  const { isDark } = useTheme()

  const [step, setStep] = useState(0)
  const [password, setPassword] = useState('demo-pass-2v')
  const [termsAgreed, setTermsAgreed] = useState(true)
  const [seedRevealed, setSeedRevealed] = useState(false)
  const [walletName, setWalletName] = useState('My SSP Wallet')
  const [accent, setAccent] = useState(ACCENT_COLORS[0])
  const [selectedChains, setSelectedChains] = useState<Set<string>>(new Set(['ethereum']))
  const [verified, setVerified] = useState(false)

  // Word challenge state — two rounds, positions are 1-indexed.
  const challengePositions = useMemo(() => [7, 14], [])
  const [challengeRound, setChallengeRound] = useState(0)
  const [challengeStatus, setChallengeStatus] = useState<'idle' | 'wrong' | 'correct' | 'done'>(
    'idle'
  )

  const stepDef = STEPS[step]
  const act = stepDef.act
  const countedInAct = useCallback((a: Act) => STEPS.filter(s => s.act === a && !s.finale), [])
  const totalInAct = countedInAct(act).length
  const indexInAct = stepDef.finale
    ? totalInAct - 1
    : countedInAct(act).findIndex(s => s.id === stepDef.id)
  const sendDetailsIndex = useMemo(() => STEPS.findIndex(s => s.id === 'sendDetails'), [])

  const reset = useCallback(() => {
    setStep(0)
    setSeedRevealed(false)
    setSelectedChains(new Set(['ethereum']))
    setVerified(false)
    setChallengeRound(0)
    setChallengeStatus('idle')
    setWalletName('My SSP Wallet')
    setAccent(ACCENT_COLORS[0])
  }, [])

  const goNext = useCallback(() => setStep(s => Math.min(s + 1, STEPS.length - 1)), [])
  const goPrev = useCallback(() => setStep(s => Math.max(s - 1, 0)), [])
  const goSendAgain = useCallback(() => setStep(sendDetailsIndex), [sendDetailsIndex])

  // Lock body scroll while open.
  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [isOpen])

  const buildChallengeOptions = useCallback((position: number) => {
    const correct = SEED_WORDS[position - 1]
    const pool = SEED_WORDS.filter(w => w !== correct)
    const decoys: string[] = []
    let seed = position * 97
    while (decoys.length < 2) {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff
      const w = pool[seed % pool.length]
      if (!decoys.includes(w)) decoys.push(w)
    }
    const opts = [correct, ...decoys]
    // Deterministic shuffle so screenshots are stable.
    return opts.sort((a, b) => ((position * 7 + a.length) % 3) - ((position * 7 + b.length) % 3))
  }, [])

  const onChallengePick = (word: string) => {
    const position = challengePositions[challengeRound]
    if (word !== SEED_WORDS[position - 1]) {
      setChallengeStatus('wrong')
      return
    }
    if (challengeRound + 1 < challengePositions.length) {
      setChallengeStatus('correct')
      setTimeout(() => {
        setChallengeRound(r => r + 1)
        setChallengeStatus('idle')
      }, 650)
    } else {
      setChallengeStatus('done')
    }
  }

  const toggleChain = (id: string) =>
    setSelectedChains(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const sendLabels = [t('sendStepDetails'), t('sendStepReview'), t('sendStepApprove')]

  if (!isOpen) return null

  /* ---------------- device content per step ---------------- */

  const walletContent = () => {
    switch (stepDef.id) {
      case 'password':
        return (
          <div className='flex h-full flex-col'>
            <div className='mb-4 flex flex-col items-center text-center'>
              <div className='bg-primary-100 dark:bg-primary-400/15 mb-2 flex h-11 w-11 items-center justify-center rounded-xl'>
                <Lock className='text-primary-600 dark:text-primary-300 h-5 w-5' />
              </div>
              <h4 className='text-sm font-semibold text-neutral-900 dark:text-white'>
                {t('passwordTitle')}
              </h4>
              <p className='mt-1 text-[11px] leading-tight text-neutral-500 dark:text-neutral-400'>
                {t('passwordSubtitle')}
              </p>
            </div>
            <div className='space-y-3'>
              <Field label={t('passwordFieldLabel')}>
                <input
                  type='password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder={t('passwordPlaceholder')}
                  className='focus:border-primary-400 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white'
                />
              </Field>
              <Field label={t('passwordConfirmLabel')}>
                <input
                  type='password'
                  defaultValue={password}
                  className='focus:border-primary-400 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white'
                />
              </Field>
              <div className='flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400'>
                <ShieldCheck className='h-3.5 w-3.5' /> {t('passwordStrengthStrong')}
              </div>
              <label className='flex cursor-pointer items-start gap-2 text-xs text-neutral-600 dark:text-neutral-300'>
                <input
                  type='checkbox'
                  checked={termsAgreed}
                  onChange={e => setTermsAgreed(e.target.checked)}
                  className='accent-primary-500 mt-0.5'
                />
                {t('termsLabel')}
              </label>
            </div>
            <button
              onClick={goNext}
              className='bg-primary-400 hover:bg-primary-300 mt-auto w-full rounded-lg py-2.5 text-sm font-semibold text-black transition-colors'
            >
              {t('passwordCta')}
            </button>
          </div>
        )

      case 'seed':
        return (
          <div className='flex h-full flex-col'>
            <h4 className='mb-1 text-center text-sm font-semibold text-neutral-900 dark:text-white'>
              {t('seedTitle')}
            </h4>
            <p className='mb-3 rounded-lg bg-red-50 px-2.5 py-1.5 text-center text-[11px] leading-tight text-red-700 dark:bg-red-500/10 dark:text-red-300'>
              {t('seedWarning')}
            </p>
            {!seedRevealed ? (
              <button
                onClick={() => setSeedRevealed(true)}
                data-testid='reveal-seed'
                className='hover:border-primary-400 flex flex-1 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-neutral-300 bg-neutral-50 text-sm text-neutral-500 transition-colors dark:border-neutral-600 dark:bg-neutral-800/60'
              >
                <Eye className='h-6 w-6' />
                <span>{t('seedHiddenHint')}</span>
                <span className='bg-primary-400 rounded-lg px-3 py-1.5 text-xs font-semibold text-black'>
                  {t('seedRevealCta')}
                </span>
              </button>
            ) : (
              <div className='grid flex-1 grid-cols-3 gap-1.5 overflow-y-auto'>
                {SEED_WORDS.map((w, i) => (
                  <div
                    key={i}
                    className='flex items-center gap-1 rounded-md bg-neutral-100 px-1.5 py-1 text-[11px] dark:bg-neutral-800'
                  >
                    <span className='text-neutral-400'>{i + 1}</span>
                    <span className='font-medium text-neutral-800 dark:text-neutral-100'>{w}</span>
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={goNext}
              disabled={!seedRevealed}
              className='bg-primary-400 hover:bg-primary-300 mt-3 w-full rounded-lg py-2.5 text-sm font-semibold text-black transition-colors disabled:cursor-not-allowed disabled:opacity-40'
            >
              {t('seedContinueCta')}
            </button>
          </div>
        )

      case 'challenge': {
        const position = challengePositions[Math.min(challengeRound, challengePositions.length - 1)]
        const options = buildChallengeOptions(position)
        const finished = challengeStatus === 'done'
        return (
          <div className='flex h-full flex-col'>
            {!finished ? (
              <div className='flex flex-1 flex-col justify-center'>
                <h4 className='mb-1 text-center text-sm font-semibold text-neutral-900 dark:text-white'>
                  {t('challengeTitle')}
                </h4>
                <p className='mb-5 text-center text-[11px] leading-tight text-neutral-500 dark:text-neutral-400'>
                  {t('challengeSubtitle')}
                </p>
                <div className='mb-4 flex items-center justify-center gap-1.5'>
                  {challengePositions.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 w-6 rounded-full ${i <= challengeRound ? 'bg-primary-400' : 'bg-neutral-200 dark:bg-neutral-700'}`}
                    />
                  ))}
                </div>
                <p className='mb-4 text-center text-sm font-semibold text-neutral-900 dark:text-white'>
                  {t('challengePrompt', { position })}
                </p>
                <div className='space-y-2'>
                  {options.map(w => (
                    <button
                      key={w}
                      data-testid='challenge-option'
                      onClick={() => onChallengePick(w)}
                      className='hover:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-400/10 w-full rounded-lg border border-neutral-200 bg-white py-2.5 text-sm font-medium text-neutral-800 transition-colors dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100'
                    >
                      {w}
                    </button>
                  ))}
                </div>
                <div className='mt-3 h-5 text-center text-xs'>
                  {challengeStatus === 'wrong' && (
                    <span className='text-red-500'>{t('challengeWrong')}</span>
                  )}
                  {challengeStatus === 'correct' && (
                    <span className='inline-flex items-center gap-1 text-green-500'>
                      <Check className='h-3.5 w-3.5' /> {t('challengeCorrect')}
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div className='flex flex-1 flex-col items-center justify-center gap-3 text-center'>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                  className='flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-500/20'
                >
                  <Check className='h-8 w-8 text-green-600 dark:text-green-400' />
                </motion.div>
                <p className='text-sm font-semibold text-green-700 dark:text-green-300'>
                  {t('challengeConfirmed')}
                </p>
                <button
                  onClick={goNext}
                  className='bg-primary-400 hover:bg-primary-300 mt-2 rounded-lg px-5 py-2 text-sm font-semibold text-black'
                >
                  {t('next')}
                </button>
              </div>
            )}
          </div>
        )
      }

      case 'personalize':
        return (
          <div className='flex h-full flex-col'>
            <h4 className='text-center text-sm font-semibold text-neutral-900 dark:text-white'>
              {t('personalizeTitle')}
            </h4>
            <p className='mt-1 mb-4 text-center text-[11px] leading-tight text-neutral-500 dark:text-neutral-400'>
              {t('personalizeSubtitle')}
            </p>
            <div className='mb-4 flex flex-col items-center gap-2'>
              <motion.div
                key={accent + walletName}
                initial={{ scale: 0.9, opacity: 0.6 }}
                animate={{ scale: 1, opacity: 1 }}
                className='rounded-2xl p-1'
                style={{ boxShadow: `0 0 0 3px ${accent}` }}
              >
                <Identicon seed={walletName || 'ssp'} color={accent} size={56} />
              </motion.div>
              <span className='text-sm font-semibold text-neutral-800 dark:text-neutral-100'>
                {walletName || t('namePlaceholder')}
              </span>
            </div>
            <Field label={t('nameFieldLabel')}>
              <input
                value={walletName}
                onChange={e => setWalletName(e.target.value)}
                placeholder={t('namePlaceholder')}
                className='focus:border-primary-400 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white'
              />
            </Field>
            <div className='mt-3'>
              <span className='mb-2 block text-left text-xs font-medium text-neutral-500 dark:text-neutral-400'>
                {t('colorFieldLabel')}
              </span>
              <div className='flex flex-wrap gap-2'>
                {ACCENT_COLORS.map(c => (
                  <button
                    key={c}
                    aria-label={c}
                    onClick={() => setAccent(c)}
                    className='flex h-8 w-8 items-center justify-center rounded-full transition-transform hover:scale-110'
                    style={{
                      background: c,
                      boxShadow: c === accent ? `0 0 0 2px white, 0 0 0 4px ${c}` : 'none',
                    }}
                  >
                    {c === accent && <Check className='h-4 w-4 text-white' />}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={goNext}
              className='bg-primary-400 hover:bg-primary-300 mt-auto w-full rounded-lg py-2.5 text-sm font-semibold text-black transition-colors'
            >
              {t('personalizeCta')}
            </button>
          </div>
        )

      case 'pairing':
        return (
          <div className='flex h-full flex-col'>
            <div className='mb-3 flex items-center gap-2'>
              <Identicon seed={walletName || 'ssp'} color={accent} size={24} />
              <span className='text-xs font-semibold text-neutral-800 dark:text-neutral-100'>
                {walletName}
              </span>
            </div>
            <h4 className='text-center text-sm font-semibold text-neutral-900 dark:text-white'>
              {t('pairingTitle')}
            </h4>
            <p className='mt-0.5 text-center text-[11px] leading-tight text-neutral-500 dark:text-neutral-400'>
              {t('pairingSubtitle')}
            </p>
            <div className='my-3 flex justify-center'>
              <QrCode />
            </div>
            <div className='mt-auto'>
              <div className='mb-1.5 flex items-center justify-between'>
                <span className='text-[11px] font-medium text-neutral-500 dark:text-neutral-400'>
                  {t('chainsLabel')}
                </span>
              </div>
              <div className='flex flex-wrap gap-1.5'>
                <span
                  className='inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-medium text-white'
                  style={{ background: CHAINS[0].color }}
                  title={t('chainAlwaysOn')}
                >
                  <span>{CHAINS[0].symbol}</span>
                  {t(CHAINS[0].nameKey)}
                  <span className='rounded-full bg-white/25 px-1 text-[8px] font-semibold uppercase'>
                    {t('chainAlwaysOn')}
                  </span>
                </span>
                {CHAINS.slice(1).map(c => {
                  const on = selectedChains.has(c.id)
                  return (
                    <button
                      key={c.id}
                      onClick={() => toggleChain(c.id)}
                      data-testid={`chain-${c.id}`}
                      className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[11px] font-medium transition-colors ${
                        on
                          ? 'border-transparent text-white'
                          : 'border-neutral-200 text-neutral-500 dark:border-neutral-700 dark:text-neutral-400'
                      }`}
                      style={on ? { background: c.color } : undefined}
                    >
                      <span style={{ color: on ? '#fff' : c.color }}>{c.symbol}</span>
                      {t(c.nameKey)}
                      {on && <Check className='h-3 w-3' />}
                    </button>
                  )
                })}
              </div>
              <p className='mt-1.5 text-[10px] text-neutral-400'>{t('chainsHint')}</p>
            </div>
          </div>
        )

      case 'sendDetails':
        return (
          <div className='flex h-full flex-col'>
            <SendStepBar labels={sendLabels} active={0} />
            <h4 className='text-center text-sm font-semibold text-neutral-900 dark:text-white'>
              {t('sendDetailsTitle')}
            </h4>
            <div className='mt-3 space-y-3'>
              <Field label={t('recipientLabel')}>
                <div className='rounded-lg border border-neutral-200 bg-white px-3 py-2 font-mono text-[11px] break-all text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200'>
                  {DEMO_RECIPIENT}
                </div>
              </Field>
              <Field label={t('amountLabel')}>
                <div className='flex items-center justify-between rounded-lg border border-neutral-200 bg-white px-3 py-2 dark:border-neutral-700 dark:bg-neutral-800'>
                  <span className='text-sm font-semibold text-neutral-900 dark:text-white'>
                    {DEMO_AMOUNT} BTC
                  </span>
                  <span className='text-[11px] text-neutral-400'>{t('balanceLabel')} 0.42 BTC</span>
                </div>
              </Field>
            </div>
            <button
              onClick={goNext}
              className='bg-primary-400 hover:bg-primary-300 mt-auto flex w-full items-center justify-center gap-1 rounded-lg py-2.5 text-sm font-semibold text-black transition-colors'
            >
              {t('sendReviewCta')} <ArrowRight className='h-4 w-4' />
            </button>
          </div>
        )

      case 'review':
        return (
          <div className='flex h-full flex-col'>
            <SendStepBar labels={sendLabels} active={1} />
            <h4 className='text-center text-sm font-semibold text-neutral-900 dark:text-white'>
              {t('reviewTitle')}
            </h4>
            <p className='mb-3 text-center text-[11px] text-neutral-500 dark:text-neutral-400'>
              {t('reviewSubtitle')}
            </p>
            <div className='space-y-2 text-sm'>
              <div className='rounded-lg bg-neutral-50 p-2.5 dark:bg-neutral-800'>
                <div className='mb-1 text-[11px] text-neutral-500 dark:text-neutral-400'>
                  {t('reviewToRow')}
                </div>
                <div className='font-mono text-[11px] leading-relaxed break-all text-neutral-800 dark:text-neutral-100'>
                  {DEMO_RECIPIENT}
                </div>
              </div>
              <Row label={t('reviewAmountRow')} value={`${DEMO_AMOUNT} BTC`} strong />
              <Row label={t('reviewNetworkRow')} value={t('chainBitcoin')} />
              <Row label={t('reviewFeeRow')} value={`${DEMO_FEE} BTC`} />
              <div className='flex items-center justify-between border-t border-neutral-200 pt-2 dark:border-neutral-700'>
                <span className='text-xs text-neutral-500 dark:text-neutral-400'>
                  {t('reviewTotalRow')}
                </span>
                <span className='text-sm font-semibold text-neutral-900 dark:text-white'>
                  {(Number(DEMO_AMOUNT) + Number(DEMO_FEE)).toFixed(5)} BTC
                </span>
              </div>
            </div>
            <button
              onClick={goNext}
              className='bg-primary-400 hover:bg-primary-300 mt-auto flex w-full items-center justify-center gap-1.5 rounded-lg py-2.5 text-sm font-semibold text-black transition-colors'
            >
              <ChevronsRight className='h-4 w-4' /> {t('reviewApproveCta')}
            </button>
          </div>
        )

      case 'sync':
      case 'verify':
      case 'approve':
      case 'done':
        return walletAmbient()
      default:
        return null
    }
  }

  const walletAmbient = () => {
    if (stepDef.id === 'verify') {
      return (
        <div className='flex h-full flex-col'>
          <div className='mb-3 flex items-center gap-2'>
            <Identicon seed={walletName || 'ssp'} color={accent} size={22} />
            <span className='text-xs font-semibold text-neutral-800 dark:text-neutral-100'>
              {t('verifyWalletHeading')}
            </span>
          </div>
          <div className='flex flex-1 flex-col justify-center gap-3'>
            <VerifyWords matched={verified} />
            <VaultAddressPreview label={t('verifyVaultLabel')} matched={verified} />
          </div>
          <div className='mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-neutral-50 px-3 py-2 text-center text-[11px] text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400'>
            <ShieldCheck className='h-3.5 w-3.5 flex-shrink-0 text-green-500' />
            {t('verifyMismatchHint')}
          </div>
        </div>
      )
    }
    if (stepDef.id === 'done') {
      return (
        <div className='flex h-full flex-col items-center justify-center gap-3 text-center'>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            className='flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-500/20'
          >
            <CheckCircle2 className='h-9 w-9 text-green-600 dark:text-green-400' />
          </motion.div>
          <h4 className='text-sm font-semibold text-neutral-900 dark:text-white'>
            {t('doneTitle')}
          </h4>
          <div className='w-full space-y-1.5 text-sm'>
            <Row label={t('doneAmountRow')} value={`${DEMO_AMOUNT} BTC`} strong />
            <Row label={t('doneToRow')} value={DEMO_RECIPIENT.slice(0, 10) + '…'} mono />
            <Row label={t('doneHashRow')} value={DEMO_HASH} mono />
          </div>
          <button className='bg-primary-400 hover:bg-primary-300 mt-1 rounded-lg px-4 py-2 text-xs font-semibold text-black'>
            {t('viewOnExplorer')}
          </button>
        </div>
      )
    }
    // sync / approve — wallet is waiting for the phone
    return (
      <div className='flex h-full flex-col items-center justify-center gap-4 text-center'>
        <div className='relative'>
          <div className='bg-primary-100 dark:bg-primary-400/10 flex h-20 w-20 items-center justify-center rounded-full'>
            <Image
              src={isDark ? '/ssp-logo-white.svg' : '/ssp-logo-black.svg'}
              alt='SSP'
              width={34}
              height={34}
            />
          </div>
          <motion.div
            className='border-primary-400 absolute inset-0 rounded-full border-2'
            animate={{ scale: [1, 1.35], opacity: [0.7, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </div>
        <p className='max-w-[220px] text-sm text-neutral-500 dark:text-neutral-400'>
          {stepDef.id === 'sync' ? t('syncingLabel') : t('approveTitle')}
        </p>
        <span className='inline-flex items-center gap-1.5 text-xs text-neutral-400'>
          <motion.span
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className='bg-primary-500 h-1.5 w-1.5 rounded-full'
          />
          {t('walletDeviceName')}
        </span>
      </div>
    )
  }

  const keyContent = () => {
    switch (stepDef.id) {
      case 'pairing':
        return (
          <div className='flex h-full flex-col items-center justify-center gap-3 text-center'>
            <div className='relative flex h-32 w-32 items-center justify-center rounded-xl border-2 border-dashed border-green-400/70'>
              <motion.div
                className='absolute inset-x-2 top-2 h-0.5 bg-green-400'
                animate={{ top: ['8px', '112px', '8px'] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <ScanLine className='h-9 w-9 text-green-500' />
            </div>
            <p className='text-xs text-neutral-500 dark:text-neutral-400'>{t('keyScanningHint')}</p>
            <button className='rounded-lg bg-green-500 px-4 py-2 text-xs font-semibold text-white'>
              {t('keyScanCta')}
            </button>
          </div>
        )

      case 'sync':
        return (
          <div className='flex h-full flex-col'>
            <div className='mb-2 rounded-lg bg-green-50 p-2 text-center dark:bg-green-500/10'>
              <p className='text-xs font-semibold text-green-700 dark:text-green-300'>
                {t('syncTitle')}
              </p>
            </div>
            <p className='mb-3 text-[10px] leading-tight text-neutral-500 dark:text-neutral-400'>
              {t('syncSubtitle')}
            </p>
            <div className='mb-3 space-y-1.5'>
              <span className='text-[11px] text-neutral-500 dark:text-neutral-400'>
                {t('syncChainsRow')}
              </span>
              <div className='flex flex-wrap gap-1.5'>
                <span
                  className='inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium text-white'
                  style={{ background: CHAINS[0].color }}
                >
                  {CHAINS[0].symbol} {t(CHAINS[0].nameKey)}
                </span>
                {CHAINS.slice(1)
                  .filter(c => selectedChains.has(c.id))
                  .map(c => (
                    <span
                      key={c.id}
                      className='inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium text-white'
                      style={{ background: c.color }}
                    >
                      {c.symbol} {t(c.nameKey)}
                    </span>
                  ))}
              </div>
            </div>
            <div className='mt-auto'>
              <SlideToApprove
                testId='sync-slider'
                label={t('slideToApprove')}
                doneLabel={t('slideApproved')}
                accent='#22C55E'
                onApprove={() => setTimeout(goNext, 700)}
              />
            </div>
          </div>
        )

      case 'verify':
        return (
          <div className='flex h-full flex-col'>
            <div className='mb-2 flex items-center gap-2'>
              <ShieldCheck className='h-4 w-4 text-green-500' />
              <span className='text-xs font-semibold text-neutral-800 dark:text-neutral-100'>
                {t('verifyKeyHeading')}
              </span>
            </div>
            <div className='flex flex-1 flex-col justify-center gap-3'>
              <VerifyWords matched={verified} />
              <VaultAddressPreview label={t('verifyVaultLabel')} matched={verified} />
            </div>
            <button
              data-testid='verify-match'
              onClick={() => {
                setVerified(true)
                setTimeout(goNext, 1100)
              }}
              disabled={verified}
              className='mt-auto flex w-full items-center justify-center gap-1.5 rounded-lg bg-green-500 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-400 disabled:opacity-70'
            >
              {verified ? (
                <>
                  <Check className='h-4 w-4' /> {t('verifyMatchedLabel')}
                </>
              ) : (
                t('verifyMatchCta')
              )}
            </button>
          </div>
        )

      case 'approve':
        return (
          <div className='flex h-full flex-col'>
            <div className='mb-2 rounded-lg bg-green-50 p-2 text-center dark:bg-green-500/10'>
              <p className='text-xs font-semibold text-green-700 dark:text-green-300'>
                {t('approveTitle')}
              </p>
            </div>
            <p className='mb-2 rounded-md bg-neutral-100 px-2 py-1.5 text-[10px] leading-tight text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400'>
              {t('decodeNotice')}
            </p>
            <div className='space-y-1.5 text-sm'>
              <div className='rounded-lg bg-neutral-50 p-2 dark:bg-neutral-800'>
                <div className='text-[10px] text-neutral-500 dark:text-neutral-400'>
                  {t('decodeSending')}
                </div>
                <div className='text-sm font-semibold text-neutral-900 dark:text-white'>
                  {DEMO_AMOUNT} BTC
                </div>
              </div>
              <div className='rounded-lg bg-neutral-50 p-2 dark:bg-neutral-800'>
                <div className='text-[10px] text-neutral-500 dark:text-neutral-400'>
                  {t('decodeTo')}
                </div>
                <div className='font-mono text-[10px] break-all text-neutral-800 dark:text-neutral-100'>
                  {DEMO_RECIPIENT}
                </div>
              </div>
              <div className='flex gap-1.5'>
                <div className='flex-1 rounded-lg bg-neutral-50 p-2 dark:bg-neutral-800'>
                  <div className='text-[10px] text-neutral-500 dark:text-neutral-400'>
                    {t('decodeNetwork')}
                  </div>
                  <div className='text-[11px] font-medium text-neutral-800 dark:text-neutral-100'>
                    {t('chainBitcoin')}
                  </div>
                </div>
                <div className='flex-1 rounded-lg bg-neutral-50 p-2 dark:bg-neutral-800'>
                  <div className='text-[10px] text-neutral-500 dark:text-neutral-400'>
                    {t('decodeFee')}
                  </div>
                  <div className='text-[11px] font-medium text-neutral-800 dark:text-neutral-100'>
                    {DEMO_FEE} BTC
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-auto pt-3'>
              <SlideToApprove
                testId='approve-slider'
                label={t('slideToApprove')}
                doneLabel={t('slideApproved')}
                accent='#22C55E'
                onApprove={() => setTimeout(goNext, 700)}
              />
            </div>
          </div>
        )

      case 'done':
        return (
          <div className='flex h-full flex-col items-center justify-center gap-3 text-center'>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              className='flex h-14 w-14 items-center justify-center rounded-full bg-green-100 dark:bg-green-500/20'
            >
              <Check className='h-7 w-7 text-green-600 dark:text-green-400' />
            </motion.div>
            <p className='text-sm font-semibold text-green-700 dark:text-green-300'>
              {t('slideApproved')}
            </p>
            <p className='text-[11px] text-neutral-500 dark:text-neutral-400'>
              {t('doneSubtitle')}
            </p>
          </div>
        )

      // idle phone: waiting to pair (create phase) or waiting for a payment (send phase)
      default:
        return (
          <div className='flex h-full flex-col items-center justify-center gap-4 text-center'>
            <div className='relative'>
              <div className='flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100 dark:bg-neutral-800'>
                <Image
                  src={isDark ? '/ssp-logo-white.svg' : '/ssp-logo-black.svg'}
                  alt='SSP'
                  width={30}
                  height={30}
                />
              </div>
            </div>
            <p className='text-xs font-medium text-neutral-500 dark:text-neutral-400'>
              {t('keyDeviceName')}
            </p>
            <p className='max-w-[190px] text-xs text-neutral-400'>
              {act === 'send' ? t('keyWaitingTx') : t('statusWaitingToPair')}
            </p>
            <div className='flex gap-1'>
              {[0, 1, 2].map(i => (
                <motion.span
                  key={i}
                  className='h-1.5 w-1.5 rounded-full bg-neutral-300 dark:bg-neutral-600'
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          </div>
        )
    }
  }

  const walletActive = stepDef.active === 'wallet' || stepDef.active === 'both'
  const keyActive = stepDef.active === 'key' || stepDef.active === 'both'
  const relayActive = ['pairing', 'sync', 'verify', 'approve'].includes(stepDef.id)

  // Verify is the peak security moment: before the match the phone holds the
  // one actionable control, so the wallet sits in a passive 'Compare' state and
  // only the phone reads 'Your turn'. Once matched, both resolve (Verified /
  // Matched). The finale resolves to Sent / Approved — never a lingering turn.
  const walletStatus =
    stepDef.id === 'done' ? (
      <StatusChip label={t('statusSent')} tone='good' />
    ) : stepDef.id === 'verify' ? (
      verified ? (
        <StatusChip label={t('statusVerified')} tone='good' />
      ) : (
        <StatusChip label={t('statusCompare')} tone='pending' />
      )
    ) : walletActive ? (
      <StatusChip label={t('statusYourTurn')} tone='active' />
    ) : (
      <StatusChip label={t('statusWaiting')} tone='idle' />
    )
  const keyStatus =
    stepDef.id === 'done' ? (
      <StatusChip label={t('statusApproved')} tone='good' />
    ) : stepDef.id === 'pairing' ? (
      <StatusChip label={t('statusReadyToScan')} tone='active' />
    ) : stepDef.id === 'verify' ? (
      verified ? (
        <StatusChip label={t('statusMatched')} tone='good' />
      ) : (
        <StatusChip label={t('statusYourTurn')} tone='active' />
      )
    ) : keyActive ? (
      <StatusChip label={t('statusYourTurn')} tone='active' />
    ) : verified ? (
      <StatusChip label={t('statusPaired')} tone='good' />
    ) : (
      <StatusChip label={t('statusWaitingToPair')} tone='idle' />
    )

  const capBase = `caption${stepDef.id.charAt(0).toUpperCase()}${stepDef.id.slice(1)}`
  const captionTitleKey = `${capBase}Title`
  const captionBodyKey = `${capBase}Body`
  const isVerify = stepDef.id === 'verify'
  const isLast = step === STEPS.length - 1
  const currentActIndex = ACTS.findIndex(x => x.id === act)

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 backdrop-blur-md sm:p-6'
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.96, opacity: 0, y: 12 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          onClick={e => e.stopPropagation()}
          className='flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-neutral-50 shadow-2xl dark:bg-neutral-950'
        >
          {/* Header */}
          <div className='relative border-b border-black/5 bg-white px-5 py-4 dark:border-white/10 dark:bg-neutral-900'>
            <div className='flex items-start justify-between gap-3'>
              <div className='flex items-center gap-3'>
                <div className='bg-primary-400 flex h-9 w-9 items-center justify-center rounded-xl'>
                  <Image src='/ssp-logo-black.svg' alt='SSP' width={20} height={20} />
                </div>
                <div>
                  <h2 className='text-base leading-tight font-bold text-neutral-900 sm:text-lg dark:text-white'>
                    {t('modalTitle')}
                  </h2>
                  <p className='hidden text-xs text-neutral-500 sm:block dark:text-neutral-400'>
                    {t('modalSubtitle')}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label={t('closeDemo')}
                className='flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800'
              >
                <X className='h-5 w-5' />
              </button>
            </div>

            {/* Phase stepper. A connector fills 100% only for a phase that is
                fully done; the connector leaving the CURRENT phase fills to the
                fraction of steps completed within it — so the fill never runs
                past an inactive node, and each phase's own progress lives under
                its label as local dots. */}
            <div className='mt-4 flex items-start'>
              {ACTS.map((a, i) => {
                const state =
                  i < currentActIndex ? 'done' : i === currentActIndex ? 'current' : 'todo'
                const phaseSteps = countedInAct(a.id)
                // Only a fully-completed phase fills its connector, so fill
                // never reaches a node that is still inactive.
                const connectorFill = i < currentActIndex ? '100%' : '0%'
                return (
                  <Fragment key={a.id}>
                    <div className='flex items-start gap-2'>
                      <span
                        className={`mt-px flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                          state === 'current'
                            ? 'bg-primary-400 text-black'
                            : state === 'done'
                              ? 'bg-primary-100 text-primary-700 dark:bg-primary-400/20 dark:text-primary-300'
                              : 'bg-neutral-200 text-neutral-400 dark:bg-neutral-800'
                        }`}
                      >
                        {state === 'done' ? <Check className='h-3.5 w-3.5' /> : i + 1}
                      </span>
                      <div className='leading-tight'>
                        <div
                          className={`text-xs font-semibold ${state === 'todo' ? 'text-neutral-400' : 'text-neutral-800 dark:text-neutral-100'}`}
                        >
                          {t(a.titleKey)}
                        </div>
                        <div className='hidden text-[10px] text-neutral-400 sm:block'>
                          {t(a.subtitleKey)}
                        </div>
                        {state === 'current' && (
                          <div className='mt-1.5 flex gap-1'>
                            {phaseSteps.map((_, di) => (
                              <span
                                key={di}
                                className={`h-1 w-4 rounded-full transition-colors ${di <= indexInAct ? 'bg-primary-400' : 'bg-neutral-200 dark:bg-neutral-700'}`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    {i < ACTS.length - 1 && (
                      <div className='mx-2 mt-3 h-0.5 flex-1 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800'>
                        <motion.div
                          className='bg-primary-400 h-full rounded-full'
                          initial={false}
                          animate={{ width: connectorFill }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>
                    )}
                  </Fragment>
                )
              })}
            </div>
          </div>

          {/* Body */}
          <div className='flex-1 overflow-y-auto px-4 py-5 sm:px-6'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={stepDef.id}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.28 }}
              >
                {/* Stage */}
                <div className='flex flex-col items-center justify-center gap-3 lg:flex-row lg:items-stretch lg:gap-2'>
                  <DeviceShell
                    kind='wallet'
                    active={walletActive}
                    title={t('walletDeviceTag')}
                    status={walletStatus}
                    isDark={isDark}
                  >
                    {walletContent()}
                  </DeviceShell>

                  <div className='flex items-center justify-center py-1 lg:px-1'>
                    <RelayLink
                      label={t('relayLabel')}
                      active={relayActive}
                      matched={isVerify && verified}
                    />
                  </div>

                  <DeviceShell
                    kind='key'
                    active={keyActive}
                    title={t('keyDeviceTag')}
                    status={keyStatus}
                    isDark={isDark}
                  >
                    {keyContent()}
                  </DeviceShell>
                </div>

                {/* Caption */}
                <motion.div
                  key={`cap-${stepDef.id}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 }}
                  className={`mx-auto mt-5 max-w-xl rounded-2xl border p-4 text-center transition-colors ${
                    isVerify && verified
                      ? 'border-green-300 bg-green-50 dark:border-green-500/40 dark:bg-green-500/10'
                      : isVerify
                        ? 'border-primary-300 bg-primary-50 dark:border-primary-400/40 dark:bg-primary-400/10'
                        : 'border-black/5 bg-white dark:border-white/10 dark:bg-neutral-900'
                  }`}
                >
                  <h3 className='flex items-center justify-center gap-1.5 text-sm font-bold text-neutral-900 dark:text-white'>
                    {isVerify &&
                      (verified ? (
                        <Check className='h-4 w-4 text-green-500' />
                      ) : (
                        <Sparkles className='text-primary-500 h-4 w-4' />
                      ))}
                    {t(captionTitleKey)}
                  </h3>
                  <p className='mt-1 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400'>
                    {t(captionBodyKey)}
                  </p>
                </motion.div>

                {/* Why-safe rail on the final screen */}
                {stepDef.id === 'done' && (
                  <div className='mx-auto mt-4 max-w-xl'>
                    <p className='mb-2 text-center text-xs font-semibold text-neutral-500 dark:text-neutral-400'>
                      {t('whyTitle')}
                    </p>
                    <div className='grid grid-cols-2 gap-2 sm:grid-cols-4'>
                      {[
                        t('whyTwoDevices'),
                        t('whyTwoSeeds'),
                        t('whyMultisig'),
                        t('whyNoCustody'),
                      ].map(item => (
                        <div
                          key={item}
                          className='flex items-center gap-1.5 rounded-xl border border-black/5 bg-white px-2.5 py-2 text-[11px] font-medium text-neutral-700 dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-200'
                        >
                          <ShieldCheck className='h-3.5 w-3.5 flex-shrink-0 text-green-500' />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className='flex items-center justify-between border-t border-black/5 bg-white px-4 py-3 sm:px-6 dark:border-white/10 dark:bg-neutral-900'>
            <button
              onClick={goPrev}
              disabled={step === 0}
              data-testid='demo-back'
              className='flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900 disabled:opacity-30 dark:hover:text-white'
            >
              <ChevronLeft className='h-4 w-4' /> {t('previous')}
            </button>

            <span className='hidden text-xs text-neutral-400 sm:block'>
              {t('stepCounter', {
                phase: t(ACTS[currentActIndex].titleKey),
                current: indexInAct + 1,
                total: totalInAct,
              })}
            </span>

            {isLast ? (
              <div className='flex items-center gap-2'>
                <button
                  onClick={goSendAgain}
                  className='hidden items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 sm:flex dark:hover:text-white'
                >
                  <RotateCcw className='h-4 w-4' /> {t('sendAnother')}
                </button>
                <button
                  onClick={reset}
                  className='flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                >
                  <RotateCcw className='h-4 w-4' /> {t('restartDemo')}
                </button>
                <Link href='/download'>
                  <button
                    onClick={onClose}
                    className='bg-primary-400 hover:bg-primary-300 rounded-lg px-5 py-2 text-sm font-semibold text-black transition-colors'
                  >
                    {t('downloadSspWallet')}
                  </button>
                </Link>
              </div>
            ) : (
              <button
                onClick={goNext}
                data-testid='demo-next'
                className='bg-primary-400 hover:bg-primary-300 flex items-center gap-1 rounded-lg px-5 py-2 text-sm font-semibold text-black transition-colors'
              >
                {t('next')} <ChevronRight className='h-4 w-4' />
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
