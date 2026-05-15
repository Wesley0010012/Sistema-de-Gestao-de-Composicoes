<?php

namespace App\Modules\Works\Infra\Requests;

use App\Modules\Works\Core\Dto\AddScoreDto;
use App\Modules\Works\Core\Dto\AddSectionDto;
use App\Modules\Works\Core\Dto\AddWorkDto;
use Illuminate\Foundation\Http\FormRequest;

class AddWorkRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'subtitle' => ['nullable', 'string', 'max:255'],
            'catalog_number' => ['nullable', 'integer'],
            'opus_number' => ['nullable', 'integer'],
            'year_composition' => ['nullable', 'integer'],
            'description' => ['nullable', 'string'],

            'genres_ids' => ['required', 'array', 'min:1'],
            'genres_ids.*' => ['integer', 'exists:genres,id'],

            'composers_ids' => ['required', 'array', 'min:1'],
            'composers_ids.*' => ['integer', 'exists:composers,id'],

            'sections' => ['nullable', 'array'],
            'sections.*.key_root' => ['required_with:sections', 'string'],
            'sections.*.key_mode' => ['required_with:sections', 'string', 'in:major,minor'],
            'sections.*.scores' => ['nullable', 'array'],
            'sections.*.scores.*.instrument_id' => ['required_with:sections.*.scores', 'integer', 'exists:instruments,id'],
            'sections.*.scores.*.path' => ['nullable', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'O título é obrigatório.',
            'genres_ids.required' => 'Informe pelo menos um gênero.',
            'genres_ids.*.exists' => 'Um dos gêneros informados não existe.',
            'composers_ids.required' => 'Informe pelo menos um compositor.',
            'composers_ids.*.exists' => 'Um dos compositores informados não existe.',
            'sections.*.key_root.required_with' => 'Informe a tonalidade da seção.',
            'sections.*.key_mode.required_with' => 'Informe o modo da seção.',
            'sections.*.key_mode.in' => 'Modo inválido.',
            'sections.*.scores.*.instrument_id.exists' => 'Um dos instrumentos informados não existe.',
        ];
    }

    public function toDto(): AddWorkDto
    {
        return new AddWorkDto(
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

    protected function sectionsToDto(): array
    {
        return array_map(function (array $section, int $sectionIndex) {
            $scores = array_map(
                fn(array $score, int $scoreIndex) => $this->scoreToDto($score, $sectionIndex, $scoreIndex),
                $section['scores'] ?? [],
                array_keys($section['scores'] ?? [])
            );

            return new AddSectionDto(
                $section['key_root'],
                $section['key_mode'],
                $scores
            );
        }, $this->input('sections', []), array_keys($this->input('sections', [])));
    }

    protected function scoreToDto(array $score, int $sectionIndex, int $scoreIndex): AddScoreDto
    {
        return new AddScoreDto(
            $score['instrument_id'],
            $score['path'] ?? ''
        );
    }

    protected function nullableInteger(string $key): ?int
    {
        return $this->filled($key) ? (int) $this->input($key) : null;
    }
}
