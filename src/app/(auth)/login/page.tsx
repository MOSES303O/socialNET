"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface Form { email: string; password: string }

const inputCls = "h-[42px] w-full rounded-[10px] border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-3.5 text-[14px] outline-none ring-focus";

export default function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<Form>({ defaultValues: { email: "Ochiengs@vela.co", password: "" } });

  return (
    <div>
      <h1 className="text-[26px] font-semibold tracking-[-0.02em]">Welcome back</h1>
      <p className="mt-2 text-[14px] text-[var(--color-muted)]">Sign in to your socialNET workspace.</p>

      <div className="mt-7 flex flex-col gap-3">
        <button onClick={() => router.push("/dashboard")} className="rounded-[10px] border border-[var(--color-border-strong)] bg-[var(--color-surface)] py-[11px] text-[14px] font-medium hover:bg-[var(--color-subtle)]">Continue with Google</button>
        <button onClick={() => router.push("/dashboard")} className="rounded-[10px] border border-[var(--color-border-strong)] bg-[var(--color-surface)] py-[11px] text-[14px] font-medium hover:bg-[var(--color-subtle)]">Continue with SSO</button>
      </div>
      <div className="my-[18px] flex items-center gap-3 text-[12px] text-[var(--color-faint)]"><span className="h-px flex-1 bg-[var(--color-border)]" />or<span className="h-px flex-1 bg-[var(--color-border)]" /></div>

      <form onSubmit={handleSubmit(() => router.push("/dashboard"))} className="flex flex-col gap-3.5">
        <label className="block">
          <span className="mb-1.5 block text-[12px] text-[var(--color-muted)]">Work email</span>
          <input type="email" className={inputCls} {...register("email")} />
        </label>
        <label className="block">
          <span className="mb-1.5 flex text-[12px] text-[var(--color-muted)]">Password<a href="#" className="ml-auto text-[var(--color-primary-ink)]">Forgot?</a></span>
          <input type="password" placeholder="••••••••" className={inputCls} {...register("password")} />
        </label>
        <button type="submit" className="mt-2 rounded-[10px] bg-[var(--color-primary)] py-3 text-[14.5px] font-medium text-white hover:bg-[var(--color-primary-hover)]">Sign in →</button>
      </form>

      <p className="mt-[18px] text-center text-[13px] text-[var(--color-muted)]">New to socialNET? <Link href="/register" className="text-[var(--color-primary-ink)]">Request access</Link></p>
      <Link href="/" className="mt-5 block text-center text-[12px] text-[var(--color-faint)]">← Back to home</Link>
    </div>
  );
}
