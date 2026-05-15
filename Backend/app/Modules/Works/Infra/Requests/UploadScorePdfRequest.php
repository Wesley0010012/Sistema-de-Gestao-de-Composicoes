<?php

namespace App\Modules\Works\Infra\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UploadScorePdfRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'file' => ['required', 'file', 'mimes:pdf', 'max:10240'],
        ];
    }

    public function messages(): array
    {
        return [
            'file.required' => 'Informe o arquivo PDF.',
            'file.file' => 'O PDF informado é inválido.',
            'file.mimes' => 'O arquivo deve ser um PDF.',
            'file.max' => 'O PDF deve ter no máximo 10MB.',
        ];
    }

    public function storedPath(): string
    {
        return $this->file('file')->store('scores', 'public');
    }
}
