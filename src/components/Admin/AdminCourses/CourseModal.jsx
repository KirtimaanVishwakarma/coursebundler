import {
  Grid,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Box,
  Stack,
  Text,
  Button,
  VStack,
  Input,
  ModalFooter,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { fileUploadCss } from '../../Auth/Register';

const CourseModal = ({
  loading,
  isOpen,
  onClose,
  id,
  deleteButtonHandler,
  addLectureHandler,
  courseTitle,
  lectures = [],
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState('');
  const [videoPrev, setVideoPrev] = useState('');

  const changeVideoHandler = e => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    // console.log(reader);
    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setVideo(file);
    };
  };
  const closeHandler = () => {
    setTitle('');
    setDescription('');
    setVideoPrev('');
    setVideo('');
    onClose();
  };
  return (
    <Modal
      isOpen={isOpen}
      size={'full'}
      onClose={closeHandler}
      scrollBehavior={'outside'}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>React Course</ModalHeader>
        <ModalCloseButton />
        <ModalBody p={'16'}>
          <Grid templateColumns={['1fr', '3fr 1fr']}>
            <Box px={['0', '16']}>
              <Box my="5">
                <Heading children={courseTitle} />
                <Heading children={`#${id}`} size={'sm'} opacity={0.4} />
              </Box>

              <Heading children={'Lectures'} size={'lg'} />
              {lectures.map((item, ind) => (
                <VideoCard
                  key={item._id}
                  title={item.title}
                  description={item.description}
                  num={ind + 1}
                  lectureId={item._id}
                  courseId={id}
                  deleteButtonHandler={deleteButtonHandler}
                  loading={loading}
                />
              ))}
            </Box>

            <Box>
              <form
                onSubmit={e =>
                  addLectureHandler(e, id, title, description, video)
                }
              >
                <VStack spacing={'4'}>
                  <Heading
                    children="Add Lecture"
                    textTransform={'uppercase'}
                    size={'md'}
                  />
                  <Input
                    focusBorderColor={'purple.300'}
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                  <Input
                    focusBorderColor={'purple.300'}
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                  <Input
                    type="file"
                    accept="video/mp4"
                    css={{
                      '&::file-selector-button': {
                        ...fileUploadCss,
                        color: 'purple',
                      },
                    }}
                    required
                    focusBorderColor="purple.300"
                    onChange={changeVideoHandler}
                  />
                  {videoPrev && (
                    <video
                      controlsList="nodownload"
                      controls
                      src={videoPrev}
                    ></video>
                  )}
                  <Button
                    type="submit"
                    colorScheme={'purple'}
                    isLoading={loading}
                  >
                    Upload
                  </Button>
                </VStack>
              </form>
            </Box>
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Button onClick={closeHandler}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CourseModal;

function VideoCard({
  loading,
  title,
  description,
  num,
  lectureId,
  courseId,
  deleteButtonHandler,
}) {
  return (
    <Stack
      direction={['column', 'row']}
      my="8"
      borderRadius={'lg'}
      boxShadow={'0 0 10px rgba(107,70,193,0.5)'}
      justifyContent={['flex-start', 'space-between']}
      p={['4', '8']}
    >
      <Box>
        <Heading children={`#${num} ${title}`} size={'sm'} />
        <Text children={description} />
      </Box>
      <Button
        isLoading={loading}
        color={'purple.600'}
        onClick={() => deleteButtonHandler(courseId, lectureId)}
      >
        <RiDeleteBin7Fill />
      </Button>
    </Stack>
  );
}
