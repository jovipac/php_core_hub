<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\Console\Input\InputOption;

class SuperadminCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $name = 'app:superadmin';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Make sure there is a user with the admin role that has all of the necessary modules.';

    /**
     * Create a new command instance.
     *
     * @return void
     */

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Get user options.
     */
    protected function getOptions()
    {
        return [
            ['create', null, InputOption::VALUE_NONE, 'Create an admin user', null],
        ];
    }

    public function fire()
    {
        return $this->handle();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        // Get or create user
        $user = $this->getUser(
            $this->option('create')
        );

        // the user not returned
        if (!$user) {
            exit;
        }

        // Get or create role
        $role = $this->getAdministratorRole();

        // Get all modules
        $modules = \App\Models\Entities\Modulo::all();

        // Assign all modules to the admin role
        $role->modulos()->sync(
            $modules->pluck('id_modulo')->all()
        );

        // Ensure that the user is admin
        $user->roles()->sync([$role->id_rol]);
        $user->save();

        $this->info('The user now has full access to your site.');

    }

        /**
     * Get command arguments.
     *
     * @return array
     */
    protected function getArguments()
    {
        return [
            ['username', InputOption::VALUE_REQUIRED, 'The username of the user.', null],
            ['email', InputOption::VALUE_REQUIRED, 'The email of the user.', null],
        ];
    }

    /**
     * Get the administrator role, create it if it does not exists.
     *
     * @return mixed
     */
    protected function getAdministratorRole()
    {
        $role = \App\Models\Entities\Rol::firstOrNew([
            'nombre' => 'Administrador',
        ]);

        if (!$role->exists) {
            $role->fill([
                'descripcion' => 'Administrador inicial',
            ])->save();
        }

        return $role;
    }

    /**
     * Get or create user.
     *
     * @param bool $create
     *
     * @return \App\User
     */
    protected function getUser($create = false)
    {
        $username = $this->argument('username');

        // If we need to create a new user go ahead and create it
        if ($create) {
            $username = $this->ask('Enter the username');
            $email = $this->ask('Enter the email');
            $password = $this->secret('Enter admin password');
            $confirmPassword = $this->secret('Confirm Password');

            // Ask for username if there wasnt set one
            if (!$username) {
                $username = $this->ask('Enter the username is required');
            }

            // Ask for email if there wasnt set one
            if (!$email) {
                $email = $this->ask('Enter the admin email');
            }

            // Passwords don't match
            if ($password != $confirmPassword) {
                $this->info("Passwords don't match");

                return;
            }

            $this->info('Creating admin account');

            return \App\Models\Entities\User::create([
                'username' => $username,
                'email'    => $email,
                'password' => Hash::make($password),
            ]);
        }

        return \App\Models\Entities\User::where('username', $username)->firstOrFail();
    }

}
