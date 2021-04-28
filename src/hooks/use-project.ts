import { useCallback } from 'react';
import { Project } from '../components/Projects/ProjectItem';
import { useProjectContext } from '../contexts/project';

export function useProject() {
  const { projects, setProjects } = useProjectContext();

  const getProjectNameById = useCallback(
    (id: number) => {
      const project = projects?.filter?.((project: Project) => project.id === id);

      const name = project?.length ? project[0]?.name : null;
      return name;
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
    (project: Project) => {
      const updatedProjects = projects?.map?.(p => {
        if (p.id === project.id) {
          return project;
        }
        return p;
      });
      setProjects(updatedProjects);
    },
    [projects, setProjects],
  );

  return {
    projects,
    error: !projects,
    getProjectNameById,
    getProjectById,
    updateProject,
  };
}
