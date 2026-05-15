<?php

namespace App\Modules\Works\Infra\Repositories\Eloquent\Models;

use App\Modules\Shared\Core\Entities\AbstractEntity;
use App\Modules\Shared\Infra\Repositories\Eloquent\Models\EloquentEntity;
use App\Modules\Works\Core\Entities\Score;
use DateTime;

class ScoreModel extends EloquentEntity
{
    protected $table = 'scores';

    protected $fillable = [
        'section_id',
        'instrument_id',
        'path',
        'active',
    ];

    protected $casts = [
        'active' => 'boolean',
    ];

    public function instrument()
    {
        return $this->belongsTo(InstrumentModel::class, 'instrument_id');
    }

    public function section()
    {
        return $this->belongsTo(SectionModel::class, 'section_id');
    }

    public function toEntity(): AbstractEntity
    {
        $instrument = (fn($i): InstrumentModel => $i)($this->instrument)->toEntity();

        return new Score(
            path: $this->path,
            instrument: $instrument,
            id: $this->id,
            createdAt: new DateTime($this->created_at),
            updatedAt: new DateTime($this->updated_at),
            active: $this->active
        );
    }
}
