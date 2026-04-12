<?php

namespace App\Modules\Works\Infra\Repositories\Eloquent;

use App\Modules\Works\Core\Repositories\InstrumentsRepository;
use App\Modules\Works\Infra\Repositories\Eloquent\Models\GenreModel;
use App\Modules\Works\Infra\Repositories\Eloquent\Models\InstrumentModel;

class EloquentInstrumentsRepository extends InstrumentsRepository
{
    public function findAll(): array
    {
        return InstrumentModel::all()
            ->map(fn(InstrumentModel $i) => $i->toEntity())
            ->toArray();
    }
}
