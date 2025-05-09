<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useTaskStore } from '@/stores/tasks.store';

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

const taskStore = useTaskStore();
const loading = ref(false);
const error = ref<Error | null>(null);
const tasks = ref<Task[]>([]);

const isToggling = ref<{ [key: number]: boolean }>({});

const fetchTasks = async () => {
  loading.value = true;
  error.value = null;
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    const mockTasks: Task[] = [
      { id: 101, title: 'Inspect Station #A1', description: 'Check cables and connectors', completed: false },
      { id: 102, title: 'Update Firmware on Station #B3', description: 'Apply latest security patch', completed: true },
      { id: 103, title: 'Clean Charging Ports at Station #C5', description: 'Remove debris and dust', completed: false },
      { id: 104, title: 'Verify Network Connectivity for Station #D2', description: 'Ensure stable internet connection', completed: false },
      { id: 105, title: 'Replace Broken Screen on Station #E4', description: 'Order and install new display', completed: true },
    ];
    tasks.value = mockTasks;
  } catch (err) {
    error.value = err as Error;
    console.error('Failed to fetch EV charging tasks:', err);
  } finally {
    loading.value = false;
  }
};

const toggleTaskStatus = async (taskId: number) => {
  if (isToggling.value[taskId]) return;

  isToggling.value[taskId] = true;
  try {
    await new Promise(resolve => setTimeout(resolve, 300));

    const taskIndex = tasks.value.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      tasks.value[taskIndex].completed = !tasks.value[taskIndex].completed;
    }

  } catch (err) {
    console.error(`Failed to toggle task ${taskId}:`, err);
  } finally {
    delete isToggling.value[taskId];
  }
};

onMounted(() => {
  fetchTasks();
});

</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">EV Charging Station Tasks</h1>

    <div v-if="loading" class="text-center text-gray-500">Loading EV charging tasks...</div>
    <div v-else-if="error" class="text-center text-red-500">Error loading tasks: {{ error.message }}</div>
    <div v-else>
      <ul class="space-y-3">
        <li
          v-for="task in tasks"
          :key="task.id"
          :class="[
            'p-4 border rounded-lg shadow-sm flex items-center justify-between',
            task.completed ? 'bg-green-100 border-green-300' : 'bg-white border-gray-200'
          ]"
        >
          <div>
            <h2 :class="['text-lg font-semibold', task.completed ? 'line-through text-green-700' : '']">
              {{ task.title }}
            </h2>
            <p class="text-gray-600">{{ task.description }}</p>
          </div>
          <button
            @click="toggleTaskStatus(task.id)"
            :disabled="isToggling[task.id]"
            :class="[
              'px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out',
              task.completed
                ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white',
              isToggling[task.id] ? 'opacity-50 cursor-not-allowed' : ''
            ]"
          >
            {{ isToggling[task.id] ? 'Updating...' : (task.completed ? 'Mark as Pending' : 'Mark as Complete') }}
          </button>
        </li>
      </ul>
      <div v-if="tasks.length === 0 && !loading && !error" class="text-center text-gray-500 mt-4">
        No EV charging tasks found.
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
