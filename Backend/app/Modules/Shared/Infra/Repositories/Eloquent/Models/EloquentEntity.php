<?php

namespace App\Modules\Shared\Infra\Repositories\Eloquent\Models;

use App\Modules\Shared\Core\Entities\AbstractEntity;
use App\Modules\Shared\Infra\Repositories\Eloquent\Scopes\ActiveScope;
use Illuminate\Database\Eloquent\Model;

abstract class EloquentEntity extends Model
{
    protected static function booted(): void
    {
        static::addGlobalScope(new ActiveScope());
    }

    public abstract function toEntity(): AbstractEntity;
}
