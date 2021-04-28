import PageContainer from '../../components/layout/PageContainer';
import LoginRequired from '../../components/layout/LoginRequired';
import ProjectList from '../../components/Projects/ProjectList';

function Projects() {
  return (
    <LoginRequired>
      <PageContainer pageTitle="Projects">
        <ProjectList />
      </PageContainer>
    </LoginRequired>
  );
}

export default Projects;
