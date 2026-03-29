<?php

namespace App\Modules\Shared\Infra\Traits\Controllers;

use App\Modules\Shared\Infra\Requests\AbstractFindAllRequest;

trait FindAllPaginatedTrait
{
    use GetServiceTrait;

    public function findAllPaginated(AbstractFindAllRequest $request)
    {
        return response()->json($this->getService()->findAllPaginated($request->toDto()));
    }
}
