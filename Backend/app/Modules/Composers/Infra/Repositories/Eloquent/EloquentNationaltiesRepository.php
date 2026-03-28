<?php

namespace App\Modules\Composers\Infra\Repositories\Eloquent;

use App\Modules\Composers\Core\Repositories\NationalitiesRepository;
use App\Modules\Composers\Infra\Repositories\Eloquent\Models\NationalityModel;
use App\Modules\Shared\Core\Entities\AbstractEntity;

class EloquentNationaltiesRepository extends NationalitiesRepository
{
    public function findAll(): array
    {
        return NationalityModel::all()
            ->map(fn(NationalityModel $i) => $i->toEntity())
            ->toArray();
    }

    public function findById(int $id): ?AbstractEntity
    {
        $model = NationalityModel::find($id);

        if (!$model) {
            return null;
        }

        return ((fn($i): NationalityModel => $i)($model))->toEntity();
    }
}
