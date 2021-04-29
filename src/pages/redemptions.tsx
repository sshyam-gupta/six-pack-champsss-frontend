import { useColorModeValue } from '@chakra-ui/color-mode';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs';
import LoginRequired from '../components/layout/LoginRequired';
import PageContainer from '../components/layout/PageContainer';
import ApprovedRedemption from '../components/redemptions/ApprovedRedemption';
import PendingRedemption from '../components/redemptions/PendingRedemption';

function Redemptions() {
  const bg = useColorModeValue('white', 'gray.800');

  return (
    <LoginRequired>
      <PageContainer pageTitle="Redemptions">
        <Tabs mt="2rem" isLazy>
          <TabList position="sticky" top="0" zIndex={2} bg={bg}>
            <Tab>Pending</Tab>
            <Tab>Approved</Tab>
          </TabList>
          <TabPanels>
            <TabPanel px="0">
              <PendingRedemption />
            </TabPanel>
            <TabPanel px="0">
              <ApprovedRedemption />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </PageContainer>
    </LoginRequired>
  );
}

export default Redemptions;
