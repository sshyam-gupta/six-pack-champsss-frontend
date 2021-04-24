import PageContainer from '../components/layout/PageContainer';
import LoginRequired from '../components/layout/LoginRequired';

function Projects() {
  return (
    <LoginRequired>
      <PageContainer pageTitle="Users"></PageContainer>
    </LoginRequired>
  );
}

export default Projects;
