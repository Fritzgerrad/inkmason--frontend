'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { pageRouters } from '../../constants/route.constants'
import { RxHamburgerMenu } from "react-icons/rx";
import { FaArrowLeft } from "react-icons/fa";


export default function Header() {
  const linkClassStyle = "m-5 text-sm font-light text-orange uppercase hover:text-orange-300";
  const [show, setShow] = useState(false);
  const toggleShow = ()=>setShow(!show);
  return (
    <div className=''>
    <div className='sm:flex justify-between font-M hidden bg-black'>
      <div className='lg:w-10/12'>
        <div className='flex justify-center text-white'>
            <Link className={linkClassStyle} href={pageRouters.home}>Home</Link>
            <Link className={linkClassStyle} href={pageRouters.artists}>Artists</Link>
            <Link className={linkClassStyle} href={pageRouters.booking}>Book</Link>
            <Link className={linkClassStyle} href={pageRouters.gallery}>Gallery</Link>
            <Link className={linkClassStyle} href={pageRouters.contact}>Store</Link>
        </div>
      </div>
        
        <div className='flex'>
            <Link href={pageRouters.login} className='m-2 font-bold p-2 hover:text-primary'>
              Login
            </Link>
            <Link href={pageRouters.register} className='m-2 bg-primary p-2 text-center text-white shadow rounded hover:text-gray-600'>
              Sign Up
            </Link>
        </div>
    </div>
    <div className='flex sm:hidden bg-black'>
      <div className='text-5xl p-3 text-primary'>
          <button onClick={toggleShow} className="transition-transform duration-500 animate">
            {!show ? (
              <RxHamburgerMenu className={`${show ? 'rotate-180' : 'rotate-0'}`} />
            ) : (
              <FaArrowLeft className={`${show ? 'rotate-0' : 'rotate-180'}`} />
            )}
          </button>
      </div>
      <h1 className='text-5xl text-white font-extrabold tracking-tighter mt-3' >INKHMASON</h1>
      
    </div>
    {show &&(
      <div className='w-1/2 fixed h-full'>
        <div className='flex flex-col justify-center text-white bg-black'>
            <Link className={linkClassStyle} href={pageRouters.home}>Home</Link>
            <Link className={linkClassStyle} href={pageRouters.artists}>Artists</Link>
            <Link className={linkClassStyle} href={pageRouters.booking}>Book</Link>
            <Link className={linkClassStyle} href={pageRouters.gallery}>Gallery</Link>
            <Link className={linkClassStyle} href={pageRouters.contact}>Store</Link>
        </div>
      </div>
    )}
    </div>

  )
}
