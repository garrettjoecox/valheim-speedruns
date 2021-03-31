import { LoginPage, LoginPageProps } from 'client/theme/domains/auth/LoginPage';
import { GetServerSideProps } from 'next';
import { redirectIfAuthenticated } from 'server/middleware/serverSideProps';

export const getServerSideProps: GetServerSideProps<LoginPageProps> = redirectIfAuthenticated(() => {
  return {
    props: {},
  };
});

export default function LoginPageRoute(props: LoginPageProps) {
  return <LoginPage {...props} />;
}
