<?php

namespace App\Http\Controllers\Api\Security;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Local\User;
use App\Models\Local\Role;
use App\Http\Resources\Security\User as UserResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->authorize('security.users.index');
        return UserResource::collection(
            User::orderBy('name')->get()
        );
    }

    public function getAuthUser(Request $request)
    {
        $user = User::where('id', $request->user()->id)
            ->with('roles', 'roles.permissions')
            ->first();
        return new UserResource($user);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->authorize('security.users.store');
        $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'phone' => 'max:20',
            'password' => 'required|min:8|max:255',
        ]);

        DB::beginTransaction();
        $user = new User;
        $user->name = $request->name;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $photoPath = '';
        if ($request->hasFile('photo')) {
            $photoPath = Storage::putFile('public/avatars', $request->file('photo'));
            $user->photo = str_replace("public/", "", $photoPath);
        }
        $user->password = Hash::make($request->password);
        $user->save();

        $roleCliente = Role::where('name', 'super')->first();
        $user->roles()->sync($roleCliente);
        DB::commit();

        return new UserResource($user);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        $this->authorize('security.users.show');
        return new UserResource($user);
    }
    
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $this->authorize('security.users.update');
        $request->validate([
            'name' => 'required|max:255',
            'phone' => 'max:20',
            'email' => 'required|email|max:255|unique:users,email,'.$user->id,
            'password' => 'max:255',
        ]);

        $photoPath = '';
        if ($request->hasFile('photo_upload') && $request->file('photo_upload')) {
            $photoPath = Storage::putFile('public/avatars', $request->file('photo_upload'));
            $user->photo = str_replace("public/", "", $photoPath);
        } else if (!$request->photo) {
            $user->photo = null;
        }

        $user->name = $request->name;
        $user->email = $request->email;
        $user->phone = $request->phone;
        if ($request->password!=null) {
            $user->password = Hash::make($request->password);
        }
        $user->save();

        return new UserResource($user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $this->authorize('security.users.destroy');
        $user->delete();

        return response("Usuário excluído com sucesso");
    }
}
