"use client";

import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function ContactComponents() {
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaValue) {
      alert("Please complete the CAPTCHA!");
      return;
    }

    // Vérifier le captcha côté serveur
    const verifyRes = await fetch("/api/verify-captcha", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: captchaValue }),
    });

    const verifyData = await verifyRes.json();

    if (!verifyData.success) {
      alert("CAPTCHA verification failed!");
      return;
    }

    // Si captcha OK → continuer le traitement du formulaire
       alert(`Form submitted!\nPhone: ${phone}`);
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
          <ReCAPTCHA
            sitekey="6LcvPqMrAAAAAJhEHtv_yysafaAT-95wPAPqTpXT"
            onChange={(value) => setCaptchaValue(value)}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold hover:opacity-90 transition"
        >
          SUBMIT REQUEST
        </button>
      </form>
    </section>
  );
}