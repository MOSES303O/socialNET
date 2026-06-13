"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface Form { name: string; company: string; email: string; password: string }

const inputCls = "h-[42px] w-full rounded-[10px] border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-3.5 text-[14px] outline-none ring-focus";

export default function RegisterPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<Form>();

  return (
    <div>
      <h1 className="text-[26px] font-semibold tracking-[-0.02em]">Request access</h1>
      <p className="mt-2 text-[14px] text-[var(--color-muted)]">Start monitoring your brand in minutes.</p>

      <form onSubmit={handleSubmit(() => router.push("/dashboard"))} className="mt-7 flex flex-col gap-3.5">
        <Field label="Full name" error={errors.name}><input className={inputCls} placeholder="Jane Doe" {...register("name", { required: true })} /></Field>
        <Field label="Company" error={errors.company}><input className={inputCls} placeholder="Acme Inc." {...register("company", { required: true })} /></Field>
        <Field label="Work email" error={errors.email}><input type="email" className={inputCls} placeholder="you@company.com" {...register("email", { required: true })} /></Field>
        <Field label="Password" error={errors.password}><input type="password" className={inputCls} placeholder="At least 8 characters" {...register("password", { required: true, minLength: 8 })} /></Field>
        <button type="submit" className="mt-2 rounded-[10px] bg-[var(--color-primary)] py-3 text-[14.5px] font-medium text-white hover:bg-[var(--color-primary-hover)]">Create account →</button>
      </form>

      <p className="mt-[18px] text-center text-[13px] text-[var(--color-muted)]">Already have an account? <Link href="/login" className="text-[var(--color-primary-ink)]">Sign in</Link></p>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: unknown; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] text-[var(--color-muted)]">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-[11px] text-[var(--color-critical)]">Required</span> : null}
    </label>
  );
}
