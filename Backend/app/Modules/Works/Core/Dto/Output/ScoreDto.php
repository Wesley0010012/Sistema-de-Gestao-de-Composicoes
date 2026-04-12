<?php

namespace App\Modules\Works\Core\Dto\Output;

use App\Modules\Works\Core\Dto\InstrumentDto;

class ScoreDto
{
    public int $id;
    public string $path;
    public InstrumentDto $instrument;

    public function __construct(
        int $id,
        string $path,
        InstrumentDto $instrument
    ) {
        $this->id = $id;
        $this->path = $path;
        $this->instrument = $instrument;
    }
}
