<?php

namespace App\Modules\Works\Core\Repositories;

use App\Modules\Shared\Core\Traits\Repositories\FindAllTrait;
use App\Modules\Shared\Core\Traits\Repositories\FindManyByMultiplesIdsTrait;

abstract class GenresRepository
{
    use FindAllTrait, FindManyByMultiplesIdsTrait;
}
