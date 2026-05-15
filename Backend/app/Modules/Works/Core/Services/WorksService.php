<?php

namespace App\Modules\Works\Core\Services;

use App\Modules\Composers\Core\Entities\Composer;
use App\Modules\Composers\Core\Services\ComposersService;
use App\Modules\Shared\Core\Entities\AbstractEntity;
use App\Modules\Shared\Core\Traits\Services\AddEntityTrait;
use App\Modules\Shared\Core\Traits\Services\CountAllTrait;
use App\Modules\Shared\Core\Traits\Services\DeleteByIdTrait;
use App\Modules\Shared\Core\Traits\Services\FindAllPaginatedTrait;
use App\Modules\Shared\Core\Traits\Services\FindByIdTrait;
use App\Modules\Shared\Core\Traits\Services\FindEntityByIdTrait;
use App\Modules\Shared\Core\Traits\Services\UpdateEntityTrait;
use App\Modules\Works\Core\Dto\AddWorkDto;
use App\Modules\Works\Core\Dto\Output\WorkDto;
use App\Modules\Works\Core\Dto\UpdateWorkDto;
use App\Modules\Works\Core\Entities\Genre;
use App\Modules\Works\Core\Entities\Section;
use App\Modules\Works\Core\Entities\Work;
use App\Modules\Works\Core\Repositories\WorksRepository;

class WorksService
{
    use UpdateEntityTrait, FindAllPaginatedTrait, FindEntityByIdTrait, FindByIdTrait, DeleteByIdTrait, CountAllTrait, AddEntityTrait;

    public function __construct(
        private readonly WorksRepository $repository,
        private readonly ComposersService $composersService,
        private readonly GenresService $genresService,
        private readonly SectionsService $sectionsService
    ) {}

    protected function updateInputToEntity(mixed $updateInput, int $id): AbstractEntity
    {
        $updateWorkDto = (fn($i): UpdateWorkDto => $i)($updateInput);

        $genres = $this->genresService->findManyByMultiplesIds($updateWorkDto->getGenresIds());

        $composers = $this->composersService->findManyByMultiplesIds($updateWorkDto->getComposersIds());

        $sections = array_map(
            fn($section) => $this->sectionsService->addInputToEntity($section),
            $updateWorkDto->getSections()
        );

        $work = (fn($i): Work => $i)($this->findById($id));

        $work->setTitle($updateWorkDto->getTitle());
        $work->setSubtitle($updateWorkDto->getSubtitle());
        $work->setCatalogNumber($updateWorkDto->getCatalogNumber());
        $work->setOpusNumber($updateWorkDto->getOpusNumber());
        $work->setGenres($genres);
        $work->setSection($sections);
        $work->setComposers($composers);
        $work->setYearComposition($updateWorkDto->getYearComposition());
        $work->setDescription($updateWorkDto->getDescription());

        return $work;
    }

    protected function addInputToEntity(mixed $addInput): AbstractEntity
    {
        $addWorkDto = (fn($i): AddWorkDto => $i)($addInput);

        $genres = $this->genresService->findManyByMultiplesIds($addWorkDto->getGenresIds());

        $composers = $this->composersService->findManyByMultiplesIds($addWorkDto->getComposersIds());

        $sections = array_map(
            fn($section) => $this->sectionsService->addInputToEntity($section),
            $addWorkDto->getSections()
        );

        return new Work(
            $addWorkDto->getTitle(),
            $addWorkDto->getSubtitle(),
            $addWorkDto->getCatalogNumber(),
            $addWorkDto->getOpusNumber(),
            $genres,
            $sections,
            $composers,
            $addWorkDto->getYearComposition(),
            $addWorkDto->getDescription()
        );
    }

    protected function applyAddRules(AbstractEntity $entity): void
    {
        $work = (fn($i): Work => $i)($entity);
    }

    public function uploadScorePdf(int $workId, int $scoreId, string $path): mixed
    {
        $this->repository->updateScorePdfPath($workId, $scoreId, $path);

        return $this->findEntityById($workId);
    }

    public function countRecent(): int
    {
        return $this->repository->countRecent();
    }

    public function entityToDto(AbstractEntity $entity): mixed
    {
        $work = (fn($i): Work => $i)($entity);

        $genres = array_map(fn(Genre $i) => $this->genresService->entityToDto($i), $work->getGenres());

        $composers = array_map(fn(Composer $i) => $this->composersService->entityToDto($i), $work->getComposers());

        $sections = array_map(fn(Section $i) => $this->sectionsService->entityToDto($i), $work->getSection());

        return new WorkDto(
            $work->getId(),
            $work->getTitle(),
            $work->getSubtitle(),
            $work->getCatalogNumber(),
            $work->getOpusNumber(),
            $genres,
            $composers,
            $sections,
            $work->getYearComposition(),
            $work->getDescription()
        );
    }
}
