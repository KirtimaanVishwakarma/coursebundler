import {
  Avatar,
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
import { register } from '../../redux/actions/user';

// fileUploadStyle
export const fileUploadCss = {
  cursor: 'pointer',
  marginLeft: '-5%',
  width: '110%',
  height: '100%',
  border: 'none',
  color: '#ECC94B',
  backgroundColor: 'white',
};

const fileUploadStyle = {
  '&::file-selector-button': fileUploadCss,
};

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imagePrev, setImagePrev] = useState('');
  const [image, setImage] = useState('');

  console.log(image);

  const changeImageHandler = e => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    // console.log(reader);
    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };
  const dispatch = useDispatch();
  const submitHandler = e => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.append('name', name);
    myForm.append('email', email);
    myForm.append('password', password);
    myForm.append('file', image);
    dispatch(register(myForm));
  };
  return (
    <Container minH={'95vh'}>
      <VStack h={'full'} justifyContent={'center'} spacing={'16'}>
        <Heading children="registeration" textTransform={'uppercase'} />
        <form onSubmit={submitHandler} style={{ width: '100%' }}>
          <Box my={'4'} textAlign={'center'}>
            <Avatar src={imagePrev} size={'2xl'} />
          </Box>
          <Box marginY={'4'}>
            <FormLabel htmlFor="name" children="Name" />
            <Input
              required
              id="name"
              type={'text'}
              placeholder="Enter your name"
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
          <Box marginY={'4'}>
            <FormLabel htmlFor="chooseAvtar" children="Choose Avtar" />
            <Input
              accept={'image/*'}
              required
              id="chooseAvtar"
              type={'file'}
              focusBorderColor={'yellow.500'}
              css={fileUploadStyle}
              onChange={changeImageHandler}
            />
          </Box>
          <Button type="submit" my={'4'} colorScheme="yellow">
            Sign Up
          </Button>
          <Box my={'4'}>
            Aleady Signed Up?{' '}
            <Link to="/login">
              <Button colorScheme="yellow" variant={'link'}>
                Sign In
              </Button>{' '}
              here!
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Register;
