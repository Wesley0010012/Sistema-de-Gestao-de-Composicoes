<?php

namespace App\Modules\Shared\Infra\Traits\Controllers;

trait CountAllTrait
{
    use GetServiceTrait;

    public function countAll()
    {
        return response()->json([
            'total' => $this->service->countAll()
        ]);
    }
}
