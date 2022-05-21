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
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';

export const EditProfile = ({ userData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState(userData);
  const { firstName, lastName, bio, siteLink } = formData;

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
        <ModalContent>
          <ModalHeader>
            <HStack>
              <Text>Edit your profile</Text>
              <EditIcon />
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody as='form' pb={6}>
            <SimpleGrid columns={2} spacing={4}>
              <GridItem colSpan={2}>
                <FormLabel cursor='pointer'>
                  Change Profile Avatar
                  <Input type='file' display='none' />
                </FormLabel>
              </GridItem>
              <GridItem colSpan={1}>
                <Input value={firstName} />
              </GridItem>
              <GridItem colSpan={1}>
                <Input value={lastName} />
              </GridItem>
              <GridItem colSpan={2}>
                <Input value={bio} />
              </GridItem>
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
