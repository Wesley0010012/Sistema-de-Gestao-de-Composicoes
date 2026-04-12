<?php

namespace App\Modules\Works\Core\Entities;

use App\Modules\Shared\Core\Entities\AbstractEntity;

class Instrument extends AbstractEntity
{
    private string $name;

    public function __construct(
        string $name,
        ?int $id = null,
        ?\DateTime $createdAt = null,
        ?\DateTime $updatedAt = null,
        bool $active = true
    ) {
        parent::__construct($id, $createdAt, $updatedAt, $active);
        $this->name = $name;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }
}
