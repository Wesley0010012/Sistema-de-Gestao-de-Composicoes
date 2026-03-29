<?php

namespace App\Modules\Shared\Core\Traits\Repositories;

trait DeleteByIdTrait
{
    public abstract function deleteById(int $id): void;
}
