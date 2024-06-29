import React, { FormEvent,useState } from 'react';
import TextInput from '@src/components/Form/TextInput';
import SelectInput from '@src/components/Form/SelectInput';
import Button from '@src/components/Form/Button';
import { pageRouters } from '@src/constants/route.constants';
import Link from 'next/link';



interface BookingFormProps{
    data: {
        bookingDate : Date;
        mode : string;
        contactInformation : string;
        bookingTime : string;     
      };
    handleChange: (name: string, value: string) => void;
    loading: boolean;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const BookingForm = ({data, handleChange, loading, handleSubmit}: BookingFormProps) => {
    return (
        <div>
            <form 
            onSubmit={handleSubmit}
            className='p-5 shadow bg-smoke rounded w-full'
            >
            <h2 className={`text-3xl font-M text-gray-800 font-bold my-2 `}>
                  Welcome Back
                </h2>
                <h2 className=' text-gray-600 font-M font-bold text-sm'>
                  Enter your login details</h2>
                <SelectInput 
                    label='Booking Mode'
                    name='mode'
                    options={[
                        {value:'WhatsappChat',label:'Whatsapp'},
                        {value:'WhatsappCall',label:'WhatsappCall'},
                        {value:'SMS',label:'SMS'},
                        {value:'PhoneCall',label:'PhoneCall'},
                        {value:'ZoomMeeting',label:'ZoomMeeting'},
                        {value:'TeamsMeeting',label:'TeamsMeeting'},
                        {value:'InstagramChat',label:'InstagramChat'},
                        {value:'GoogleMeet',label:'GoogleMeet'},
                        {value:'Snapchat',label:'Snapchat'},
                    ]}
                    onChange={(e) => handleChange('mode', e)}

                />

                
                <TextInput
                    id={"contactInformation"}
                    label='Email Address'
                    name={"contactInformation"}
                    type='text'
                    error={''}
                    placeholder={`E.g.JohnDoe@gmail.com`}
                    onChange={(e) => handleChange('contactInformation', e.target.value)}
                />
                
          <div className='flex justify-center mt-16'>
             <Button
              label='Login'
              type='submit'
              loading={loading}
            />
          </div>
          <div className='my-5'>
            <h1 className='text-sm'>Don&apos;t have an account?
            <span><Link href={pageRouters.register} className='font-semibold text-primary hover:text-yellow-800'> Sign up</Link></span>
            </h1>
          </div>
         
            </form>
        
        </div>
  )
}