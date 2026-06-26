<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->session()->has('admin_logged_in') || !$request->session()->get('admin_logged_in')) {
            return redirect()->route('admin.login')->with('error', 'Please log in to access the admin panel.');
        }

        return $next($request);
    }
}
