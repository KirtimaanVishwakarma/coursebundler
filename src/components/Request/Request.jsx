import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { courseRequest } from '../../redux/actions/other';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Request = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector(state => state.other);
  const submitHandler = e => {
    e.preventDefault();
    dispatch(courseRequest(name, email, course));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      setEmail('');
      setCourse('');
      setName('');
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);
  return (
    <Container minH={'92vh'}>
      <VStack h={'full'} justifyContent={'center'} spacing={'16'}>
        <Heading children="Request New Course" />

        <form onSubmit={submitHandler} style={{ width: '100%' }}>
          <Box marginY={'4'}>
            <FormLabel htmlFor="name" children="Your Name" />
            <Input
              required
              id="name"
              type={'text'}
              placeholder="Enter Your Name"
              focusBorderColor={'yellow.500'}
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Box>
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
            <FormLabel htmlFor="course" children="Course" />
            <Textarea
              required
              id="course"
              placeholder="Explain the course..."
              focusBorderColor={'yellow.500'}
              value={course}
              onChange={e => setCourse(e.target.value)}
            />
          </Box>
          <Button
            isLoading={loading}
            type="submit"
            my={'4'}
            colorScheme="yellow"
          >
            Send Mail
          </Button>
          <Box my={'4'}>
            See available courses{' '}
            <Link to="/courses">
              <Button colorScheme="yellow" variant={'link'}>
                Click Here
              </Button>
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Request;
