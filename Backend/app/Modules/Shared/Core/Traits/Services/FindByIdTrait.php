<?php

namespace App\Modules\Shared\Core\Traits\Services;

use App\Modules\Shared\Core\Entities\AbstractEntity;
use Exception;

trait FindByIdTrait
{
    use EntityToDtoTrait, GetRepositoryTrait;


    public function findById(int $id): AbstractEntity
    {
        $entity = $this->repository->findById($id);

        if (!$entity) {
            throw new Exception();
        }

        return $entity;
    }
}
