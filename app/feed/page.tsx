export default function Feed() {
  return (
    <main>
      <div className="bg-gray-100">
        <div className="container mx-auto my-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Image */}
              <div className="p-4">
                <h5 className="text-gray-900 text-xl font-medium mb-2">Post Title</h5>
                <p className="text-gray-700 text-base mb-4">
                  Some quick example text to build on the post title and make up the bulk of the
                  post's content.
                </p>
                <div className="flex items-center justify-between">
                  <button className="text-gray-500 focus:outline-none focus:text-gray-600">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 15l7-7 7 7"></path>
                    </svg>
                  </button>
                  <button className="text-gray-500 focus:outline-none focus:text-gray-600">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-16.5.5"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
