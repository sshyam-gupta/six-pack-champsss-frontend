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
import { getTimeOptionByValue, TIME_OPTIONS } from '../../constants/time-options';
import { Textarea } from '@chakra-ui/textarea';
import { FormControl, FormHelperText, FormLabel } from '@chakra-ui/form-control';
import { useColorMode } from '@chakra-ui/color-mode';
import { useTheme } from '@chakra-ui/system';
import { Controller, useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import useSWR from 'swr';
import { PROJECTS } from '../../services/api/endpoints';
import { Activity } from '../../util/activity-util';
import { useProject } from '../../hooks/use-project';

interface EditActivityProps extends Activity {
  isOpen: boolean;
  onClose: (name?: string) => void;
}

const EditActivity = ({ isOpen, onClose, ...activity }: EditActivityProps) => {
  const [isEditingActivity, setIsEditingActivity] = useState(false);
  const { data } = useSWR(PROJECTS);
  const toast = useToast();
  const { getProjectNameById } = useProject();
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
    defaultValues: {
      description: activity.description,
      duration: {
        label: getTimeOptionByValue(activity.duration).label,
        value: activity.duration,
      },
      project_id: {
        value: activity.project_id,
        label: getProjectNameById(activity.project_id),
      },
    },
  });

  const onSubmit = async data => {
    setIsEditingActivity(true);
    const reqData = {
      description: data.description,
      duration: data.duration.value,
      project_id: data.project_id.value,
      points_requested: (20 * data.duration.value) / 60,
      performed_on: dayjs().format(),
    };
    const { error, data: activities } = await ProjectService.editActivity(activity.id, reqData);
    setIsEditingActivity(false);
    if (error) {
      toast({
        description: error,
        status: 'error',
        isClosable: true,
        position: 'top',
      });
      return;
    }
    toast({
      description: `${reqData.description} edited successfully`,
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
          <ModalHeader>Edit Activity</ModalHeader>
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
            <Button variant="ghost" isDisabled={isEditingActivity} onClick={() => void onClose()}>
              Close
            </Button>
            <Button type="submit" ml={3} isLoading={isEditingActivity}>
              Edit
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};
export default EditActivity;