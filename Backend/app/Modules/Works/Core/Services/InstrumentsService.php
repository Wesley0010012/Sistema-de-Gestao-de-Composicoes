<?php

namespace App\Modules\Works\Core\Services;

use App\Modules\Shared\Core\Entities\AbstractEntity;
use App\Modules\Shared\Core\Traits\Services\FindAllTrait;
use App\Modules\Works\Core\Dto\InstrumentDto;
use App\Modules\Works\Core\Entities\Instrument;
use App\Modules\Works\Core\Repositories\InstrumentsRepository;

class InstrumentsService
{
    use FindAllTrait;

    public function __construct(
        private readonly InstrumentsRepository $repository
    ) {}

    public function entityToDto(AbstractEntity $entity): mixed
    {
        $instrument = (fn($i): Instrument => $i)($entity);

        return new InstrumentDto(
            $instrument->getId(),
            $instrument->getName(),
        );
    }
}
