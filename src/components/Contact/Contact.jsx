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
import { contact } from '../../redux/actions/other';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const {
    loading,
    error,
    message: contactMessage,
  } = useSelector(state => state.other);
  const submitHandler = e => {
    e.preventDefault();
    dispatch(contact(name, email, message));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (contactMessage) {
      toast.success(contactMessage);
      setEmail('');
      setMessage('');
      setName('');
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, contactMessage]);
  return (
    <Container minH={'92vh'}>
      <VStack h={'full'} justifyContent={'center'} spacing={'16'}>
        <Heading children="Contact Us" />

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
            <FormLabel htmlFor="message" children="Message" />
            <Textarea
              required
              id="message"
              placeholder="Your Message..."
              focusBorderColor={'yellow.500'}
              value={message}
              onChange={e => setMessage(e.target.value)}
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
            Request for a course?{' '}
            <Link to="/request">
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

export default Contact;
