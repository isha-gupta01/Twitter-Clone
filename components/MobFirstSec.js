import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const MobFirstSec = () => {
    return (
        <div className="fixed bottom-0 w-full bg-black z-10 h-18 overflow-hidden">
            {/* Thin top border line */}
            <div className="w-full bg-gray-500 opacity-30 h-[1px]"></div>

            <div className="flex items-center justify-start px-3 py-3 gap-8 sm:gap-10  whitespace-nowrap">
                {/* Twitter Logo */}
                <Link href="/Twitter" className="shrink-0 invert">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-6 h-6">
                        <g>
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                        </g>
                    </svg>
                </Link>

                {/* Nav Icons */}
                <Link href="/Twitter" className="shrink-0">
                    <Image src="/home.png" alt="home" width={28} height={28} />
                </Link>

                <Link href="/searchBar" className="shrink-0">
                    <Image src="/search.png" alt="search" width={28} height={28} />
                </Link>

                <Link href="/saved" className="shrink-0">
                    <Image src="/bookmark.png" alt="chat" width={28} height={28} />
                </Link>

                <Link href="/ProfilePage" className="shrink-0">
                    <Image src="/person.png" alt="person" width={28} height={28} />
                </Link>
            </div>
        </div>
    )
}

export default MobFirstSec
