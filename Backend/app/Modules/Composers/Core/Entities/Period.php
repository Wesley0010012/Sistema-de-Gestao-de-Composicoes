<?php

namespace App\Modules\Composers\Core\Entities;

use App\Modules\Shared\Core\Entities\AbstractEntity;
use DateTime;
use InvalidArgumentException;

class Period extends AbstractEntity
{
    private string $name;
    private int $startYear;
    private ?int $endYear;
    private string $description;

    public function __construct(
        string $name,
        int $startYear,
        ?int $endYear,
        string $description,
        ?int $id = null,
        ?DateTime $createdAt = null,
        ?DateTime $updatedAt = null,
        bool $active = true
    ) {
        parent::__construct($id, $createdAt, $updatedAt, $active);

        $this->setName($name);
        $this->setStartYear($startYear);
        $this->setEndYear($endYear);
        $this->setDescription($description);
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getStartYear(): int
    {
        return $this->startYear;
    }

    public function setStartYear(int $startYear): void
    {
        $this->startYear = $startYear;
    }

    public function getEndYear(): ?int
    {
        return $this->endYear;
    }

    public function setEndYear(?int $endYear): void
    {
        $this->endYear = $endYear;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function setDescription(string $description): void
    {
        $this->description = $description;
    }
}
