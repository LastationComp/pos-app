import RightBar from "./_component/rightBar";

export default function salesHistory() {
  return (
    <>
      <div className="grid grid-cols-1">
        <div className="mx-5">
          <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-10">
            <div className="flex flex-row flex-wrap">
              <div className="flex justify-start grow">
                <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
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
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className="block w-[300px] h-[45px] p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search"
                    required
                  />
                </div>
              </div>
              <div className="grow-0">
                <button
                  type="button"
                  className="flex justify-start   text-white text-poppins end-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 dark:bg-blue-600 dark:hover:bg-blue-600 dark:focus:ring-blue-600"
                >
                  <svg
                    className="my-auto mx-1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#ffffff"
                    height="1em"
                    viewBox="0 0 448 512"
                  >
                    <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                  </svg>
                  Transaksi
                </button>
              </div>
            </div>

            <div className="w-auto max-h-[500px] overflow-x-auto shadow-md sm:rounded-lg mt-10">
              <table className=" xl:w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-fixed w-full">
                <thead className="text-xs text-poppins text-gray-500 uppercase bg-white border-b border-white dark:text-white">
                  <tr>
                    <th scope="col" className="px-6 py-3 bg-white">
                      TANGGAL
                    </th>
                    <th scope="col" className="px-6 py-3">
                      NAMA
                    </th>
                    <th scope="col" className="px-6 py-3 bg-white">
                      NO TRANSAKSI
                    </th>
                    <th scope="col" className="px-6 py-3">
                      TOTAL HARGA
                    </th>
                    <th scope="col" className="px-6 py-3 bg-white">
                      AKSI
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-100 border-b text-gray-500 border-white">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium      whitespace-nowrap dark:text-blue-100"
                    >
                      Apple MacBook Pro 17"
                    </th>
                    <td className="px-6 py-4">Silver</td>
                    <td className="px-6 py-4 ">Laptop</td>
                    <td className="px-6 py-4">$2999</td>
                    <td className="px-6 py-4 ">
                      <button
                        type="button"
                        className="text-white w-[100px] flex justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5  py-1 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* <div className="flex justify-end">
            <RightBar />
        </div> */}
      </div>
    </>
  );
}
