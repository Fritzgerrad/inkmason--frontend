import { z } from 'zod';
import { EMAIL_REGEX, PASSWORD_REGEX } from '@src/constants/regex.constants';
import {
  CONFIRM_PASSWORD,
  OTP,
  PASSWORD,
  USER_ID,
  IDENTIFIER,
} from '@src/constants/form.constants';

export const loginDataSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({ message: 'Invalid email format' })
    .regex(EMAIL_REGEX, { message: 'Invalid email format' }),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(8, 'Password must be at least 8 characters long')
    .regex(
      PASSWORD_REGEX,
      'Password must contain at least one uppercase, one lowercase, one number, and one special character'
    ),
});

export const emailFieldSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({ message: 'Invalid email format' })
    .regex(EMAIL_REGEX, { message: 'Invalid email format' }),
});

export const verifyAccountSchema = z.object({
  [OTP]: z.string({
    required_error: 'Token is required',
  }),
  [IDENTIFIER]: z.string({
    required_error: 'Identifier is required',
  }),
});
export const resendAccountTokenSchema = z.object({
  [IDENTIFIER]: z.string({
    required_error: 'Identifier is required',
  }),
});

export const resetPasswordSchema = z
  .object({
    [OTP]: z.string({
      required_error: 'Token is required',
    }),
    [IDENTIFIER]: z.string({
      required_error: 'Token is required',
    }),
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
