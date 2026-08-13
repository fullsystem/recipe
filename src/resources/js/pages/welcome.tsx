import { Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <>
            <Head title="Welcome" />

            <main className="flex min-h-screen items-center justify-center p-6">
                <div className="max-w-md space-y-3 text-center">
                    <h1 className="text-2xl font-medium">The recipe is installed</h1>

                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        This page replaced the starter kit's own, and it came from{' '}
                        <code className="font-mono">src/resources/js/pages/welcome.tsx</code> in the recipe.
                        Everything under <code className="font-mono">src/</code> lands in the project the
                        same way.
                    </p>

                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        Replace it with whatever this recipe is actually for.
                    </p>
                </div>
            </main>
        </>
    );
}
