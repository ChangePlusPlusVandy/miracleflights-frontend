import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default ({ mode }) => {
  // Load app-level env vars to node-level env vars.
  // https://stackoverflow.com/questions/70709987/how-to-load-environment-variables-from-env-file-using-vite
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react()],
    define: {
      // https://github.com/vitejs/vite/issues/1973#issuecomment-815695512
      "process.env": process.env,
    },
  });
};
