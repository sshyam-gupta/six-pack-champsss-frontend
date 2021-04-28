import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { Stack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { useState } from 'react';
import { useToast } from '@chakra-ui/toast';

import ProjectService from '../../services/project/project';
import SelectComponent from '../Select';
import { TIME_OPTIONS } from '../../constants/time-options';
import { Textarea } from '@chakra-ui/textarea';
import { FormControl, FormHelperText, FormLabel } from '@chakra-ui/form-control';
import { useColorMode } from '@chakra-ui/color-mode';
import { useTheme } from '@chakra-ui/system';
import { Controller, useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import useSWR from 'swr';
import { PROJECTS } from '../../services/api/endpoints';

const AddActivity = ({ isOpen, onClose }: { isOpen: boolean; onClose: (name?: string) => void }) => {
  const [isAddingActivity, setIsAddingActivity] = useState(false);
  const { data } = useSWR(PROJECTS);
  const toast = useToast();
  const { colorMode } = useColorMode();
  const {
    colors: { gray },
  } = useTheme();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = async data => {
    setIsAddingActivity(true);
    const reqData = {
      description: data.description,
      duration: data.duration.value,
      project_id: data.project_id.value,
      points_requested: (20 * data.duration.value) / 60,
      performed_on: dayjs().format(),
    };
    const { error, data: activities } = await ProjectService.addActivity(reqData);
    setIsAddingActivity(false);
    if (error) {
      toast({
        description: error,
        variant: 'top-accent',
        status: 'error',
        isClosable: true,
        position: 'top',
      });
      return;
    }
    toast({
      description: `${reqData.description} added successfully`,
      variant: 'top-accent',
      status: 'success',
      isClosable: true,
      position: 'top',
    });
    reset();
    onClose(activities);
  };

  return (
    <Modal closeOnOverlayClick={false} isCentered isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Activity</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <FormControl id="desc">
                <FormLabel>Description</FormLabel>
                <Textarea {...register('description', { required: true })} placeholder="Description" resize="none" />
                {errors.description && (
                  <FormHelperText mt="0" fontSize="xs" color="red.500">
                    Description is required!
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl id="time">
                <FormLabel>Time</FormLabel>
                <Controller
                  name="duration"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <SelectComponent
                      placeholder="Select time"
                      styles={{
                        control: () => ({
                          background: colorMode === 'dark' ? gray[700] : 'white',
                        }),
                      }}
                      options={TIME_OPTIONS}
                      {...field}
                    />
                  )}
                />

                {errors.duration && (
                  <FormHelperText mt="0" fontSize="xs" color="red.500">
                    Duration is required!
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl id="project">
                <FormLabel>Project</FormLabel>
                <Controller
                  name="project_id"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <SelectComponent
                      placeholder="Select project"
                      styles={{
                        control: () => ({
                          background: colorMode === 'dark' ? gray[700] : 'white',
                        }),
                      }}
                      options={data.projects.map(project => ({ label: project.name, value: project.id }))}
                      {...field}
                    />
                  )}
                />
                {errors.project_id && (
                  <FormHelperText mt="0" fontSize="xs" color="red.500">
                    Project is required!
                  </FormHelperText>
                )}
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" isLoading={isAddingActivity}>
              Add Project
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};
export default AddActivity;
