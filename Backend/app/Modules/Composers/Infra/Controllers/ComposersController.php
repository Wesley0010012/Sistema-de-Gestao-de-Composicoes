<?php

namespace App\Modules\Composers\Infra\Controllers;

use App\Modules\Composers\Core\Services\ComposersService;
use App\Modules\Composers\Infra\Requests\AddComposerRequest;
use App\Modules\Shared\Infra\Traits\Controllers\CountAllTrait;
use App\Modules\Shared\Infra\Traits\Controllers\DeleteByIdTrait;
use App\Modules\Shared\Infra\Traits\Controllers\FindAllPaginatedTrait;
use App\Modules\Shared\Infra\Traits\Controllers\FindByIdTrait;
use App\Modules\Shared\Infra\Traits\Controllers\GetServiceTrait;

class ComposersController
{
    use GetServiceTrait, FindAllPaginatedTrait, FindByIdTrait, DeleteByIdTrait, CountAllTrait;

    public function __construct(
        private readonly ComposersService $service
    ) {}

    public function countRecent()
    {
        return response()->json([
            'total' => $this->service->countRecent()
        ]);
    }

    public function add(AddComposerRequest $request)
    {
        return response()->json($this->service->add($request->toDto()));
    }
}
