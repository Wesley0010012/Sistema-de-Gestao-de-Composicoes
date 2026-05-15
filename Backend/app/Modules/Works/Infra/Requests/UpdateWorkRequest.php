<?php

namespace App\Modules\Works\Infra\Requests;

use App\Modules\Works\Core\Dto\UpdateWorkDto;

class UpdateWorkRequest extends AddWorkRequest
{
    public function toDto(): UpdateWorkDto
    {
        return new UpdateWorkDto(
            $this->input('title'),
            $this->input('genres_ids', []),
            $this->input('composers_ids', []),
            $this->input('subtitle'),
            $this->nullableInteger('catalog_number'),
            $this->nullableInteger('opus_number'),
            $this->sectionsToDto(),
            $this->nullableInteger('year_composition'),
            $this->input('description')
        );
    }
}
