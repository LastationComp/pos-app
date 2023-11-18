'use client';

import { useRouter } from 'next/navigation';

export default function ButtonLogout() {
  const router = useRouter();

  return (
    <>
      <button
        type="button"
        className="text-white bg-gradient-to-br from-purple-600/70 to-blue-500/70 
              hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 
              font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        onClick={() => router.push('/')}
      >
        Logout
      </button>
    </>
  );
}
