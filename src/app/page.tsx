import Image from 'next/image';
import { LoginForm } from '@/components/auth/login-form';
import placeholderImages from '@/lib/placeholder-images.json';

export default function Home() {
  const loginImage = placeholderImages.placeholderImages.find(p => p.id === "login-background");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="absolute inset-0 z-0">
        {loginImage && (
          <Image
            src={loginImage.imageUrl}
            alt={loginImage.description}
            fill
            style={{ objectFit: 'cover' }}
            className="opacity-20"
            data-ai-hint={loginImage.imageHint}
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>
      <div className="relative z-10 flex flex-col items-center text-center">
        <h1 className="font-headline text-5xl md:text-7xl font-bold text-primary">
          AtendaLearn
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-foreground/80">
          Empowering educators and students with actionable performance insights.
        </p>
      </div>
      <LoginForm />
    </main>
  );
}
