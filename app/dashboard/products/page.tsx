"use client"
import React from 'react'
import useSWR from 'swr'

export default function Product() {
    const fetcher = (url:string) => fetch(url).then(res => res.json()) 
    const {data} = useSWR("/api/products", fetcher)
  return (
    <div className='flex px-[120px] py-[30px]'>
        <div className='flex-col w-[300px]'>  
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="flex mb-[20px] relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 placeholder:font-sans outline-none hover:border-purple-500 transition" placeholder="Cari produk" required/>
                </div>  
            <div className="w-[900px] relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                PILIH
                            </th>
                            <th scope="col" className="px-6 py-3">
                                PRODUK
                            </th>
                            <th scope="col" className="px-6 py-3">
                                KODE
                            </th>
                            <th scope="col" className="px-6 py-3">
                                STOK
                            </th>
                            <th scope="col" className="px-6 py-3">
                                SATUAN
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.products.map((data: any) => (
                        <tr key={data.barcode} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <div className="flex items-center px-1">
                                <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            </div>
                            </th>
                            <td className="px-6 py-4">
                                {data.product_name}
                            </td>
                            <td className="px-6 py-4">
                                {data.barcode}
                            </td>
                            <td className="px-6 py-4">
                                <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">{data.stock}</span>
                            </td>
                            <td className="px-6 py-4">
                                {data.smallest_selling_unit}
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    
  )
}
