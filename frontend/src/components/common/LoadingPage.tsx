const LoadingPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <span className="loading loading-ball loading-lg"></span>
      <span className="text-lg font-playfairDisplay font-semibold text-slate-700">
        Loading...
      </span>
    </div>
  );
};

export default LoadingPage;
