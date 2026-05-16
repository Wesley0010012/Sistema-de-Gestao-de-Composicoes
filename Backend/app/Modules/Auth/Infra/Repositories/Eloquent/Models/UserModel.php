<?php

namespace App\Modules\Auth\Infra\Repositories\Eloquent\Models;

use App\Modules\Auth\Core\Entities\User;
use App\Modules\Shared\Infra\Repositories\Eloquent\Models\EloquentEntity;
use DateTime;
use Illuminate\Database\Eloquent\Model;

class UserModel extends EloquentEntity
{
    protected $table = 'users';

    protected $fillable = [
        'name',
        'email',
        'password',
        'active',
    ];

    protected $casts = [
        'active' => 'boolean',
    ];

    public function toEntity(): User
    {
        return new User(
            name: $this->name,
            email: $this->email,
            password: $this->password,
            id: $this->id,
            createdAt: new DateTime($this->created_at),
            updatedAt: new DateTime($this->updated_at),
            active: $this->active ?? true
        );
    }
}
