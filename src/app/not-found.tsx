export default function NotFound() {
    return (
        <div className="grid place-items-center min-h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
                <p className="text-xl text-gray-600">Page not found</p>
                <a
                    href="/home"
                    className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Return Home
                </a>
            </div>
        </div>
    )
}