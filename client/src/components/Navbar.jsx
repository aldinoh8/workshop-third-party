
const Navbar = () => {
  return (
    <>
      <nav className="bg-white border-gray-200">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <a href="https://flowbite.com" className="flex items-center">
            <span className="self-center text-2xl font-bold whitespace-nowrap">SomeShop!</span>
          </a>
          <div className="flex items-center">
            <a href="tel:5541251234" className="mr-6 text-sm  text-gray-500  hover:underline">(555) 412-1234</a>
            <a href="#" className="text-sm  text-blue-600 hover:underline">Login</a>
          </div>
        </div>
      </nav>
      <nav className="border-gray-200 border">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center justify-center">
            <ul className="flex flex-row font-medium mt-0 mr-6 space-x-8 text-sm">
              <li>
                <a href="#" className="text-gray-900 hover:underline" aria-current="page">Men</a>
              </li>
              <li>
                <a href="#" className="text-gray-900 hover:underline">Women</a>
              </li>
              <li>
                <a href="#" className="text-gray-900 hover:underline">Sports</a>
              </li>
              <li>
                <a href="#" className="text-gray-900 hover:underline">Accessories</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar