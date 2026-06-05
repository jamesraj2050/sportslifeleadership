import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="cinematic-surface grid min-h-screen place-items-center px-5 py-32 text-center text-white">
      <div className="max-w-3xl">
        <p className="eyebrow text-accent">Page Not Found</p>
        <h1 className="mt-5 font-heading text-6xl font-black uppercase leading-none tracking-[-0.09em] md:text-8xl">This path is out of bounds.</h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/70">
          The page you are looking for is not part of this static SportsLife Leadership demo.
        </p>
        <div className="mt-8 flex justify-center">
          <Button asChild variant="secondary">
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
