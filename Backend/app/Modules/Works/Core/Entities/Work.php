<?php

namespace App\Modules\Works\Core\Entities;

use App\Modules\Composers\Core\Entities\Composer;
use App\Modules\Shared\Core\Entities\AbstractEntity;
use App\Modules\Works\Core\Entities\Genre;
use App\Modules\Works\Core\Entities\Section;

class Work extends AbstractEntity
{
    private string $title;
    private ?string $subtitle;
    private ?int $catalogNumber;
    private ?int $opusNumber;

    /**
     * @var Genre[]
     */
    private array $genres;

    /**
     * @var Section[]
     */
    private array $section;

    /**
     * @var Composer[]
     */
    private array $composers;

    private ?int $yearComposition;
    private ?string $description;

    public function __construct(
        string $title,
        ?string $subtitle = null,
        ?int $catalogNumber = null,
        ?int $opusNumber = null,
        array $genres = [],
        array $section = [],
        array $composers = [],
        ?int $yearComposition = null,
        ?string $description = null,
        ?int $id = null,
        ?\DateTime $createdAt = null,
        ?\DateTime $updatedAt = null,
        bool $active = true
    ) {
        parent::__construct($id, $createdAt, $updatedAt, $active);

        $this->title = $title;
        $this->subtitle = $subtitle;
        $this->catalogNumber = $catalogNumber;
        $this->opusNumber = $opusNumber;
        $this->genres = $genres;
        $this->section = $section;
        $this->composers = $composers;
        $this->yearComposition = $yearComposition;
        $this->description = $description;
    }

    // Getters

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
     * @return Genre[]
     */
    public function getGenres(): array
    {
        return $this->genres;
    }

    /**
     * @return Section[]
     */
    public function getSection(): array
    {
        return $this->section;
    }

    /**
     * @return Composer[]
     */
    public function getComposers(): array
    {
        return $this->composers;
    }

    public function getYearComposition(): ?int
    {
        return $this->yearComposition;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    // Setters

    public function setTitle(string $title): void
    {
        $this->title = $title;
    }

    public function setSubtitle(?string $subtitle): void
    {
        $this->subtitle = $subtitle;
    }

    public function setCatalogNumber(?int $catalogNumber): void
    {
        $this->catalogNumber = $catalogNumber;
    }

    public function setOpusNumber(?int $opusNumber): void
    {
        $this->opusNumber = $opusNumber;
    }

    /**
     * @param Genre[] $genres
     */
    public function setGenres(array $genres): void
    {
        $this->genres = $genres;
    }

    /**
     * @param Section[] $section
     */
    public function setSection(array $section): void
    {
        $this->section = $section;
    }

    /**
     * @param Composer[] $composers
     */
    public function setComposers(array $composers): void
    {
        $this->composers = $composers;
    }

    public function setYearComposition(?int $yearComposition): void
    {
        $this->yearComposition = $yearComposition;
    }

    public function setDescription(?string $description): void
    {
        $this->description = $description;
    }

    // Helpers

    public function addGenre(Genre $genre): void
    {
        $this->genres[] = $genre;
    }

    public function removeGenre(Genre $genre): void
    {
        $this->genres = array_filter(
            $this->genres,
            fn(Genre $g) => $g !== $genre
        );
    }

    public function addSection(Section $section): void
    {
        $this->section[] = $section;
    }

    public function removeSection(Section $section): void
    {
        $this->section = array_filter(
            $this->section,
            fn(Section $s) => $s !== $section
        );
    }

    public function addComposer(Composer $composer): void
    {
        $this->composers[] = $composer;
    }

    public function removeComposer(Composer $composer): void
    {
        $this->composers = array_filter(
            $this->composers,
            fn(Composer $c) => $c !== $composer
        );
    }
}
