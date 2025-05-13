'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
    error: ''
  });
  
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalChats: 0,
    activeChats: 0,
    totalEvents: 0
  });
  
  const [loading, setLoading] = useState(true);
  
  // Simple hash function for basic security
  const hashCredentials = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString();
  };
  
  // Check if user is already authenticated
  useEffect(() => {
    const authToken = localStorage.getItem('swayam_admin_auth');
    const hashedCredentials = hashCredentials('admin@mvjce:password');
    
    if (authToken === hashedCredentials) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);
  
  // Simulate loading stats for dashboard
  useEffect(() => {
    if (isAuthenticated) {
      const timer = setTimeout(() => {
        setStats({
          totalUsers: 156,
          totalChats: 42,
          activeChats: 8,
          totalEvents: 12
        });
        setLoading(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);
  
  const handleLogin = (e) => {
    e.preventDefault();
    
    // Simple credential check
    if (loginForm.username === 'admin@mvjce' && loginForm.password === 'password') {
      const hashedCredentials = hashCredentials(`${loginForm.username}:${loginForm.password}`);
      localStorage.setItem('swayam_admin_auth', hashedCredentials);
      setIsAuthenticated(true);
      setLoginForm({ ...loginForm, error: '' });
    } else {
      setLoginForm({ ...loginForm, error: 'Invalid username or password' });
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };
  
  const handleLogout = () => {
    localStorage.removeItem('swayam_admin_auth');
    setIsAuthenticated(false);
  };
  
  const adminCards = [
    {
      title: 'Chat Logs',
      description: 'View and manage all user chat conversations',
      link: '/admin/chats',
      icon: '💬'
    },
    {
      title: 'Event Management',
      description: 'Add, edit, and manage events',
      link: '#',
      icon: '📅'
    },
    {
      title: 'User Management',
      description: 'Manage registered users and permissions',
      link: '#',
      icon: '👥'
    },
    {
      title: 'Registration Data',
      description: 'View and export registration information',
      link: '#',
      icon: '📊'
    }
  ];
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
      </div>
    );
  }
  
  // Login page
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
          
          <form onSubmit={handleLogin}>
            {loginForm.error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
                <p>{loginForm.error}</p>
              </div>
            )}
            
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={loginForm.username}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={loginForm.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    );
  }
  
  // Admin Dashboard (when authenticated)
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
        >
          Logout
        </button>
      </div>
      
      {/* Stats Overview */}
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded shadow p-4">
          <p className="text-gray-500 text-sm">TOTAL USERS</p>
          {loading ? (
            <div className="animate-pulse h-8 w-20 bg-gray-200 rounded my-1"></div>
          ) : (
            <p className="text-2xl font-bold">{stats.totalUsers}</p>
          )}
        </div>
        
        <div className="bg-white rounded shadow p-4">
          <p className="text-gray-500 text-sm">TOTAL CHATS</p>
          {loading ? (
            <div className="animate-pulse h-8 w-20 bg-gray-200 rounded my-1"></div>
          ) : (
            <p className="text-2xl font-bold">{stats.totalChats}</p>
          )}
        </div>
        
        <div className="bg-white rounded shadow p-4">
          <p className="text-gray-500 text-sm">ACTIVE CHATS</p>
          {loading ? (
            <div className="animate-pulse h-8 w-20 bg-gray-200 rounded my-1"></div>
          ) : (
            <p className="text-2xl font-bold">{stats.activeChats}</p>
          )}
        </div>
        
        <div className="bg-white rounded shadow p-4">
          <p className="text-gray-500 text-sm">TOTAL EVENTS</p>
          {loading ? (
            <div className="animate-pulse h-8 w-20 bg-gray-200 rounded my-1"></div>
          ) : (
            <p className="text-2xl font-bold">{stats.totalEvents}</p>
          )}
        </div>
      </div> */}
      
      {/* Admin Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminCards.map((card, index) => (
          <Link href={card.link} key={index}>
            <div className="bg-white rounded shadow p-6 hover:shadow-md transition-shadow cursor-pointer h-full">
              <div className="text-3xl mb-4">{card.icon}</div>
              <h2 className="text-lg font-semibold mb-2">{card.title}</h2>
              <p className="text-gray-600">{card.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 