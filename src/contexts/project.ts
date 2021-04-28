import { createContext, useContext } from 'react';
import { Project } from '../components/Projects/ProjectItem';

export const ProjectContext = createContext<{
  projects: Project[];
  setProjects(val: Project[]): void;
}>({
  projects: [],
  setProjects: () => void {},
});

export function useProjectContext() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('ProjectContext not found!');
  }
  return context;
}
