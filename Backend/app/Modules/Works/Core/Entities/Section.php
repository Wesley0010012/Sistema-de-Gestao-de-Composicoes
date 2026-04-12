<?php

namespace App\Modules\Works\Core\Entities;

use App\Modules\Shared\Core\Entities\AbstractEntity;
use App\Modules\Works\Core\Vo\Key;
use App\Modules\Works\Core\Entities\Score;

class Section extends AbstractEntity
{
    private Key $key;

    /**
     * @var Score[]
     */
    private array $scores;

    public function __construct(
        Key $key,
        array $scores = [],
        ?int $id = null,
        ?\DateTime $createdAt = null,
        ?\DateTime $updatedAt = null,
        bool $active = true
    ) {
        parent::__construct($id, $createdAt, $updatedAt, $active);
        $this->key = $key;
        $this->scores = $scores;
    }

    // Getters
    public function getKey(): Key
    {
        return $this->key;
    }

    /**
     * @return Score[]
     */
    public function getScores(): array
    {
        return $this->scores;
    }

    // Setters
    public function setKey(Key $key): void
    {
        $this->key = $key;
    }

    public function setScores(array $scores): void
    {
        $this->scores = $scores;
    }

    public function addScore(Score $score): void
    {
        $this->scores[] = $score;
    }

    public function removeScore(Score $score): void
    {
        $index = array_search($score, $this->scores, true);
        if ($index !== false) {
            array_splice($this->scores, $index, 1);
        }
    }
}
