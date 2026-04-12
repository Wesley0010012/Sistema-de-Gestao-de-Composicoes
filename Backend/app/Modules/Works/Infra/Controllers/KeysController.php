<?php

namespace App\Modules\Works\Infra\Controllers;

use App\Modules\Works\Core\Services\KeysService;

class KeysController
{
    public function __construct(private readonly KeysService $keysService) {}

    public function getAllModes()
    {
        return response($this->keysService->getAllModes());
    }

    public function getAllRoots()
    {
        return response($this->keysService->getAllRoots());
    }
}
