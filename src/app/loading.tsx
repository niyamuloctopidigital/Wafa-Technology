export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-dark-400 rounded-full animate-spin border-t-accent" />
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-spin border-t-accent/30 animate-pulse" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
      </div>
    </div>
  );
}
