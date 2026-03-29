<?php

namespace App\Modules\Shared\Core\Traits\Services;

use App\Modules\Shared\Core\Entities\AbstractEntity;

trait AddEntityTrait
{
    use GetRepositoryTrait, EntityToDtoTrait;

    protected abstract function applyAddRules(AbstractEntity $entity): void;

    protected abstract function addInputToEntity(mixed $addInput): AbstractEntity;

    public function add(mixed $input): mixed
    {
        $entity = $this->addInputToEntity($input);

        $this->applyAddRules($entity);

        $this->getRepository()->add($entity);

        return $this->entityToDto($entity);
    }
}
