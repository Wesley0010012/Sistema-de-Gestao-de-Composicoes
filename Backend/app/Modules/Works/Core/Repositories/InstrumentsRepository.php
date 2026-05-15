<?php

namespace App\Modules\Works\Core\Repositories;

use App\Modules\Shared\Core\Traits\Repositories\FindAllTrait;
use App\Modules\Shared\Core\Traits\Repositories\FindByIdTrait;

abstract class InstrumentsRepository
{
    use FindAllTrait, FindByIdTrait;
}
