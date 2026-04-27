<?php

namespace App\Modules\Works\Infra\Repositories\Eloquent\Models;

use App\Modules\Works\Core\Entities\Work;
use App\Modules\Shared\Core\Entities\AbstractEntity;
use App\Modules\Shared\Infra\Repositories\Eloquent\Models\EloquentEntity;
use App\Modules\Composers\Infra\Repositories\Eloquent\Models\ComposerModel;
use App\Modules\Works\Infra\Repositories\Eloquent\Models\GenreModel;
use App\Modules\Works\Infra\Repositories\Eloquent\Models\SectionModel;
use DateTime;

class WorkModel extends EloquentEntity
{
    protected $table = 'works';

    protected $fillable = [
        'title',
        'subtitle',
        'catalog_number',
        'opus_number',
        'year_composition',
        'description',
        'active',
    ];

    protected $casts = [
        'catalog_number' => 'integer',
        'opus_number' => 'integer',
        'year_composition' => 'integer',
        'active' => 'boolean',
    ];

    /**
     * N:N - Work ↔ Genre
     */
    public function genres()
    {
        return $this->belongsToMany(
            GenreModel::class,
            'genre_work',
            'work_id',
            'genre_id'
        );
    }

    /**
     * N:N - Work ↔ Composer
     */
    public function composers()
    {
        return $this->belongsToMany(
            ComposerModel::class,
            'composer_work',
            'work_id',
            'composer_id'
        );
    }

    /**
     * 1:N - Work → Sections
     */
    public function sections()
    {
        return $this->hasMany(
            SectionModel::class,
            'work_id'
        );
    }

    public function toEntity(): AbstractEntity
    {
        $genres = $this->genres
            ? $this->genres->map(fn($g) => $g->toEntity())->toArray()
            : [];

        $composers = $this->composers
            ? $this->composers->map(fn($c) => $c->toEntity())->toArray()
            : [];

        $sections = $this->sections
            ? $this->sections->map(fn($s) => $s->toEntity())->toArray()
            : [];

        return new Work(
            title: $this->title,
            subtitle: $this->subtitle,
            catalogNumber: $this->catalog_number,
            opusNumber: $this->opus_number,
            genres: $genres,
            section: $sections,
            composers: $composers,
            yearComposition: $this->year_composition,
            description: $this->description,
            id: $this->id,
            createdAt: new DateTime($this->created_at),
            updatedAt: new DateTime($this->updated_at),
            active: $this->active
        );
    }
}
