<?php

namespace App\Modules\Shared\Core\Traits\Repositories;

use App\Modules\Shared\Core\Entities\AbstractEntity;

trait UpdateTrait
{
    public abstract function update(AbstractEntity $entity): void;
}
