import { useGetCurrentUserQuery } from '@src/redux/features/fetcher';

const useCurrentUser = () => {
  const {
    data: user,
    error,
    isLoading,
  } = useGetCurrentUserQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  return {
    isLoading,
    user,
    error,
  };
};

export default useCurrentUser;
