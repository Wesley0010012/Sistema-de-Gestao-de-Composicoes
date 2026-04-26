<?php

namespace App\Modules\Works\Core\Dto\Output;

use App\Modules\Works\Core\Dto\InstrumentDto;
use Illuminate\Support\Facades\Storage;

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
        $this->path = Storage::disk('public')->url($path);
        $this->instrument = $instrument;
    }
}
