'use client'
import TextInput from '@src/components/Form/TextInput';
import React, { FormEvent,useState } from 'react';
import { EMAIL,PASSWORD } from '@src/constants/form.constants';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Button from '@src/components/Form/Button';
import { pageRouters } from '@src/constants/route.constants';
import Link from 'next/link';


interface LoginFormProps{
    data: {
        [EMAIL]: string;
        [PASSWORD]: string;
      };
      errors: {
        [EMAIL]: string;
        [PASSWORD]: string;
      };
    handleChange: (name: string, value: string) => void;
    loading: boolean;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}


export default function LoginForm({data,errors,handleChange,loading,handleSubmit}:LoginFormProps){
  const [isOpen, setIsOpen] = useState(false);
  const togglePasswordIcon = () => setIsOpen(!isOpen);
  const passwordIconClassName = `absolute  top-4 cursor-pointer right-3`;

  return (
        <div>
            <form 
            onSubmit={handleSubmit}
            className='p-5 shadow bg-smoke rounded w-full'
            >
            <h2 className={`text-3xl font-M text-gray-800 font-bold my-2 `}>
                  Welcome Back
                </h2>
                <h2 className=' text-gray-600 text-base font-M font-bold text-sm'>
                  Enter your login details</h2>
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
            type={isOpen ? 'text' : 'password'}
            error={errors[PASSWORD] || ''}
            placeholder={`Enter your password`}
            onChange={(e) => handleChange(PASSWORD, e.target.value)}
          />
          <div className='text-black float-right'>
            <Link className='text-primary font-semibold text-sm hover:text-yellow-900'
              href={pageRouters.forgotPassword}>
              Forgot Password? 
            </Link>

          </div>
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
