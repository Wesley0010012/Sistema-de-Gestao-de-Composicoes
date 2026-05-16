<?php

namespace App\Modules\Auth\Infra\Security;

use App\Modules\Auth\Core\Security\EncrypterProtocol;

class BcryptEncrypter implements EncrypterProtocol
{
    public function encrypt(string $value): string
    {
        return password_hash($value, PASSWORD_BCRYPT);
    }

    public function validate(string $value, string $encryptedValue): bool
    {
        return password_verify($value, $encryptedValue);
    }
}
