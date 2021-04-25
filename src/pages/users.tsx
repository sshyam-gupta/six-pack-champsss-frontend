import PageContainer from '../components/layout/PageContainer';
import LoginRequired from '../components/layout/LoginRequired';
import UserList from '../components/Users/UserList';

function Projects() {
  return (
    <LoginRequired>
      <PageContainer pageTitle="Users">
        <UserList />
      </PageContainer>
    </LoginRequired>
  );
}

export default Projects;
