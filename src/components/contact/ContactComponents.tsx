"use client";

import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function ContactComponents() {
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaValue) {
      alert("Please complete the CAPTCHA!");
      return;
    }

    setSubmitting(true);
    try {
      // Vérifier le captcha côté serveur
      const verifyRes = await fetch("/api/verify-captcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: captchaValue }),
      });

      if (!verifyRes.ok) {
        console.error("verify-captcha responded with status", verifyRes.status);
        alert("CAPTCHA verification request failed (network). Please try again.");
        return;
      }

      const verifyData = await verifyRes.json();
      console.log("verify-captcha response:", verifyData);

      if (!verifyData.success) {
        alert("CAPTCHA verification failed!");
        // reset the widget so user can try again
        recaptchaRef.current?.reset();
        setCaptchaValue(null);
        return;
      }

      // Si captcha OK → continuer le traitement du formulaire
      alert(`Form submitted!\nPhone: ${phone}`);
    } catch (err) {
      console.error("Error verifying captcha:", err);
      alert("An error occurred while verifying CAPTCHA. Check console for details.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="px-6 py-12 max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-2">CONTACT US</h2>
      <p className="text-lg text-gray-600 mb-8">
        Have a question? We&apos;re here to help.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-[#f8f9ff] rounded-2xl shadow p-8 text-left"
      >
        {/* First & Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-semibold mb-1">FIRST NAME</label>
            <input
              type="text"
              placeholder="First Name"
              className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">LAST NAME</label>
            <input
              type="text"
              placeholder="Last Name"
              className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-semibold mb-1">EMAIL</label>
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">CONTACT NUMBER</label>
            <PhoneInput
              country={"ph"} // default country
              value={phone}
              onChange={(value) => setPhone(value)}
              inputClass="!w-full !rounded-full !border !border-gray-300 !px-4 !py-2 !text-sm"
              buttonClass="!rounded-l-full"
            />
          </div>
        </div>

        {/* Message */}
        <div className="mb-4">
          <label className="block text-xs font-semibold mb-1">QUESTIONS AND COMMENTS</label>
          <textarea
            placeholder="Write your message..."
            rows={4}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>

        {/* reCAPTCHA */}
        <div className="mb-6">
          {siteKey ? (
            <ReCAPTCHA
              ref={(r) => { recaptchaRef.current = r; }}
              sitekey={siteKey}
              onChange={(value) => setCaptchaValue(value)}
            />
          ) : (
            <div className="text-red-500 text-sm mt-2">
              ReCAPTCHA site key not configured. Please set `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` in your environment.
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className={`w-full py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold hover:opacity-90 transition ${submitting ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          {submitting ? "Submitting..." : "SUBMIT REQUEST"}
        </button>
      </form>
    </section>
  );
}