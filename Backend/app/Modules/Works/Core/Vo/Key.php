<?php

namespace App\Modules\Works\Core\Vo;

use App\Modules\Works\Core\Enums\KeyModeEnum;
use App\Modules\Works\Core\Enums\KeyRootEnum;

class Key
{
    private KeyRootEnum $root;
    private KeyModeEnum $keyMode;

    public function __construct(KeyRootEnum $root, KeyModeEnum $keyMode)
    {
        $this->root = $root;
        $this->keyMode = $keyMode;
    }

    public function getRoot(): KeyRootEnum
    {
        return $this->root;
    }

    public function getKeyMode(): KeyModeEnum
    {
        return $this->keyMode;
    }

    public function setRoot(KeyRootEnum $root): void
    {
        $this->root = $root;
    }

    public function setKeyMode(KeyModeEnum $keyMode): void
    {
        $this->keyMode = $keyMode;
    }
}
