<?php

namespace App\Modules\Shared\Core\Traits\Repositories;

use App\Modules\Shared\Core\Entities\AbstractEntity;

trait DeleteByIdTrait
{
    public abstract function deleteById(int $id): void;
}
