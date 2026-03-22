<?php

namespace App\Modules\Shared\Core\Traits\Repositories;

use App\Modules\Shared\Core\Entities\AbstractEntity;

trait FindAllTrait
{
    /**
     * Summary of findAll
     * @return AbstractEntity[]
     */
    abstract public function findAll(): array;
}
