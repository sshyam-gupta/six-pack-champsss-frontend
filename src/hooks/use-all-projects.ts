import { useCallback, useMemo } from 'react';
import useSWR, { mutate } from 'swr';
import { Project } from '../components/Projects/ProjectItem';

import { ALL_PROJECTS, USER_PROJECTS } from '../services/api/endpoints';
import { useUser } from './use-user';

export function useAllProjects() {
  const { isAdmin } = useUser();
  const { data, error } = useSWR(isAdmin ? ALL_PROJECTS : USER_PROJECTS);

  const projects = useMemo(() => {
    return data?.projects ?? [];
  }, [data]);

  const getProjectNameById = useCallback(
    (id: number) => {
      const project = projects?.filter?.((project: Project) => project.id === id);

      const name = project?.length ? project[0]?.name : null;
      return name;
    },
    [projects],
  );

  const getProjectPointsById = useCallback(
    (id: number) => {
      const project = projects?.filter?.((project: Project) => project.id === id);

      return project?.length ? project[0]?.points_per_hour : null;
    },
    [projects],
  );

  const getProjectById = useCallback(
    (id: number) => {
      const project = projects?.filter?.((project: Project) => project.id === id);
      return project?.[0] ?? null;
    },
    [projects],
  );

  const updateProject = useCallback(
    (_project?: Project) => {
      mutate(isAdmin ? ALL_PROJECTS : USER_PROJECTS);
    },
    [isAdmin],
  );

  return {
    projects: data?.projects ?? [],
    isLoading: !error && !data,
    hasError: error,
    getProjectNameById,
    getProjectById,
    updateProject,
    getProjectPointsById,
  };
}
