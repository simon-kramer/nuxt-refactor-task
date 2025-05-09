import { defineStore } from 'pinia';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: Error | null;
}

export const useTaskStore = defineStore('tasks', {
  state: (): TaskState => ({
    tasks: [],
    loading: false,
    error: null,
  }),

  getters: {},

  actions: {
    async fetchTasks() {
      this.loading = true;
      this.error = null;
      try {
        await new Promise(resolve => setTimeout(resolve, 50ob));
        const mockTasks: Task[] = [
          { id: 1, title: 'Buy groceries', description: 'Milk, Bread, Cheese', completed: false },
          { id: 2, title: 'Walk the dog', description: 'Morning walk', completed: true },
          { id: 3, title: 'Read a book', description: 'Finish Chapter 5', completed: false },
        ];
        this.tasks = mockTasks;
      } catch (err) {
        this.error = err as Error;
        console.error('Failed to fetch tasks:', err);
        throw err; 
      } finally {
        this.loading = false;
      }
    },

    async toggleTaskCompletion(taskId: number) {
      try {
        await new Promise(resolve => setTimeout(resolve, 300));

        const taskIndex = this.tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
          this.tasks[taskIndex].completed = !this.tasks[taskIndex].completed;
        }
      } catch (err) {
        console.error(`Failed to toggle task ${taskId}:`, err);
        throw err;
      }
    },
  },
});
