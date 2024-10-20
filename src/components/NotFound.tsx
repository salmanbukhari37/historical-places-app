import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600">404</h1>
      <p className="mt-4 text-lg text-gray-700">Page Not Found</p>
      <p className="mt-2 text-gray-500">
        The page you are looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
