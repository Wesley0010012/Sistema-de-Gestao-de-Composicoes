<?php

namespace App\Modules\Shared\Core\Traits\Services;

use App\Modules\Shared\Core\Entities\AbstractEntity;

trait UpdateEntityTrait
{
    use GetRepositoryTrait, EntityToDtoTrait;

    protected function applyUpdateRules(AbstractEntity $entity): void
    {
        return;
    }

    protected abstract function updateInputToEntity(mixed $updateInput, int $id): AbstractEntity;

    public function update(mixed $input, int $id): mixed
    {
        $entity = $this->updateInputToEntity($input, $id);

        $this->applyUpdateRules($entity);

        $this->getRepository()->update($entity);

        return $this->entityToDto($entity);
    }
}
