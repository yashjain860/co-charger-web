import nodemailer from 'nodemailer';
import { Booking, ChargingSession } from '@/types';

function getTransporter() {
  const host = process.env.SMTP_HOST || 'smtpout.secureserver.net';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const user = process.env.SMTP_USER || 'info@thewebvale.com';
  const pass = process.env.SMTP_PASS || '';

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
}

const FROM_HEADER = process.env.SMTP_FROM || 'VoltShare <info@thewebvale.com>';

export async function sendOtpEmail(to: string, name: string, otp: string): Promise<boolean> {
  try {
    const transporter = getTransporter();
    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 580px; margin: 0 auto; background: #0a0e17; color: #f8fafc; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #059669, #10b981); padding: 28px 32px; text-align: left;">
          <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">⚡ VoltShare</h1>
          <p style="margin: 4px 0 0; color: #d1fae5; font-size: 14px;">Community EV Charging Sharing Network</p>
        </div>
        <div style="padding: 32px;">
          <h2 style="margin: 0 0 12px; font-size: 20px; color: #ffffff;">Verify Your Account</h2>
          <p style="color: #94a3b8; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
            Hello ${name || 'Driver'}, use the 6-digit one-time passcode below to complete your VoltShare verification and unlock neighbourhood charging access.
          </p>
          <div style="background: #111827; border: 1px dashed #10b981; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 24px;">
            <span style="font-family: monospace; font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #34d399;">${otp}</span>
            <p style="margin: 8px 0 0; font-size: 12px; color: #64748b;">Code expires in 15 minutes</p>
          </div>
          <p style="color: #64748b; font-size: 13px; line-height: 1.5; margin: 0;">
            If you did not request this verification, you can safely ignore this email.
          </p>
        </div>
        <div style="border-top: 1px solid #1e293b; padding: 18px 32px; background: #070a10; text-align: center; color: #64748b; font-size: 12px;">
          VoltShare by TheWebVale • Powering Sustainable Mobility
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: FROM_HEADER,
      to,
      subject: `⚡ ${otp} is your VoltShare verification code`,
      html,
    });
    return true;
  } catch (err) {
    console.error('[SMTP] Failed to send OTP email:', err);
    return false;
  }
}

export async function sendBookingConfirmationEmail(to: string, booking: Booking): Promise<boolean> {
  try {
    const transporter = getTransporter();
    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 580px; margin: 0 auto; background: #0a0e17; color: #f8fafc; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #059669, #10b981); padding: 28px 32px; text-align: left;">
          <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 800;">⚡ Booking Confirmed</h1>
          <p style="margin: 4px 0 0; color: #d1fae5; font-size: 14px;">Reference: ${booking.bookingRef}</p>
        </div>
        <div style="padding: 32px;">
          <p style="color: #94a3b8; font-size: 15px; margin: 0 0 20px;">
            Hello ${booking.driverName}, your charging slot at <strong>${booking.chargerTitle}</strong> has been secured.
          </p>
          <div style="background: #111827; border: 1px solid #1e293b; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
            <div style="margin-bottom: 12px; display: flex; justify-content: space-between;">
              <span style="color: #64748b; font-size: 14px;">Location:</span>
              <strong style="color: #f1f5f9; font-size: 14px;">${booking.chargerAddress}</strong>
            </div>
            <div style="margin-bottom: 12px; display: flex; justify-content: space-between;">
              <span style="color: #64748b; font-size: 14px;">Host:</span>
              <strong style="color: #f1f5f9; font-size: 14px;">${booking.hostName}</strong>
            </div>
            <div style="margin-bottom: 12px; display: flex; justify-content: space-between;">
              <span style="color: #64748b; font-size: 14px;">Slot:</span>
              <strong style="color: #f1f5f9; font-size: 14px;">${new Date(booking.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(booking.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong>
            </div>
            <div style="margin-bottom: 12px; display: flex; justify-content: space-between;">
              <span style="color: #64748b; font-size: 14px;">Entry Pass Code:</span>
              <span style="color: #34d399; font-family: monospace; font-size: 18px; font-weight: bold;">${booking.entryOtp}</span>
            </div>
            <div style="border-top: 1px solid #1e293b; padding-top: 12px; display: flex; justify-content: space-between;">
              <span style="color: #64748b; font-size: 14px;">Total Paid:</span>
              <strong style="color: #10b981; font-size: 16px;">₹${booking.totalAmount.toFixed(2)}</strong>
            </div>
          </div>
          <p style="color: #64748b; font-size: 13px; line-height: 1.5; margin: 0;">
            Please arrive within 15 minutes of your booking start time. Show your entry pass code upon arrival.
          </p>
        </div>
        <div style="border-top: 1px solid #1e293b; padding: 18px 32px; background: #070a10; text-align: center; color: #64748b; font-size: 12px;">
          VoltShare by TheWebVale • Instant Community EV Charging
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: FROM_HEADER,
      to,
      subject: `⚡ Booking Confirmed: ${booking.chargerTitle} [${booking.bookingRef}]`,
      html,
    });
    return true;
  } catch (err) {
    console.error('[SMTP] Failed to send booking confirmation email:', err);
    return false;
  }
}
