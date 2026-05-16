<?php

namespace App\Modules\Auth\Infra\Repositories\Eloquent;

use App\Modules\Auth\Core\Entities\User;
use App\Modules\Auth\Core\Repositories\UsersRepository;
use App\Modules\Auth\Infra\Repositories\Eloquent\Models\UserModel;
use App\Modules\Shared\Infra\Repositories\Eloquent\Models\EloquentEntity;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;

class EloquentUsersRepository extends UsersRepository
{
    public function findByEmail(string $email): ?User
    {
        $query = UserModel::where('email', $email);

        if (Schema::hasColumn('users', 'active')) {
            $query->where('active', true);
        }

        $model = $query->first();

        if (!$model) {
            return null;
        }

        return ((fn($i): EloquentEntity => $i)($model))->toEntity();
    }
}
