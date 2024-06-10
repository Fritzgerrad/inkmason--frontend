'use client'
import {
  CONFIRM_PASSWORD,
  PASSWORD,
} from '@src/constants/form.constants';
import React, { FormEvent,useState } from 'react';
import OtpInput from 'react-otp-input';
import Button from '@src/components/Form/Button';
import TextInput from '@src/components/Form/TextInput';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { resetPasswordSchema } from '@src/schema/auth.schema';
import { z } from 'zod';


interface AuthVerifyProps {
    otp:string;
    data: z.infer<typeof resetPasswordSchema>;
    errors: z.infer<typeof resetPasswordSchema>;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    handleOTPChange: (otp: string) => void;
    handleChange: (name: string, value: string) => void;
    loading: boolean;

}
const passwordIconClassName = `absolute  top-4 cursor-pointer right-3`;
const ResetPasswordForm = ({ 
    data,
    otp,
    errors,
    handleSubmit,
    handleOTPChange,
    handleChange,
    loading,

 }: AuthVerifyProps): React.ReactNode => {
  const [page, setPage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const togglePasswordIcon = () => setIsOpen(!isOpen);


  return (
    <form 
    onSubmit={handleSubmit}
    className={`w-full shadow-md sm:w-4/5 sm:px-8 px-4 py-12 rounded-lg bg-smoke`}
    >
      {page == 0 &&(
        <div className={`w-full`}>
        <div
        className={`mb-4  md:text-lg flex gap-2 items-start justify-center`}
      > 
        <div>
        <h2 className={`text-3xl font-M text-gray-800 font-bold text-center my-3 `}>
          Verify Token 
        </h2>
        <p className={`text-gray-600 text-base font-sans font-normal`}>
          Enter the OTP sent to your Email Address
        </p>
        </div>
      </div>
      <div
        className={`w-full flex flex-col justify-start items-center`}
      >
      <div className=''>
        <OtpInput
          value={otp}
          onChange={handleOTPChange}
          inputStyle={`otp-box text-black p-1`}
          containerStyle={`otp-box-set flex justify-center`}
          numInputs={6}
          renderSeparator={<span></span>}
          renderInput={(props) => <input {...props} />}
        />
        </div>
  
      </div>
      <div className='flex justify-center mt-5'>
        <Button label='Send OTP' loading={loading} type="button" onClick={()=>{otp.length === 6 ? setPage(1) : '';}}/>

      </div>
    </div>
      )}

    {page == 1 && otp &&(
      <>
        <h2 className={`text-3xl font-M text-gray-800 font-bold my-2 `}>
                  Create Password
                </h2>
                <h2 className=' text-gray-600 text-base font-M font- text-sm'>
                Enter your New Password
                </h2>
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
            id={CONFIRM_PASSWORD}
            label='Confirm Password'
            name={CONFIRM_PASSWORD}
            type={isOpen ? 'text' : 'password'}
            error={errors[CONFIRM_PASSWORD] || ''}
            placeholder={`Re-enter your password`}
            onChange={(e) => handleChange(CONFIRM_PASSWORD, e.target.value)}
            />
          <div className='text-black float-right'>


          </div>
          <div className='flex justify-center mt-5'>
             <Button
              label='Create Password'
              type='submit'
              loading={loading}
            />
          </div>
      </>

      )}
    </form>
  );
};

export default ResetPasswordForm;
