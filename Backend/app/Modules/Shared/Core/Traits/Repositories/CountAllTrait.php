<?php

namespace App\Modules\Shared\Core\Traits\Repositories;

use App\Modules\Shared\Core\Entities\AbstractEntity;

trait CountAllTrait
{
    abstract public function countAll(): int;
}
