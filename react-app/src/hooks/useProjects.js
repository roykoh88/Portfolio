import { useCallback, useMemo, useState } from 'react'
import {
  readProjects,
  writeProjects,
  sortProjectsByDisplayOrder,
  removeProjectFromList,
} from '../lib/projects/projectStorage'

export function useProjects() {
  const [projects, setProjects] = useState(() => readProjects())

  const refresh = useCallback(() => {
    setProjects(readProjects())
  }, [])

  const addProject = useCallback((payload) => {
    const list = readProjects()
    list.push(payload)
    writeProjects(list)
    setProjects(readProjects())
  }, [])

  const removeProject = useCallback((p) => {
    const list = readProjects()
    const next = removeProjectFromList(list, p)
    if (next !== list) {
      writeProjects(next)
      setProjects(readProjects())
    }
  }, [])

  const orderedProjects = useMemo(
    () => sortProjectsByDisplayOrder(projects),
    [projects]
  )

  return {
    projects,
    orderedProjects,
    addProject,
    removeProject,
    refresh,
  }
}
