<?php

use Illuminate\Database\Seeder;
use App\Models\Local\User;
use App\Models\Local\Permission;
use App\Models\Local\Role;
use Illuminate\Support\Facades\Hash;

class SecuritySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Perfil para super usuário
        $allPermission = Permission::create([
        	'name' => 'all',
        	'label' => 'Everything',
        ]);
        $superRole = Role::create([
        	'name' => 'super',
        	'label' => 'Superuser',
        ]);
        $superRole->permissions()->sync($allPermission);

        // Perfil Admin
        $adminRole = Role::create([
            'name' => 'admin',
            'label' => 'Administrador do sistema',
        ]);

        $permissionsPermission = Permission::create([
            'name' => 'security.permissions.index',
            'label' => 'Listar Permissões',
        ]);
        $adminRole->permissions()->syncWithoutDetaching($permissionsPermission);
        Permission::create([
            'name' => 'security.permissions.show',
            'label' => 'Ver Permissão',
        ]);
        Permission::create([
            'name' => 'security.permissions.store',
            'label' => 'Criar Permissão',
        ]);
        Permission::create([
            'name' => 'security.permissions.update',
            'label' => 'Atualizar Permissão',
        ]);
        Permission::create([
            'name' => 'security.permissions.destroy',
            'label' => 'Excluir Permissão',
        ]);

        $rolesPermission = Permission::create([
            'name' => 'security.roles.index',
            'label' => 'Listar Perfis',
        ]);
        $adminRole->permissions()->syncWithoutDetaching($rolesPermission);
        $rolesPermission = Permission::create([
            'name' => 'security.roles.show',
            'label' => 'Ver Perfil',
        ]);
        $adminRole->permissions()->syncWithoutDetaching($rolesPermission);

        $rolesPermission = Permission::create([
            'name' => 'security.roles.store',
            'label' => 'Criar Perfil',
        ]);
        $adminRole->permissions()->syncWithoutDetaching($rolesPermission);
        $rolesPermission = Permission::create([
            'name' => 'security.roles.update',
            'label' => 'Atualizar Perfil',
        ]);
        $adminRole->permissions()->syncWithoutDetaching($rolesPermission);
        $rolesPermission = Permission::create([
            'name' => 'security.roles.destroy',
            'label' => 'Excluir Perfil',
        ]);
        $adminRole->permissions()->syncWithoutDetaching($rolesPermission);
        
        $adminRolePermissions = Permission::create([
        	'name' => 'security.users.index',
        	'label' => 'Exibir lista de usuários',
        ]);
        $adminRole->permissions()->syncWithoutDetaching($adminRolePermissions);
        $adminRolePermissions = Permission::create([
        	'name' => 'security.users.store',
        	'label' => 'Incluir novos usuários',
        ]);
        $adminRole->permissions()->syncWithoutDetaching($adminRolePermissions);
        $adminRolePermissions = Permission::create([
        	'name' => 'security.users.show',
        	'label' => 'Dados de um usuário específico',
        ]);
        $adminRole->permissions()->syncWithoutDetaching($adminRolePermissions);
        $adminRolePermissions = Permission::create([
        	'name' => 'security.users.update',
        	'label' => 'Atualizar dados de um usuário específico',
        ]);
        $adminRole->permissions()->syncWithoutDetaching($adminRolePermissions);
        $adminRolePermissions = Permission::create([
        	'name' => 'security.users.destroy',
        	'label' => 'Excluir um usuário específico',
        ]);
        $adminRole->permissions()->syncWithoutDetaching($adminRolePermissions);

        //
        // Inclusão do super usuário para inciar o sistema
        //
        $user = User::create([
            'name' => 'Administrador',
            'email' => 'teste@essentia.com.br',
            'password' => Hash::make('12345678'),
        ]);

        $user->roles()->sync($superRole);
    }
}
