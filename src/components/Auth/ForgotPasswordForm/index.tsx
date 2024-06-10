import { EMAIL } from '@src/constants/form.constants';
import TextInput from '@src/components/Form/TextInput';
import Button from '@src/components/Form/Button';
import { FormEvent, useState } from 'react';

interface forgotPasswordFormProps {
    data: {
      [EMAIL]: string;
    };
    errors: {
      [EMAIL]: string;
    };
    handleChange: (name: string, value: string) => void;
    loading: boolean;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const ForgotPasswordForm = ({
    data,
    errors,
    handleChange,
    handleSubmit,
    loading,
}: forgotPasswordFormProps) :React.ReactNode =>{
    return(
        <form 
        onSubmit={handleSubmit}
        className={`w-full shadow-md sm:w-4/5 sm:px-8 px-4 py-12 rounded-lg bg-smoke `}
        >
            <div className={`w-full`}>
        <div
          className={`mb-4  md:text-lg flex flex-col gap-2 items-start justify-center`}
        >
          <h2 className={`text-3xl font-sans text-gray-800 font-bold `}>
            Forgot Password 
          </h2>
          <p className={`text-gray-600 text-base font-sans font-normal`}>
            Enter your Registered Email Address
          </p>
        </div>
        <div
          className={`w-full flex flex-col justify-start items-center gap-4`}
        >
          <TextInput
            id={EMAIL}
            label='Email Address'
            name={EMAIL}
            type={EMAIL}
            error={errors[EMAIL] || ''}
            placeholder={`E.g.JohnDoe@gmail.com`}
            onChange={(e) => handleChange(EMAIL, e.target.value)}
          />

        </div >
        <div className='flex justify-center mt-3'>
          <Button label='Send OTP' loading={loading} />
        </div>
      </div>

        </form>
    )

}

export default ForgotPasswordForm;
