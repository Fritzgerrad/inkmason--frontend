'use client'
import { selectCompletedBookings } from '@src/redux/features/customer/customerSlice';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@src/redux/store';



const BookingHistory: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const bookings = useSelector((state: RootState) => selectCompletedBookings(state));



    if (error) {
        return <div className='items-center text-center flex justify-center'><p>{error}</p></div>;
    }

    return (
        <div className="booking-history">
            <h2 className='m-3 text-2xl'>Booking History</h2>
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
        </div>
    );
};

export default BookingHistory;
