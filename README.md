# chargecloud Refactor Task
# Frontend Engineer Refactoring Task: Task List

This task requires you to refactor a Nuxt 3 component and its corresponding Pinia store. The goal is to improve the code quality, maintainability, and adherence to modern frontend best practices using the specified technologies.

## Technologies Used

* **Nuxt 3:** Framework
* **Vue 3 Composition API (`<script setup>`):** Component logic
* **TypeScript:** Type safety
* **TailwindCSS:** Styling
* **Pinia:** State management

## The Task

You have been provided with two files:

1.  `components/TaskList.vue`: A Vue component displaying a list of tasks
2.  `stores/tasks.ts`: A Pinia store managing the task state

Your primary objective is to **refactor** these files. The current implementation is **disfunctional** and contains areas that can be significantly improved.
Apply clean code principles such as **SMART** (Simple, Maintainable, Adaptable, Reusable, Testable) and **KISS** (Keep It Simple, Stupid).

## Areas for Improvement (Suggestions)

Consider the following aspects during refactoring:

* **State Management:** How the component interacts with the Pinia store. Should the component hold local task state, or rely solely on the store? How is the data handled?
* **Data Fetching:** Utilize Nuxt 3's built-in data fetching capabilities (`useFetch`, `useAsyncData`) or implement another utility like `axios` for fetching data on the server or client side efficiently
* **TypeScript:** Ensure strong typing throughout the component and store, defining interfaces and types clearly
* **Component Structure:** Is the component doing too much? Can any logic or presentation be separated?
* **Readability:** Improve variable names, function clarity, and overall code structure
* **Error Handling & Loading States:** Enhance how loading and error states are managed and displayed
* **Template Logic:** Simplify complex logic within the template by moving it to computed properties or helper functions in the script
* **Appearance & a11y**: Review and potentially refine the TailwindCSS usage for better consistency, responsiveness. Ensure that the design and behaviour fits the WCAG 2.1 criterias

## Getting Started

1.  Clone this repository (or create a new Nuxt 3 project and add the provided files)
2.  Ensure you have Node.js and npm/yarn/pnpm installed
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Run the development server:
    ```bash
    npm run dev
    ```
5.  View the application in your browser (usually `http://localhost:3000`)

The `index.vue` file simply renders the `TaskList`. Focus your refactoring efforts on `TaskList.vue` and `stores/tasks.ts`.

## Submission

Please provide the refactored code for `components/TaskList.vue` and `stores/tasks.ts` via a code versioning tool like GitHub. You may also include any other files you deem necessary for the refactoring (e.g., a simple API utility mock).

Good luck with the task!
