// import Link from 'next/link';
// import Image from 'next/image';

// export default function NotFound() {
//   return (
//     <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
//       <div className="text-center">
//         <Image src="/assets/blogs/blog-2.png" alt="Event Not Found" width={700} height={500} />
//         <p className="text-base font-semibold text-blue-600 dark:text-blue-500">404</p>
//         <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
//           Page not found
//         </h1>
//         <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-400">
//           Sorry, we couldn&apos;t find the page you&apos;re looking for.
//         </p>
//         <div className="mt-10 flex items-center justify-center gap-x-6">
//           <Link
//             href="/"
//             className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
//           >
//             Go back home
//           </Link>
//           <Link href="/support" className="text-sm font-semibold text-gray-900 dark:text-gray-100">
//             Contact support <span aria-hidden="true">&rarr;</span>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }



import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpLeft, Home, Mail } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="notfound-page">
      <div className="notfound-card">
        {/* <div className="notfound-badge">404</div> */}

        <Image
          src="/assets/404.png"
          alt="Page Not Found"
          width={300}
          height={300}
          className="notfound-image"
          priority
        />

        <h1 className="notfound-title">
          Oops! Page Not Found
        </h1>

        <p className="notfound-description">
          This page is unavailable or has been removed.
        </p>

        <div className="notfound-actions">
          <Link href="/" className="notfound-btn-primary">
            <Home size={18} />
            Back to Home
          </Link>

          <Link href="/#contact-section" className="notfound-btn-secondary">
            <Mail size={18} />
            Contact Us
          </Link>
        </div>

        {/* <Link href="/" className="notfound-back">
          <ArrowUpLeft size={18} />
          Return to Homepage
        </Link> */}
      </div>
    </main>
  );
}
