<?php

namespace App\Modules\Shared\Core\Traits\Services;

trait GetRepositoryTrait
{
    protected function getRepository(): mixed
    {
        return $this->repository;
    }
}
