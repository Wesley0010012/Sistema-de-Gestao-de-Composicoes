<?php

namespace App\Modules\Composers\Core\Dto\Output;

class PeriodDto
{
    public int $id;
    public string $name;
    public int $startYear;
    public ?int $endYear;

    public function __construct(
        int $id,
        string $name,
        int $startYear,
        ?int $endYear
    ) {
        $this->id = $id;
        $this->name = $name;
        $this->startYear = $startYear;
        $this->endYear = $endYear;
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getStartYear(): int
    {
        return $this->startYear;
    }

    public function getEndYear(): ?int
    {
        return $this->endYear;
    }
}
