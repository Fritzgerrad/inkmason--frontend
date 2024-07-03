'use client';
import React, { useEffect, useState } from 'react';
import { UserService } from '@src/libs/user-data.lib';
import { useAppDispatch } from '@src/redux/hooks';
import Button from '@src/components/Form/Button';
import { FaWhatsapp, FaPhoneAlt, FaSkype, FaSnapchatGhost } from 'react-icons/fa';
import { IoLogoWhatsapp } from 'react-icons/io';
import { BsInstagram } from 'react-icons/bs';
import { newBooking } from '@src/redux/features/customer/customerActions';
import Link from 'next/link';
import { pageRouters } from '@src/constants/route.constants';

interface BookingData {
    mode: string;
    contactInformation: string;
    bookingDate: string;
    bookerName: string;
    platform: string;
    bookingTime: string;
}

const BookingPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { getUser } = UserService()

    const user = getUser();

    const start = false

    const [showMode, setShowMode] = useState(start);
    const [showContactInfo, setShowContactInfo] = useState(start);
    const [contactStyleName, setContactStyleName] = useState('Contact Information');
    const [showDateAndTime, setShowDateAndTime] = useState(start);
    const [showPlatforms,setShowPlatforms] = useState(start)
    const [showSubmit, setShowSubmit] = useState(start)
    const [bookingDone, setBookingDone] = useState(false);
    const [bookingData, setBookingData] = useState<BookingData>({
        mode: '',
        platform: '',
        contactInformation: '',
        bookingDate: '',
        bookingTime: '',
        bookerName: '',
    });
    const [loading, setLoading] = useState(false);
    const classNameTemplate = 'border p-3 text-xl m-3 flex rounded shadow';

    const handleChange = (name: string, value: string) => {
        setBookingData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePlatformChange = (platform: string) => {
        setBookingData((prev) => ({ ...prev, platform }));
        handleChange('contactInformation', '')
        doShowContactNameStyle(platform);
        setShowMode(true);
    };

    useEffect(()=>{
        if(bookingData.bookingTime && bookingData.bookingDate){
            setShowPlatforms(true)
        }
    }, [bookingData.bookingTime, bookingData.bookingDate])

    const handleModeChange = (mode: string) => {
        setBookingData((prev) => ({ ...prev, mode }));
        setShowContactInfo(true);
    };

    const handleContactInfoBlur = () => {
        if (bookingData.contactInformation) {
            setShowSubmit(true);
        }
    };

    const handleNameBlur = () => {
        if (bookingData.bookerName) {
            setShowDateAndTime(true);
        }
    };

    const doShowContactNameStyle = (platform: string) => {
        switch (platform) {
            case "Whatsapp":
                setContactStyleName("Whatsapp Number");
                break;
            case "Phone":
                setContactStyleName("Phone Number");
                break;
            case "Skype":
                setContactStyleName("Skype ID");
                break;
            case "Instagram":
                setContactStyleName("Instagram Username");
                break;
            case "Snapchat":
                setContactStyleName("SnapChat Username");
                break;
            default:
                setContactStyleName("Contact Information");
                break;
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        console.log(bookingData)
        try{
            const {data} = await dispatch(newBooking(bookingData)).unwrap()
            setBookingDone(true)
            console.log(data)
        }
        catch(error){
            console.log(error)
        }
        
        setLoading(false);
    };

    const platforms = [
        { name: 'Whatsapp', icon: <FaWhatsapp />, iconClass: 'text-white bg-green-500 p-1 rounded' },
        { name: 'Phone', icon: <FaPhoneAlt />, iconClass: 'text-blue-300' },
        { name: 'Skype', icon: <FaSkype />, iconClass: 'text-blue-500 text-4xl m-1' },
        { name: 'Instagram', icon: <BsInstagram />, iconClass: 'text-purple-700' },
        { name: 'Snapchat', icon: <FaSnapchatGhost />, iconClass: 'bg-yellow-300 p-1 rounded text-white' }
    ];

    const modes = ["Call", "Text"];

    return (
        <>
            <div className='bg-gray flex justify-center'>
                {!bookingDone ? (
                <form
                    className="flex flex-col sm:w-6/12 m-5 shadow bg-gray-100 py-3 px-2"
                    onSubmit={handleSubmit}
                >
                    <h1>Fill in the detils to book a one on one Consultation with one of our Staff</h1>
                    <div className='flex m-3 sm:w-3/5'>
                        <label htmlFor="bookerName" className='py-3 text-xl'>Name</label>
                        <input
                            id="bookerName"
                            type="text"
                            name="bookerName"
                            value={bookingData.bookerName}
                            onChange={(e) => handleChange('bookerName', e.target.value)}
                            onBlur={handleNameBlur}
                            className="mx-3 block w-full px-2 rounded-md border-1 border-gray-400 outline-none py-3 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-400 sm:text-base sm:leading-6 bg-gray-100"
                        />
                    </div>

                    {showDateAndTime && (
                            <div className='flex my-3 flex-col sm:flex-row'>
                                <div className='flex m-3 ml-0'>
                                    <label htmlFor="bookingDate" className='mx-2 p-2 text-xl'>Date:</label>
                                    <input
                                        id="bookingDate"
                                        type="date"
                                        name="bookingDate"
                                        value={bookingData.bookingDate}
                                        onChange={(e) => handleChange('bookingDate', e.target.value)}
                                        className="bg-gray-100 p-2 border rounded"
                                    />
                                </div>
                                <div className='flex m-3 ml-0'>
                                    <label htmlFor="bookingTime" className='mx-2 p-2 text-xl'>Time:</label>
                                    <input
                                        id="bookingTime"
                                        type="time"
                                        name="bookingTime"
                                        value={bookingData.bookingTime}
                                        onChange={(e) => handleChange('bookingTime', e.target.value)}
                                        className="bg-gray-100 p-2 border rounded"
                                    />
                                </div>
                                
                            </div>
                        )}
                    {showPlatforms && (<div>
                        <h2 className='text-xl m-2'>What platform would you like to communicate with?</h2>
                        <div className="flex flex-wrap m-3">
                            {platforms.map((platform) => (
                                <button
                                    key={platform.name}
                                    type="button"
                                    onClick={() => handlePlatformChange(platform.name.toLowerCase())}
                                    className={`${classNameTemplate} ${bookingData.platform === platform.name ? 'bg-primary text-white' : 'bg-white'} rounded-full sm:rounded`}
                                >
                                    <span className={`${platform.iconClass} mx-2 text-4xl sm:text-2xl`}>{platform.icon}</span>
                                    <p className='hidden sm:flex'>{platform.name.replace(/([A-Z])/g, ' $1').trim()}</p>
                                </button>
                            ))}
                        </div> 
                    </div>)}
                    
                    <div>
                        {showMode && (
                            <div className='m-5'>
                                <h2>What is your preferred mode of communication?</h2>
                                <div className="flex flex-wrap">
                                    {modes.map((mode) => (
                                        <button
                                            key={mode}
                                            type="button"
                                            onClick={() => handleModeChange(mode)}
                                            className={`${classNameTemplate} ${bookingData.mode === mode ? 'bg-primary text-white' : 'bg-white'}`}
                                        >
                                            <p>{mode}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className='flex flex-col'>
                        {showContactInfo && (
                            <div className='flex flex-col m-3'>
                                <label htmlFor="contactInformation">Please Enter your {contactStyleName}</label>
                                <input
                                    id="contactInformation"
                                    type="text"
                                    name="contactInformation"
                                    value={bookingData.contactInformation}
                                    onChange={(e) => handleChange('contactInformation', e.target.value)}
                                    onBlur={handleContactInfoBlur}
                                    className="block sm:w-3/5 my-2 px-2 rounded-md border-1 border-gray-400 outline-none py-3 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-400 sm:text-base sm:leading-6 bg-gray-100"
                                />
                            </div>
                        )}
                    </div>

                    {showSubmit && (<div className="mx-3 sm:w-1/2">
                        <Button
                            label="Book"
                            type="submit"
                            loading={loading}
                        />
                    </div>)}
                </form>):(
                    <div className='flex flex-col items-center justify-center p-4'>
                        <h1 className='text-3xl font-bold'>Thank you for booking with us!</h1>
                        <div className='flex'>
                            <Link href={pageRouters.home} className='m-5'>Go back to home</Link>
                            <Link href={`${pageRouters.booking}/history`} className='m-5'>View all Bookings</Link>
                        </div>

                    </div>
                )}

            </div>
        </>
    );
};

export default BookingPage;
