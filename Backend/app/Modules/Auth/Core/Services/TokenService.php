<?php

namespace App\Modules\Auth\Core\Services;

use App\Modules\Auth\Core\Dto\Output\TokenDto;
use App\Modules\Auth\Core\Dto\Output\UserDto;
use App\Modules\Auth\Core\Entities\User;
use DateInterval;
use DateTimeImmutable;

class TokenService
{
    public function generate(User $user): TokenDto
    {
        $expiresAt = (new DateTimeImmutable())
            ->add(new DateInterval('PT8H'));

        return new TokenDto(
            token: bin2hex(random_bytes(32)),
            type: 'Bearer',
            expiresAt: $expiresAt->format(DATE_ATOM),
            user: new UserDto(
                id: $user->getId(),
                name: $user->getName(),
                email: $user->getEmail()
            )
        );
    }
}
