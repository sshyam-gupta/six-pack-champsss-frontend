import PageContainer from '../components/layout/PageContainer';
import LoginRequired from '../components/PrivateRoute/LoginRequired';

function Projects() {
  return (
    <LoginRequired>
      <PageContainer>Projects</PageContainer>
    </LoginRequired>
  );
}

export default Projects;
