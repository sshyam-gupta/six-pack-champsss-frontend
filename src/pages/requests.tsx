import { Heading } from '@chakra-ui/layout';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs';
import LoginRequired from '../components/layout/LoginRequired';
import PageContainer from '../components/layout/PageContainer';
import ApprovedRequest from '../components/requests/ApprovedRequest';
import PendingRequest from '../components/requests/PendingRequest';
import RejectedRequest from '../components/requests/RejectedRequest';

function Requests() {
  return (
    <LoginRequired>
      <PageContainer maxW="auto" mt="3rem">
        <Heading fontFamily="Comfortaa">Requests</Heading>
        <Tabs mt="2rem">
          <TabList>
            <Tab>Pending</Tab>
            <Tab>Approved</Tab>
            <Tab>Rejected</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <PendingRequest />
            </TabPanel>
            <TabPanel>
              <ApprovedRequest />
            </TabPanel>
            <TabPanel>
              <RejectedRequest />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </PageContainer>
    </LoginRequired>
  );
}

export default Requests;
