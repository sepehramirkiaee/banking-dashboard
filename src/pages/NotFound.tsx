const NotFound = () => {
  return (
    <div className="p-4 text-center w-96 mx-auto mt-20">
      <h1 className="text-2xl font-bold text-gray-800">404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <button
        onClick={() => window.history.back()}
        className="mt-4 w-80 cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Go Back
      </button>
    </div>
  );
};

export default NotFound;