<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FilialeController;
use App\Http\Controllers\MetierController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\DirigeantController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CarriereController;
use App\Http\Controllers\UploadController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\CandidatureController;
use App\Http\Controllers\NewsletterController;

Route::get('/health', fn() => response()->json(['status' => 'ok', 'version' => '2.0.0']));

// Auth
Route::post('/auth/login', [AuthController::class, 'login']);
Route::middleware('auth:api')->group(function () {
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::put('/auth/password', [AuthController::class, 'password']);
});

// Public routes
Route::get('/filiales', [FilialeController::class, 'index']);
Route::get('/filiales/{id}', [FilialeController::class, 'show']);
Route::get('/metiers', [MetierController::class, 'index']);
Route::get('/metiers/{slug}', [MetierController::class, 'show']);
Route::get('/articles', [ArticleController::class, 'index']);
Route::get('/articles/{slug}', [ArticleController::class, 'show']);
Route::get('/dirigeants', [DirigeantController::class, 'index']);
Route::get('/dirigeants/{id}', [DirigeantController::class, 'show']);
Route::get('/company', [CompanyController::class, 'show']);
Route::get('/carrieres', [CarriereController::class, 'index']);
Route::get('/carrieres/{id}', [CarriereController::class, 'show']);
Route::get('/images', [ImageController::class, 'index']);
Route::post('/contact', [ContactController::class, 'store']);
Route::post('/candidatures', [CandidatureController::class, 'store']);
Route::post('/newsletter/subscribe', [NewsletterController::class, 'subscribe']);
Route::get('/newsletter/unsubscribe/{token}', [NewsletterController::class, 'unsubscribe']);

// Protected routes (admin)
Route::middleware('auth:api')->group(function () {
    Route::post('/filiales', [FilialeController::class, 'store']);
    Route::put('/filiales/{id}', [FilialeController::class, 'update']);
    Route::delete('/filiales/{id}', [FilialeController::class, 'destroy']);

    Route::post('/metiers', [MetierController::class, 'store']);
    Route::put('/metiers/{id}', [MetierController::class, 'update']);
    Route::delete('/metiers/{id}', [MetierController::class, 'destroy']);

    Route::post('/articles', [ArticleController::class, 'store']);
    Route::put('/articles/{id}', [ArticleController::class, 'update']);
    Route::delete('/articles/{id}', [ArticleController::class, 'destroy']);

    Route::post('/dirigeants', [DirigeantController::class, 'store']);
    Route::put('/dirigeants/{id}', [DirigeantController::class, 'update']);
    Route::delete('/dirigeants/{id}', [DirigeantController::class, 'destroy']);

    Route::put('/company', [CompanyController::class, 'update']);

    Route::get('/contact', [ContactController::class, 'index']);
    Route::put('/contact/{id}/lu', [ContactController::class, 'markRead']);
    Route::put('/contact/{id}/traite', [ContactController::class, 'markTraite']);
    Route::put('/contact/{id}/note', [ContactController::class, 'saveNote']);
    Route::delete('/contact/{id}', [ContactController::class, 'destroy']);

    Route::post('/carrieres', [CarriereController::class, 'store']);
    Route::put('/carrieres/{id}', [CarriereController::class, 'update']);
    Route::delete('/carrieres/{id}', [CarriereController::class, 'destroy']);

    Route::post('/upload', [UploadController::class, 'store']);
    Route::delete('/upload/{filename}', [UploadController::class, 'destroy']);

    Route::post('/images', [ImageController::class, 'store']);
    Route::put('/images/{id}', [ImageController::class, 'update']);
    Route::delete('/images/{id}', [ImageController::class, 'destroy']);

    Route::get('/candidatures', [CandidatureController::class, 'index']);
    Route::get('/candidatures/{id}', [CandidatureController::class, 'show']);
    Route::put('/candidatures/{id}', [CandidatureController::class, 'update']);
    Route::delete('/candidatures/{id}', [CandidatureController::class, 'destroy']);

    Route::get('/newsletter', [NewsletterController::class, 'index']);
    Route::post('/newsletter/send', [NewsletterController::class, 'send']);
    Route::delete('/newsletter/{id}', [NewsletterController::class, 'destroy']);
});
