<?php

namespace App\Modules\Shared\Infra\Traits\Controllers;

trait GetServiceTrait
{
    protected function getService(): mixed
    {
        return $this->service;
    }
}
