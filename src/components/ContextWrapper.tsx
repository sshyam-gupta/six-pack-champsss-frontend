import { useToast } from '@chakra-ui/toast';
import { useSession } from 'next-auth/client';
import { useState, useMemo, useEffect } from 'react';
import { SWRConfig } from 'swr';

import { ProjectContext } from '../contexts/project';
import ProjectService from '../services/project/project';
import fetcher from '../util/swr-util';
import { Project } from './Projects/ProjectItem';

const ContextWrapper = ({ children }: any) => {
  const [projects, setProjects] = useState<Array<Project>>([]);
  const toast = useToast();
  const [session] = useSession();

  useEffect(() => {
    if (session && typeof window !== 'undefined') {
      window.sessionStorage.setItem('token', session.accessToken);
    }
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

  return (
    <SWRConfig
      value={{
        fetcher: url =>
          fetcher(url, {
            headers: {
              ...(typeof window !== 'undefined'
                ? { Authorization: `Bearer ${window.sessionStorage.getItem('token')}` }
                : {}),
            },
          }),
      }}
    >
      <ProjectContext.Provider value={projectsProvider}>{children}</ProjectContext.Provider>
    </SWRConfig>
  );
};
export default ContextWrapper;
