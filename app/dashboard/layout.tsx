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
        <Link href={'/dashboard/' + link} className={'flex items-center gap-3 p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group ' + getClassCondition(link, 'dark:bg-gray-700')}>
          <FontAwesomeIcon icon={icon} className={'w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white ' + getClassCondition(link, 'dark:text-white')} size="lg" />
          <div className={'hidden xl:block dark:text-gray-400 dark:group-hover:text-white ' + getClassCondition(link, 'dark:text-white')}>{name}</div>
        </Link>
      </>
    );
  }
  return (
    <>
      <div className="grid grid-cols-12 h-screen">
        <div className="row-span-3 hidden md:block">
          <aside id="default-sidebar" className=" z-40  h-screen transition-transform " aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
              <ul className="space-y-10 font-medium">
                <li className="flex justify-center">
                  <Link href={'/dashboard'}>
                    <svg width="30" height="30" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M43.7839 54.579L78.775 98.4332C79.6625 99.5013 80.9969 99.995 82.5957 99.995H95.5624C98.0487 99.995 100 98.4332 100 96.4433V3.54585C100 0.205776 94.763 -1.28542 92.006 1.34432L43.7839 50.317C42.7201 51.4555 42.7201 53.2289 43.7839 54.579ZM4.44326 100H27.5315C30.0178 100 31.9691 98.4383 31.9691 96.4483V72.8461C31.9691 69.5061 26.7321 68.0149 23.9751 70.6446L0.886871 94.2418C-1.32879 96.6599 0.88687 100 4.44326 100Z"
                        fill="#5C5CFF"
                      />
                    </svg>
                  </Link>
                </li>
                <li className="flex justify-center">{generateLink('products', 'Products', faCartShopping)}</li>
                <li className="flex justify-center">{generateLink('members', 'Members', faUser)}</li>
              </ul>
            </div>
          </aside>
        </div>
        <div className="row-span-1 col-end-13 col-start-1 md:col-start-2">
          <Navbar />
        </div>
        <div className="row-span-1 col-start-1 md:col-start-2 col-end-13">
          <div className="">{children}</div>
        </div>
        {/* <div className="row-start-2 row-end-13 col-start-11 col-end-13">
          tes
        </div> */}
      </div>
    </>
  );
}
