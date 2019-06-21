<?php

namespace App\Http\Controllers;

use App\Libraries\Slack\Slack;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/**
 * Class TaskController
 *
 * @package App\Http\Controllers
 */
class TaskController extends Controller
{

    const LIMIT_TASKS = 10;

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function tasks()
    {

        try {

            $tasks = Task::where('status', Task::STATUS_INCOMPLETE)->orderBy('id',
                'DESC')->limit(self::LIMIT_TASKS)->get();

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

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function tasksCompleted()
    {

        try {

            $tasks = Task::where('status', Task::STATUS_COMPLETE)->orderBy('id',
                'DESC')->limit(self::LIMIT_TASKS)->get();

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

    /**
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
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

            $incompleteTask = Task::where('status', Task::STATUS_INCOMPLETE)->orderBy('id',
                'DESC')->limit(self::LIMIT_TASKS)->get();
            $completeTask   = Task::where('status', Task::STATUS_COMPLETE)->orderBy('updated_at',
                'DESC')->limit(self::LIMIT_TASKS)->get();

            return response()->json([
                'error'          => false,
                'content'        => 'Tarefa alterada',
                'incompleteTask' => $incompleteTask,
                'completeTask'   => $completeTask,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error'   => true,
                'content' => 'Error: ' . $e->getMessage()
            ]);
        }

    }

    /**
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {

        try {

            DB::beginTransaction();

            Task::create([
                'description' => $request->get('task')
            ]);

            $tasks = Task::where('status', Task::STATUS_INCOMPLETE)->orderBy('id',
                'DESC')->limit(self::LIMIT_TASKS)->get();

            DB::commit();

            return response()->json([
                'error'   => false,
                'content' => '',
                'tasks'   => $tasks
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error'   => true,
                'content' => 'Error: ' . $e->getMessage()
            ]);
        }

    }

}
