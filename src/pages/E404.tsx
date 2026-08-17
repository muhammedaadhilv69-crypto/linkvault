import { Link } from "react-router-dom"

function E404() {
    return (
        <div className="flex h-screen w-full items-center justify-center flex-col gap-2">
            <h1 className="text-gray-700 text-4xl">Error 404</h1>
            <p className="text-gray-400">Page not found.</p>
            <Link to="/" className="text-blue-400 underline underline-offset-4">Go back home?</Link>
        </div>
    )
}

export default E404