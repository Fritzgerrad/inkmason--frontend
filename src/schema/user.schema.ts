import {
  CONFIRM_PASSWORD,
  EMAIL,
  FIRST_NAME,
  LAST_NAME,
  PASSWORD,
  PHONE_NUMBER,
  ROLE
} from '@src/constants/form.constants';
import {
  EMAIL_REGEX,
  FULL_NAME_REGEX,
  PASSWORD_REGEX,
  PHONE_NUMBER_REGEX,
} from '@src/constants/regex.constants';
import { z } from 'zod';

export interface UserType {
  id: string;
  [FIRST_NAME]: string;
  [LAST_NAME]:string;
  [EMAIL]: string;
  is_verified_email: boolean;
  role: string;
  avatar: string;
}


export const newUserAccountSchema = z
  .object({
    [FIRST_NAME]: z
      .string({
        required_error: 'Full name is required',
        invalid_type_error: 'Full name must be alphabets',
      })
      .min(1)
      .max(255)
      .regex(FULL_NAME_REGEX, 'Enter Firstname Lastname'),
    [LAST_NAME]: z
      .string({
        required_error: 'Full name is required',
        invalid_type_error: 'Full name must be alphabets',
      })
      .min(1)
      .max(255)
      .regex(FULL_NAME_REGEX, 'Enter Firstname Lastname'),
    [EMAIL]: z
      .string({
        required_error: 'Email is required',
      })
      .email({ message: 'Invalid email format' })
      .regex(EMAIL_REGEX, { message: 'Invalid email format' }),
    [ROLE]: z
      .string({
        required_error: 'Please Select Role',
      })
      .min(1, { message: 'Invalid Role' }),
      [PHONE_NUMBER]: z
      .string({
        required_error: 'Phone number is required',
      })
      .regex(PHONE_NUMBER_REGEX, { message: 'Invalid phone number' }),
    [PASSWORD]: z
      .string({
        required_error: 'Password is required',
      })
      .min(8, 'Password must be at least 8 characters long')
      .regex(
        PASSWORD_REGEX,
        'Password must contain at least one uppercase, one lowercase, one number, and one special character'
      ),
    [CONFIRM_PASSWORD]: z.string({
      required_error: 'A confirm password is required',
    }),
  })
  .refine(
    (data) => {
      return data[CONFIRM_PASSWORD] === data[PASSWORD];
    },
    {
      message: 'Ooops! Passwords do not match',
      path: [CONFIRM_PASSWORD],
    }
  );

export const newUserDataSchema = z
  .object({
    [FIRST_NAME]: z
      .string({
        required_error: 'Full name is required',
        invalid_type_error: 'Full name must be alphabets',
      })
      .min(1)
      .max(255)
      .regex(FULL_NAME_REGEX, 'Enter Firstname Lastname'),
    [LAST_NAME]: z
      .string({
        required_error: 'Full name is required',
        invalid_type_error: 'Full name must be alphabets',
      })
      .min(1)
      .max(255)
      .regex(FULL_NAME_REGEX, 'Enter Firstname Lastname'),
    [EMAIL]: z
      .string({
        required_error: 'Email is required',
      })
      .email({ message: 'Invalid email format' })
      .regex(EMAIL_REGEX, { message: 'Invalid email format' }),
    [PHONE_NUMBER]: z
      .string({
        required_error: 'Phone number is required',
      })
      .regex(PHONE_NUMBER_REGEX, { message: 'Invalid phone number' }),
    [PASSWORD]: z
      .string({
        required_error: 'Password is required',
      })
      .min(8, 'Password must be at least 8 characters long')
      .regex(
        PASSWORD_REGEX,
        'Password must contain at least one uppercase, one lowercase, one number, and one special character'
      ),
    [CONFIRM_PASSWORD]: z.string({
      required_error: 'A confirm password is required',
    }),
  })
  .refine(
    (data) => {
      return data[CONFIRM_PASSWORD] === data[PASSWORD];
    },
    {
      message: 'Ooops! Passwords do not match',
      path: [CONFIRM_PASSWORD],
    }
  );
