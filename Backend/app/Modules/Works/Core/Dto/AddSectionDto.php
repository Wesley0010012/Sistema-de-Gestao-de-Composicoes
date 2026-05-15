<?php

namespace App\Modules\Works\Core\Dto;

class AddSectionDto
{
    private string $keyRoot;
    private string $keyMode;

    /**
     * @var AddScoreDto[]
     */
    private array $scores;

    public function __construct(
        string $keyRoot,
        string $keyMode,
        array $scores = []
    ) {
        $this->keyRoot = $keyRoot;
        $this->keyMode = $keyMode;
        $this->scores = $scores;
    }

    public function getKeyRoot(): string
    {
        return $this->keyRoot;
    }

    public function getKeyMode(): string
    {
        return $this->keyMode;
    }

    /**
     * @return AddScoreDto[]
     */
    public function getScores(): array
    {
        return $this->scores;
    }
}
