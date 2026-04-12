<?php

namespace App\Modules\Works\Core\Entities;

use App\Modules\Shared\Core\Entities\AbstractEntity;

class Genre extends AbstractEntity
{
    private string $name;
    private string $description;

    public function __construct(
        string $name,
        string $description,
        ?int $id = null,
        ?\DateTime $createdAt = null,
        ?\DateTime $updatedAt = null,
        bool $active = true
    ) {
        parent::__construct($id, $createdAt, $updatedAt, $active);
        $this->name = $name;
        $this->description = $description;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getDescription(): string
    {
        return $this->description;
    }
}
