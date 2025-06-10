import { defineStore } from 'pinia';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

type TaskStatus = { type: 'changing' | 'loaded' } | { type: 'error'; error: Error };
interface TaskStatusMap { [key: number]: TaskStatus }

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([]);
  const syncTaskStatusMap = ref<TaskStatusMap>({});
  const loading = ref<boolean>(false);
  const error = ref<Error | null>(null);

  async function fetchTasks() {
    loading.value = true;
    error.value = null;
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const mockTasks: Task[] = [
        { id: 1, title: 'Buy groceries', description: 'Milk, Bread, Cheese', completed: false },
        { id: 2, title: 'Walk the dog', description: 'Morning walk', completed: true },
        { id: 3, title: 'Read a book', description: 'Finish Chapter 5', completed: false },
        { id: 4, title: 'Start that amazing project you always wanted to start', description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.', completed: false },
      ];
      tasks.value = mockTasks;
      syncTaskStatusMap.value = mockTasks.reduce((acc, task) => {
        acc[task.id] = { type: 'loaded' };
        return acc;
      }, {} as TaskStatusMap);
    }
    catch (err) {
      console.error('Failed to fetch tasks:', err);
      error.value = err as Error;
    }
    finally {
      loading.value = false;
    }
  }

  async function toggleTaskCompletion(taskId: number) {
    syncTaskStatusMap.value[taskId] = { type: 'changing' };
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const taskIndex = tasks.value.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        if (taskId === 4) {
          throw new Error('Simulated error for task 4');
        }
        tasks.value[taskIndex].completed = !tasks.value[taskIndex].completed;
      }
      syncTaskStatusMap.value[taskId] = { type: 'loaded' };
    }
    catch (err) {
      console.error(`Failed to toggle task ${taskId}:`, err);
      syncTaskStatusMap.value[taskId] = { type: 'error', error: err as Error };
    }
  }

  return {
    tasks,
    loading,
    error,
    syncTaskStatusMap,
    fetchTasks,
    toggleTaskCompletion,
  };
});
