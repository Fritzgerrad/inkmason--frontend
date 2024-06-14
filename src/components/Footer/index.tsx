import { pageRouters } from '@src/constants/route.constants';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaShoppingCart } from 'react-icons/fa';

const Footer = () => {
    // const socialMediaLogoClass = 'rounded-full bg-white m-3 text-black p-3 text-3xl';
    const socialMediaLogoClass = 'm-3 text-gray-600 text-3xl sm:text-xl';

    return ( 
        <footer className='text-white'>
            <div className='flex sm:justify-start justify-center'>
                <div className='w-4/5 md:w-1/2 sm:mx-4'>
                   <h1 className='text-center sm:text-left text-4xl font-D font-bold'>Join the Club</h1>
                    <p className='text-sm p-2'>Join our email list and get access to specials deals exclusive to our subscribers.</p>
                    <div className='flex border rounded sm:w-4/5'>
                        <input type="email" placeholder='Enter your email' className='w-4/5 p-2 border text-black' />
                        <button className='bg-primary border-l-2 sm:px-2 text-sm sm:text-lg p-1 sm:w-3/12'>
                            Sign Up
                        </button>
                    </div>
                </div>
                
            </div>
            <div className="flex justify-center sm:justify-start ">

                <div className='flex sm:w-3/5'>
                    <a className={socialMediaLogoClass} href='https://www.facebook.com/' target='_blank'>
                        <FaFacebookF />
                    </a>
                    <a className={socialMediaLogoClass} href='https://twitter.com/' target='_blank'>
                        <FaTwitter />
                    </a>
                    <a className={socialMediaLogoClass} href='https://www.instagram.com/inkhmasontattoos/' target='_blank'>
                        <FaInstagram />
                    </a>
                </div>
                        
            </div>
            <div className='flex justify-between text-xs m-2'>
                <div className='flex justify-between w-full mb-3 '>
                    <div className='flex flex-wrap text-sm'>
                        <Link className='mx-1' href=''>
                            Terms of use
                        </Link>
                        <p className='mx-1'>
                            |
                        </p>
                        <Link className='mx-1' href=''>
                            Privacy Policy
                        </Link>
                        <p className='mx-1'>
                            |
                        </p>
                        <Link className='mx-1' href={pageRouters.contact}>
                            Contact Us
                        </Link>
                        <p className='mx-1'>
                            |
                        </p>
                        <Link className='mx-1' href={pageRouters.contact}>
                            Sitemap
                        </Link>
                    </div>
                    <div className='sm:flex justify-center mx-2 hidden'>
                        <Link href={pageRouters.home} className='hover:text-primary'>Back to home</Link>
                        <p className='mx-4'>&copy; 2024 All Rights Reserved</p> 
                    </div>
                </div>
                
            </div>
            <div className='flex justify-end mx-2 sm:hidden text-xs'>
                        <Link href={pageRouters.home} className='hover:text-primary'>Back to home</Link>
                    <p className='mx-4'>&copy; 2024 All Rights Reserved</p> 
                </div>
        </footer>
     );
}
 
export default Footer;