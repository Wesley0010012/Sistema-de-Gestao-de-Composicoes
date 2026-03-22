<?php

namespace App\Modules\Composers\Core\Services;

use App\Modules\Composers\Core\Dto\Output\NationalityDto;
use App\Modules\Composers\Core\Entities\Nationality;
use App\Modules\Composers\Core\Repositories\NationalitiesRepository;
use App\Modules\Shared\Core\Entities\AbstractEntity;
use App\Modules\Shared\Core\Traits\Services\EntityToDtoTrait;
use App\Modules\Shared\Core\Traits\Services\FindAllTrait;
use App\Modules\Shared\Core\Traits\Services\FindByIdTrait;

class NationalitiesService
{
    use FindAllTrait, FindByIdTrait, EntityToDtoTrait;

    public function __construct(
        private readonly NationalitiesRepository $repository
    ) {}

    public function entityToDto(AbstractEntity $entity): mixed
    {
        $nationality = (fn($i): Nationality => $i)($entity);

        return new NationalityDto(
            $nationality->getId(),
            $nationality->getName()
        );
    }
}
