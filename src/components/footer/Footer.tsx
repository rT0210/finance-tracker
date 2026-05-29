import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer className="bg-gray-300 px-4">
            <div className="max-w-7xl mx-auto flex h-10 items-center justify-between">
                <nav>
                    <ul className="flex gap-4 text-[10px] md:text-[16px]">
                        <li>
                            <Link to={"https://github.com/rT0210"}>GitHUb</Link>
                        </li>
                        |
                        <li>
                            <Link to={"#"}>Telegram</Link>
                        </li>
                        |
                        <li>
                            <Link to={"https://vk.com/zaikanerealbnaya"}>VK</Link>
                        </li>
                    </ul>
                </nav>
                <p className="text-[10px] md:text-[16px]">© 2026 FinTrack</p>
            </div>
        </footer>
    )
}
export default Footer