import { useState } from 'react';
import { EditIcon } from '@chakra-ui/icons';

import {
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
  const { firstName, lastName, bio, siteLink } = formData;

  const [showLoader, setShowLoader] = useState(false);

  const fieldChangeHandler = (e) => {
    setFormData(inputChangeHandler({ e, formData }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setShowLoader(true);
    try {
      await dispatch(editUserData({ token, userData: formData }));
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setShowLoader(false);
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
