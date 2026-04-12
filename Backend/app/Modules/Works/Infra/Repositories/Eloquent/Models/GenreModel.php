<?php

namespace App\Modules\Works\Infra\Repositories\Eloquent\Models;

use App\Modules\Works\Core\Entities\Genre;
use App\Modules\Shared\Core\Entities\AbstractEntity;
use App\Modules\Shared\Infra\Repositories\Eloquent\Models\EloquentEntity;

class GenreModel extends EloquentEntity
{
    protected $table = 'genres';

    protected $fillable = [
        'name',
        'description',
        'active',
    ];

    protected $casts = [
        'active' => 'boolean',
    ];

    public function toEntity(): AbstractEntity
    {
        return new Genre(
            name: $this->name,
            description: $this->description,
            id: $this->id,
            createdAt: new \DateTime($this->created_at),
            updatedAt: new \DateTime($this->updated_at),
            active: $this->active
        );
    }
}
