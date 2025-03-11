const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#121826] p-6 text-white">
      <h1 className="text-3xl md:text-5xl font-bold text-[#4CAF50] mb-6 text-center">
        Olden Manager – Smart Workforce Management
      </h1>
      <p className="text-base md:text-lg text-gray-300 mb-10 max-w-2xl text-center">
        Olden Manager helps **coordinators** track employee performance, manage
        documents, and oversee salaries. **Employees** can log productivity,
        manage schedules, and view rankings to track their progress. A complete
        solution for streamlined team management and efficiency.
      </p>
      <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
        <a
          href="/productivity"
          className="px-6 py-3 text-white bg-[#4CAF50] hover:bg-[#45A049] rounded-lg transition duration-200 w-full md:w-auto text-center text-lg font-medium"
        >
          Track Productivity
        </a>
        <a
          href="/profile"
          className="px-6 py-3 text-white bg-[#1E88E5] hover:bg-[#1976D2] rounded-lg transition duration-200 w-full md:w-auto text-center text-lg font-medium"
        >
          View Profile
        </a>
      </div>
    </div>
  );
};

export default HomePage;
