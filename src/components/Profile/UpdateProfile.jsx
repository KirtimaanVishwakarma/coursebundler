import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { updateProfile } from '../../redux/actions/profile';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../../redux/actions/user';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = async e => {
    e.preventDefault();
    await dispatch(updateProfile(name, email));

    // loadUser is so that after updating profile we can see the updated profile
    dispatch(loadUser());
    navigate('/profile');
  };

  const { loading } = useSelector(state => state.profile);
  return (
    <Container minH={'90vh'} py="16">
      <form onSubmit={submitHandler}>
        <Heading
          children="update profile"
          textTransform={'uppercase'}
          my="16"
          textAlign={['center', 'left']}
        />
        <VStack spacing={'8'}>
          <Input
            value={name}
            onChange={e => setName(e.target.value)}
            type="text"
            placeholder="Enter Name"
            focusBorderColor="yellow.500"
          />
          <Input
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
            placeholder="Enter Email"
            focusBorderColor="yellow.500"
          />
          <Button
            isLoading={loading}
            type="submit"
            w="full"
            colorScheme={'yellow'}
          >
            Update
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default UpdateProfile;
