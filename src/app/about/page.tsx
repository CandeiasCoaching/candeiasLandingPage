import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] px-6 pt-4 pb-20 text-white">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold">About</h1>
        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <Image
            src="/mockup/stefbio.png"
            alt="Stefan bio portrait"
            width={1200}
            height={1600}
            className="h-auto w-full object-cover"
            priority
          />
        </div>
        <p className="mt-6 text-white/70">
          This is a placeholder for the About page.
        </p>
      </div>
    </main>
  );
}
