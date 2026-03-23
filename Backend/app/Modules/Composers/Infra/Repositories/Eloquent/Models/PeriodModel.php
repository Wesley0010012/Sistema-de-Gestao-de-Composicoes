<?php

namespace App\Modules\Composers\Infra\Repositories\Eloquent\Models;

use App\Modules\Composers\Core\Entities\Period;
use App\Modules\Shared\Core\Entities\AbstractEntity;
use App\Modules\Shared\Infra\Repositories\Eloquent\Models\EloquentEntity;
use DateTime;

class PeriodModel extends EloquentEntity
{
    protected $table = 'periods';

    protected $fillable = [
        'name',
        'start_year',
        'end_year',
        'description',
        'active',
    ];

    protected $casts = [
        'active' => 'boolean',
        'start_year' => 'integer',
        'end_year' => 'integer',
    ];

    public function toEntity(): AbstractEntity
    {
        return new Period(
            name: $this->name,
            startYear: $this->start_year,
            endYear: $this->end_year,
            description: $this->description,
            id: $this->id,
            createdAt: new DateTime($this->created_at),
            updatedAt: new DateTime($this->updated_at),
            active: $this->active
        );
    }
}
