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
    const [bookings,setBookings] = useState<Booking[]>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchCompletedBookings = async () => {
            try {
                const { data } = await dispatch(getCompletedBookings()).unwrap();
                console.log(data);
                setBookings(data);
                dispatch(setCompletedBookings(data));
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
        <div className="flex flex-col items-center sm:items-start justify-center sm:justify-start">
            <div className="">
            {pendingBooking ? (<div>
                <h1 className="text-3xl font-bold text-center sm:text-left">Ongoing Bookings</h1>
                    <h1>Created Date: {new Date(pendingBooking.createdDate).toLocaleString()}</h1>
                    <h1>Contact Platform: {pendingBooking.platform}</h1>
                    <h1>Contact Mode: {pendingBooking.mode}</h1>
                    <h1>Date: {new Date(pendingBooking.bookingDate).toLocaleDateString()}</h1>
                    <h1>Time: {pendingBooking.bookingTime}</h1>
                    <h1>Contact Information: {pendingBooking.contactInformation}</h1>


            </div>
            ):(
                <div >
                    <Link href={`${pageRouters.booking}/new`} className={linkCLassTemplate}>
                        <p>New Booking</p>
                    </Link>
                </div>
                
            )}
            <div className="booking-history">
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
                {bookings ? (<tbody className="bg-white divide-y divide-gray-200">
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
                </tbody>) : (
                    <p>
                        
                    </p>
                )}
            </table>
            <div >
                    <Link href={`${pageRouters.booking}/history`} className="text-sm m-3 mx-5">
                        <p>View More</p>
                    </Link>
                </div>
        </div>
            </div>

        </div>
     );
}
 
export default BookingPage;