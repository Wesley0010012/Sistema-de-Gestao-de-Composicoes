<?php

namespace App\Modules\Composers\Infra\Repositories\Eloquent;

use App\Modules\Composers\Core\Repositories\PeriodsRepository;
use App\Modules\Composers\Infra\Repositories\Eloquent\Models\PeriodModel;
use App\Modules\Shared\Core\Entities\AbstractEntity;

class EloquentPeriodsRepository extends PeriodsRepository
{
    public function findManyByMultiplesIds(array $ids): array
    {
        return PeriodModel::whereIn('id', $ids)
            ->get()
            ->map(fn(PeriodModel $i) => $i->toEntity())
            ->toArray();
    }

    public function findAll(): array
    {
        return PeriodModel::all()
            ->map(fn(PeriodModel $i) => $i->toEntity())
            ->toArray();
    }

    public function findById(int $id): ?AbstractEntity
    {
        $model = PeriodModel::find($id);

        if (!$model) {
            return null;
        }

        return ((fn($i): PeriodModel => $i)($model))->toEntity();
    }
}
