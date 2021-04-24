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
      <PageContainer>
        <Heading fontFamily="Comfortaa">Requests</Heading>
        <Tabs mt="2rem" isLazy>
          <TabList>
            <Tab>Pending</Tab>
            <Tab>Approved</Tab>
            <Tab>Rejected</Tab>
          </TabList>
          <TabPanels>
            <TabPanel px="0">
              <PendingRequest />
            </TabPanel>
            <TabPanel px="0">
              <ApprovedRequest />
            </TabPanel>
            <TabPanel px="0">
              <RejectedRequest />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </PageContainer>
    </LoginRequired>
  );
}

export default Requests;
