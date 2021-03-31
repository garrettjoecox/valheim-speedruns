import { Button, FormControl, FormErrorMessage, FormLabel, Input, Text } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import * as Yup from 'yup';

interface LoginFormProps {}

export const LoginForm: FC<LoginFormProps> = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      meta: undefined,
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Required'),
      password: Yup.string().required('Required'),
    }),
    async onSubmit({ email, password }, { setErrors, setFieldError }) {
      try {
        console.log(email, password);
        // await dispatch(login({ email, password })).then(unwrapResult);

        router.push('/');
      } catch (error) {
        if (error.response?.data?.data?.details) {
          setErrors(error.response.data.data.details);
        } else if (error.response?.data?.message) {
          setFieldError('meta', error.response.data.message);
        } else {
          setFieldError('meta', 'Uh oh, something went wrong...');
        }
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} onBlur={formik.handleBlur}>
      <Text fontSize="2xl" textAlign="center" mb="5" fontWeight="bold">
        Log in
      </Text>
      <FormControl id="email" mb="5" isInvalid={!!(formik.errors.email && formik.touched.email)}>
        <FormLabel>Email address</FormLabel>
        <Input
          variant="filled"
          type="email"
          placeholder="johndoe@example.com"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
      </FormControl>
      <FormControl id="password" mb="5" isInvalid={!!(formik.errors.password && formik.touched.password)}>
        <FormLabel>Password</FormLabel>
        <Input
          variant="filled"
          type="password"
          placeholder="•••••••••"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
      </FormControl>

      <FormControl id="meta" mb="5" isInvalid={!!formik.errors.meta}>
        <FormErrorMessage>{formik.errors.meta}</FormErrorMessage>
      </FormControl>

      <Button type="submit" mb="5" w="100%" colorScheme="orange" isLoading={formik.isSubmitting}>
        Submit
      </Button>
    </form>
  );
};
