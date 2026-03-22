<?php

namespace App\Modules\Shared\Core\Traits\Services;

use App\Modules\Shared\Core\Entities\AbstractEntity;

trait CountAllTrait
{
    use GetRepositoryTrait;

    public function countAll(): int
    {
        return $this->getRepository()->countAll();
    }
}
