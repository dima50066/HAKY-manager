const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4 text-center">
        Welcome to HAKY Manager
      </h1>
      <p className="text-base md:text-lg text-gray-700 mb-8 text-center">
        Manage productivity, track departments, and oversee tasks with ease. Your all-in-one tool for efficient team management.
      </p>
      <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
        <a
          href="/dashboard"
          className="px-4 py-2 md:px-6 md:py-3 text-white bg-green-500 hover:bg-green-600 rounded-lg transition duration-200 w-full md:w-auto text-center"
        >
          Go to Dashboard
        </a>
        <a
          href="/profile"
          className="px-4 py-2 md:px-6 md:py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition duration-200 w-full md:w-auto text-center"
        >
          View Profile
        </a>
      </div>
    </div>
  );
};

export default HomePage;
