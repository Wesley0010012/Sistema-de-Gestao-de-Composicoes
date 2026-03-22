<?php

namespace App\Modules\Composers\Core\Entities;

use App\Modules\Shared\Core\Entities\AbstractEntity;
use DateTime;

class Nationality extends AbstractEntity
{
    private string $name;
    private string $code;

    public function __construct(
        string $name,
        string $code,
        ?int $id = null,
        ?DateTime $createdAt = null,
        ?DateTime $updatedAt = null,
        bool $active = true
    ) {
        parent::__construct($id, $createdAt, $updatedAt, $active);

        $this->setName($name);
        $this->setCode($code);
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getCode(): string
    {
        return $this->code;
    }

    public function setCode(string $code): void
    {
        $this->code = strtoupper($code);
    }
}
