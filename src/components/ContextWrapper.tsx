import { useToast } from '@chakra-ui/toast';
import { useSession } from 'next-auth/client';
import { useState, useMemo, useEffect } from 'react';

import { ProjectContext } from '../contexts/project';
import ProjectService from '../services/project/project';
import { Project } from './Projects/ProjectItem';

const ContextWrapper = ({ children }: any) => {
  const [projects, setProjects] = useState<Array<Project>>([]);
  const toast = useToast();
  const [session] = useSession();

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await ProjectService.getProjects();
      if (error) {
        toast({
          description: error,
          variant: 'top-accent',
          status: 'error',
          isClosable: true,
          position: 'top',
        });
        setProjects(null);
        return;
      }
      setProjects(data?.projects);
    }
    if (session) {
      fetchProjects();
    }
  }, [toast, session]);

  const projectsProvider = useMemo(() => ({ projects, setProjects }), [projects, setProjects]);

  return <ProjectContext.Provider value={projectsProvider}>{children}</ProjectContext.Provider>;
};
export default ContextWrapper;
