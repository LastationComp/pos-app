import React from 'react'

export default function Member() {
  return (
    <div className='flex px-[120px] py-[30px]'>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="search" id="default-search" className="block w-[300px] p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-purple-700 focus:border-purple-700 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-700 dark:focus:border-purple-700 placeholder:font-sans outline-0 hover:border-purple-500 transition hover:border-1" placeholder="Search Mockups, Logos..." required />
                        <button type="button" className="flex justify-start mx-2  text-white absolute end-2.5 bottom-2.5 bg-purple-500 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-2 py-2 dark:bg-purple-600 dark:hover:bg-purple-600 dark:focus:ring-purple-600">
                        <svg className='mr-2 mt-1' xmlns="http://www.w3.org/2000/svg" fill='#ffffff' height="1em" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
                        Member
                        </button>                      
                    </div>
                </caption>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            NO
                        </th>
                        <th scope="col" className="px-6 py-3">
                            NAME
                        </th>
                        <th scope="col" className="px-6 py-3">
                            KODE MEMBER
                        </th>
                        <th scope="col" className="px-6 py-3">
                            EMAIL
                        </th>
                        <th scope="col" className="px-6 py-3">
                            NO TELEPON
                        </th>
                        <th scope="col" className="px-6 py-3">
                            POINT
                        </th>
                        <th scope="col" className="px-6 py-3">
                            AKSI
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            1
                        </th>
                        <td className="px-6 py-4">
                            SUNARDI
                        </td>
                        <td className="px-6 py-4">
                            8864758764
                        </td>
                        <td className="px-6 py-4">
                            sunardi@gmail.com
                        </td>
                        <td className="px-6 py-4">
                            089518444882
                        </td>
                        <td className="px-6 py-4">
                            12
                        </td>
                        <td className="px-6 py-4">
                            <button type="button" className="flex justify-start mx-2  text-white absolute end-2.5 bottom-2.5 bg-purple-500 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-2 py-2 dark:bg-purple-600 dark:hover:bg-purple-600 dark:focus:ring-purple-600">
                                Member
                            </button>  
                        </td>
                    </tr>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            1
                        </th>
                        <td className="px-6 py-4">
                            SUNARDI
                        </td>
                        <td className="px-6 py-4">
                            8864758764
                        </td>
                        <td className="px-6 py-4">
                            sunardi@gmail.com
                        </td>
                        <td className="px-6 py-4">
                            089518444882
                        </td>
                        <td className="px-6 py-4">
                            12
                        </td>
                        <td className="px-6 py-4">
                            <button type="button" className="flex justify-start mx-2  text-white absolute end-2.5 bottom-2.5 bg-purple-500 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-2 py-2 dark:bg-purple-600 dark:hover:bg-purple-600 dark:focus:ring-purple-600">
                            Member
                            </button>    
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}
