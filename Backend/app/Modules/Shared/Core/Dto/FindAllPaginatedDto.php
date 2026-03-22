<?php

namespace App\Modules\Shared\Core\Dto;

use App\Modules\Shared\Core\Enums\EntityPageOrder;

class FindAllPaginatedDto
{
    private int $page;
    private int $perPage;
    private EntityPageOrder $order;
    private array $filters;

    public function __construct(
        int $page = 1,
        int $perPage = 10,
        EntityPageOrder $order = EntityPageOrder::ASC,
        array $filters = []
    ) {
        $this->page = $page;
        $this->perPage = $perPage;
        $this->order = $order;
        $this->filters = $filters;
    }

    public function getPage(): int
    {
        return $this->page;
    }

    public function getPerPage(): int
    {
        return $this->perPage;
    }

    public function getOrder(): EntityPageOrder
    {
        return $this->order;
    }

    public function getFilters(): array
    {
        return $this->filters;
    }
}
