<?php

namespace App\Modules\Shared\Core\Traits\Services;

use App\Modules\Shared\Core\Entities\AbstractEntity;

trait FindManyByMultiplesIdsTrait
{
    use EntityToDtoTrait, GetRepositoryTrait;

    /**
     * Summary of findManyByMultiplesIds
     * @param array $ids
     * @return AbstractEntity[]
     */
    public function findManyByMultiplesIds(array $ids): array
    {
        return $this->getRepository()->findManyByMultiplesIds($ids);
    }
}
