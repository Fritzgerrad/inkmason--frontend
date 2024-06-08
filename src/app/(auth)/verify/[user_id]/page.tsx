'use client';
import React, { useState, FormEvent } from 'react';
import { IDENTIFIER, OTP } from '@src/constants/form.constants';
import VerifyForm from '@src/components/Auth/VerifyForm';
import { pageRouters } from '@src/constants/route.constants';
import { createNotification } from '@src/redux/features/auth/authSlice';
import { useAppDispatch } from '@src/redux/hooks';
import { useRouter } from 'next/navigation';
import {
  resentAccountVerificationToken,
  verifyUserAccount,
} from '@src/redux/features/auth/authActions';
import { TokenService } from '@src/libs/token.lib';

const AuthVerify = ({ params }: { params: { user_id: string } }) => {
  const formValues = {
    [OTP]: '',
    [IDENTIFIER]: params.user_id,
  };
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [canResendOTP, setCanResendOTP] = useState(true);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [formState, setFormState] = useState(formValues);

  const handleSubmit = async (e: FormEvent) => {
    console.log(formState)
    e.preventDefault();
    formState[OTP] = otp;
    setLoading(true);
    try {
      const response = await dispatch(verifyUserAccount(formState)).unwrap();
      const { data } = response || {};

      const { token, role,userId,verified,firstname, } = data || {};      

      console.log(data);
      TokenService.setToken(token);


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
  const handleResendOTP = async () => {
    setLoading(true);
    try {
      const response = await dispatch(
        resentAccountVerificationToken({
          identifier: params.user_id,
        })
      ).unwrap();
      const { message } = response || {};
      setLoading(false);
      dispatch(
        createNotification({
          message: message || `OTP has been resent`,
          id: Math.random(),
          type: 'success',
        })
      );
      setCanResendOTP(false);

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
  return (
    <div>
      <VerifyForm
        canResendOTP={canResendOTP}
        handleResendOTP={handleResendOTP}
        token={otp}
        handleSubmit={handleSubmit}
        handleChange={setOtp}
        loading={loading}
      />
    </div>
  );
};

export default AuthVerify;