import { NextPage } from 'next';
import Head from 'next/head';

import { Anchor, Button, Stack, TextInput, Title } from '@mantine/core';
import Link from 'next/link';
import classes from './sign-up.module.css';
import { RoutePath } from '../../routes';

const SignUp: NextPage = () => (
  <>
    <Head>
      <title>Sign up</title>
    </Head>

    <div className={classes.container}>
      <div className={classes.wrapper}>
        <form>
          <Stack align="center">
            <Title>
              Register
            </Title>

            <Stack className={classes.form}>
              <TextInput
                label="Email"
                placeholder="Enter your email"
              />

              <TextInput
                label="Password"
                placeholder="Enter your password"
              />

              <div>
                Already have an account?
                {' '}
                <Anchor
                  component={Link}
                  href={RoutePath.SignIn}
                >
                  Sign in
                </Anchor>
              </div>

              <Button className={classes.button}>
                Submit
              </Button>
            </Stack>
          </Stack>
        </form>
      </div>
    </div>
  </>
);

export default SignUp;
