<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Traits\ResponseTrait;
use App\Traits\ValidationTrait;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/**
 * Class TaskController
 *
 * @package App\Http\Controllers
 */
class TaskController extends Controller
{

    use ValidationTrait,
        ResponseTrait;

    const LIMIT_TASKS = 10;

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function tasks()
    {

        try {

            $user = \JWTAuth::parseToken()->toUser();

            $tasks = $user->task()
                ->where('status', Task::STATUS_INCOMPLETE)
                ->orderBy('id', 'DESC')
                ->limit(self::LIMIT_TASKS)
                ->get();

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

            $user = \JWTAuth::parseToken()->toUser();

            $tasks = $user->task()
                ->where('status', Task::STATUS_COMPLETE)
                ->orderBy('id', 'DESC')
                ->limit(self::LIMIT_TASKS)
                ->get();

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

            $this->validator($request->all(), [
                'id' => 'required|integer'
            ]);

            $task = Task::findOrFail($request->get('id'));

            if (!$task) {
                return response()->json([
                    'error'   => true,
                    'content' => 'Tarefa não encontrada'
                ]);
            }

            if ($task->status === 'C') {
                $task->conclusion_date = null;
                $task->status          = 'I';
            } else {
                $task->conclusion_date = Carbon::now();
                $task->status          = 'C';
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

            $this->validator($request->all(), [
                'description' => 'required'
            ]);

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
            DB::rollBack();

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
    public function destroy(Request $request)
    {

        try {
            DB::beginTransaction();

            $this->validator($request->all(), [
                'id' => 'required'
            ]);

            $user = \JWTAuth::parseToken()->toUser();

            $task = $user->task()->find($request->get('id'));

            if (!$task) {
                return response()->json([
                    'error'   => true,
                    'content' => 'Tarefa não encontrada'
                ]);
            }

            $task->delete();

            DB::commit();

            return response()->json([
                'error'   => false,
                'content' => 'Tarefa foi excluida'
            ]);

        } catch (\Exception $e) {

            DB::rollBack();

            return $this->responseJson(true, 'Não foi possível remover a atividade', 500, $e);
        }

    }

    /**
     * @param                          $id
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update($id, Request $request)
    {
        try {
            DB::beginTransaction();

            $this->validator($request->all(), [
                'description' => 'required'
            ]);

            $user = \JWTAuth::parseToken()->toUser();

            $task = $user->task()->find($id);

            if (!$task) {
                return response()->json([
                    'error'   => true,
                    'content' => 'Tarefa não encontrada'
                ]);
            }

            $task->description = $request->get('description');
            $task->save();

            DB::commit();

            return response()->json([
                'error'   => false,
                'content' => 'Tarefa alterada'
            ]);

        } catch (\Exception $e) {

            DB::rollBack();

            return $this->responseJson(true, 'Não foi possível alterar a atividade', 500, $e);
        }
    }

}
