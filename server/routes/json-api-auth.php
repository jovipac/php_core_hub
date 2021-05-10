<?php

use Illuminate\Support\Facades\Route;
use App\Actions\JsonApiAuth\AuthKit;
use JsonApiAuth\ConfirmablePasswordController;
use JsonApiAuth\EmailVerificationNotificationController;
use JsonApiAuth\LoginController;
use JsonApiAuth\LogoutController;
use JsonApiAuth\NewPasswordController;
use JsonApiAuth\PasswordResetLinkController;
use JsonApiAuth\ValidateResetTokenController;
use JsonApiAuth\RegisterController;
use JsonApiAuth\VerifyEmailController;

Route::prefix('auth')->group(function () {

    Route::post('/register', RegisterController::class)->name('json-api-auth.register');

    Route::post('/login', LoginController::class)
        ->middleware(['throttle:6,1'])
        ->name('json-api-auth.login');

    Route::get('/logout', LogoutController::class)
        ->middleware((AuthKit::getMiddleware()))
        ->name('json-api-auth.logout');

    Route::post('/forgot-password', PasswordResetLinkController::class)
        ->name('json-api-auth.password.email');

    Route::post('/reset-password', NewPasswordController::class)
        ->name('json-api-auth.password.update');

    Route::post('/vaidate-reset-token', ValidateResetTokenController::class)
        ->middleware([(AuthKit::getMiddleware()), 'throttle:6,1'])
        ->name('json-api-auth.verification.token');

    Route::post('/email/verification-notification', EmailVerificationNotificationController::class)
        ->middleware([(AuthKit::getMiddleware()), 'throttle:6,1'])
        ->name('json-api-auth.verification.send');

    Route::get('/verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('json-api-auth.verification.verify');

    Route::post('/confirm-password', ConfirmablePasswordController::class)
        ->middleware((AuthKit::getMiddleware()))
        ->name('json-api-auth.password.confirm');
});
