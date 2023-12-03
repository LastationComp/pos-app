'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import ButtonLogout from './buttonlogout';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
    const path = usePathname()
    const getUpdatePage = () => {
        const dashboard = '/dashboard/'
        if (path == dashboard + 'members') return 'Members'
        if (path == dashboard + 'products') return "Products"
        return 'Dashboard'
    }
  return (
    <nav className="bg-gray-300 border-gray-200 dark:bg-gray-900 w-auto p-4">
      <div className=" flex items-center justify-between">
        <ul className="text-gray-600 text-lg flex gap-3">
          <li className='block'>
            <Link href={'/dashboard'} className='my-auto'>
              <svg width="30" height="30" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M43.7839 54.579L78.775 98.4332C79.6625 99.5013 80.9969 99.995 82.5957 99.995H95.5624C98.0487 99.995 100 98.4332 100 96.4433V3.54585C100 0.205776 94.763 -1.28542 92.006 1.34432L43.7839 50.317C42.7201 51.4555 42.7201 53.2289 43.7839 54.579ZM4.44326 100H27.5315C30.0178 100 31.9691 98.4383 31.9691 96.4483V72.8461C31.9691 69.5061 26.7321 68.0149 23.9751 70.6446L0.886871 94.2418C-1.32879 96.6599 0.88687 100 4.44326 100Z"
                  fill="#5C5CFF"
                />
              </svg>
            </Link>
          </li>
          <li className="">{getUpdatePage()}</li>
        </ul>
        <ul className="">
          <li className="">
            <ButtonLogout />
          </li>
        </ul>
      </div>
    </nav>
  );
}
