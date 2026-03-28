<?php

namespace App\Modules\Composers\Infra\Controllers;

use App\Modules\Composers\Core\Services\NationalitiesService;
use App\Modules\Shared\Infra\Traits\Controllers\FindAllTrait;
use App\Modules\Shared\Infra\Traits\Controllers\GetServiceTrait;

class NationalitiesController
{
    use GetServiceTrait;
    use FindAllTrait;

    public function __construct(
        private readonly NationalitiesService $service
    ) {}
}
