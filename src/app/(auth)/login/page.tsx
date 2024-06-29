'use client';
import LoginForm from '@src/components/Auth/LoginForm';
import { EMAIL, PASSWORD } from '@src/constants/form.constants';
import { pageRouters } from '@src/constants/route.constants';
import { TokenService } from '@src/libs/token.lib';
import { loginUser } from '@src/redux/features/auth/authActions';
import { createNotification } from '@src/redux/features/auth/authSlice';
import { useAppDispatch } from '@src/redux/hooks';
import { loginDataSchema } from '@src/schema/auth.schema';
import { validateSchema } from '@src/utils/validate-input.utils';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { createUser } from '@src/redux/features/auth/userSlice';
import { useAppSelector } from '@src/redux/hooks';
import { UserService } from '@src/libs/user-data.lib';

const formValues = {
  [EMAIL]: '',
  [PASSWORD]: '',
};

const Login = () => {
  const [formState, setFormState] = useState(formValues);
  const [formErrors, setFormErrors] = useState(formValues);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  
  const handleChange = (name: string, value: string) => {
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data: validInput, errors: validationErrors } = validateSchema(
      loginDataSchema,
      formState
    );

    if (!validInput) {
      setFormErrors((prev) => ({ ...prev, ...validationErrors }));
      setLoading(false);
      return;
    }

    try {
      const { data } = await dispatch(loginUser(formState)).unwrap();

      const { token, role,firstname,isVerified,id } = data || {};
      console.log(data)
      TokenService.setToken(token);
      dispatch(createNotification({ message: 'Logged in successfully', type: 'success' }));

      dispatch(createUser({id,firstname,role}));

      UserService.saveUser({id,firstname,role});

      if (role === 'artist') {
        window.location.href = pageRouters.artists;
      }
      if (role === 'customer') {
        window.location.href = pageRouters.customers;
      }
      if (role === 'admin') {
        window.location.href = pageRouters.admin;
      }

      if (role === 'staff') {
        window.location.href = pageRouters.staff;
      }
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

  return (
    <LoginForm
      handleSubmit={handleSubmit}
      loading={loading}
      data={formState}
      errors={formErrors}
      handleChange={handleChange}
    />
  );
};

export default Login;