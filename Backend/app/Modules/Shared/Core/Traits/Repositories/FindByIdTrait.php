<?php

namespace App\Modules\Shared\Core\Traits\Repositories;

use App\Modules\Shared\Core\Entities\AbstractEntity;

trait FindByIdTrait
{
    public abstract function findById(int $id): ?AbstractEntity;
}
