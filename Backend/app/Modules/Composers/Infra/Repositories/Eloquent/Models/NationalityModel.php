<?php

namespace App\Modules\Composers\Infra\Repositories\Eloquent\Models;

use App\Modules\Composers\Core\Entities\Nationality;
use App\Modules\Shared\Core\Entities\AbstractEntity;
use App\Modules\Shared\Infra\Repositories\Eloquent\Models\EloquentEntity;
use DateTime;

class NationalityModel extends EloquentEntity
{
    protected $table = 'nationalities';

    protected $fillable = [
        'name',
        'code',
        'active',
    ];

    protected $casts = [
        'active' => 'boolean',
    ];

    public function toEntity(): AbstractEntity
    {
        return new Nationality(
            name: $this->name,
            code: $this->code,
            id: $this->id,
            createdAt: new DateTime($this->created_at),
            updatedAt: new DateTime($this->updated_at),
            active: $this->active
        );
    }
}
