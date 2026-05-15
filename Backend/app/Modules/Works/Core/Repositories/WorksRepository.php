<?php

namespace App\Modules\Works\Core\Repositories;

use App\Modules\Shared\Core\Traits\Repositories\AddTrait;
use App\Modules\Shared\Core\Traits\Repositories\CountAllTrait;
use App\Modules\Shared\Core\Traits\Repositories\DeleteByIdTrait;
use App\Modules\Shared\Core\Traits\Repositories\FindAllPaginatedTrait;
use App\Modules\Shared\Core\Traits\Repositories\FindByIdTrait;
use App\Modules\Shared\Core\Traits\Repositories\UpdateTrait;

abstract class WorksRepository
{
    use AddTrait, UpdateTrait, FindAllPaginatedTrait, FindByIdTrait, DeleteByIdTrait, CountAllTrait;

    abstract public function updateScorePdfPath(int $workId, int $scoreId, string $path): void;

    abstract public function countRecent(): int;
}
