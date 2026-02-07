"use client";

import { FormEvent, useState, useRef } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      message: formData.get("message"),
    };

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      setStatus("success");
      setMessage("Thank you! Our team will reach out shortly.");
      // Reset the form using ref instead of event.currentTarget
      formRef.current?.reset();
    } else {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-slate-100 bg-white p-6 shadow-lg">
      <div>
        <label className="text-sm font-semibold text-slate-700">Name *</label>
        <input
          required
          name="name"
          className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-green-500 focus:outline-none"
        />
      </div>
      <div>
        <label className="text-sm font-semibold text-slate-700">Email *</label>
        <input
          required
          type="email"
          name="email"
          className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-green-500 focus:outline-none"
        />
      </div>
      <div>
        <label className="text-sm font-semibold text-slate-700">Company</label>
        <input
          name="company"
          className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-green-500 focus:outline-none"
        />
      </div>
      <div>
        <label className="text-sm font-semibold text-slate-700">Message *</label>
        <textarea
          required
          name="message"
          rows={4}
          className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-green-500 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-green-500 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-green-400 disabled:opacity-70"
      >
        {status === "loading" ? "Sending..." : "Submit"}
      </button>
      {message ? (
        <p
          className={`text-sm ${
            status === "error" ? "text-red-500" : "text-green-600"
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}

