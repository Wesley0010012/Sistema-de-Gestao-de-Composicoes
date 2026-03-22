<?php

namespace App\Modules\Shared\Core\Traits\Services;

use App\Modules\Shared\Core\Entities\AbstractEntity;

trait EntityToDtoTrait
{
    public abstract function entityToDto(AbstractEntity $entity): mixed;
}
