import { useState } from 'react';
import { EditIcon } from '@chakra-ui/icons';
import { AiFillCamera } from 'react-icons/ai';

import {
  Avatar,
  Box,
  Button,
  FormLabel,
  GridItem,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { inputChangeHandler } from 'utilities';
import { useDispatch, useSelector } from 'react-redux';
import { editUserData } from 'app/features';

export const EditProfile = ({ userData }) => {
  const { token } = useSelector((store) => store.auth.userData);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState(userData);
  const { firstName, lastName, bio, siteLink, avatarURL } = formData;

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showLoader, setShowLoader] = useState(false);

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
  };

  const fieldChangeHandler = (e) => {
    setFormData(inputChangeHandler({ e, formData }));
  };

  const fileChangeHandler = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    previewFile(selectedFile);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (file) {
      setShowLoader(true);
      if (Math.floor(file / 1000000) > 3) {
        console.log('Image file size should be less than 3MB', 'error');
        return;
      }
      const url = 'https://api.cloudinary.com/v1_1/dx0fxfuix/image/upload';

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'vixdj9rv');

      const requestOptions = {
        method: 'POST',
        body: formData,
      };

      fetch(url, requestOptions)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          return dispatch(
            editUserData({
              token,
              userData: { ...formData, avatarURL: data.url },
            })
          );
        })
        .then(() => {
          setShowLoader(false);
          onClose();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <Button colorScheme='blue' onClick={onOpen}>
        Edit
      </Button>

      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent onSubmit={submitHandler} as='form'>
          <ModalHeader>
            <HStack>
              <Text>Edit your profile</Text>
              <EditIcon />
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <SimpleGrid columns={2} spacing={4}>
              <GridItem colSpan={1}>
                <FormLabel cursor='pointer' htmlFor='avatarURL'>
                  <Avatar pos='relative' src={preview || avatarURL} size='lg'>
                    <Box color='teal' pos='absolute' top={0} right={-2}>
                      <AiFillCamera />
                    </Box>
                  </Avatar>
                </FormLabel>
              </GridItem>
              <GridItem colSpan={1}>
                <Input
                  onChange={fileChangeHandler}
                  name='avatarURL'
                  id='avatarURL'
                  type='file'
                  display='none'
                />
              </GridItem>
              <GridItem colSpan={1}>
                <FormLabel htmlFor='firstName'>First Name</FormLabel>
                <Input
                  onChange={fieldChangeHandler}
                  id='firstName'
                  name='firstName'
                  value={firstName}
                  required
                />
              </GridItem>
              <GridItem colSpan={1}>
                <FormLabel htmlFor='lastName'>Last Name</FormLabel>
                <Input
                  onChange={fieldChangeHandler}
                  name='lastName'
                  id='lastName'
                  value={lastName}
                  required
                />
              </GridItem>
              <GridItem colSpan={2}>
                <FormLabel htmlFor='bio'>Bio</FormLabel>
                <Input
                  onChange={fieldChangeHandler}
                  id='bio'
                  name='bio'
                  value={bio}
                />
              </GridItem>
              <GridItem colSpan={2}>
                <FormLabel htmlFor='siteLink'>Website</FormLabel>
                <Input
                  onChange={fieldChangeHandler}
                  type='url'
                  id='siteLink'
                  name='siteLink'
                  value={siteLink}
                />
              </GridItem>
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <Button
              type='submit'
              colorScheme='blue'
              mr={3}
              disabled={showLoader}
            >
              {showLoader ? <Spinner size='md' speed='0.2s' /> : 'Save'}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
