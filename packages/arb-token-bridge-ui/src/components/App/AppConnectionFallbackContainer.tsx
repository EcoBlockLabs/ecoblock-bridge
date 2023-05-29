import Image, { ImageProps } from 'next/image'
import EcoBlockIntroImg from '@/images/ecoblock-intro.png'
import { ExternalLink } from '../common/ExternalLink'

export function AppConnectionFallbackContainer({
  layout = 'col',
  imgProps = {
    // className: 'sm:w-[420px]',
    src: EcoBlockIntroImg,
    alt: 'EcoBlock Intro Image',
    priority: true,
    style: { mixBlendMode: 'screen' }
  },
  children
}: {
  layout?: 'row' | 'col'
  imgProps?: ImageProps
  children: React.ReactNode
}) {
  return (
    <div className="my-24 flex items-center justify-center px-8">
      <div
        className={`flex flex-col items-center md:flex-${layout} md:items-${
          layout === 'col' ? 'center' : 'start'
        }`}
      >
        {children}
        <Image {...imgProps} />
      </div>
    </div>
  )
}
