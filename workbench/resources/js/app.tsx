import type {ResolvedComponent} from '@inertiajs/react';
import {createInertiaApp} from '@inertiajs/react';
import {resolvePageComponent} from 'laravel-vite-plugin/inertia-helpers';
import {createRoot} from 'react-dom/client';

type PageModule = { default: ResolvedComponent };

/*
 * The same two roots as `@/` in vite.config.ts, in the same order: a page the
 * recipe ships shadows the harness's stand-in, exactly as it will overwrite the
 * starter kit's file once installed. Page names stay plain — `welcome`,
 * `settings/appearance` — because that is what an installed project resolves.
 */
const pages = {
  ...import.meta.glob<PageModule>('./pages/**/*.tsx'),
  ...import.meta.glob<PageModule>('../../../src/resources/js/pages/**/*.tsx'),
};

createInertiaApp({
  resolve: (name) =>
    resolvePageComponent([`../../../src/resources/js/pages/${name}.tsx`, `./pages/${name}.tsx`], pages).then(
      (page) => page.default,
    ),
  setup({el, App, props}) {
    createRoot(el).render(<App {...props} />);
  },
});
