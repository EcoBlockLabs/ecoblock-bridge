import { Fragment, useEffect } from 'react'

import { Menu, Transition } from '@headlessui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import setLanguage from 'next-translate/setLanguage'
import useTranslation from 'next-translate/useTranslation'
import { classNames } from 'src/util/classNames'
import { ChevronDownIcon } from '@heroicons/react/outline'
import Eng from '@/images/eng-logo.png'

const Languages: React.FC = () => {
  const router = useRouter()
  const { lang } = useTranslation()
  const { t } = useTranslation('home')
  const { pathname } = router
  const changeLanguage = (newLang: string) => {
    router.push(pathname, pathname, { locale: newLang })
  }

  useEffect(() => {
    setLanguage(lang)
  }, [lang])

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full items-center justify-center gap-x-1.5 rounded-md px-3 py-2">
          <Image src={Eng} alt="english" width={24} height={24} />
          <ChevronDownIcon className="ml-1 h-4 w-4 shrink-0 grow-0 text-white" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="menu-translate font-Inter absolute left-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white font-normal shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    lang === 'en'
                      ? 'bg-cyan-300'
                      : active
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-700',
                    'block flex w-full items-center gap-2 px-4 py-2 text-sm'
                  )}
                  onClick={() => changeLanguage('en')}
                >
                  <Image src={Eng} alt="eng" width={24} height={24} />
                  English
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    lang === 'cn'
                      ? 'bg-cyan-300'
                      : active
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-700',
                    'block flex w-full items-center gap-2 px-4 py-2 text-sm'
                  )}
                  onClick={() => changeLanguage('cn')}
                >
                  <Image src="/images/cn.png" alt="cn" width={24} height={24} />
                  中國人
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default Languages
