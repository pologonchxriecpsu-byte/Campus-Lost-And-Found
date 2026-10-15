<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProductsRequest extends FormRequest
{
    public function authorize(): bool
    {
        // The routes are already behind the `auth` middleware.
        return true;
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'     => ['required', 'string', 'max:255'],
            'icon'     => ['nullable', 'string', 'max:16'],
            'category' => ['required', Rule::in(['Electronics', 'Personal Asset', 'Cards & Documents', 'Accessories'])],
            'color'    => ['required', 'string', 'max:255'],
            'status'   => ['required', Rule::in(['Lost', 'Found', 'Claimed'])],
            'date'     => ['required', 'date'],
            'location' => ['required', 'string', 'max:255'],
        ];
    }

    protected function prepareForValidation(): void
    {
        // empty emoji box -> default package icon
        if (! $this->filled('icon')) {
            $this->merge(['icon' => '📦']);
        }
    }
}
