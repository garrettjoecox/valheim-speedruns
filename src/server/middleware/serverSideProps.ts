import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { ensureAuthed } from 'server/middleware/ensureAuthed';
import { OurNextApiRequest, OurNextApiResponse } from 'types/api';

export function redirectIfNotAuthenticated<P>(
  callback?: (context: GetServerSidePropsContext) => GetServerSidePropsResult<P>,
) {
  const inner: GetServerSideProps<P> = async (context) => {
    try {
      const req = context.req as OurNextApiRequest;
      const res = context.res as OurNextApiResponse;
      req.context = {};
      await ensureAuthed(req, res);

      return callback ? callback(context) : { props: {} as P };
    } catch (error) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
  };

  return inner;
}

export function redirectIfAuthenticated<P>(
  callback?: (context: GetServerSidePropsContext) => GetServerSidePropsResult<P>,
) {
  const inner: GetServerSideProps<P> = async (context) => {
    try {
      const req = context.req as OurNextApiRequest;
      const res = context.res as OurNextApiResponse;
      req.context = {};
      await ensureAuthed(req, res);

      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    } catch (error) {
      return callback ? callback(context) : { props: {} as P };
    }
  };

  return inner;
}
