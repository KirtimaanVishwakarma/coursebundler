import {
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllCourses } from '../../redux/actions/course';
import { toast } from 'react-hot-toast';
import { addToPlaylist } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/user';

// single Course Component start
const Course = ({
  view,
  title,
  imageSrc,
  id,
  addToPlaylistHandler,
  creator,
  description,
  lectureCount,
  loading,
}) => {
  return (
    <VStack className="course" alignItems={['center', 'flex-start']}>
      <Image src={imageSrc} boxSize={'60'} objectFit={'contain'} />
      <Heading
        textAlign={['center', 'left']}
        size={'sm'}
        maxW={'200px'}
        fontFamily={'sans-serif'}
        noOfLines={3}
        children={title}
      />
      <Text noOfLines={2} children={description} />
      <HStack>
        <Text
          fontWeight={'bold'}
          textTransform={'uppercase'}
          children={'creator'}
        />
        <Text
          fontFamily={'body'}
          textTransform={'uppercase'}
          children={creator}
        />
      </HStack>
      <Heading
        textAlign={'center'}
        size={'xs'}
        textTransform={'uppercase'}
        children={`Letures - ${lectureCount}`}
      />
      <Heading
        textTransform={'uppercase'}
        size={'xs'}
        children={`Views - ${view}`}
      />

      <Stack direction={['column', 'row']} alignItems={'center'}>
        <Link to={`/course/${id}`}>
          <Button colorScheme="yellow">Watch Now</Button>
        </Link>
        <Button
          onClick={() => addToPlaylistHandler(id)}
          variant={'ghost'}
          colorScheme="yellow"
          isLoading={loading}
        >
          Add To Playlist
        </Button>
      </Stack>
    </VStack>
  );
};

// single Course Component end

const Courses = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');

  const dispatch = useDispatch();
  const { loading, courses, error, message } = useSelector(
    state => state.course
  );

  const addToPlaylistHandler = async courseId => {
    await dispatch(addToPlaylist(courseId));
    dispatch(loadUser());
  };
  const categories = [
    'Web development',
    'Artificial Intellengence',
    'Data Structure & Algorithum',
    'App Development',
    'Data Science',
    'Game Development',
  ];
  useEffect(() => {
    dispatch(getAllCourses(category, keyword));

    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, keyword, category, error, message]);
  return (
    <Container minH={'95vh'} maxW="container.lg" paddingY={'8'}>
      <Heading children="All Courses" m={'8'} />

      <Input
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="Search a course..."
        type={'text'}
        focusBorderColor="yellow.500"
      />

      <HStack paddingY={'8'} marginY={'4'} overflow={'auto'}>
        {categories.map((item, ind) => (
          <Button key={ind} onClick={() => setCategory(item)} minW={'60'}>
            <Text children={item} />
          </Button>
        ))}
      </HStack>

      <Stack
        direction={['column', 'row']}
        flexWrap={'wrap'}
        justifyContent={['flex-start', 'space-evenly']}
        alignItems={['center', 'flex-start']}
      >
        {courses.length > 0 ? (
          courses.map(item => (
            <Course
              key={item._id}
              view={item.views}
              title={item.title}
              imageSrc={item.poster.url}
              id={item._id}
              addToPlaylistHandler={addToPlaylistHandler}
              creator={item.createdBy}
              description={item.description}
              lectureCount={item.numOfVideos}
              loading={loading}
            />
          ))
        ) : (
          <Heading children="Course Not Found!" opacity={0.5} mt="4" />
        )}
      </Stack>
    </Container>
  );
};

export default Courses;
