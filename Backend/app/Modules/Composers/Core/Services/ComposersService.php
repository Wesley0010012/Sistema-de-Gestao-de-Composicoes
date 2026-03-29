<?php

namespace App\Modules\Composers\Core\Services;

use App\Modules\Composers\Core\Dto\AddComposerDto;
use App\Modules\Composers\Core\Dto\Output\ComposerDto;
use App\Modules\Composers\Core\Entities\Composer;
use App\Modules\Composers\Core\Entities\Period;
use App\Modules\Composers\Core\Repositories\ComposersRepository;
use App\Modules\Shared\Core\Entities\AbstractEntity;
use App\Modules\Shared\Core\Traits\Services\AddEntityTrait;
use App\Modules\Shared\Core\Traits\Services\CountAllTrait;
use App\Modules\Shared\Core\Traits\Services\DeleteByIdTrait;
use App\Modules\Shared\Core\Traits\Services\EntityToDtoTrait;
use App\Modules\Shared\Core\Traits\Services\FindAllPaginatedTrait;
use App\Modules\Shared\Core\Traits\Services\FindAllTrait;
use App\Modules\Shared\Core\Traits\Services\FindEntityByIdTrait;
use Exception;

class ComposersService
{
    use AddEntityTrait, EntityToDtoTrait, DeleteByIdTrait, FindAllTrait, FindEntityByIdTrait, FindAllPaginatedTrait, CountAllTrait;

    public function __construct(
        private readonly ComposersRepository $repository,
        private readonly PeriodsService $periodsService,
        private readonly NationalitiesService $nationalitiesService
    ) {}

    protected function applyAddRules(AbstractEntity $entity): void
    {
        $composer = (fn($i): Composer => $i)($entity);

        if ($this->repository->existsByName($composer->getName())) {
            throw new Exception();
        }
    }

    protected function addInputToEntity(mixed $addInput): AbstractEntity
    {
        $addComposerDto = (fn($i): AddComposerDto => $i)($addInput);

        $nationality = $this->nationalitiesService->findById($addComposerDto->getNationalityId());

        $periods = $this->periodsService->findManyByMultiplesIds($addComposerDto->getPeriodsIds());

        $composer = new Composer(
            $addComposerDto->getName(),
            $addComposerDto->getPhotoPath(),
            $addComposerDto->getBirthDate(),
            $nationality,
            $addComposerDto->getDeathDate(),
            $periods,
        );

        return $composer;
    }

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
