<?php

namespace App\Providers;

use Laravel\Passport\Passport;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        Passport::ignoreMigrations();
        $this->makeDynamicUrls();
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);
    }

    /**
     * Make relative urls into absolute urls
     *
     * @return void
     */
    public function makeDynamicUrls()
    {
        $url = $this->app->request->getHost();
        $protocol = (env('IS_HTTPS') == true) ? 'https://' : 'http://';

        $addressUrl = $protocol.$url;
        config()->set('app.url', $addressUrl);

    }
}
