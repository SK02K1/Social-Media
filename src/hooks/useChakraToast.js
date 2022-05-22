import { useToast } from '@chakra-ui/react';

const status = {
  fulfilled: 'success',
  rejected: 'error',
};

export const useChakraToast = () => {
  const toast = useToast();

  const chakraToast = ({ payload, meta }) => {
    if (payload && meta) {
      toast({
        title: payload?.message,
        status: status[meta?.requestStatus],
        variant: 'solid',
      });
    }
  };

  return chakraToast;
};
