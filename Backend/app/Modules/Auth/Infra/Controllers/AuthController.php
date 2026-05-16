<?php

namespace App\Modules\Auth\Infra\Controllers;

use App\Modules\Auth\Core\Services\AuthService;
use App\Modules\Auth\Infra\Requests\LoginRequest;

class AuthController
{
    public function __construct(
        private readonly AuthService $service
    ) {}

    public function login(LoginRequest $request)
    {
        return response()->json(
            $this->service->login($request->toDto())
        );
    }
}
