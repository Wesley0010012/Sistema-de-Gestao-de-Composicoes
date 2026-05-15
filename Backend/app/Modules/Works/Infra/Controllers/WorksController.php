<?php

namespace App\Modules\Works\Infra\Controllers;

use App\Modules\Shared\Infra\Traits\Controllers\CountAllTrait;
use App\Modules\Shared\Infra\Traits\Controllers\DeleteByIdTrait;
use App\Modules\Shared\Infra\Traits\Controllers\FindAllPaginatedTrait;
use App\Modules\Shared\Infra\Traits\Controllers\FindByIdTrait;
use App\Modules\Works\Core\Services\WorksService;
use App\Modules\Works\Infra\Requests\AddWorkRequest;
use App\Modules\Works\Infra\Requests\UpdateWorkRequest;
use App\Modules\Works\Infra\Requests\UploadScorePdfRequest;

class WorksController
{
    use FindAllPaginatedTrait, FindByIdTrait, DeleteByIdTrait, CountAllTrait;

    public function __construct(
        private readonly WorksService $service
    ) {}

    public function add(AddWorkRequest $request)
    {
        return response()->json($this->service->add($request->toDto()));
    }

    public function update(UpdateWorkRequest $request, int $id)
    {
        return response()->json($this->service->update($request->toDto(), $id));
    }

    public function countRecent()
    {
        return response()->json([
            'total' => $this->service->countRecent()
        ]);
    }

    public function uploadScorePdf(UploadScorePdfRequest $request, int $workId, int $scoreId)
    {
        return response()->json(
            $this->service->uploadScorePdf($workId, $scoreId, $request->storedPath())
        );
    }
}
