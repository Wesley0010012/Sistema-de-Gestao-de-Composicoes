<?php

namespace App\Modules\Composers\Core\Services;

use App\Modules\Composers\Core\Dto\Output\PeriodDto;
use App\Modules\Composers\Core\Entities\Period;
use App\Modules\Composers\Core\Repositories\PeriodsRepository;
use App\Modules\Shared\Core\Entities\AbstractEntity;
use App\Modules\Shared\Core\Traits\Services\FindAllTrait;
use App\Modules\Shared\Core\Traits\Services\FindManyByMultiplesIdsTrait;

class PeriodsService
{
    use FindManyByMultiplesIdsTrait, FindAllTrait;

    public function __construct(
        private readonly PeriodsRepository $repository
    ) {}

    public function entityToDto(AbstractEntity $entity): mixed
    {
        $period = (fn($i): Period => $i)($entity);

        return new PeriodDto(
            $period->getId(),
            $period->getName(),
            $period->getStartYear(),
            $period->getEndYear()
        );
    }
}
