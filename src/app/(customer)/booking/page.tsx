'use client'
import { pageRouters } from "@src/constants/route.constants";
import Link from "next/link";
import { useEffect,useState } from "react";
import { useAppDispatch } from '@src/redux/hooks';
import { getCompletedBookings,getOngoingBookings } from '@src/redux/features/customer/customerActions';
import { setCompletedBookings,selectOngoingBookings } from "@src/redux/features/customer/customerSlice";
import { Booking } from "@src/models/Booking";



const BookingPage = () => {
    const linkCLassTemplate = "rounded shadow m-3 w-48 h-48 sm:w-60 sm:h-60 text-2xl bg-gray-300 items-center text-center flex justify-center"
    const [pendingBooking, setPendingBooking] = useState<Booking | null>(null);
    const [bookings,setBookings] = useState<Booking[] | null>(null);
    const dispatch = useAppDispatch();
    const [contactStyle, setContactStyle] = useState("Contact Information")

    function convertTo12HourTime(time24:string) {
        // Split the time string into components
        const [hours, minutes, seconds] = time24.split(':');
        let period = 'AM';
    
        // Convert hours from string to number
        let hoursNumber = parseInt(hours, 10);
    
        // Determine the period (AM/PM) and adjust hours for 12-hour format
        if (hoursNumber >= 12) {
            period = 'PM';
            if (hoursNumber > 12) {
                hoursNumber -= 12;
            }
        } else if (hoursNumber === 0) {
            hoursNumber = 12; // Midnight case
        }
    
        // Format hours to always be 2 digits
        const hours12 = hoursNumber.toString().padStart(2, '0');
    
        // Format minutes and seconds to always be 2 digits
        const formattedMinutes = minutes.padStart(2, '0');
        const formattedSeconds = seconds ? seconds.padStart(2, '0') : '';
    
        // Construct the 12-hour time string
        const time12 = `${hours12}:${formattedMinutes}${formattedSeconds ? ':' + formattedSeconds : ''} ${period}`;
        return time12;
    }

    useEffect(()=>{
        if(pendingBooking?.platform == 'whatsapp' || pendingBooking?.platform == 'phone'){
            setContactStyle('Phone Number')
        }
        else{
            setContactStyle("Username")
        }
    },[pendingBooking])
    useEffect(() => {
        const fetchCompletedBookings = async () => {
            try {
                const { data } = await dispatch(getCompletedBookings()).unwrap();
                if(data.length > 0) {
                console.log("old",data);
                setBookings(data);
                dispatch(setCompletedBookings(data));
                }

                // setPendingBooking(data.filter((booking:Booking) => booking.completed == false));
            } catch (err) {
                console.log('Failed to fetch bookings');
            } 
        };

        const fetchOngoingBookings = async () => {
            try {
                const { data } = await dispatch(getOngoingBookings()).unwrap();
                console.log(data);
                setPendingBooking(data);
                dispatch(setCompletedBookings(data));
            } catch (err) {
                console.log('Failed to fetch bookings');
            } 
        };

        fetchCompletedBookings();
        fetchOngoingBookings();
    }, [dispatch]);

    return ( 
        <div className="flex flex-col items-center sm:items-start justify-center sm:justify-start p-4">
            <div className="w-full">
            {pendingBooking ? (
                <div className="shadow p-5 bg-primary text-black w-3/5 rounded">
                    <h1 className="text-3xl font-bold text-center sm:text-left">Ongoing Booking</h1>
                    <div className="divide-y-8 divide-primary"> 
                        <h1 className="text-xs text-center sm:text-left">Created On {new Date(pendingBooking.createdDate).toLocaleDateString()} {convertTo12HourTime(new Date(pendingBooking.createdDate).toLocaleTimeString())}</h1>
                        
                        <div className="my-4">
                            <h1 className="font-semibold text-xl">Contact Details</h1>
                            <div className="flex divide-x-8 divide-primary">
                                <h1 className="text-sm text-center sm:text-left">Platform: {pendingBooking.platform.charAt(0).toUpperCase() + pendingBooking.platform.slice(1)}</h1>
                                <h1 className="text-sm text-center sm:text-left ">Mode: {pendingBooking.mode}</h1>
                            </div>
                            <h1 className="text-sm text-center sm:text-left">{contactStyle}: <span className="text-">{pendingBooking.contactInformation}</span></h1>
                        </div>
                        
                        <h1 className="font-semibold text-xl">Time</h1>
                        <div className="flex divide-x-8 divide-primary">
                            <h1 className="text-sm text-center sm:text-left">{new Date(pendingBooking.bookingDate).toLocaleDateString()}</h1>
                            <h1 className="text-sm text-center sm:text-left">{convertTo12HourTime(pendingBooking.bookingTime)}</h1>
                        </div>
                    </div>
                    <div className="flex mt-5">
                        <button className="bg-red-700 rounded border p-2 text-sm mr-2 text-white">Cancel Booking</button>
                        <button className="bg-white rounded border p-2 text-sm mr-2 text-black">Edit Details</button>
                    </div>
                </div>
            ):(
                <div >
                    <Link href={`${pageRouters.booking}/new`} className={linkCLassTemplate}>
                        <p>New Booking</p>
                    </Link>
                </div>
                
            )}
           {bookings  && ( <div className="booking-history">
                <h2 className='m-3 text-xl'>Booking History</h2>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Created Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Platform
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Mode
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Booking Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Booking Time
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Contact Information
                            </th>
                            
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {bookings.map((booking, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(booking.createdDate).toLocaleString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.platform}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.mode}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(booking.bookingDate).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.bookingTime}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.contactInformation}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div >
                    <Link href={`${pageRouters.booking}/history`} className="text-sm m-3 mx-5">
                        <p>View More</p>
                    </Link>
                </div>
            </div>)}
            </div>

        </div>
     );
}
 
export default BookingPage;