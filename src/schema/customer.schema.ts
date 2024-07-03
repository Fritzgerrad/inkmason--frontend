import { z } from 'zod';

export const bookingDataSchema = z.object({
    mode: z.string().nonempty({ message: 'Mode is required' }),
    contactInformation: z.string().nonempty({ message: 'Contact information is required' }),
    bookingDate: z.string().nonempty({ message: 'Booking date is required' }).regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
    bookerName: z.string().nonempty({ message: 'Booker name is required' }),
    platform: z.string().nonempty({ message: 'Platform is required' }),
    bookingTime: z.string().nonempty({ message: 'Booking time is required' }).regex(/^\d{2}:\d{2}$/, 'Invalid time format'),
});
