<?php

namespace App\Modules\Composers\Core\Entities;

use App\Modules\Shared\Core\Entities\AbstractEntity;
use DateTime;

class Composer extends AbstractEntity
{
    private string $name;
    private ?string $photoPath;
    private DateTime $birthDate;
    private ?DateTime $deathDate;
    private Nationality $nationality;

    /**
     * @var Period[]
     */
    private array $periods;

    public function __construct(
        string $name,
        ?string $photoPath = null,
        DateTime $birthDate,
        Nationality $nationality,
        ?DateTime $deathDate = null,
        array $periods = [],
        ?int $id = null,
        ?DateTime $createdAt = null,
        ?DateTime $updatedAt = null,
        bool $active = true
    ) {
        parent::__construct($id, $createdAt, $updatedAt, $active);

        $this->name = $name;
        $this->photoPath = $photoPath;
        $this->birthDate = $birthDate;
        $this->deathDate = $deathDate;
        $this->nationality = $nationality;
        $this->periods = $periods;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getPhotoPath(): ?string
    {
        return $this->photoPath;
    }

    public function setPhotoPath(?string $photoPath): void
    {
        $this->photoPath = $photoPath;
    }

    public function getBirthDate(): DateTime
    {
        return $this->birthDate;
    }

    public function setBirthDate(DateTime $birthDate): void
    {
        $this->birthDate = $birthDate;
    }

    public function getDeathDate(): ?DateTime
    {
        return $this->deathDate;
    }

    public function setDeathDate(?DateTime $deathDate): void
    {
        $this->deathDate = $deathDate;
    }

    public function getNationality(): Nationality
    {
        return $this->nationality;
    }

    public function setNationality(Nationality $Nationality): void
    {
        $this->nationality = $Nationality;
    }

    /**
     * @return Period[]
     */
    public function getPeriods(): array
    {
        return $this->periods;
    }

    /**
     * @param Period[] $periods
     */
    public function setPeriods(array $periods): void
    {
        $this->periods = $periods;
    }

    public function addPeriod(Period $period): void
    {
        $this->periods[] = $period;
    }

    public function removePeriod(Period $period): void
    {
        $this->periods = array_filter(
            $this->periods,
            fn(Period $p) => $p !== $period
        );
    }
}
