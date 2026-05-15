<?php

namespace App\Modules\Works\Infra\Repositories\Eloquent\Models;

use App\Modules\Shared\Core\Entities\AbstractEntity;
use App\Modules\Shared\Infra\Repositories\Eloquent\Models\EloquentEntity;
use App\Modules\Works\Core\Entities\Section;
use App\Modules\Works\Core\Enums\KeyModeEnum;
use App\Modules\Works\Core\Enums\KeyRootEnum;
use App\Modules\Works\Core\Vo\Key;
use DateTime;

class SectionModel extends EloquentEntity
{
    protected $table = 'sections';

    protected $fillable = [
        'work_id',
        'key_root',
        'key_mode',
        'active',
    ];

    protected $casts = [
        'active' => 'boolean',
    ];

    public function scores()
    {
        return $this->hasMany(ScoreModel::class, 'section_id');
    }

    public function work()
    {
        return $this->belongsTo(WorkModel::class, 'work_id');
    }

    public function toEntity(): AbstractEntity
    {
        $scores = $this->scores
            ? $this->scores->map(fn($s) => $s->toEntity())->toArray()
            : [];

        return new Section(
            key: new Key(KeyRootEnum::from($this->key_root), KeyModeEnum::from($this->key_mode)),
            scores: $scores,
            id: $this->id,
            createdAt: new DateTime($this->created_at),
            updatedAt: new DateTime($this->updated_at),
            active: $this->active
        );
    }
}
