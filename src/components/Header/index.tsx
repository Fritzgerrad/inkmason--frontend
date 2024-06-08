import Link from 'next/link'
import React from 'react'
import { pageRouters } from '../../constants/route.constants'
export default function Header() {
    const linkClassStyle = "m-5 text-sm font-light text-orange uppercase hover:text-orange-300";
  return (
    <div className='flex justify-between bg-black font-M'>
      <div className='lg:w-10/12'>
        <div className='flex justify-center text-white'>
            <Link className={linkClassStyle} href={pageRouters.home}>Home</Link>
            <Link className={linkClassStyle} href={pageRouters.artists}>Artists</Link>
            <Link className={linkClassStyle} href={pageRouters.booking}>Book</Link>
            <Link className={linkClassStyle} href={pageRouters.gallery}>Gallery</Link>
            <Link className={linkClassStyle} href={pageRouters.contact}>Contact</Link>
        </div>
      </div>
        
        <div className='flex'>
            <Link href={pageRouters.login} className='m-2 font-bold p-2 hover:text-orange'>
              Login
            </Link>
            <Link href={pageRouters.register} className='m-2 bg-green-700 p-2 text-center shadow rounded hover:text-orange'>
              Sign Up
            </Link>
        </div>
    </div>
  )
}
