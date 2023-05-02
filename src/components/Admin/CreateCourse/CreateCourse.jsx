import {
  Grid,
  Container,
  Heading,
  VStack,
  Input,
  Select,
  Image,
  Button,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import cursor from '../../../assets/images/cursor4.png';
import Sidebar from '../Sidebar';
import { fileUploadCss } from '../../Auth/Register';
import { useDispatch, useSelector } from 'react-redux';
import { createCourse } from '../../../redux/actions/admin';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

const CreateCourse = ({ user }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // const [createdBy, setCreatedBy] = useState(user.name);
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [imagePrev, setImagePrev] = useState('');

  const createdBy = user.name;
  const categories = [
    'Web development',
    'Artificial Intellengence',
    'Data Structure & Algorithum',
    'App Development',
    'Data Science',
    'Game Development',
  ];
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
  const { loading, error, message } = useSelector(state => state.admin);

  const submitHandler = e => {
    e.preventDefault();
    const myForm = new FormData();
    // title, description, category, createdBy,file
    myForm.append('title', title);
    myForm.append('description', description);
    myForm.append('category', category);
    myForm.append('createdBy', createdBy);
    myForm.append('file', image);
    dispatch(createCourse(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      setTitle('');
      setDescription('');
      setCategory('');
      setImage('');
      setImagePrev('');
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);
  return (
    <Grid
      css={{
        cursor: `url(${cursor}),auto`,
      }}
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
    >
      <Container py="16">
        <form onSubmit={submitHandler}>
          <Heading
            textTransform={'uppercase'}
            children="Create form"
            textAlign={['center', 'left']}
            my="16"
          />
          <VStack m="auto" spacing={'8'}>
            <Input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Title"
              type="text"
              focusBorderColor="purple.300"
            />
            <Input
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Description"
              type="text"
              focusBorderColor="purple.300"
            />
            <Input
              value={createdBy}
              readOnly
              // onChange={e => setCreatedBy(e.target.value)}
              placeholder={user.name}
              type="text"
              focusBorderColor="purple.300"
            />
            <Select
              focusBorderColor="purple.300"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option value="">Category</option>
              {categories.map(item => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
            <Input
              type="file"
              accept="image/*"
              css={{
                '&::file-selector-button': {
                  ...fileUploadCss,
                  color: 'purple',
                },
              }}
              required
              focusBorderColor="purple.300"
              onChange={changeImageHandler}
            />
            {imagePrev && (
              <Image src={imagePrev} boxSize={'64'} objectFit={'contain'} />
            )}
            <Button
              isLoading={loading}
              type="submit"
              w="full"
              colorScheme="purple"
            >
              Create
            </Button>
          </VStack>
        </form>
      </Container>
      <Sidebar />
    </Grid>
  );
};

export default CreateCourse;
