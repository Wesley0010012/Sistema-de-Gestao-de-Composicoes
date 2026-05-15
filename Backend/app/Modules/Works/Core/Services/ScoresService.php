<?php

namespace App\Modules\Works\Core\Services;

use App\Modules\Shared\Core\Entities\AbstractEntity;
use App\Modules\Shared\Core\Traits\Services\AddInputToEntityTrait;
use App\Modules\Shared\Core\Traits\Services\EntityToDtoTrait;
use App\Modules\Works\Core\Dto\AddScoreDto;
use App\Modules\Works\Core\Dto\Output\ScoreDto;
use App\Modules\Works\Core\Entities\Instrument;
use App\Modules\Works\Core\Entities\Score;

class ScoresService
{

    public function __construct(
        private readonly InstrumentsService $instrumentsService
    ) {}

    use EntityToDtoTrait, AddInputToEntityTrait;

    public function addInputToEntity(mixed $addInput): AbstractEntity
    {
        $addScoreDto = (fn($i): AddScoreDto => $i)($addInput);

        $instrument = (fn($i): Instrument => $i)($this->instrumentsService->findById($addScoreDto->getInstrumentId()));

        return new Score(
            $addScoreDto->getPath(),
            $instrument
        );
    }

    public function entityToDto(AbstractEntity $entity): mixed
    {
        $score = (fn($i): Score => $i)($entity);

        $instrument = $this->instrumentsService->entityToDto($score->getInstrument());

        return new ScoreDto(
            $score->getId(),
            $score->getPath(),
            $instrument
        );
    }
}
