<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{

    public function tasks()
    {

        try {

            $tasks = Task::inRandomOrder()->limit(10)->get();

            return response()->json([
                'error'   => false,
                'content' => $tasks
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error'   => true,
                'content' => 'Error: ' . $e->getMessage()
            ]);
        }

    }

    public function changeTask(Request $request)
    {

        try {

            $task = Task::findOrFail($request->get('id'));

            if (!$task) {
                return response()->json([
                    'error'   => true,
                    'content' => 'Tarefa não encontrada'
                ]);
            }

            if ($task->status === 'C') {
                $task->status = 'I';
            } else {
                $task->status = 'C';
            }

            $task->save();

            return response()->json([
                'error'   => false,
                'content' => 'Tarefa alterada',
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error'   => true,
                'content' => 'Error: ' . $e->getMessage()
            ]);
        }

    }

}
