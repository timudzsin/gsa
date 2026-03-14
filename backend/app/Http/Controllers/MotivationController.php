<?php

namespace App\Http\Controllers;

use App\Models\Motivation;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMotivationRequest;
use App\Http\Requests\UpdateMotivationRequest;

class MotivationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMotivationRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Motivation $motivation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMotivationRequest $request, Motivation $motivation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Motivation $motivation)
    {
        //
    }
}
