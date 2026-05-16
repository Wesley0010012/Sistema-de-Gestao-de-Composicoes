<?php

namespace App\Modules\Auth\Core\Services;

use App\Modules\Auth\Core\Dto\LoginDto;
use App\Modules\Auth\Core\Dto\Output\TokenDto;
use App\Modules\Auth\Core\Repositories\UsersRepository;
use App\Modules\Auth\Core\Security\EncrypterProtocol;
use Illuminate\Validation\ValidationException;

class AuthService
{
    public function __construct(
        private readonly UsersRepository $usersRepository,
        private readonly EncrypterProtocol $encrypter,
        private readonly TokenService $tokenService
    ) {}

    public function login(LoginDto $dto): TokenDto
    {
        $user = $this->usersRepository->findByEmail($dto->getEmail());

        if (
            !$user ||
            !$this->encrypter->validate($dto->getPassword(), $user->getPassword())
        ) {
            throw ValidationException::withMessages([
                'email' => ['Credenciais inválidas.'],
            ]);
        }

        return $this->tokenService->generate($user);
    }
}
