<?php

namespace App\Modules\Composers\Infra\Controllers;

use App\Modules\Composers\Core\Services\PeriodsService;
use App\Modules\Shared\Infra\Traits\Controllers\FindAllTrait;
use App\Modules\Shared\Infra\Traits\Controllers\GetServiceTrait;

class PeriodsController
{
    use FindAllTrait, GetServiceTrait;

    public function __construct(
        private readonly PeriodsService $service
    ) {}
}
