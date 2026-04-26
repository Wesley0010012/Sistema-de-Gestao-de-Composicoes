<?php

namespace App\Modules\Works\Core\Dto\Output;

use App\Modules\Composers\Core\Dto\Output\ComposerDto;
use App\Modules\Works\Core\Dto\GenreDto;

class WorkDto
{
    public int $id;
    public string $title;
    public ?string $subtitle;
    public ?int $catalogNumber;
    public ?int $opusNumber;

    /**
     * @var GenreDto[]
     */
    public array $genres;

    /**
     * @var ComposerDto[]
     */
    public array $composers;

    /**
     * @var SectionDto[]
     */
    public array $sections;

    public ?int $yearComposition;
    public ?string $description;

    public function __construct(
        int $id,
        string $title,
        ?string $subtitle = null,
        ?int $catalogNumber = null,
        ?int $opusNumber = null,
        array $genres = [],
        array $composers = [],
        array $sections = [],
        ?int $yearComposition = null,
        ?string $description = null
    ) {
        $this->id = $id;
        $this->title = $title;
        $this->subtitle = $subtitle;
        $this->catalogNumber = $catalogNumber;
        $this->opusNumber = $opusNumber;
        $this->genres = $genres;
        $this->composers = $composers;
        $this->sections = $sections;
        $this->yearComposition = $yearComposition;
        $this->description = $description;
    }

    /**
     * @return SectionDto[]
     */
    public function getSections(): array
    {
        return $this->sections;
    }
}
