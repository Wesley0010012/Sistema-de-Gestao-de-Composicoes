<?php

namespace App\Modules\Composers\Core\Repositories;

use App\Modules\Shared\Core\Traits\Repositories\FindAllTrait;
use App\Modules\Shared\Core\Traits\Repositories\FindByIdTrait;

abstract class NationalitiesRepository
{
    use FindAllTrait,
        FindByIdTrait;
}
