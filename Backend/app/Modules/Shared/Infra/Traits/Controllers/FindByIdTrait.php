<?php

namespace App\Modules\Shared\Infra\Traits\Controllers;

trait FindByIdTrait
{
    use GetServiceTrait;

    public function findById(int $id)
    {
        return response()->json($this->getService()->findEntityById($id));
    }
}
