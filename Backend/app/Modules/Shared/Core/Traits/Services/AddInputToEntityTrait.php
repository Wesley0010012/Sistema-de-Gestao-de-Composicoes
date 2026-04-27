<?php

namespace App\Modules\Shared\Core\Traits\Services;

use App\Modules\Shared\Core\Entities\AbstractEntity;

trait AddInputToEntityTrait
{
    protected abstract function addInputToEntity(mixed $addInput): AbstractEntity;
}
