import { useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import logoImg from '../assets/bykorp_logo.png';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigation = [{
    name: 'Home',
    href: '/'
  }, {
    name: 'Services',
    href: '/services'
  }, {
    name: 'Portfolio',
    href: '/portfolio'
  }, {
    name: 'Contact',
    href: '/contact'
  }];
  const isActive = (href: string) => location.pathname === href;
  return <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logoImg} alt="Bykorp" className="h-10 w-10" />
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Bykorp
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map(item => <Link key={item.name} to={item.href} className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${isActive(item.href) ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'}`}>
                {item.name}
              </Link>)}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex">
            <Link to="/contact" className="bg-blue-600 text-white px-4 py-2 rounded-full text-small font-semibold hover:bg-blue-700 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
              <span>Get a Quote</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && <div className="md:hidden py-4 border-t border-gray-100 dark:border-gray-800">
            <nav className="flex flex-col space-y-4">
              {navigation.map(item => <Link key={item.name} to={item.href} onClick={() => setIsMenuOpen(false)} className={`px-3 py-2 text-base font-medium transition-colors duration-200 ${isActive(item.href) ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'}`}>
                  {item.name}
                </Link>)}
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="bg-blue-600 text-white px-6 py-2 rounded-full text-center font-medium hover:bg-blue-700 hover:shadow-lg transition-all duration-200 w-fit">
                Get a Quote
                <ArrowRight className="h-5 w-5" />
              </Link>
            </nav>
          </div>}
      </div>
    </header>;
}
