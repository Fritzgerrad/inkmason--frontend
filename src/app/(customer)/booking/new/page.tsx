'use client'
import React,{useState} from "react";
const BookingPage = () => {
    const [bookingData, useBookingData] = useState({
        customerUsername: " ",
        mode: "",
        createdDate: " ",
        contactInformation: " ",
        bookingDate: ' ',
        email: ' ',
        bookerName: ' ',
        loginTime: ' ',
        bookerRole: ' ',
    })
    
    return ( 
        <>
            <div>
                <form>
                    <div>
                        
                    </div>
                    


                </form>
            </div>
        
        </>
     );
}
 
export default BookingPage;