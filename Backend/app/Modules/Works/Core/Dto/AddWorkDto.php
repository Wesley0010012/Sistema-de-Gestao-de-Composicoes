<?php

namespace App\Modules\Works\Core\Dto;

class AddWorkDto
{
    private string $title;
    private ?string $subtitle;
    private ?int $catalogNumber;
    private ?int $opusNumber;

    /**
     * @var int[]
     */
    private array $genresIds;

    /**
     * @var int[]
     */
    private array $composersIds;

    /**
     * @var AddSectionDto[]
     */
    private array $sections;

    private ?int $yearComposition;
    private ?string $description;

    public function __construct(
        string $title,
        array $genresIds,
        array $composersIds,
        ?string $subtitle = null,
        ?int $catalogNumber = null,
        ?int $opusNumber = null,
        array $sections = [],
        ?int $yearComposition = null,
        ?string $description = null
    ) {
        $this->title = $title;
        $this->genresIds = $genresIds;
        $this->composersIds = $composersIds;
        $this->subtitle = $subtitle;
        $this->catalogNumber = $catalogNumber;
        $this->opusNumber = $opusNumber;
        $this->sections = $sections;
        $this->yearComposition = $yearComposition;
        $this->description = $description;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function getSubtitle(): ?string
    {
        return $this->subtitle;
    }

    public function getCatalogNumber(): ?int
    {
        return $this->catalogNumber;
    }

    public function getOpusNumber(): ?int
    {
        return $this->opusNumber;
    }

    /**
     * @return int[]
     */
    public function getGenresIds(): array
    {
        return $this->genresIds;
    }

    /**
     * @return int[]
     */
    public function getComposersIds(): array
    {
        return $this->composersIds;
    }

    /**
     * @return AddSectionDto[]
     */
    public function getSections(): array
    {
        return $this->sections;
    }

    public function getYearComposition(): ?int
    {
        return $this->yearComposition;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }
}
