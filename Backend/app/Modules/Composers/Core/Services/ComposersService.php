<?php

namespace App\Modules\Composers\Core\Services;

use App\Modules\Composers\Core\Dto\AddComposerDto;
use App\Modules\Composers\Core\Dto\Output\ComposerDto;
use App\Modules\Composers\Core\Entities\Composer;
use App\Modules\Composers\Core\Entities\Period;
use App\Modules\Composers\Core\Repositories\ComposersRepository;
use App\Modules\Shared\Core\Dto\FindAllPaginatedDto;
use App\Modules\Shared\Core\Dto\Output\EntityPageDto;
use App\Modules\Shared\Core\Entities\AbstractEntity;
use App\Modules\Shared\Core\Services\AbstractEntityService;
use App\Modules\Shared\Core\Traits\Services\CountAllTrait;
use App\Modules\Shared\Core\Traits\Services\DeleteByIdTrait;
use App\Modules\Shared\Core\Traits\Services\EntityToDtoTrait;
use App\Modules\Shared\Core\Traits\Services\FindAllPaginatedTrait;
use App\Modules\Shared\Core\Traits\Services\FindAllTrait;
use App\Modules\Shared\Core\Traits\Services\FindEntityByIdTrait;
use Exception;

class ComposersService
{
    use EntityToDtoTrait, DeleteByIdTrait, FindAllTrait, FindEntityByIdTrait, FindAllPaginatedTrait, CountAllTrait;

    public function __construct(
        private readonly ComposersRepository $repository,
        private readonly PeriodsService $periodsService,
        private readonly NationalitiesService $nationalitiesService
    ) {}

    public function entityToDto(AbstractEntity $entity): mixed
    {
        $composer = (fn($i): Composer => $i)($entity);

        $periodsDto = array_map(fn(Period $period) => $this->periodsService->entityToDto($period), $composer->getPeriods());

        $nationalityDto = $this->nationalitiesService->entityToDto($composer->getNationality());

        return new ComposerDto(
            $composer->getId(),
            $composer->getName(),
            $composer->getPhotoPath(),
            $composer->getBirthDate(),
            $composer->getDeathDate(),
            $nationalityDto,
            $periodsDto
        );
    }

    public function countRecent(): int
    {
        return $this->repository->countRecent();
    }
}
