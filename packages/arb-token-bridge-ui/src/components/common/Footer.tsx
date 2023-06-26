import Image from 'next/image'
import { ExternalLink } from './ExternalLink'
import useTranslation from 'next-translate/useTranslation'

type FooterLink = {
  title: string
  href: string
  lgOrder: number
}

const footerLinks: FooterLink[] = [
  {
    title: 'home_page',
    href: 'https://ecoblock.tech',
    lgOrder: 1
  },
  {
    title: 'block_explorer',
    href: 'https://ecoscan.io',
    lgOrder: 2
  },
  {
    title: 'documentation',
    href: 'https://docs.ecoblock.tech',
    lgOrder: 3
  }
]

export function Footer() {
  const { t } = useTranslation('home')
  return (
    <footer className="z-[1] flex justify-center">
      <div className="flex w-full max-w-[1440px] flex-col space-y-8 py-20 text-white lg:px-8 lg:py-8">
        <div className="flex flex-col items-center space-y-2 px-8 text-center lg:items-start lg:px-0">
          <span className="text-4xl">{t('optimistic')}</span>
          <ExternalLink
            href="https://docs.ecoblock.tech"
            className="text-2xl underline"
          >
            {t('learn_more')}
          </ExternalLink>
        </div>

        <div className="flex flex-col space-y-8">
          <ul className="grid text-center font-light lg:max-w-[448px] lg:grid-cols-3 lg:grid-rows-2 lg:text-left lg:font-normal">
            {footerLinks.map(link => (
              <li key={link.href} className={`lg:order-${link.lgOrder}`}>
                <ExternalLink href={link.href} className="arb-hover">
                  {t(link.title)}
                </ExternalLink>
              </li>
            ))}
          </ul>
          <div className="flex flex-row justify-center space-x-6 lg:hidden">
            <ExternalLink
              href="https://discord.com/#"
              className="arb-hover h-8 w-8"
            >
              <Image
                src="/icons/twitter.webp"
                alt="Discord"
                width={32}
                height={32}
              />
            </ExternalLink>
            <ExternalLink
              href="https://twitter.com/#"
              className="arb-hover h-8 w-8"
            >
              <Image
                src="/icons/discord.webp"
                alt="Twitter"
                width={32}
                height={32}
              />
            </ExternalLink>
          </div>
        </div>
      </div>
    </footer>
  )
}
