<?php

namespace App\Modules\Works\Core\Dto\Output;

use App\Modules\Works\Core\Vo\Key;

class SectionDto
{
    public int $id;
    public KeyDto $key;

    /**
     * @var ScoreDto[]
     */
    public array $scores;

    public function __construct(
        int $id,
        Key $key,
        array $scores = []
    ) {
        $this->id = $id;
        $this->key = new KeyDto($key->getRoot()->value, $key->getKeyMode()->value);
        $this->scores = $scores;
    }
}
