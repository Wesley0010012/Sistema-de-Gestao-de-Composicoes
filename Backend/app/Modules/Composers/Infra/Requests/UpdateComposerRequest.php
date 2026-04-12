<?php

namespace App\Modules\Composers\Infra\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Modules\Composers\Core\Dto\UpdateComposerDto;
use DateTime;

class UpdateComposerRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],

            'nationality_id' => ['required', 'integer', 'exists:nationalities,id'],

            'photo' => ['nullable', 'image', 'max:2048'],

            'periods_ids' => ['required', 'array', 'min:1'],
            'periods_ids.*' => ['integer', 'exists:periods,id'],

            'birth_date' => ['required', 'date'],
            'death_date' => ['nullable', 'date', 'after_or_equal:birth_date'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'O nome é obrigatório.',

            'nationality_id.required' => 'A nacionalidade é obrigatória.',
            'nationality_id.exists' => 'A nacionalidade informada não existe.',

            'periods_ids.required' => 'Informe pelo menos um período.',
            'periods_ids.array' => 'Os períodos devem ser um array.',
            'periods_ids.*.exists' => 'Um dos períodos informados não existe.',

            'birth_date.required' => 'A data de nascimento é obrigatória.',
            'birth_date.date' => 'Data de nascimento inválida.',

            'death_date.date' => 'Data de morte inválida.',
            'death_date.after_or_equal' => 'A data de morte deve ser após o nascimento.',
        ];
    }

    public function toDto(): UpdateComposerDto
    {
        $photoPath = null;

        if ($this->hasFile('photo')) {
            $photoPath = $this->file('photo')->store('composers', 'public');
        }

        return new UpdateComposerDto(
            $this->input('name'),
            $this->input('nationality_id'),
            $this->input('periods_ids'),
            new DateTime($this->input('birth_date')),
            $this->input('death_date') ? new DateTime($this->input('death_date')) : null,
            $photoPath
        );
    }
}
