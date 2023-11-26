"use client";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import useSWR from "swr";
import Swal from "sweetalert2";
import Link from "next/link";

export default function Member() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, mutate } = useSWR("/api/customers", fetcher);

  const handleDelete = (id: string) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: false
      }).then(async (result) => {
        if(result.isConfirmed){
            const deleteData = await fetch(`/api/customers/${id}`, {
                method: "DELETE",
              });
          
              const { success, message } = await deleteData.json();
          
              if (success) {
                mutate({ ...data });
                Swal.fire({
                  title: "Success!",
                  text: message,
                  icon: "success",
                  confirmButtonText: "Okay",
                });
              }
            } else if (
                result.dismiss === Swal.DismissReason.cancel
              ) {
                Swal.fire({
                  title: "Cancelled",
                  text: "This action has been canceled",
                  icon: "error"
                });
              }
      } );
   
  };

  return (
    <div className="flex px-[120px] py-[30px]">
      <div className=" w-[900px] relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-[300px] p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-purple-700 focus:border-purple-700 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-700 dark:focus:border-purple-700 placeholder:font-sans outline-0 hover:border-purple-500 transition hover:border-1"
                placeholder="Search"
                required
              />
              <Link href='/dashboard/members/add'
                type="button"
                className="flex justify-start mx-2  text-white absolute end-2.5 bottom-2.5 bg-purple-500 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-2 py-2 dark:bg-purple-600 dark:hover:bg-purple-600 dark:focus:ring-purple-600"
              >
                <svg
                  className="mr-2 mt-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#ffffff"
                  height="1em"
                  viewBox="0 0 448 512"
                >
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                </svg>
                Member
              </Link>
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
                CUSTOMER CODE
              </th>
              <th scope="col" className="px-6 py-3">
                EMAIL
              </th>
              <th scope="col" className="px-6 py-3">
                PHONE
              </th>
              <th scope="col" className="px-6 py-3">
                POINT
              </th>
              <th scope="col" className="px-6 py-3">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {!data && (
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">

              </tr>
            )}
            {data?.customers.map((data: any, index: number) => (
              <tr
                key={data.id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {index + 1}
                </th>
                <td className="px-6 py-4">{data.name}</td>
                <td className="px-6 py-4">{data.customer_code}</td>
                <td className="px-6 py-4">{data.email}</td>
                <td className="px-6 py-4">{data.phone}</td>
                <td className="px-6 py-4">{data.point}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-3">
                    <div className="my-2 flex gap-3">
                      <Link className="mb-3" href={`/dashboard/members/${data.id}/edit`}>
                      <FontAwesomeIcon
                        className="hover:cursor-pointer"
                        icon={faPencil}
                        size="xl"
                      />
                      </Link>
                      <button
                        className="mb-3"
                        onClick={() => handleDelete(data.id)}
                      >
                        <FontAwesomeIcon
                          className="hover:cursor-pointer"
                          icon={faTrash}
                          size="xl"
                          style={{ color: "#7d7f82" }}
                        />
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
        {!data && 
        <div className="flex justify-center my-2"> 
            <span className="loading loading-dots loading-lg"></span>
        </div>
        }
      </div>
    </div>
  );
}
