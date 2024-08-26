import { Button } from '@chakra-ui/react';
import { MouseEventHandler } from 'react';
import { AiOutlineUpload } from 'react-icons/ai';

export interface FileUploadBtnProps {
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
}

export const FileUploadBtn = ({ onClick }: FileUploadBtnProps) => {
  return (
    <Button
      leftIcon={<AiOutlineUpload size="21px" />}
      color="#fff"
      backgroundColor="#1E1E1E"
      borderRadius={20}
      height={['35px', '40px']}
      border="solid 1px #1E1E1E"
      fontSize={['12px', '14px']}
      display="flex"
      justifyContent="center"
      alignItems="center"
      pl={3}
      pr={3}
      onClick={onClick}
      _hover={{
        bg: '#847BFB',
        border: 'solid 1px #847BFB',
      }}>
      Upload File
    </Button>
  );
};
