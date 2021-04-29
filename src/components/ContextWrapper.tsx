import { useSession } from 'next-auth/client';
import { useState, useMemo, useEffect } from 'react';
import useSWR, { SWRConfig } from 'swr';

import { ProjectContext } from '../contexts/project';
import { PROJECTS } from '../services/api/endpoints';

import fetcher from '../util/swr-util';
import { Project } from './Projects/ProjectItem';

function useProjects() {
  const { data, error } = useSWR(
    typeof window !== 'undefined' && window.sessionStorage.getItem('token') ? PROJECTS : null,
    url =>
      fetcher(url, {
        headers: {
          ...(typeof window !== 'undefined'
            ? { Authorization: `Bearer ${window.sessionStorage.getItem('token')}` }
            : {}),
        },
      }),
  );

  return {
    data: data?.projects ?? [],
    isLoading: !error && !data,
    isError: error,
  };
}

const ContextWrapper = ({ children }: any) => {
  const { data } = useProjects();
  const [projects, setProjects] = useState<Array<Project>>([]);
  const [session] = useSession();

  useEffect(() => {
    if (session?.accessToken && typeof window !== 'undefined') {
      window.sessionStorage.setItem('token', session?.accessToken);
    }
  }, [session?.accessToken]);

  useEffect(() => {
    if (data.length) {
      setProjects(data);
    }
  }, [data]);

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
