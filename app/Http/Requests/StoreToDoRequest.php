<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreToDoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            "title" => ["required","string","max:255",
                Rule::unique("to_dos")->where(function ($query) {
                    return $query->where('title', $this->title)
                        ->where('user_id', $this->user()->id);
                })
            ],
            "done" => "boolean",
        ];
    }
}
