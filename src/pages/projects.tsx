import PageContainer from '../components/layout/PageContainer';
import LoginRequired from '../components/layout/LoginRequired';

function Projects() {
  return (
    <LoginRequired>
      <PageContainer maxW="48rem">Projects</PageContainer>
    </LoginRequired>
  );
}

export default Projects;
