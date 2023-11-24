"use client"
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";

export default function Test() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  const router = useRouter()

  const handleSubmit = async (e:any) => {
    e.preventDefault()
    const addData = await fetch('/api/customers/',{
      method: 'POST',
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify({
        name: name,
        phone: phone,
        email: email
      })
  })
    const {success,customer} = await addData.json()
    if(success){
      Swal.fire({
        title: "Success!",
        html: `Nama: ${name}
               <br>
               Phone: ${phone}
               <br>
               Email: ${email}`,
        icon: "success",
        confirmButtonText: "Okay",
      }).then(() => {
        router.push('/dashboard/members')
      });
    }
    
  }
  return (
    <div className="flex justify-center bg-gray-300 h-screen max-w-full">
      <div className="block w-[700px] p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-[400px] mt-[70px] drop-shadow-xl">
        <h5 className="mb-2 text-2xl font-bold tracking-tight dark:text-white font-poppins text-blue-700">
          Tambah Member
        </h5>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-3 mb-6 p-2 mt-6">
            <div className="col-span-2">
              <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">
                Your Name
              </label>
              <input
                type="text"
                id="first_name"
                className="bg-white border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-0 placeholder:font-sans"
                placeholder="Masukkan Nama Member Baru"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>
            <div className="col-span-1">
              <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">
                Phone
              </label>
              <input
                type="text"
                id="first_name"
                className="bg-white border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-0 placeholder:font-sans"
                placeholder="Masukkan Telephone"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                required
              />
            </div>
            <div className="col-span-1">
              <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">
                Email
              </label>
              <input
                type="text"
                id="first_name"
                className="bg-white border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-0 placeholder:font-sans"
                placeholder="Masukkan Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
          </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 drop-shadow-md"
          >
            Submit
          </button>
          <button
            onClick={() => router.push('/dashboard/members')}
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 drop-shadow-md"
          >
            Kembali
          </button>
        </div>
        </form>
      </div>
    </div>
  );
}
