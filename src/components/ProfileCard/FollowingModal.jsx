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

export const FollowingModal = ({ following }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  return (
    <>
      <Text
        _hover={{ cursor: 'pointer', textDecoration: 'underline' }}
        onClick={onOpen}
      >
        Following
      </Text>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalContent />
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Following</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack
              alignItems='flex-start'
              justifyContent='space-evenly'
              spacing={4}
            >
              {following.length !== 0 ? (
                following.map((userData) => {
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
                  Not following anyone
                </Text>
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
