import Image from "next/image";

export function Logo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <div className={`relative shrink-0 overflow-hidden rounded-full ${className}`}>
      <Image src="/logo.jpg" alt="" fill sizes="40px" className="object-cover" />
    </div>
  );
}
