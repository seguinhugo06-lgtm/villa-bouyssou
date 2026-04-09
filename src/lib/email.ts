import type { Reservation } from "./db/schema";

// ── Email templates ──────────────────────────────────────────────────────────

export function guestConfirmationEmail(reservation: Reservation): {
  subject: string;
  html: string;
} {
  return {
    subject: `Confirmation de reservation - Villa Bouyssou (${reservation.checkIn})`,
    html: `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8" /></head>
<body style="font-family: 'Helvetica Neue', Arial, sans-serif; color: #2c2c2c; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; padding: 24px 0; border-bottom: 1px solid #e5e5e5;">
    <h1 style="font-size: 28px; font-weight: 300; color: #1a2744; margin: 0;">Villa Bouyssou</h1>
    <p style="color: #888; font-size: 14px; margin-top: 4px;">Sarlat-la-Caneda, Dordogne</p>
  </div>

  <div style="padding: 32px 0;">
    <h2 style="font-size: 22px; font-weight: 400; color: #1a2744;">Merci, ${reservation.guestName} !</h2>
    <p style="line-height: 1.6;">
      Votre demande de reservation a bien ete enregistree. Nous reviendrons vers vous
      dans les plus brefs delais pour confirmer votre sejour.
    </p>

    <div style="background: #f9f7f4; border-radius: 12px; padding: 24px; margin: 24px 0;">
      <h3 style="font-size: 16px; color: #1a2744; margin: 0 0 16px 0;">Recapitulatif</h3>
      <table style="width: 100%; font-size: 14px; line-height: 1.8;">
        <tr><td style="color: #888;">Arrivee</td><td style="text-align: right; font-weight: 500;">${reservation.checkIn}</td></tr>
        <tr><td style="color: #888;">Depart</td><td style="text-align: right; font-weight: 500;">${reservation.checkOut}</td></tr>
        <tr><td style="color: #888;">Voyageurs</td><td style="text-align: right; font-weight: 500;">${reservation.guests}</td></tr>
        <tr><td style="color: #888;">Total</td><td style="text-align: right; font-weight: 500;">${reservation.totalPrice} EUR</td></tr>
        <tr><td style="color: #888;">Statut</td><td style="text-align: right; font-weight: 500;">En attente de confirmation</td></tr>
      </table>
    </div>

    <p style="line-height: 1.6; font-size: 14px; color: #666;">
      Si vous avez des questions, n'hesitez pas a nous contacter a
      <a href="mailto:lavillabouyssou@gmail.com" style="color: #c47d5a;">lavillabouyssou@gmail.com</a>
      ou au <strong>+33 6 87 40 20 93</strong>.
    </p>
  </div>

  <div style="border-top: 1px solid #e5e5e5; padding-top: 16px; text-align: center; font-size: 12px; color: #aaa;">
    &copy; ${new Date().getFullYear()} La Villa Bouyssou. Tous droits reserves.
  </div>
</body>
</html>`,
  };
}

export function ownerNotificationEmail(reservation: Reservation): {
  subject: string;
  html: string;
} {
  return {
    subject: `Nouvelle reservation - ${reservation.guestName} (${reservation.checkIn} → ${reservation.checkOut})`,
    html: `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8" /></head>
<body style="font-family: 'Helvetica Neue', Arial, sans-serif; color: #2c2c2c; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #1a2744;">Nouvelle demande de reservation</h2>

  <div style="background: #f9f7f4; border-radius: 12px; padding: 24px; margin: 16px 0;">
    <table style="width: 100%; font-size: 14px; line-height: 2;">
      <tr><td style="color: #888;">Nom</td><td style="text-align: right;">${reservation.guestName}</td></tr>
      <tr><td style="color: #888;">Email</td><td style="text-align: right;"><a href="mailto:${reservation.guestEmail}">${reservation.guestEmail}</a></td></tr>
      <tr><td style="color: #888;">Telephone</td><td style="text-align: right;">${reservation.guestPhone}</td></tr>
      <tr><td style="color: #888;">Arrivee</td><td style="text-align: right;">${reservation.checkIn}</td></tr>
      <tr><td style="color: #888;">Depart</td><td style="text-align: right;">${reservation.checkOut}</td></tr>
      <tr><td style="color: #888;">Voyageurs</td><td style="text-align: right;">${reservation.guests}</td></tr>
      <tr><td style="color: #888;">Total</td><td style="text-align: right; font-weight: bold;">${reservation.totalPrice} EUR</td></tr>
    </table>
  </div>

  ${reservation.notes ? `<p><strong>Message:</strong> ${reservation.notes}</p>` : ""}
</body>
</html>`,
  };
}

// ── Send email placeholder ───────────────────────────────────────────────────

/**
 * Placeholder email sender.
 * Replace with Resend / SendGrid integration when ready.
 */
export async function sendEmail(options: {
  to: string;
  subject: string;
  html: string;
}): Promise<boolean> {
  console.log("=== EMAIL ===");
  console.log(`To: ${options.to}`);
  console.log(`Subject: ${options.subject}`);
  console.log("HTML body length:", options.html.length);
  console.log("=============");

  // TODO: Replace with actual email sending:
  // import { Resend } from "resend";
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({ from: "...", to: options.to, subject: options.subject, html: options.html });

  return true;
}
