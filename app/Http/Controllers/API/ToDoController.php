<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreToDoRequest;
use App\Http\Requests\UpdateToDoRequest;
use App\Models\ToDo;
use Illuminate\Http\Request;

class ToDoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response(ToDo::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreToDoRequest $request)
    {
        $toDo = new ToDo($request->all());
        $toDo->user_id = $request->user()->id;
        $toDo->save();
        return response($toDo, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $toDo = ToDo::find($id);
        if (is_null($toDo)) {
            return response(["message" => "A megadott azonosítóval nem található teendő"], 404);
        }
        $this->authorize("view", $toDo);
        return response($toDo);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateToDoRequest $request,$id)
    {
        $toDo = ToDo::find($id);
        if (is_null($toDo)) {
            return response(["message" => "A megadott azonosítóval nem található teendő"], 404);
        }
        $this->authorize("update", $toDo);
        $toDo->fill($request->all());
        $toDo->save();
        return response($toDo);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $toDo = ToDo::find($id);
        if (is_null($toDo)) {
            return response(["message" => "A megadott azonosítóval nem található teendő"], 404);
        }
        $this->authorize("delete", $toDo);
        $toDo->delete();
        return response()->noContent();
    }
}
