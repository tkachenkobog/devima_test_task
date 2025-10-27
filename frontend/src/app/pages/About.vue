<script setup lang="ts">
import { ElCard } from "element-plus";
import dataFlow from "@/assets/data-flow.webp";

</script>

<template>
  <div class="about-page">
    <ElCard class="about-card">
      <div class="content">
        <h2>Install:</h2>
        <ol>
          <li>
            Lokal DE
            <ul>
              <li>cd frontend, run <code>npm run dev</code></li>
              <li>cd backend, run <code>npm run devStart</code></li>
            </ul>
          </li>
          <li>
            Containerized DE (ready for prod)
            <ul>
              <li>run Docker</li>
              <li>run <code>docker-compose up --build</code></li>
            </ul>
          </li>
        </ol>

        <h2>Stack:</h2>
        <p>
          Vue3, TS, Express.js, Pinia, Echarts, Vue-router 4, Vite, Element Plus, Axios, ESLint,
          Prettier, Vitest, Happy Dom, Saas, nginx, Docker.
        </p>

        <h2>Features:</h2>
        <ul>
          <li>State Management: Pinia is fully configured.</li>
          <li>
            A global Axios instance is pre-configured with interceptors for handling requests and
            responses, located in <code>src/api/axiosInstance.ts</code>.
          </li>
          <li>Routing: Vue Router 4 is pre-configured with lazy imports and a default layout.</li>
          <li>Vite (Rolldown - new bundler on Rust)</li>
          <li>
            UI & Styling (Element Plus):
            <ul>
              <li>
                Optimized: It uses <code>element-override.scss</code> to import only the styles for
                components you actually use, keeping the bundle size down.
              </li>
              <li>
                Customizable: All Element Plus styles can be easily and centrally overridden in the
                <code>element-override.scss</code> file.
              </li>
            </ul>
          </li>
          <li>
            Global Styles: SCSS variables are configured in Vite and globally injected across the
            entire project, so you don't need to import them manually in every file.
          </li>
          <li>Testing: Vitest is integrated for unit and component testing and Happy Dom.</li>
          <li>Configured Prettier</li>
          <li>Configured ESLint (like linter!)</li>
          <li>Configured Boundaries like architecture guards</li>
          <li>CI Github actions predefined</li>
          <li>Frontend/backend are containerized and ready for production</li>
          <li>Node packets locked</li>
        </ul>

        <h2>Template Architecture:</h2>
        <ul>
          <li>
            This template is based on my favorite feature-based architecture. Instead of grouping code
            by its technical type (like <code>/components</code>, <code>/stores</code>,
            <code>/api</code>, etc.), we group all files related to a specific feature (a business
            logic unit).
          </li>
          <li>
            In this project, <code>patient</code> and <code>vitals</code> are good examples — inside
            each feature, we have all related components, stores, composables, etc., that belong only
            to that feature. Only the feature layer contains business logic.
          </li>
          <li>
            At the <code>/src</code> level, we have the shared layer of the app — it includes all
            shared components used across the project, the Axios instance, assets, store initializers
            for managing plugins and the store itself, etc.
          </li>
          <li>
            The <code>app/</code> level is the top layer, containing the app skeleton (it initializes
            the app, routing, layouts, etc.).
          </li>
          <li>
            By using ESLint boundaries, we define the data flow: The App layer can consume data from
            anywhere in the app (src and features). The Feature layer can consume from the src layer
            and itself (boundaries prevent it from importing other features). The src layer can only
            use itself.
          </li>
        </ul>
<img :src="dataFlow" class="arch" />
        <h2>What could be better:</h2>
        <ul>
          <li>WebSockets && Postgres</li>
          <li>Auth for M.D && Patient with roles</li>
          <li>Add debounce for resizeChart.</li>
          <li>Add notifications/alerts for dangerous health conditions.</li>
          <li>Add export to CSV (token effective) and FHIR resource for using data for medical purposes.</li>
          <li>Add Gemini API to make a twice-daily request for summarization of the patient's state, and save it for future analysis in chunks.</li>
          <li>Add more test FE/BE</li>
          <li>Add more data</li>
          <li>Accessibility audit</li>
          <li>Bundle audit (now 1.1 mb it's good result for this stuck)</li>
        </ul>
      </div>
    </ElCard>
  </div>
</template>

<style lang="scss" scoped>
.arch {
  max-width: 75%;
  display: block;
  margin: 32px auto;
  border-radius: 8px;
}

.about-page {
  padding: 32px;
  display: flex;
  justify-content: center;
  height: 100%;
  overflow-y: auto;
}

.about-card {
  max-width: 900px;
  width: 100%;
  :deep(.el-card__body) {
    padding: 32px;
  }
  :deep(.el-card__header) {
    font-size: 24px;
    font-weight: 600;
  }
}

.content {
  h2 {
    font-size: 28px;
    margin-bottom: 16px;
    margin-top: 32px;
    
    &:first-child {
      margin-top: 0;
    }
  }

  p,
  ul,
  ol {
    margin-bottom: 20px;
    line-height: 1.7;
  }
}
</style>