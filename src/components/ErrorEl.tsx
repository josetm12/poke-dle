const ErrorComponent = () => (
  <main className="flex min-h-screen flex-col items-center justify-center p-10 bg-red-50">
    <h1 className="text-4xl font-bold text-red-600">Uh-oh!</h1>
    <p className="mt-4 text-xl text-red-500">The API is currently down.</p>
    <p className="mt-2 text-lg text-red-500">Please try again later.</p>
  </main>
);

export default ErrorComponent;
