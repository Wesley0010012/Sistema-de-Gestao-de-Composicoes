<?php

namespace App\Modules\Shared\Core\Traits\Services;

use App\Modules\Shared\Core\Entities\AbstractEntity;

trait DeleteByIdTrait
{
    use GetRepositoryTrait;

    public function deleteById(int $id): void
    {
        $this->getRepository()->deleteById($id);
    }
}
