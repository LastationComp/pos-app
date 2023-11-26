"use client"
import Image from 'next/image';
import logbag from '@/app/img/Login-background.png';
import dynamic from 'next/dynamic';
import loginimg from '@/app/img/logologin.png';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <>
      <section className="overflow-hidden bg-gradient-login">
        <Image alt="" src={logbag} tabIndex={-1} className="absolute w-screen h-screen top-0 z-1" />
        <div className={'container mx-auto relative'}>
          <div className="top-mid h-screen">
            <div className="grid grid-cols-2 text-white">
              <div className="flex my-auto flex-col gap-5 flex-wrap">
                <div className="flex justify-center">
                  <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M43.7839 54.579L78.775 98.4332C79.6625 99.5013 80.9969 99.995 82.5957 99.995H95.5624C98.0487 99.995 100 98.4332 100 96.4433V3.54585C100 0.205776 94.763 -1.28542 92.006 1.34432L43.7839 50.317C42.7201 51.4555 42.7201 53.2289 43.7839 54.579ZM4.44326 100H27.5315C30.0178 100 31.9691 98.4383 31.9691 96.4483V72.8461C31.9691 69.5061 26.7321 68.0149 23.9751 70.6446L0.886871 94.2418C-1.32879 96.6599 0.88687 100 4.44326 100Z"
                      fill="#5C5CFF"
                    />
                  </svg>
                </div>
                <div className="flex justify-center w-full mt-[50px]">
                  <input
                    type="text"
                    id="username"
                    className="bg-transparent border border-white text-white text-sm rounded-md focus:ring-blue-500 
            focus:border-blue-500 outline-0 block w-[300px] h-[50px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
            dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-white/80 focus:text-white transition hover:border-blue-500 delay-75"
                    placeholder="USERNAME"
                    required
                  />
                </div>
                <div className="flex justify-center w-full">
                  <input
                    type="password"
                    id="username"
                    className="bg-transparent border border-white text-white text-sm rounded-md focus:ring-blue-500 
            focus:border-blue-500 outline-0 block w-[300px] h-[50px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
            dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-white/80 transition hover:border-blue-500"
                    placeholder="PIN"
                    required
                  />
                </div>
                <div className="flex justify-center mt-[25px]">
                  <button
                    type="button"
                    onClick={() => router.push('/dashboard')}
                    className="py-2.5 px-5 me-2 mb-2 
               font-medium text-blue-600 focus:outline-none bg-white rounded-lg 
              border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 
              dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 
              dark:border-gray-600 dark:hover:text-white 
              dark:hover:bg-gray-700 w-[300px] h-[50px] text-lg"
                  >
                    L O G I N
                  </button>
                </div>
              </div>
              <div className="">
                <Image alt="" src={loginimg} className="w-[500px] " />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
