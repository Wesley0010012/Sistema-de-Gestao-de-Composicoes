<?php

namespace App\Modules\Shared\Core\Entities;

use DateTime;

abstract class AbstractEntity
{
    private int $id;
    private DateTime $createdAt;
    private DateTime $updatedAt;
    private bool $active;

    public function __construct(
        ?int $id = null,
        ?DateTime $createdAt = null,
        ?DateTime $updatedAt = null,
        bool $active = true
    ) {
        $this->id = $id;
        $this->createdAt = $createdAt ?? new DateTime();
        $this->updatedAt = $updatedAt ?? new DateTime();
        $this->active = $active;
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function setId(?int $id): void
    {
        $this->id = $id;
    }

    public function getCreatedAt(): DateTime
    {
        return $this->createdAt;
    }

    public function setCreatedAt(DateTime $createdAt): void
    {
        $this->createdAt = $createdAt;
    }

    public function getUpdatedAt(): DateTime
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(DateTime $updatedAt): void
    {
        $this->updatedAt = $updatedAt;
    }

    public function isActive(): bool
    {
        return $this->active;
    }

    public function setActive(bool $active): void
    {
        $this->active = $active;
    }
}
