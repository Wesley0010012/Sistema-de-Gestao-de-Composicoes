<?php

namespace App\Modules\Works\Core\Dto\Output;

class KeyDto
{
    public string $root;
    public string $mode;

    public function __construct(
        string $root,
        string $mode
    ) {
        $this->root = $root;
        $this->mode = $mode;
    }

    public function getRoot(): string
    {
        return $this->root;
    }

    public function getMode(): string
    {
        return $this->mode;
    }
}
