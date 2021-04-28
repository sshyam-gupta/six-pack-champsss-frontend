import LoginRequired from '../../components/layout/LoginRequired';
import ProjectDetailedView from '../../components/Projects/ProjectDetailedView';

const ProjectDetail = () => {
  return (
    <LoginRequired>
      <ProjectDetailedView />
    </LoginRequired>
  );
};

export default ProjectDetail;
