<?php

namespace App\Modules\Works\Infra\Repositories\Eloquent\Models;

use App\Modules\Works\Core\Entities\Instrument;
use App\Modules\Shared\Core\Entities\AbstractEntity;
use App\Modules\Shared\Infra\Repositories\Eloquent\Models\EloquentEntity;

class InstrumentModel extends EloquentEntity
{
    protected $table = 'instruments';

    protected $fillable = [
        'name',
        'active',
    ];

    protected $casts = [
        'active' => 'boolean',
    ];

    public function toEntity(): AbstractEntity
    {
        return new Instrument(
            name: $this->name,
            id: $this->id,
            createdAt: new \DateTime($this->created_at),
            updatedAt: new \DateTime($this->updated_at),
            active: $this->active
        );
    }
}
