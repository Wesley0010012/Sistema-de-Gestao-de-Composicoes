<?php

namespace App\Modules\Works\Core\Entities;

use App\Modules\Shared\Core\Entities\AbstractEntity;
use App\Modules\Works\Core\Entities\Instrument;

class Score extends AbstractEntity
{
    private string $path;
    private Instrument $instrument;

    public function __construct(
        string $path,
        Instrument $instrument,
        ?int $id = null,
        ?\DateTime $createdAt = null,
        ?\DateTime $updatedAt = null,
        bool $active = true
    ) {
        parent::__construct($id, $createdAt, $updatedAt, $active);
        $this->path = $path;
        $this->instrument = $instrument;
    }

    public function getPath(): string
    {
        return $this->path;
    }

    public function getInstrument(): Instrument
    {
        return $this->instrument;
    }

    // Setters
    public function setPath(string $path): void
    {
        $this->path = $path;
    }

    public function setInstrument(Instrument $instrument): void
    {
        $this->instrument = $instrument;
    }
}
