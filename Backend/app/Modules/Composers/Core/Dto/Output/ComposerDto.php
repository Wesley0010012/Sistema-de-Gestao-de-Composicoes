<?php

namespace App\Modules\Composers\Core\Dto\Output;

use DateTime;
use Illuminate\Support\Facades\Storage;

class ComposerDto
{
    public int $id;
    public string $name;
    public ?string $photoPath;
    public DateTime $birthDate;
    public ?DateTime $deathDate;

    public NationalityDto $nationality;

    /**
     * @var PeriodDto[]
     */
    public array $periods;

    public function __construct(
        int $id,
        string $name,
        ?string $photoPath,
        DateTime $birthDate,
        ?DateTime $deathDate,
        NationalityDto $nationality,
        array $periods = []
    ) {
        $this->id = $id;
        $this->name = $name;
        $this->photoPath = !is_null($photoPath) ? Storage::disk('public')->url($photoPath) : null;
        $this->birthDate = $birthDate;
        $this->deathDate = $deathDate;
        $this->nationality = $nationality;
        $this->periods = $periods;
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getPhotoPath(): ?string
    {
        return $this->photoPath;
    }

    public function getBirthDate(): DateTime
    {
        return $this->birthDate;
    }

    public function getDeathDate(): ?DateTime
    {
        return $this->deathDate;
    }

    public function getNationality(): NationalityDto
    {
        return $this->nationality;
    }

    /**
     * @return PeriodDto[]
     */
    public function getPeriods(): array
    {
        return $this->periods;
    }
}
