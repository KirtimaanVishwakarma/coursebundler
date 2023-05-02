import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
// import introVideo from '../../assets/videos/introvideo.mp4';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCourseLecture } from '../../redux/actions/course';
import { Navigate } from 'react-router-dom';
import Loader from '../layout/Loader';

const CoursePage = ({ user }) => {
  const [lectureNumber, setLectureNumber] = useState(0);

  const { lectures, loading } = useSelector(state => state.course);

  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getCourseLecture(params.id));
  }, [dispatch, params.id]);

  if (
    user.role !== 'admin' &&
    (user.subscription === undefined || user.subscription.status !== 'active')
  ) {
    return <Navigate to="/subscribe" />;
  }
  return loading ? (
    <Loader />
  ) : (
    <>
      <Grid minH={'90vh'} templateColumns={['1fr', '3fr 1fr']}>
        {lectures && lectures.length > 0 ? (
          <>
            <Box>
              <video
                width={'100%'}
                autoPlay
                controls
                controlsList="nodownload noremoteplayback"
                disablePictureInPicture
                disableRemotePlayback
                src={lectures[lectureNumber].video.url}
              ></video>

              <Heading
                m={'4'}
                children={`#${lectureNumber + 1} ${
                  lectures[lectureNumber].title
                }`}
              />
              <Heading m={'4'} children={`Description`} />
              <Text
                m={'4'}
                children={`${lectures[lectureNumber].description}`}
              />
            </Box>

            <VStack>
              {lectures &&
                lectures.map((item, ind) => (
                  <button
                    onClick={() => setLectureNumber(ind)}
                    key={item._id}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      textAlign: 'center',
                      margin: 0,
                      borderBottom: '1px solid rgba(0,0,0,0.2)',
                    }}
                  >
                    <Text>
                      #{ind + 1} {item.title}
                    </Text>
                  </button>
                ))}
            </VStack>
          </>
        ) : (
          <Heading children="No Lectures" />
        )}
      </Grid>
    </>
  );
};

export default CoursePage;

// #11
