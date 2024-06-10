import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TokenService } from '@src/libs/token.lib';
import { UserType } from '@src/schema/user.schema';

interface ApiResponse<T> {
  valid: boolean;
  data: T;
  errors: any;
}
export const ApiDataFetcher = createApi({
  reducerPath: 'ApiDataFetcher',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`,
    prepareHeaders: (headers, { getState }) => {
      headers.set('Content-type', 'application/json');
      const authToken = TokenService.getToken();
      if (authToken) headers.set('Authorization', `Bearer ${authToken}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    getCurrentUser: build.query<ApiResponse<UserType>, void>({
      query: () => `/auth/me`,
      transformResponse: (
        response: { data: ApiResponse<UserType> },
        meta,
        arg
      ) => response.data,
    }),
  }),
});

export const { useGetCurrentUserQuery } = ApiDataFetcher;
