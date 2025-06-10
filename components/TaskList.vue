<script setup lang="ts">
import { onMounted } from 'vue';
import { useTasksStore } from '@/stores/tasks.store';

const { fetchTasks, toggleTaskCompletion } = useTasksStore();
const { loading, error, tasks, syncTaskStatusMap } = storeToRefs(useTasksStore());

onMounted(() => {
  fetchTasks();
});

function isTaskChanging(taskId: number): boolean {
  return syncTaskStatusMap.value[taskId]?.type === 'changing';
}
function getTaskError(taskId: number): Error | null {
  return 'error' in syncTaskStatusMap.value[taskId] ? syncTaskStatusMap.value[taskId].error : null;
}
function hasTaskError(taskId: number): boolean {
  return getTaskError(taskId) !== null;
}
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">
      EV Charging Station Tasks
    </h1>
    <div v-if="loading" class="text-center text-gray-500">
      Loading EV charging tasks...
    </div>
    <div v-else-if="error" class="text-center text-red-500">
      Error loading tasks: {{ error.message }}
    </div>
    <div v-else>
      <ul class="space-y-3">
        <li
          v-for="task in tasks"
          :key="task.id"
          class="p-4 border rounded-lg shadow-sm flex items-start justify-between" :class="[
            hasTaskError(task.id) ? 'bg-red-100  border-red-300' : (task.completed ? 'bg-green-100 border-green-300' : 'bg-white border-gray-200'),
          ]"
        >
          <div class="pr-10 flex-grow-0">
            <h2 class="text-lg font-semibold" :class="[task.completed ? 'line-through text-green-700' : '']">
              {{ task.title }}
            </h2>
            <p class="text-gray-600">
              {{ task.description }}
            </p>
            <p v-if="hasTaskError(task.id)" class="pt-4">
              <span class="text-red-500">Error: {{ getTaskError(task.id)?.message }}</span>
            </p>
          </div>
          <button
            :disabled="isTaskChanging(task.id)"
            aria-label="Toggle Task Completion"
            class="px-4 py-2 mt-2 rounded-md text-sm text-white font-semibold flex-shrink-0 transition duration-150 ease-in-out"
            :class="[
              task.completed
                ? 'bg-yellow-700 hover:bg-yellow-600'
                : 'bg-green-700 hover:bg-green-600',
              isTaskChanging(task.id) ? 'opacity-70 cursor-not-allowed' : '',
            ]"
            @click="toggleTaskCompletion(task.id)"
          >
            {{ isTaskChanging(task.id) ? 'Updating...' : (task.completed ? 'Mark as Pending' : 'Mark as Complete') }}
          </button>
        </li>
      </ul>
      <div v-if="tasks.length === 0 && !loading && !error" class="text-center text-gray-500 mt-4">
        No EV charging tasks found.
      </div>
    </div>
  </div>
</template>
