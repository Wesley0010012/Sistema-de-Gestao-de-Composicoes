<?php

namespace App\Modules\Works\Infra\Repositories\Eloquent;

use App\Modules\Works\Core\Repositories\InstrumentsRepository;
use App\Modules\Shared\Core\Entities\AbstractEntity;
use App\Modules\Shared\Infra\Repositories\Eloquent\Models\EloquentEntity;
use App\Modules\Works\Infra\Repositories\Eloquent\Models\InstrumentModel;

class EloquentInstrumentsRepository extends InstrumentsRepository
{
    public function findAll(): array
    {
        return InstrumentModel::all()
            ->map(fn(InstrumentModel $i) => $i->toEntity())
            ->toArray();
    }

    public function findById(int $id): ?AbstractEntity
    {
        $model = InstrumentModel::find($id);

        if (!$model) {
            return null;
        }

        return ((fn(EloquentEntity $i) => $i)($model))->toEntity();
    }
}
