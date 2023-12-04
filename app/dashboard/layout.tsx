'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import Image from 'next/image';
import Link from 'next/link';
import ButtonLogout from '@/app/_components/buttonlogout';
import { faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { usePathname } from 'next/navigation';
import Navbar from '@/app/_components/Navbar';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const logo = 'https://flowbite.com/docs/images/logo.svg';
  const pathname = usePathname()

  const getClassCondition = (condition: string, execute: string, option: string = '') => {
    if (pathname == '/dashboard/' +  condition) return execute
    return option
  }

  const generateLink = (link: string, name: string, icon: IconDefinition) => {
    return (
      <>
        <Link href={'/dashboard/' + link} className={'flex items-center gap-3 p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group ' + getClassCondition(link, 'dark:bg-gray-700 bg-gray-100')}>
          <FontAwesomeIcon
            icon={icon}
            className={'w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white ' + getClassCondition(link, 'dark:text-white text-gray-900')}
            size="lg"
          />
          <div className={'hidden xl:block dark:text-gray-400 dark:group-hover:text-white ' + getClassCondition(link, 'dark:text-white ')}>{name}</div>
        </Link>
      </>
    );
  }
  return (
    <>
      <div className="grid grid-cols-12 place-content-stretch">
        <div className="row-span-1 col-end-13 col-start-1">
          <Navbar />
        </div>
        <aside id="default-sidebar" className="z-40 h-screen hidden md:block transition-transform " aria-label="Sidebar">
          <div className="h-full px-3 py-4 bg-gray-50 dark:bg-gray-800">
            <ul className="space-y-5 font-medium">
              <li className="flex justify-center">{generateLink('products', 'Products', faCartShopping)}</li>
              <li className="flex justify-center">{generateLink('members', 'Members', faUser)}</li>
            </ul>
          </div>
        </aside>

        <div className="col-start-1 md:col-start-2 col-end-13">{children}</div>
        {/* <div className="row-start-2 row-end-13 col-start-11 col-end-13">
          tes
        </div> */}
      </div>
    </>
  );
}
