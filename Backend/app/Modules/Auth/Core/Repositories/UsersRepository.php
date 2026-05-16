<?php

namespace App\Modules\Auth\Core\Repositories;

use App\Modules\Auth\Core\Entities\User;

abstract class UsersRepository
{
    public abstract function findByEmail(string $email): ?User;
}
