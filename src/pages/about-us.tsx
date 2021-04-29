import { IconButton } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { Container, Flex, Heading, Stack, Text } from '@chakra-ui/layout';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { DarkModeSwitch } from '../components/Header';

function AboutUs() {
  const bg = useColorModeValue('white', 'gray.800');
  const router = useRouter();

  return (
    <Container p={0} pl="0.5rem" maxW="container.xl" as="main" className="main-content" overflow="auto" h="100vh">
      <Flex boxShadow="md" zIndex={1} bg={bg} p="1.5rem" top={0} justify="center" alignItems="center" position="sticky">
        <IconButton aria-label="Back" fontSize="2rem" variant="outline" onClick={() => router.push('/')}>
          <ChevronLeftIcon />
        </IconButton>
        <Heading fontFamily="Comfortaa" textAlign="center" flex={1}>
          Six Pack Champsss
        </Heading>
        <Flex justify="flex-end" ml="1rem">
          <DarkModeSwitch />
        </Flex>
      </Flex>
      <Stack alignItems="center" mb="2rem">
        <Image src="/images/logo.png" height={300} width={300} alt="Logo" />
        <Stack maxW="50rem" fontSize="lg" spacing={6}>
          <Text>
            <Text fontWeight={500} display="inline">
              Six Pack Champsss
            </Text>
            {` is a team of 6 people where champsss stands for  `}
            <Text as="i">Coders Harmonious </Text>
            <Text as="i">Athira, </Text>
            <Text as="i">Mayank, </Text>
            <Text as="i">Prayesh, </Text>
            <Text as="i">Shyam, </Text>
            <Text as="i">Shubham, </Text>
            <Text as="i"> & Supriya. </Text>
            <Text as="i"> </Text>{' '}
            <Text fontWeight={500} display="inline">
              Ampsss{` `}
            </Text>
            is initials of we six people. ok lets think about describing our logo, why we choose that structure.
          </Text>
          <Text>
            We selected Hexagon as base because we are team of 6 where each member represents one side of hexagon that
            makes our team strong. And as we all know Hexagon is the strongest shape. So our tagline also says that
            Hex-a-gone beyond your power - we as a team has gone beyond individual power
          </Text>
          <Text>
            <Text fontWeight={500} display="inline">
              Kiprosh Laureate Awards Portal (KLAP)
            </Text>
            {` `}
            is a portal which we have created for the Kiprosh associates. Associates can login to this portal and claim
            for points if they have contributed to other departments like Hiring, KFC, & COE of the Organization.
          </Text>
          <Text>
            The reason we have named it as KLAP because with the help of this portal we are applauding associates for
            their dedication towards the organization.
          </Text>
        </Stack>
      </Stack>
    </Container>
  );
}

export default AboutUs;
