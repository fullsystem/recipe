<?php

namespace Workbench\App\Providers;

use Illuminate\Routing\Router;
use Illuminate\Support\ServiceProvider;
use Workbench\App\Http\Middleware\HandleAppearance;
use Workbench\App\Http\Middleware\HandleInertiaRequests;

class WorkbenchServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * A project registers these in bootstrap/app.php, which the skeleton does not
     * expose to us. Without them Inertia shares no props and every page reading
     * `auth.user` breaks — so the harness pushes them onto the web group itself.
     */
    public function boot(Router $router): void
    {
        $router->pushMiddlewareToGroup('web', HandleAppearance::class);
        $router->pushMiddlewareToGroup('web', HandleInertiaRequests::class);
    }
}
