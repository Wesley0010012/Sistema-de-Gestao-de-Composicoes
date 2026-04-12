<?php

namespace App\Modules\Works\Infra\Controllers;

use App\Modules\Shared\Infra\Traits\Controllers\FindAllTrait;
use App\Modules\Works\Core\Services\GenresService;
use App\Modules\Works\Core\Services\InstrumentsService;

class InstrumentsController
{
    use FindAllTrait;

    public function __construct(
        private readonly InstrumentsService $service
    ) {}
}
