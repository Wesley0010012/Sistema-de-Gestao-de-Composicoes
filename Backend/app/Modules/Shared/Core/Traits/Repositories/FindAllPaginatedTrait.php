<?php

namespace App\Modules\Shared\Core\Traits\Repositories;

use App\Modules\Shared\Core\Dto\FindAllPaginatedDto;
use App\Modules\Shared\Core\Entities\EntityPage;

trait FindAllPaginatedTrait
{
    public abstract function findAllPaginated(FindAllPaginatedDto $dto): EntityPage;
}
