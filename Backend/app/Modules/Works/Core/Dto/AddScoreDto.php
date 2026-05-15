<?php

namespace App\Modules\Works\Core\Dto;

class AddScoreDto
{
    private int $instrumentId;
    private string $path;

    public function __construct(int $instrumentId, string $path)
    {
        $this->instrumentId = $instrumentId;
        $this->path = $path;
    }

    public function getInstrumentId(): int
    {
        return $this->instrumentId;
    }

    public function getPath(): string
    {
        return $this->path;
    }
}
