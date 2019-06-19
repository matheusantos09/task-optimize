<?php

namespace App\Http\Controllers;

use App\Models\TimerEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use JWTAuth;

/**
 * Class TimerEventController
 *
 * @package App\Http\Controllers
 */
class TimerEventController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            DB::beginTransaction();

            $user = JWTAuth::parseToken()->toUser();

            TimerEvent::create([
                'user_id'    => $user->id,
                'event'      => $request->get('event'),
                'cycle'      => $request->get('cycle'),
                'cycle_time' => $request->get('cycle_time'),
            ]);

            DB::commit();

        } catch (\Exception $e) {
            DB::rollBack();
        }

    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int                      $id
     *
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
