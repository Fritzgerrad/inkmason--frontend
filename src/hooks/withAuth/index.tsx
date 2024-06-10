import { useRouter } from 'next/navigation';
import { pageRouters } from '@src/constants/route.constants';
import { UserType } from '@src/schema/user.schema';
import useCurrentUser from '../useCurrentUser';

const withAuth = <T extends object>(
  WrappedComponent: React.ComponentType<T>,
  allowedRoles: string[] = []
) => {
  const AuthComponent: React.FC<T> = (props) => {
    const router = useRouter();

    const { user, error, isLoading } = useCurrentUser();

    if (isLoading) return <h1>Authenticating...</h1>;

    if (!isLoading && error) {
      window.location.href = pageRouters.login;
      return null;
    }
    if (!user) {
      window.location.href = pageRouters.login;
      return null;
    }
    const currentUser = user as unknown as UserType;

    if (!currentUser.is_verified_email) {
      router.push(`${pageRouters.verifyAccount}/${currentUser.id}?type=VERIFY_ACCOUNT`);
      return null;
    }

    if (currentUser.role.toLowerCase() === 'unassigned') {
      router.push(`${pageRouters.login}/?bearer=${currentUser.id}`);
      return null;
    }

    const componentProps = {
      ...props,
      currentUser: currentUser as unknown as UserType,
    };

    return <WrappedComponent {...componentProps} />;
  };

  return AuthComponent;
};

export default withAuth;
