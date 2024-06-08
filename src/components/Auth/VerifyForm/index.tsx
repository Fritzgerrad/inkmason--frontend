'use client';
import React, { FormEvent, useState } from 'react';
import OtpInput from 'react-otp-input';
import Button from '@src/components/Form/Button';

interface AuthVerifyProps {
  token: string;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleChange: (otp: string) => void;
  loading: boolean;
  canResendOTP: boolean;
  handleResendOTP: () => void;
}
const VerifyForm = ({
  token,
  handleSubmit,
  handleChange,
  loading,
  handleResendOTP,
  canResendOTP,
}: AuthVerifyProps): React.ReactNode => {
  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full shadow-md sm:w-4/5 sm:px-8 px-4 py-12 rounded-lg bg-smoke `}
    >
      <div className={`w-full`}>
        <div
          className={`mb-4  md:text-lg flex gap-2 items-start justify-center`}
        >
          <div>
            <h2 className={`text-3xl font-M text-gray-800 font-bold text-center my-3 `}>
              Verify Token
            </h2>
            <p className={`text-gray-600 text-base font-M font-semibold text-sm`}>
              Enter the OTP sent to your Email Address
            </p>
          </div>
        </div>
        <div className={`w-full flex flex-col justify-start items-center`}>
          <div className=''>
            <OtpInput
              value={token}
              onChange={handleChange}
              inputStyle={`otp-box text-black p-1`}
              containerStyle={`otp-box-set flex justify-center`}
              numInputs={6}
              renderSeparator={<span></span>}
              renderInput={(props) => <input {...props} />}
            />
          </div>
          <p className={`text-center font-light mt-8 text-base w-full text-gray-600`}>
            Didn&apos;t get the token?{' '}
            <span
              onClick={() => handleResendOTP()}
              className={`font-bold cursor-pointer text-base text-primary`}
            >
              Resend OTP
            </span>
          </p>
        </div>
        <div className={`w-full flex justify-center items-center`}>
        <Button label='Send OTP' loading={loading} />
        </div>
      </div>
    </form>
  );
};

export default VerifyForm;
