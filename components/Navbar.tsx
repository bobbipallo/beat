import { FunctionComponent } from 'react'
import Link from 'next/link'

const Navbar: FunctionComponent = () => {
  return (
    <nav className="fixed top-0 right-0 z-50 text-white px-4 py-4">
      <ul className="flex flex-col items-end">
        <Link href="/">
          <a>
            <li className="mb-2 hover:text-gray-200">Home</li>
          </a>
        </Link>
        <Link href="/">
          <a>
            <li className="mb-2 hover:text-gray-200">About</li>
          </a>
        </Link>
        <Link href="/">
          <a>
            <li className="mb-2 hover:text-gray-200">Stats</li>
          </a>
        </Link>
      </ul>
    </nav>
  )
}

export default Navbar
