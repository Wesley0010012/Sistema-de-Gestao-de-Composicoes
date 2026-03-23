<?php

namespace App\Modules\Composers\Infra\Repositories\Eloquent\Models;

use App\Modules\Composers\Core\Entities\Composer;
use App\Modules\Shared\Core\Entities\AbstractEntity;
use App\Modules\Shared\Infra\Repositories\Eloquent\Models\EloquentEntity;
use DateTime;

class ComposerModel extends EloquentEntity
{
    protected $table = 'composers';

    protected $fillable = [
        'name',
        'photo_path',
        'birth_date',
        'death_date',
        'nationality_id',
        'active',
    ];

    protected $casts = [
        'birth_date' => 'date',
        'death_date' => 'date',
        'active' => 'boolean',
    ];

    public function nationality()
    {
        return $this->belongsTo(NationalityModel::class, 'nationality_id');
    }

    public function periods()
    {
        return $this->belongsToMany(
            PeriodModel::class,
            'composer_periods',
            'composer_id',
            'period_id'
        );
    }

    public function toEntity(): AbstractEntity
    {
        $nationality = (fn($i): NationalityModel => $i)($this->nationality)->toEntity();

        $periods = $this->periods
            ->map(fn($p) => $p->toEntity())
            ->toArray();

        return new Composer(
            name: $this->name,
            photoPath: $this->photo_path,
            birthDate: new DateTime($this->birth_date),
            nationality: $nationality,
            deathDate: $this->death_date ? new DateTime($this->death_date) : null,
            periods: $periods,
            id: $this->id,
            createdAt: new DateTime($this->created_at),
            updatedAt: new DateTime($this->updated_at),
            active: $this->active
        );
    }
}
