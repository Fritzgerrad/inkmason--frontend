'use client'
import ForgotPasswordForm from '@src/components/Auth/ForgotPasswordForm';
import { EMAIL } from '@src/constants/form.constants';
import { pageRouters } from '@src/constants/route.constants';
import { forgotPassword } from '@src/redux/features/auth/authActions';
import { createNotification } from '@src/redux/features/auth/authSlice';
import { useAppDispatch } from '@src/redux/hooks';
import { emailFieldSchema } from '@src/schema/auth.schema';
import { validateSchema } from '@src/utils/validate-input.utils';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';


const formValues = {
    [EMAIL]: '',
};

const ForgotPassword =() =>{
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
            emailFieldSchema,
          formState
        );
    
        if (!validInput) {
          setFormErrors((prev) => ({ ...prev, ...validationErrors }));
          setLoading(false);
          return;
        }
    
        try {
          const response = await dispatch(forgotPassword(formState)).unwrap();
          const userId = response["data"];
    
          const { data } = response || {};
          router.push(`${pageRouters.resetPassword}/${data}`);
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

      return(
        <ForgotPasswordForm
            handleSubmit={handleSubmit}
            loading={loading}
            data={formState}
            errors={formErrors}
            handleChange={handleChange}
        />

      )
}

export default  ForgotPassword;