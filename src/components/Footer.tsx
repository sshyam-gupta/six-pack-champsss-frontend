import { Box, Stack, Text } from '@chakra-ui/react';
import * as AppData from '../constants/app.json';

export const Footer = () => (
  <Box as="footer" mt={12} textAlign="center">
    <Text fontSize="sm">
      <span>{`Created with ♥ by ${AppData['presented-by']}`}</span>
    </Text>
    <Stack mt={4} direction="row" spacing="12px" justify="center"></Stack>
  </Box>
);
