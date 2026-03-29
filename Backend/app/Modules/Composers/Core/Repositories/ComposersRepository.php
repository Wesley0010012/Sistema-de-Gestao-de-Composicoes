<?php

namespace App\Modules\Composers\Core\Repositories;

use App\Modules\Shared\Core\Traits\Repositories\AddTrait;
use App\Modules\Shared\Core\Traits\Repositories\CountAllTrait;
use App\Modules\Shared\Core\Traits\Repositories\FindAllTrait;
use App\Modules\Shared\Core\Traits\Repositories\FindByIdTrait;
use App\Modules\Shared\Core\Traits\Services\DeleteByIdTrait;

abstract class ComposersRepository
{
    use AddTrait, FindAllTrait, CountAllTrait, FindByIdTrait, DeleteByIdTrait;

    public abstract function existsByName(string $name): bool;

    public abstract function countRecent(): int;
}
