import {
  Avatar,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const FollowersModal = ({ followers }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  return (
    <>
      <Text
        _hover={{ cursor: 'pointer', textDecoration: 'underline' }}
        onClick={onOpen}
      >
        Followers
      </Text>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalContent />
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Followers</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack
              alignItems='flex-start'
              justifyContent='space-evenly'
              spacing={4}
            >
              {followers.length !== 0 ? (
                followers.map((userData) => {
                  const { _id, firstName, lastName, username } = userData;
                  return (
                    <HStack
                      key={_id}
                      padding={4}
                      justifyContent='space-between'
                      alignItems='flex-start'
                      w='full'
                    >
                      <HStack
                        cursor='pointer'
                        onClick={() => {
                          navigate(`/users/${username}`);
                          onClose();
                        }}
                      >
                        <Avatar src={userData?.avatarURL} size='md' />
                        <VStack spacing={1} alignItems='flex-start'>
                          <Text>
                            {firstName} {lastName}
                          </Text>
                          <Text opacity={0.5} fontSize='sm'>
                            @{username}
                          </Text>
                        </VStack>
                      </HStack>
                    </HStack>
                  );
                })
              ) : (
                <Text textAlign='center' py={4}>
                  No follower found
                </Text>
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
