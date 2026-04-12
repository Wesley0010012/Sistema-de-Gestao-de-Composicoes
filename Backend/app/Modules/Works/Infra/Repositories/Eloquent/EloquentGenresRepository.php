<?php

namespace App\Modules\Works\Infra\Repositories\Eloquent;

use App\Modules\Works\Core\Repositories\GenresRepository;
use App\Modules\Works\Infra\Repositories\Eloquent\Models\GenreModel;

class EloquentGenresRepository extends GenresRepository
{
    public function findAll(): array
    {
        return GenreModel::all()
            ->map(fn(GenreModel $i) => $i->toEntity())
            ->toArray();
    }
}
