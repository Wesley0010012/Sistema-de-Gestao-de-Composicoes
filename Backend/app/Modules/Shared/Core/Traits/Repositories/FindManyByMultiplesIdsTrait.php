<?php

namespace App\Modules\Shared\Core\Traits\Repositories;

use App\Modules\Shared\Core\Entities\AbstractEntity;

trait FindManyByMultiplesIdsTrait
{
    /**
     * Summary of findAll
     * @return AbstractEntity[]
     */
    abstract public function findManyByMultiplesIds(array $ids): array;
}
