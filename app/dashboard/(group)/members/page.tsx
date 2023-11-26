'use client';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import useSWR from 'swr';
import Swal from 'sweetalert2';
import Link from 'next/link';

export default function Member() {
  const [paginate, setPaginate] = useState(100);
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1);
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, mutate } = useSWR(`/api/customers?paginate=${paginate}&page=${page}&q=${query}`, fetcher);

  const handleDelete = (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deleteData = await fetch(`/api/customers/${id}`, {
          method: 'DELETE',
        });

        const { success, message } = await deleteData.json();

        if (success) {
          mutate({ ...data });
          Swal.fire({
            title: 'Success!',
            text: message,
            icon: 'success',
            confirmButtonText: 'Okay',
          });
        }
      }
    });
  };
  return (
    <div className="flex flex-col p-5">
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
            className="block w-[300px] max-md:w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-purple-700 focus:border-purple-700 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-700 dark:focus:border-purple-700 placeholder:font-sans outline-0 hover:border-purple-500 transition hover:border-1"
            placeholder="Search"
            required
          />
        </div>
        <div className="relative my-auto">
          <Link
            href="/dashboard/members/add"
            type="button"
            className="flex mx-2 text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 dark:bg-blue-600 dark:hover:bg-blue-600 dark:focus:ring-blue-600"
          >
            <svg className="mr-2 mt-1" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" height="1em" viewBox="0 0 448 512">
              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
            </svg>
            Member
          </Link>
        </div>
      </div>
      <div className="w-auto max-h-[500px] overflow-x-auto shadow-md sm:rounded-lg">
        <table className={'xl:w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-fixed ' + !data && 'w-full'}>
          <thead className="text-xs w-full text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="text-center">
              <th scope="col" className="px-6 py-3 ">
                NO
              </th>
              <th scope="col" className="px-6 py-3">
                NAME
              </th>
              <th scope="col" className="px-6 py-3">
                CUSTOMER CODE
              </th>
              <th scope="col" className="px-6 py-3 ">
                EMAIL
              </th>
              <th scope="col" className="px-6 py-3 ">
                PHONE
              </th>
              <th scope="col" className="px-6 py-3 ">
                POINT
              </th>
              <th scope="col" className="px-6 py-3">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {!data && <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"></tr>}
            {data?.customers.map((customer: any, index: number) => (
              <tr key={customer.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 text-center border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {data?.paginate.start + index}
                </th>
                <td className="px-6 py-4">{customer.name}</td>
                <td className="px-6 py-4">{customer.customer_code}</td>
                <td className="px-6 py-4 ">{customer.email}</td>
                <td className="px-6 py-4 ">{customer.phone}</td>
                <td className="px-6 py-4 ">{customer.point}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-3 justify-center">
                    <div className="my-2 flex gap-3">
                      <FontAwesomeIcon className="hover:cursor-pointer" icon={faPencil} size="xl" />
                      <button className="mb-3" onClick={() => handleDelete(customer.id)}>
                        <FontAwesomeIcon className="hover:cursor-pointer" icon={faTrash} size="xl" style={{ color: '#7d7f82' }} />
                      </button>
                    </div>
                    <a
                      href="#"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Pilih
                    </a>
                  </div>
                </td>
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
            value={paginate}
            className="w-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected value={10}>
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
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
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
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
