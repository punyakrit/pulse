export const PROJECT_STORAGE_KEY = 'pulse_selected_project_id';

export const getStoredProjectId = (): string | null => {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(PROJECT_STORAGE_KEY);
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
};

export const setStoredProjectId = (projectId: string): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PROJECT_STORAGE_KEY, projectId);
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
};

export const removeStoredProjectId = (): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(PROJECT_STORAGE_KEY);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};
