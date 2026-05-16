<?php

namespace App\Modules\Auth\Core\Entities;

use App\Modules\Shared\Core\Entities\AbstractEntity;
use DateTime;

class User extends AbstractEntity
{
    public function __construct(
        private string $name,
        private string $email,
        private string $password,
        ?int $id = null,
        ?DateTime $createdAt = null,
        ?DateTime $updatedAt = null,
        bool $active = true
    ) {
        parent::__construct($id, $createdAt, $updatedAt, $active);
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getPassword(): string
    {
        return $this->password;
    }
}
