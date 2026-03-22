<?php

namespace App\Modules\Shared\Core\Traits\Services;

use App\Modules\Shared\Core\Entities\AbstractEntity;
use Exception;

trait FindEntityByIdTrait
{
    use EntityToDtoTrait, FindByIdTrait;

    public function findEntityById(int $id): mixed
    {
        $entity = $this->findById($id);

        return $this->entityToDto($entity);
    }
}
