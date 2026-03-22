<?php

namespace App\Modules\Shared\Core\Entities;

use App\Modules\Shared\Core\Enums\EntityPageOrder;

class EntityPage
{
    private int $quantity;
    private int $totalPages;
    private int $actualPage;
    private array $entities;
    private EntityPageOrder $order;

    public function __construct(
        int $totalPages,
        int $actualPage,
        array $entities,
        EntityPageOrder $order
    ) {
        $this->totalPages = $totalPages;
        $this->actualPage = $actualPage;
        $this->entities = $entities;
        $this->order = $order;
    }

    public function getQuantity(): int
    {
        return count($this->entities);
    }

    public function getTotalPages(): int
    {
        return $this->totalPages;
    }

    public function getActualPage(): int
    {
        return $this->actualPage;
    }

    /**
     * @return array
     */
    public function getEntities(): array
    {
        return $this->entities;
    }

    public function getOrder(): EntityPageOrder
    {
        return $this->order;
    }
}
