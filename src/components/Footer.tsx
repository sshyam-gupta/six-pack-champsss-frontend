import { Box, Text } from '@chakra-ui/react';
import * as AppData from '../constants/app.json';

export const Footer = () => (
  <Box as="footer" mt={4} p={4} textAlign="center">
    <Text fontSize="sm">
      <span>{`Created with ♥ by ${AppData['presented-by']}`}</span>
    </Text>
  </Box>
);
