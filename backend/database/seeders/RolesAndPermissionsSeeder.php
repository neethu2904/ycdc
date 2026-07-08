<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            'manage-doctors',
            'manage-testimonials',
            'manage-treatments',
            'manage-gallery',
            'manage-leads',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create roles and assign existing permissions
        $superAdminRole = Role::firstOrCreate(['name' => 'super-admin']);
        $superAdminRole->givePermissionTo(Permission::all());

        $branchAdminRole = Role::firstOrCreate(['name' => 'branch-admin']);
        $branchAdminRole->givePermissionTo(Permission::all());

        $receptionistRole = Role::firstOrCreate(['name' => 'receptionist']);
        $receptionistRole->givePermissionTo(['manage-leads']);

        // Define default users
        $users = [
            [
                'name' => 'Super Admin',
                'email' => 'admin@ycdc.com',
                'password' => 'password',
                'branch' => 'all',
                'role' => 'super-admin'
            ],
            [
                'name' => 'Trivandrum Branch Admin',
                'email' => 'trivandrum.admin@ycdc.com',
                'password' => 'password',
                'branch' => 'trivandrum',
                'role' => 'branch-admin'
            ],
            [
                'name' => 'Bangalore Branch Admin',
                'email' => 'bangalore.admin@ycdc.com',
                'password' => 'password',
                'branch' => 'bangalore',
                'role' => 'branch-admin'
            ],
            [
                'name' => 'Trivandrum Receptionist',
                'email' => 'trivandrum.rec@ycdc.com',
                'password' => 'password',
                'branch' => 'trivandrum',
                'role' => 'receptionist'
            ],
            [
                'name' => 'Bangalore Receptionist',
                'email' => 'bangalore.rec@ycdc.com',
                'password' => 'password',
                'branch' => 'bangalore',
                'role' => 'receptionist'
            ]
        ];

        foreach ($users as $userData) {
            $user = User::updateOrCreate(
                ['email' => $userData['email']],
                [
                    'name' => $userData['name'],
                    'password' => Hash::make($userData['password']),
                    'branch' => $userData['branch'],
                ]
            );

            // Sync user role
            $user->syncRoles([$userData['role']]);
        }
    }
}
