import {
  Box,
  Container,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../redux/actions/user';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <Container minH={'95vh'}>
      <VStack h={'full'} justifyContent={'center'} spacing={'16'}>
        <Heading children="Welcome to CourseBundler" />
        <form onSubmit={submitHandler} style={{ width: '100%' }}>
          <Box marginY={'4'}>
            <FormLabel htmlFor="email" children="Email Address" />
            <Input
              required
              id="email"
              type={'email'}
              placeholder="abc@gmail.com"
              focusBorderColor={'yellow.500'}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Box>
          <Box marginY={'4'}>
            <FormLabel htmlFor="password" children="Password" />
            <Input
              required
              id="password"
              type={'password'}
              placeholder="Enter Password"
              focusBorderColor={'yellow.500'}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Box>
          <Box>
            <Link to="/forgetpassword">
              <Button fontSize={'sm'} variant={'link'}>
                Forget Password?
              </Button>
            </Link>
          </Box>
          <Button type="submit" my={'4'} colorScheme="yellow">
            Login
          </Button>
          <Box my={'4'}>
            New User?{' '}
            <Link to="/register">
              <Button colorScheme="yellow" variant={'link'}>
                Sign Up
              </Button>{' '}
              here!
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Login;
