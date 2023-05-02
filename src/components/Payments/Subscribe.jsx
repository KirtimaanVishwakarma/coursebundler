import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { server } from '../../redux/store';
import { buySubscription } from '../../redux/actions/payment';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Logo from '../../assets/images/logo.png';

const Subscribe = ({ user }) => {
  const dispatch = useDispatch();
  const [key, setKey] = useState('');
  const { loading, error, subscriptionId } = useSelector(
    state => state.subscription
  );
  const { error: courseError } = useSelector(state => state.course);
  const subscribeHandler = async () => {
    const { data } = await axios.get(`${server}/razorpaykey`);
    setKey(data.key);
    dispatch(buySubscription());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (courseError) {
      toast.error(courseError);
      dispatch({ type: 'clearError' });
    }
    if (subscriptionId) {
      const openPopUp = () => {
        const options = {
          key,
          name: 'CourseBundler',
          description: 'Get access to all premium content',
          image: Logo,
          subscription_id: subscriptionId,
          callback_url: `${server}/paymentvarification`,
          prefill: {
            name: user.name, //your customer's name
            email: user.email,
            contact: '',
          },
          notes: {
            address: 'Kirtimaan Web Developer',
          },
          theme: {
            color: '#FFC800',
          },
        };

        const razor = new window.Razorpay(options);
        razor.open();
      };
      openPopUp();
    }
  }, [
    dispatch,
    error,
    key,
    subscriptionId,
    user.email,
    user.name,
    courseError,
  ]);
  return (
    <Container minH={'90vh'} p={'16'}>
      <Heading children="Welcome" my={'8'} textAlign={'center'} />
      <VStack
        boxShadow={'lg'}
        alignItems={'stretch'}
        borderRadius={'lg'}
        spacing={'0'}
      >
        <Box bg={'yellow.400'} p={'4'} css={{ borderRadius: '8px 8px 0 0' }}>
          <Text color={'black'} children={`Pro Pack - ₹299.00`} />
        </Box>
        <Box p={'4'}>
          <VStack textAlign={'center'} px={'8'} mt={'4'} spacing={'8'}>
            <Text children={`Join Pro pack and get Access to all content.`} />
            <Heading size={'md'} children={'₹299.00 Only'} />
          </VStack>
          <Button
            my={'8'}
            w={'full'}
            colorScheme="yellow"
            onClick={subscribeHandler}
            isLoading={loading}
          >
            Buy Now
          </Button>
        </Box>
        <Box
          bg={'blackAlpha.600'}
          p={'4'}
          css={{ borderRadius: '0 0 8px 8px' }}
        >
          <Heading
            size={'sm'}
            children={'100% refund at cancellation'}
            color={'white'}
            textTransform={'uppercase'}
          />
          <Text
            fontSize={'xs'}
            color={'white'}
            children={'*Tems & condition applied'}
          />
        </Box>
      </VStack>
    </Container>
  );
};

export default Subscribe;
