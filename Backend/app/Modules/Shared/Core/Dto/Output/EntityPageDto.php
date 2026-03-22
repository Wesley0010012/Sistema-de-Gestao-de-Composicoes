<?php

namespace App\Modules\Shared\Core\Dto\Output;

use App\Modules\Shared\Core\Enums\EntityPageOrder;

class EntityPageDto
{
    public int $quantity;
    public int $totalPages;
    public int $actualPage;
    public array $data;
    public EntityPageOrder $order;

    public function __construct(
        int $quantity,
        int $totalPages,
        int $actualPage,
        array $data,
        EntityPageOrder $order
    ) {
        $this->quantity = $quantity;
        $this->totalPages = $totalPages;
        $this->actualPage = $actualPage;
        $this->data = $data;
        $this->order = $order;
    }

    public function getQuantity(): int
    {
        return $this->quantity;
    }

    public function getTotalPages(): int
    {
        return $this->totalPages;
    }

    public function getActualPage(): int
    {
        return $this->actualPage;
    }

    public function getData(): array
    {
        return $this->data;
    }

    public function getOrder(): EntityPageOrder
    {
        return $this->order;
    }
}
