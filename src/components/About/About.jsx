import {
  Avatar,
  Button,
  Container,
  Heading,
  Box,
  Stack,
  Text,
  VStack,
  HStack,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import introVideo from '../../assets/videos/introvideo.mp4';
import { RiSecurePaymentFill } from 'react-icons/ri';
import { data } from '../../assets/docs/termsAndCondition';

const Founder = () => {
  return (
    <Stack direction={['column', 'row']} spacing={['4', '16']} padding={'8'}>
      <VStack>
        <Avatar
          boxSize={['40', '48']}
          src="https://avatars.githubusercontent.com/u/112248934?v=4"
        />
        <Text children="Co-Founder" opacity={0.7} />
      </VStack>
      <VStack justifyContent={'center'} alignItems={['center', 'flex-start']}>
        <Heading children="Kirtimaan Vishwakarma" size={['md', 'xl']} />
        <Text
          textAlign={['center', 'left']}
          children="Hi, I am a full-stack developer and a teacher. Our mission is to provide quality content at reasonable price."
        />
      </VStack>
    </Stack>
  );
};

const VideoPlayer = () => (
  <Box>
    <video
      autoPlay
      muted
      loop
      controls
      controlsList="nodownload nofullscreen noremoteplayback"
      disablePictureInPicture
      disableRemotePlayback
      src={introVideo}
    ></video>
  </Box>
);

const TermsCondition = ({ termsAndCondition }) => {
  return (
    <Box>
      <Heading
        size={'md'}
        children="Terms & Conditions"
        textAlign={['center', 'left']}
        my={'4'}
      />
      <Box h={'sm'} p={'4'} overflowY={'scroll'}>
        <Text
          textAlign={['center', 'left']}
          letterSpacing={'widest'}
          fontFamily={'heading'}
        >
          {termsAndCondition}
        </Text>
        <Heading
          my={'4'}
          size={'xs'}
          children="Refund only applicable for cancellation with 7 days!"
        />
      </Box>
    </Box>
  );
};

const About = () => {
  return (
    <Container maxW={'container.lg'} padding={'16'} boxShadow={'lg'}>
      <Heading children="About us" textAlign={['center', 'left']} />
      <Founder />
      <Stack m={'8'} direction={['column', 'row']} alignItems={'center'}>
        <Text fontFamily={'cursive'} textAlign={['center', 'left']}>
          We are a video streaming platform with some premius courses avaliable
          only for premium users.
        </Text>

        <Link to="/subscribe">
          <Button variant={'ghost'} colorScheme="yellow">
            Checkout Our Plan
          </Button>
        </Link>
      </Stack>

      <VideoPlayer />

      <TermsCondition termsAndCondition={data} />

      <HStack my={'4'} p={'4'}>
        <RiSecurePaymentFill />
        <Heading
          size={'xs'}
          fontFamily={'sans-serif'}
          textTransform={'uppercase'}
          children="Payment is secured by RazorPay"
        />
      </HStack>
    </Container>
  );
};

export default About;
