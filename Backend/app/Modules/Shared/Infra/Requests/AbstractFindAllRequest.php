<?php

namespace App\Modules\Shared\Infra\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Modules\Shared\Core\Dto\FindAllPaginatedDto;
use App\Modules\Shared\Core\Enums\EntityPageOrder;

class AbstractFindAllRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'page' => ['sometimes', 'integer', 'min:1'],
            'perPage' => ['sometimes', 'integer', 'min:1', 'max:100'],
            'order' => ['sometimes', 'enum:' . EntityPageOrder::class],
        ];
    }

    public function toDto(): FindAllPaginatedDto
    {
        return new FindAllPaginatedDto(
            page: (int) $this->input('page', 1),
            perPage: (int) $this->input('perPage', 10),
            order: EntityPageOrder::from(
                strtolower($this->input('order', 'asc'))
            ),
            filters: $this->getFilters()
        );
    }

    protected function getFilters(): array
    {
        $reserved = ['page', 'perPage', 'order'];

        return collect($this->query())
            ->except($reserved)
            ->filter(fn($value) => $value !== null && $value !== '')
            ->toArray();
    }
}
