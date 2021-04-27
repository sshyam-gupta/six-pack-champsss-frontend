import { Box, Text } from '@chakra-ui/react';
import Link from 'next/link';
import * as AppData from '../constants/app.json';

export const Footer = () => (
  <Box as="footer" mt={4} p={4} textAlign="center">
    <Text fontSize="sm">
      <span>{`Created with ♥ by `}</span>
      <Link href="/about-us">{AppData['presented-by']}</Link>
    </Text>
  </Box>
);
