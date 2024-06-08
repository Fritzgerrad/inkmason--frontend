'use client';
import SignupForm from '@src/components/Auth/SignupForm';
import { EMAIL, PASSWORD,LAST_NAME,FIRST_NAME,CONFIRM_PASSWORD,PHONE_NUMBER,ROLE } from '@src/constants/form.constants';
import { pageRouters } from '@src/constants/route.constants';
import { createNotification } from '@src/redux/features/auth/authSlice';
import { createUserAccount } from '@src/redux/features/auth/userActions';
import { useAppDispatch } from '@src/redux/hooks';
import { loginDataSchema } from '@src/schema/auth.schema';
import { validateSchema } from '@src/utils/validate-input.utils';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

const formValues = {
    [EMAIL]: '',
    [FIRST_NAME]:'',
    [LAST_NAME]:'',
    [PASSWORD]: '',
    [CONFIRM_PASSWORD]:'',
    [PHONE_NUMBER]:'',
    [ROLE]:'customer',
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
    console.log(formState);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log(formState)
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
      const { data } = await dispatch(createUserAccount(formState)).unwrap();
      // TokenService.setToken(token);

      router.push(`${pageRouters.verifyAccount}/${data}`)

      // if (role === 'artist') {
      //   window.location.href = pageRouters.artists;
      // }
      // if (role === 'customer') {
      //   window.location.href = pageRouters.customers;
      // }
      // if (role === 'admin') {
      //   window.location.href = pageRouters.admin;
      // }

      // if (role === 'staff') {
      //   window.location.href = pageRouters.staff;
      // }

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
    <SignupForm
      handleSubmit={handleSubmit}
      loading={loading}
      data={formState}
      errors={formErrors}
      handleChange={handleChange}
    />
  );
};

export default Login;