import { Container, Flex, Heading, Stack, Text } from '@chakra-ui/layout';
import Image from 'next/image';
import { DarkModeSwitch } from '../components/Header';

function AboutUs() {
  return (
    <Container maxW="container.xl" as="main" className="main-content" overflow="auto" h="100vh">
      <Flex position="absolute" top="2rem" right="2rem">
        <DarkModeSwitch />
      </Flex>
      <Stack alignItems="center" mb="2rem">
        <Heading mt="2rem" fontFamily="Comfortaa" textAlign="center">
          Six Pack Champsss
        </Heading>
        <Image src="/images/logo.png" height={300} width={300} alt="Logo" />
        <Stack maxW="50rem" fontSize="lg" spacing={6}>
          <Text>
            Six Pack Champsss is a team of 6 people where champsss stands for Coders Harmonious Athira, Mayank, Prayesh,
            Shyam, Shubham & Supriya. Ampsss is initials of we six people. ok lets think about describing our logo, why
            we choose that structure.
          </Text>
          <Text>
            We selected Hexagon as base because we are team of 6 where each member represents one side of hexagon that
            makes our team strong. And as we all know Hexagon is the strongest shape. So our tagline also says that
            Hex-a-gone beyond your power - we as a team has gone beyond individual power
          </Text>
          <Text>
            Kiprosh Laureate Awards Portal (KLAP) is a portal which we have created for the Kiprosh associates.
            Associates can login to this portal and claim for points if they have contributed to other departments like
            Hiring, KFC, & COE of the Organization.
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
