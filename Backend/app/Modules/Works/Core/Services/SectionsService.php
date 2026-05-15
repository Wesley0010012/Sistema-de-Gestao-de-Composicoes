<?php

namespace App\Modules\Works\Core\Services;

use App\Modules\Shared\Core\Entities\AbstractEntity;
use App\Modules\Shared\Core\Traits\Services\AddInputToEntityTrait;
use App\Modules\Shared\Core\Traits\Services\EntityToDtoTrait;
use App\Modules\Works\Core\Dto\AddSectionDto;
use App\Modules\Works\Core\Dto\Output\SectionDto;
use App\Modules\Works\Core\Entities\Score;
use App\Modules\Works\Core\Entities\Section;
use App\Modules\Works\Core\Enums\KeyModeEnum;
use App\Modules\Works\Core\Enums\KeyRootEnum;
use App\Modules\Works\Core\Vo\Key;

class SectionsService
{

    public function __construct(
        private readonly ScoresService $scoresService
    ) {}

    use EntityToDtoTrait, AddInputToEntityTrait;

    public function entityToDto(AbstractEntity $entity): mixed
    {
        $section = (fn($i): Section => $i)($entity);

        $scores = array_map(fn(Score $score) => $this->scoresService->entityToDto($score), $section->getScores());

        return new SectionDto(
            $section->getId(),
            $section->getKey(),
            $scores
        );
    }

    public function addInputToEntity(mixed $addInput): AbstractEntity
    {
        $addSectionDto = (fn($i): AddSectionDto => $i)($addInput);

        $scores = array_map(
            fn($score) => $this->scoresService->addInputToEntity($score),
            $addSectionDto->getScores()
        );

        return new Section(
            new Key(
                KeyRootEnum::from($addSectionDto->getKeyRoot()),
                KeyModeEnum::from($addSectionDto->getKeyMode())
            ),
            $scores
        );
    }
}
