<?php

declare(strict_types=1);

use App\Actions\ExampleAction;

test('that true is true', function () {
    expect(app(ExampleAction::class)->handle())->toBeTrue();
});
