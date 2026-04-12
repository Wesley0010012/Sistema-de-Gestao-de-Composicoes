<?php

namespace App\Modules\Works\Core\Services;

use App\Modules\Works\Core\Dto\Output\KeyModeDto;
use App\Modules\Works\Core\Dto\Output\KeyRootDto;
use App\Modules\Works\Core\Enums\KeyModeEnum;
use App\Modules\Works\Core\Enums\KeyRootEnum;

class KeysService
{
    /**
     * Summary of getAllRoots
     * @return KeyRootDto[]
     */
    public function getAllRoots(): array
    {
        return array_map(
            fn($item) => new KeyRootDto($item->value),
            KeyRootEnum::cases()
        );
    }

    /**
     * Summary of getAllModes
     * @return KeyModeDto[]
     */
    public function getAllModes(): array
    {
        return array_map(
            fn($item) => new KeyModeDto($item->value),
            KeyModeEnum::cases()
        );
    }
}
