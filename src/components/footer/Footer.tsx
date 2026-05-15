import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer className="bg-gray-300 px-4">
            <div className="max-w-7xl mx-auto flex h-10 items-center justify-between">
                <nav>
                    <ul className="flex gap-4">
                        <li>
                            <Link to={""}>GitHUb</Link>
                        </li>
                        |
                        <li>
                            <Link to={""}>Telegram</Link>
                        </li>
                        |
                        <li>
                            <Link to={""}>VK</Link>
                        </li>
                    </ul>
                </nav>
                <p>© 2026 FinTrack</p>
            </div>
        </footer>
    )
}
export default Footer