import { SignupPage, SignupPageProps } from 'client/theme/domains/auth/SignupPage';
import { GetServerSideProps } from 'next';
import { redirectIfAuthenticated } from 'server/middleware/serverSideProps';

export const getServerSideProps: GetServerSideProps<SignupPageProps> = redirectIfAuthenticated(() => {
  return {
    props: {},
  };
});

export default function SignupPageRoute(props: SignupPageProps) {
  return <SignupPage {...props} />;
}
