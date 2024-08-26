import { AttachmentIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Heading,
  List,
  ListIcon,
  ListItem,
  Stack,
} from '@chakra-ui/react';
import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { uploadFile } from '../../../../app/services/equipmentsService/uploadFile';
import { getFileExtension } from '../../../../app/utils/getFileExtension';

interface FileUploadModalProps {
  closeUploadModal: () => Promise<void>;
  isUploadModalOpen: boolean;
}

export const FileUploadModal = ({
  isUploadModalOpen,
  closeUploadModal,
}: FileUploadModalProps) => {
  const cancelRef = useRef(null);

  const [isUploading, setIsUploading] = useState(false);

  const [fileError, setFileError] = useState<string | null>(null);

  const [files, setFiles] = useState<File[]>([]);

  const [filesLimit] = useState<number>(1);

  const shouldDisableUploadBtn = useCallback(() => {
    return files.length === filesLimit;
  }, [files.length, filesLimit]);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files && Array.from(event.target.files);
    if (!fileList?.length) {
      return;
    }

    if (
      fileList.some((fileObj: File) => {
        const fileExt = getFileExtension(fileObj.name);
        return !(fileExt === 'csv');
      })
    ) {
      setFiles([]);
      setFileError('The file format must be csv');
    } else {
      // eslint-disable-next-line no-param-reassign
      event.target.value = '';
      setFileError(null);
      setFiles(fileList);
    }
  };

  const onSubmitSiteFile = useCallback(async () => {
    setIsUploading(true);
    try {
      if (files.length) {
        await Promise.all(
          files.map(async (file) => {
            const result = await uploadFile({
              file,
            });
            toast.success(result.message);
          })
        );
      }
      setFiles([]);
      setFileError(null);
      setIsUploading(false);
      closeUploadModal();
    } catch (err: any) {
      setIsUploading(false);
      toast.error(String(err));
    }
  }, [closeUploadModal, files]);

  const handleCancelUpload = () => {
    setIsUploading(false);
    setFileError(null);
    setFiles([]);
    closeUploadModal();
  };

  const uploadRef = useRef<HTMLInputElement>(null);

  return (
    <AlertDialog
      isOpen={isUploadModalOpen}
      motionPreset="slideInBottom"
      size={{
        'base': 'xs',
        'sm': 'sm',
        'md': 'lg',
        'lg': 'md',
        'xl': 'md',
        '2xl': 'md',
      }}
      leastDestructiveRef={cancelRef}
      closeOnOverlayClick={false}
      onClose={handleCancelUpload}
      isCentered>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader
            fontSize="lg"
            color="#1E1E1E"
            letterSpacing={-0.5}
            fontWeight="bold"
            mt="10px">
            Upload Equipments File
          </AlertDialogHeader>

          <AlertDialogBody>
            <Stack spacing={2} height="90px">
              <Button
                isDisabled={shouldDisableUploadBtn()}
                color="#fff"
                borderRadius={20}
                alignItems="center"
                justifyContent="center"
                padding={5}
                mb="15px"
                width="110px"
                fontSize="15px"
                letterSpacing={-0.5}
                backgroundColor="#847BFB"
                border="solid 1px #847BFB"
                _hover={{ bg: '#6626BE', border: 'solid 1px #6626BE' }}
                onClick={() => {
                  uploadRef.current?.click();
                }}>
                Select file
              </Button>
              <input
                ref={uploadRef}
                type="file"
                id="rollout-upload"
                name="rollout-upload"
                multiple
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <List spacing={3}>
                {files.map((file) => {
                  return (
                    <ListItem
                      whiteSpace="nowrap"
                      overflow="hidden"
                      textOverflow="ellipsis"
                      key={file.name}
                      className="mt-2 text-base leading-normal">
                      <ListIcon as={AttachmentIcon} color="gray.500" />
                      <ListIcon
                        onClick={() => {
                          setFiles([]);
                        }}
                        as={DeleteIcon}
                        cursor="pointer"
                        color="red.500"
                      />
                      {file.name}
                    </ListItem>
                  );
                })}
              </List>
              {fileError && (
                <Heading as="h5" size="xs" color="red.500">
                  {fileError}
                </Heading>
              )}
            </Stack>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              color="#fff"
              borderRadius={20}
              backgroundColor="#847BFB"
              border="solid 1px #847BFB"
              _hover={{ bg: '#44197e', border: 'solid 1px #44197e' }}
              height="32px"
              fontSize="15px"
              letterSpacing={-0.5}
              width="80px"
              isLoading={isUploading}
              isDisabled={!files.length}
              onClick={onSubmitSiteFile}
              mr={2}>
              Send
            </Button>
            <Button
              color="#1E1E1E"
              backgroundColor="#fff"
              border="solid 1px #1E1E1E"
              borderRadius={20}
              _hover={{
                bg: 'gray',
                color: '#fff',
                border: 'solid 1px gray',
              }}
              height="32px"
              fontSize="15px"
              letterSpacing={-0.5}
              width="80px"
              ref={cancelRef}
              onClick={handleCancelUpload}>
              Cancel
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
