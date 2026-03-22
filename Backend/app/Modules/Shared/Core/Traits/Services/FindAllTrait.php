<?php

namespace App\Modules\Shared\Core\Traits\Services;

use App\Modules\Shared\Core\Entities\AbstractEntity;

trait FindAllTrait
{
    use EntityToDtoTrait, GetRepositoryTrait;

    public function findAll(): array
    {
        $entities = $this->repository->findAll();

        return array_map(fn(AbstractEntity $i) => $this->entityToDto($i), $entities);
    }
}
