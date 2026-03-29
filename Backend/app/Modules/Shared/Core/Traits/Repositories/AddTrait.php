<?php

namespace App\Modules\Shared\Core\Traits\Repositories;

use App\Modules\Shared\Core\Entities\AbstractEntity;

trait AddTrait
{
    public abstract function add(AbstractEntity $entity): void;
}
