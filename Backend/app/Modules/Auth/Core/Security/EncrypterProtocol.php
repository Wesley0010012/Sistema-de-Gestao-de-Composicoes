<?php

namespace App\Modules\Auth\Core\Security;

interface EncrypterProtocol
{
    public function encrypt(string $value): string;

    public function validate(string $value, string $encryptedValue): bool;
}
