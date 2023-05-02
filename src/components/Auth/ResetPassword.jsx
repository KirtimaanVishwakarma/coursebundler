import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { resetPassword } from '../../redux/actions/profile';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const ResetPassword = () => {
  const [password, setPassword] = useState('');

  const { loading, error, message } = useSelector(state => state.profile);

  const { token } = useParams();

  const navigate = useNavigate();
  const submitHandler = e => {
    e.preventDefault();
    dispatch(resetPassword(token, password));
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
      navigate('/login');
    }
    setPassword('');
  }, [dispatch, error, message, navigate]);
  return (
    <Container py={'16'} minH={'90vh'}>
      <form onSubmit={submitHandler}>
        <Heading
          children="Reset Password"
          my={'16'}
          textTransform={'uppercase'}
          textAlign={'center'}
        />
        <VStack spacing={'8'}>
          <Input
            required
            id="email"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter New Password"
            type={'password'}
            focusBorderColor="yellow.500"
          />
          <Button
            isLoading={loading}
            type="submit"
            w={'full'}
            colorScheme="yellow"
          >
            Reset Password
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ResetPassword;
