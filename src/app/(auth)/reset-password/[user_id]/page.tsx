'use client'
import React, { useState,FormEvent } from 'react';
import {
  CONFIRM_PASSWORD,
  PASSWORD,
  OTP,
  USER_ID,
  IDENTIFIER,
} from '@src/constants/form.constants';
import ResetPasswordForm from '@src/components/Auth/ResetPasswordForm';
import { resetPassword } from '@src/redux/features/auth/authActions';
import { pageRouters } from '@src/constants/route.constants';
import { createNotification } from '@src/redux/features/auth/authSlice';
import { useAppDispatch } from '@src/redux/hooks';
import { useRouter } from 'next/navigation';
import { resetPasswordSchema } from '@src/schema/auth.schema';
import { validateSchema } from '@src/utils/validate-input.utils';

const ResetPassword = ({
   params,
}:{
  params: {user_id:string}
}) => {
    const formValues = {
        [CONFIRM_PASSWORD]: '',
        [PASSWORD]: '',
        [OTP]: '',
        [IDENTIFIER]: params.user_id
      };
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [formState, setFormState] = useState(formValues);
    const [formErrors, setFormErrors] = useState(formValues);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    formState[OTP] = otp;    
    setLoading(true);

    const { data: validInput, errors: validationErrors } = validateSchema(
      resetPasswordSchema,
      formState
    );

    if (!validInput) {
      setFormErrors((prev) => ({ ...prev, ...validationErrors }));
      setLoading(false);
      return;
    }

    try {
      const response = await dispatch(resetPassword(formState)).unwrap();
      const { data } = response || {};
      router.push(pageRouters.login);
      setLoading(false);
      setFormState(formValues);
      return;
    } catch (error) {
      const e = error as Error;
      dispatch(
        createNotification({
          message: e.message,
          id: Math.random(),
          type: 'error',
        })
      );
      setLoading(false);
      return;
    }
  };

  const handleChange = (name: string, value: string) => {
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  return (
      <div>
      <ResetPasswordForm
        data={formState}
        otp={otp}
        handleSubmit={handleSubmit}
        handleOTPChange={setOtp}
        handleChange={handleChange}
        loading={loading}
        errors={formErrors}        
      />

    </div>
  );
};

export default ResetPassword;
