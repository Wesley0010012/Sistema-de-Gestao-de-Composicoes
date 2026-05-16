<?php

namespace App\Modules\Auth\Core\Dto\Output;

class UserDto
{
    public function __construct(
        public int $id,
        public string $name,
        public string $email
    ) {
    }
}
