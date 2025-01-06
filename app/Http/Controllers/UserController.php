<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function listUser()
    {
        // Mengambil semua data pengguna
        $users = User::with('roles')->orderBy('created_at', 'desc')->get();

        // Mengembalikan data pengguna dalam format JSON
        return response()->json(
            [
                'status' => true,
                'data' => $users,
            ]
        );
    }

    public function addPermission(Request $request)
    {
        // Validation
        $request->validate([
            'namaPermission' => 'required|string|unique:permissions,name',
        ]);

        $permission = Permission::create(['name' => $request->namaPermission]);

        // Mengembalikan data pengguna dalam format JSON
        return response()->json([
            'status' => true,
            'data' => $permission,
        ]);
    }

    public function listPermission()
    {

        $permission = Permission::orderBy('created_at', 'desc')->get();

        return response()->json([
            'status' => true,
            'data' => $permission,
        ]);
    }

    public function deletePermission($id)
    {

        $permission = Permission::findById($id);

        if ($permission->roles()->count() == 0) {
            $permission = Permission::where('id', $id);
            $permission->delete();

            return response()->json([
                'status' => true,
                'data' => $permission,
            ]);
        }

        return response()->json([
            'status' => false,
            'message' => 'Permission Tidak Bisa Dihapus Karena Masih Digunakan Oleh Role Tertentu',
            'data' => $permission,
        ]);
    }

    public function updatePermission(Request $request, $id)
    {
        // Validation
        $request->validate([
            'editPermissionName' => 'required|string|unique:permissions,name,'.$id,
        ]);

        $permission = Permission::where('id', $id)->update(['name' => $request->editPermissionName]);

        // Mengembalikan data pengguna dalam format JSON
        return response()->json([
            'status' => true,
            'data' => $permission,
        ]);
    }

    public function addRole(Request $request)
    {
        // Validation
        $request->validate([
            'namaRole' => 'required|string|unique:roles,name',
        ]);

        $role = Role::create(['name' => $request->namaRole]);
        $permissions = Permission::whereIn('id', $request->listPermission)->get();
        $role->syncPermissions($permissions);

        // Mengembalikan data pengguna dalam format JSON
        return response()->json([
            'status' => true,
            'data' => $role,
        ]);
    }

    public function listRole()
    {

        $role = Role::with('permissions')->orderBy('created_at', 'desc')->get();

        return response()->json([
            'status' => true,
            'data' => $role,
        ]);
    }

    public function updateRole(Request $request, $id)
    {
        // Validation
        $request->validate([
            'namaRole' => 'required|string|unique:roles,name,'.$id,
        ]);

        $role = Role::findOrFail($id);

        $role->name = $request->namaRole;
        $role->save();
        $permissions = Permission::whereIn('id', $request->listPermission)->get();
        $role->syncPermissions($permissions);

        // Mengembalikan data pengguna dalam format JSON
        return response()->json([
            'status' => true,
            'data' => $role,
        ]);
    }

    public function deleteRole($id)
    {

        $role = Role::findById($id);
        $count = User::with('roles')->get()->filter(
            fn ($user) => $user->roles->where('name', $role['name'])->toArray()
        )->count();

        if ($count == 0) {
            $role = role::where('id', $id);
            $role->delete();

            return response()->json([
                'status' => true,
                'data' => $role,
            ]);
        }

        return response()->json([
            'status' => false,
            'message' => 'Role Tidak Bisa Dihapus Karena Masih Digunakan Oleh User Tertentu',
            'data' => $role,
        ]);
    }

    public function addUser(Request $request)
    {
        // Validation
        $request->validate([
            'nama' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email|max:255',
            'password' => 'required|string|min:8',
            'role' => 'required',
            'username' => 'required|string|unique:users,username|max:255',
        ]);

        $user = User::create([
            'name' => $request->nama,
            'username' => $request->username,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);
        $role = Role::where('id', $request->role)->get();
        $user->syncRoles($role);

        // Mengembalikan data pengguna dalam format JSON
        return response()->json([
            'status' => true,
            'data' => $user,
        ]);
    }

    public function deleteUser($id)
    {

        $user = User::findOrFail($id);

        $user->delete();

        return response()->json([
            'status' => true,
            'data' => $user,
        ]);
    }

    public function updateUser(Request $request, $id)
    {
        // Validation
        $request->validate([
            'nama' => 'required|string|max:255',
            'email' => 'required|email',
            'role' => 'required',
            'username' => 'required|string',
        ]);

        $reqData = [
            'name' => $request->nama,
            'username' => $request->username,
            'email' => $request->email,
        ];

        // Tambahkan password jika diisi
        if ($request->filled('password')) {
            $reqData['password'] = bcrypt($request->password);
        }

        $user = User::where('id', $id)->update($reqData);
        $role = Role::where('id', $request->role)->get();
        $user = User::findOrFail($id);
        $user->syncRoles($role);

        // Mengembalikan data pengguna dalam format JSON
        return response()->json(
            [
                'status' => true,
                'data' => $user,
            ]
        );
    }
}
