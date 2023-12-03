'use client';
import TransactionDetail from '@/app/_components/TransactionDetail';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useState } from 'react';
import useSWR from 'swr';

export default function Product() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [paginate, setPaginate] = useState(100);
  const [transaction, setTransaction]: any[] = useState([]);
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data } = useSWR(`/api/products?paginate=${paginate}&page=${page}&q=${query}`, fetcher, {
    revalidateOnMount: true
  });

  const getCheckedData = (barcode: string): boolean => {
      const checked = transaction.filter((data: any) => data.barcode === barcode)

      return (checked.length !== 0) ?? false
  }
  return (
    <>
      <div className="grid grid-cols-12">
        <div className="flex flex-col col-span-12 md:max-xl:col-span-8 xl:col-span-9 p-5">
          <div className="flex justify-between p-5 w-auto text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            <div className="relative ">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                defaultValue={query}
                className="block w-[300px] max-md:w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-purple-700 focus:border-purple-700 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-700 dark:focus:border-purple-700 placeholder:font-sans outline-0 hover:border-purple-500 transition hover:border-1"
                placeholder="Search"
                required
              />
            </div>
          </div>
          <div className="w-auto max-h-[500px] overflow-x-auto shadow-md sm:rounded-lg">
            <table className={'xl:w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-fixed ' + !data && 'w-full'}>
              <thead className="text-xs w-full text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    PILIH
                  </th>
                  <th scope="col" className="px-6 py-3">
                    PRODUK
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Barcode
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
                {!data && <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"></tr>}
                {data?.products.map((data: any, i: number) => (
                  <tr key={data.barcode} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 text-center">
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <div className="flex items-center justify-center px-1">
                        <input
                          id={String(i)}
                          onChange={(e) => {
                            if (e.target.checked) return setTransaction([...transaction, data])

                            const result = transaction.filter((trx: any) => trx.barcode !== data.barcode)
                            return setTransaction(result)
                          }}
                          type="checkbox"
                          checked={getCheckedData(data.barcode)}
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">{data.product_name}</td>
                    <td className="px-6 py-4">{data.barcode}</td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">{data.stock}</span>
                    </td>
                    <td className="px-6 py-4">{data.smallest_selling_unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!data && (
              <div className="flex justify-center my-2 p-[200px] w-full">
                <span className="loading loading-dots loading-lg"></span>
              </div>
            )}
          </div>
          <div className="flex w-full justify-between gap-3 py-3 bg-white dark:text-white dark:bg-gray-800 flex-col md:flex-row">
            <div className="my-auto mx-3 text-gray-400 flex justify-center gap-3">
              <label className="block text-sm font-medium text-gray-900 dark:text-white my-auto">Rows per Page</label>
              <select
                id="countries"
                onChange={(e) => {
                  setPaginate(Number(e.target.value));
                  setPage(1);
                }}
                defaultValue={paginate}
                className="w-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value={10}>
                  10
                </option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={200}>200</option>
              </select>
            </div>
            <div className="flex justify-center">
              <span className="text-sm text-gray-700 dark:text-gray-400 my-auto">
                Showing <span className="font-semibold text-gray-900 dark:text-white">{data?.paginate.start}</span> to <span className="font-semibold text-gray-900 dark:text-white">{data?.paginate.end}</span> of{' '}
                <span className="font-semibold text-gray-900 dark:text-white">{data?.total_data}</span> Entries
              </span>
              <div className="inline-flex xs:mt-0 my-auto mx-3">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page == 1}
                  className={` flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                >
                  <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                  </svg>
                  Prev
                </button>
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={true}
                  className={` flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400  dark:text-white`}
                >
                  {page}
                </button>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page >= data?.total_page}
                  className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                  <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <section className="bg-gray-50 dark:bg-gray-800 col-start-9 xl:col-start-10 col-end-13 h-screen hidden md:block p-5">
          <TransactionDetail trx={transaction} setTrx={setTransaction} />
        </section>

        {/* <div className='flex-col w-[300px]'>  
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
        </div> */}
      </div>
    </>
  );
}
