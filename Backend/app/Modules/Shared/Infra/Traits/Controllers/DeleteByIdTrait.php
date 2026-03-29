<?php

namespace App\Modules\Shared\Infra\Traits\Controllers;

trait DeleteByIdTrait
{
    use GetServiceTrait;

    public function deleteById(int $id)
    {
        $this->getService()->deleteById($id);

        return response()->noContent();
    }
}
