<?php

namespace App\Modules\Shared\Infra\Traits\Controllers;

trait FindAllTrait
{
    use GetServiceTrait;

    public function findAll()
    {
        return response()->json($this->getService()->findAll());
    }
}
