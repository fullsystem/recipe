import {existsSync, statSync} from 'node:fs';
import {resolve} from 'node:path';
import {wayfinder} from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import {defineConfig} from 'vite';

/**
 * `@/…` means `resources/js` in an installed project. Here that directory is
 * split in two, and the order matters: the recipe's own file wins, the harness
 * only stands in for what a starter kit would already have provided. Ship a
 * component in `src/` and it shadows the workbench copy, exactly as it would
 * once installed. Keep this list in step with tsconfig.json's `paths`.
 */
const roots = ['src/resources/js', 'workbench/resources/js'];

const extensions = ['', '.tsx', '.ts', '.jsx', '.js', '/index.tsx', '/index.ts'];

function resolveFromRoots(path: string): string | null {
  for (const root of roots) {
    for (const extension of extensions) {
      const candidate = resolve(import.meta.dirname, root, path + extension);

      if (existsSync(candidate) && statSync(candidate).isFile()) {
        return candidate;
      }
    }
  }

  return null;
}

export default defineConfig({
  resolve: {
    alias: [{find: /^@\//, replacement: '', customResolver: (path: string) => resolveFromRoots(path)}],
  },
  plugins: [
    laravel({
      input: ['workbench/resources/css/app.css', 'workbench/resources/js/app.tsx'],
      publicDirectory: 'workbench/public',
      refresh: ['workbench/resources/views/**', 'src/resources/js/**'],
    }),
    react(),
    tailwindcss(),
    // Generated code, so it lands in the harness root, never in `src/`. The
    // command is testbench's: there is no `artisan` at this package's root.
    wayfinder({
      command: 'php vendor/bin/testbench wayfinder:generate',
      path: 'workbench/resources/js',
      patterns: ['workbench/routes/**/*.php', 'workbench/app/**/Http/**/*.php'],
      // The starter kit's forms call `Controller.action.form()`, which only
      // exists when the form variants are generated.
      formVariants: true,
    }),
  ],
});
