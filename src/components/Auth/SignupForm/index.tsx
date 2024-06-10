'use client'
import TextInput from '@src/components/Form/TextInput';
import React, { FormEvent,useState } from 'react';
import { CONFIRM_PASSWORD, EMAIL,FIRST_NAME,LAST_NAME,PASSWORD, PHONE_NUMBER, ROLE } from '@src/constants/form.constants';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Button from '@src/components/Form/Button';
import { pageRouters } from '@src/constants/route.constants';
import Link from 'next/link';


interface SignupFormProps{
    data: {
        [EMAIL]: string;
        [FIRST_NAME]:string;
        [LAST_NAME]:string;
        [PASSWORD]: string;
        [CONFIRM_PASSWORD]:string;
        [PHONE_NUMBER]:string;
        [ROLE]:string;
    };
      errors: {
        [EMAIL]: string;
        [FIRST_NAME]:string;
        [LAST_NAME]:string;
        [PASSWORD]: string;
        [CONFIRM_PASSWORD]:string;
        [PHONE_NUMBER]:string;
        [ROLE]:string;
    };
    handleChange: (name: string, value: string) => void;
    loading: boolean;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}


export default function SignupForm({data,errors,handleChange,loading,handleSubmit}:SignupFormProps){
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCon, setIsOpenCon] = useState(false);

  const togglePasswordIcon = () => setIsOpen(!isOpen);
  const togglePasswordIconCon = () => setIsOpenCon(!isOpenCon);

  const passwordIconClassName = `absolute  top-4 cursor-pointer right-3`;

  return (
        <div>
            <form 
            onSubmit={handleSubmit}
            className='p-5 shadow bg-smoke rounded w-full'
            >
            <h1 className={`text-3xl font-sans text-gray-800 font-bold text-center my-3 `}>
                    
                    Welcome to InkhMason</h1>
                <h2 className=' text-sm text-black mb-9 text-center'>Enter your details to sign up</h2>
                <TextInput
                    id={FIRST_NAME}
                    label='First Name'
                    name={FIRST_NAME}
                    type='text'
                    error={errors[FIRST_NAME] || ''}
                    placeholder={`E.g.John`}
                    onChange={(e) => handleChange(FIRST_NAME, e.target.value)}
                />
                <TextInput
                    id={LAST_NAME}
                    label='Last Name'
                    name={LAST_NAME}
                    type='text'
                    error={errors[LAST_NAME] || ''}
                    placeholder={`E.g.Doe`}
                    onChange={(e) => handleChange(LAST_NAME, e.target.value)}
                />
                <TextInput
                    id={EMAIL}
                    label='Email Address'
                    name={EMAIL}
                    type={EMAIL}
                    error={errors[EMAIL] || ''}
                    placeholder={`E.g.JohnDoe@gmail.com`}
                    onChange={(e) => handleChange(EMAIL, e.target.value)}
                />
                <TextInput
                    id={PHONE_NUMBER}
                    label='Phone Number'
                    name={PHONE_NUMBER}
                    type='text'
                    error={errors[PHONE_NUMBER] || ''}
                    placeholder={`E.g.+234 123 3456 789`}
                    onChange={(e) => handleChange(PHONE_NUMBER, e.target.value)}
                />
                <TextInput
                Icon={
                isOpen ? (
                    <FaEyeSlash
                    onClick={togglePasswordIcon}
                    className={passwordIconClassName}
                    />
                ) : (
                    <FaEye
                    onClick={togglePasswordIcon}
                    className={passwordIconClassName}
                    />
              )
            }
            id={PASSWORD}
            label='Password'
            name={PASSWORD}
            type={isOpenCon ? 'text' : 'password'}
            error={errors[PASSWORD] || ''}
            placeholder={`Enter your password`}
            onChange={(e) => handleChange(PASSWORD, e.target.value)}
          />
          <TextInput
                Icon={
                isOpenCon ? (
                    <FaEyeSlash
                    onClick={togglePasswordIconCon}
                    className={passwordIconClassName}
                    />
                ) : (
                    <FaEye
                    onClick={togglePasswordIconCon}
                    className={passwordIconClassName}
                    />
              )
            }
            id={CONFIRM_PASSWORD}
            label='Confirm Password'
            name={CONFIRM_PASSWORD}
            type={isOpen ? 'text' : 'password'}
            error={errors[CONFIRM_PASSWORD] || ''}
            placeholder={`Confirm your password`}
            onChange={(e) => handleChange(CONFIRM_PASSWORD, e.target.value)}
          />
          <div className='text-black float-right'>
            

          </div>
          <div className='flex justify-center mt-16'>
             <Button
              label='Sign Up'
              type='submit'
              loading={loading}
            />
          </div>
          <div className='my-5'>
            <h1 className='text-black text-sm'>Already have an account?
            <span><Link href={pageRouters.login} className='font-semibold text-primary hover:text-yellow-800'> Login</Link></span>
            </h1>
          </div>
         
            </form>
        
        </div>
  )
}
