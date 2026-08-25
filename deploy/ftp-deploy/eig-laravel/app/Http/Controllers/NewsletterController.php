<?php
namespace App\Http\Controllers;

use App\Models\NewsletterSubscriber;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class NewsletterController extends Controller {

    public function subscribe(Request $request) {
        $request->validate([
            'email'  => 'required|email',
            'locale' => 'nullable|in:fr,en',
        ]);

        $exists = NewsletterSubscriber::where('email', $request->email)->first();
        if ($exists) {
            return response()->json(['message' => 'already_subscribed'], 409);
        }

        $sub = NewsletterSubscriber::create([
            'email'  => $request->email,
            'locale' => $request->input('locale', 'fr'),
        ]);

        return response()->json(['message' => 'subscribed', 'id' => $sub->id], 201);
    }

    public function unsubscribe($token) {
        $sub = NewsletterSubscriber::where('unsubscribe_token', $token)->first();
        if (!$sub) {
            return response()->json(['message' => 'invalid_token'], 404);
        }
        $sub->delete();
        return response()->json(['message' => 'unsubscribed']);
    }

    public function index() {
        return response()->json(
            NewsletterSubscriber::orderBy('created_at', 'desc')->get()
        );
    }

    public function destroy($id) {
        NewsletterSubscriber::findOrFail($id)->delete();
        return response()->json(['message' => 'Abonné supprimé']);
    }

    public function send(Request $request) {
        $request->validate([
            'subject'    => 'required|string|max:255',
            'subject_en' => 'nullable|string|max:255',
            'body'       => 'required|string',
            'body_en'    => 'nullable|string',
        ]);

        $subscribers = NewsletterSubscriber::all();
        $sent = 0;

        foreach ($subscribers as $sub) {
            $isEn    = $sub->locale === 'en' && $request->body_en;
            $subject = $isEn ? $request->subject_en : $request->subject;
            $body    = $isEn ? $request->body_en    : $request->body;
            $unsub   = url("/unsubscribe?token={$sub->unsubscribe_token}");

            try {
                Mail::html(
                    $this->wrapEmail($body, $unsub, $sub->locale),
                    function ($m) use ($sub, $subject) {
                        $m->to($sub->email)->subject($subject);
                    }
                );
                $sent++;
            } catch (\Exception $e) {
                // Continue sending to others even if one fails
            }
        }

        return response()->json([
            'message' => "Newsletter envoyée à {$sent} abonné(s).",
            'sent'    => $sent,
            'total'   => $subscribers->count(),
        ]);
    }

    private function wrapEmail(string $body, string $unsubUrl, string $locale): string {
        $unsubText = $locale === 'en'
            ? 'Unsubscribe from this newsletter'
            : 'Se désabonner de cette newsletter';

        $bodyHtml = nl2br(htmlspecialchars($body));
        return <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#F8F6F1;font-family:Georgia,serif;">
  <div style="max-width:640px;margin:40px auto;background:white;border-radius:8px;overflow:hidden;box-shadow:0 4px 24px rgba(15,25,36,0.08);">
    <div style="background:linear-gradient(135deg,#0F4855,#0F1924);padding:36px 40px;">
      <div style="font-family:Georgia,serif;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#D4AA4A;margin-bottom:8px;">Excellis Invest Group</div>
      <div style="font-family:Georgia,serif;font-style:italic;font-size:14px;color:rgba(255,255,255,0.5);">Investir autrement</div>
    </div>
    <div style="padding:40px;font-size:15px;color:#374151;line-height:1.8;">
      {$bodyHtml}
    </div>
    <div style="padding:24px 40px;border-top:1px solid #F3F4F6;text-align:center;">
      <a href="{$unsubUrl}" style="font-size:12px;color:#9CA3AF;text-decoration:underline;">{$unsubText}</a>
    </div>
  </div>
</body>
</html>
HTML;
    }
}
