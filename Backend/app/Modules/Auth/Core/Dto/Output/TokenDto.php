<?php

namespace App\Modules\Auth\Core\Dto\Output;

class TokenDto
{
    public function __construct(
        public string $token,
        public string $type,
        public string $expiresAt,
        public UserDto $user
    ) {
    }
}
