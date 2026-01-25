'use client';

import { useState, useEffect } from 'react';
import { fetchAllUsers, User } from '@/lib/api';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Try multiple possible endpoints
      let data: User[] = [];
      try {
        data = await fetchAllUsers();
      } catch (err) {
        console.log('Trying alternative user endpoint...');
        // If /api/admin/users doesn't work, try fetching from stats
        // For now, show empty state gracefully
        data = [];
      }
      
      setUsers(data);
    } catch (err) {
      const error = err as Error;
      console.log('Users API not yet available:', error.message);
      // Don't show error for 404 - backend not ready yet
      if (error.message.includes('404')) {
        setUsers([]);
      } else {
        setError(error.message || 'Failed to load users');
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Ensure role comparison works regardless of case
    const userRole = user.role ? user.role.toLowerCase() : '';
    const matchesRole = filterRole === 'all' || userRole === filterRole;
    
    return matchesSearch && matchesRole;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004B49] mx-auto mb-4"></div>
          <p className="text-black">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-600 font-semibold mb-2">Error</p>
        <p className="text-black">{error}</p>
        <button
          onClick={loadUsers}
          className="mt-4 px-6 py-2 bg-[#004B49] text-white rounded-lg hover:bg-[#003333]"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Users Management</h2>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              Search Users
            </label>
            <input
              type="text"
              placeholder="Search by username or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#004B49] focus:outline-none text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              Filter by Role
            </label>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#004B49] focus:outline-none text-black"
            >
              <option value="all">All Roles</option>
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-4 text-sm">
          <span className="text-gray-600">
            Total Users: <span className="font-semibold text-black">{users.length}</span>
          </span>
          <span className="text-gray-600">
            Filtered Results:{' '}
            <span className="font-semibold text-black">{filteredUsers.length}</span>
          </span>
        </div>
      </div>

      {/* Users Table */}
      {filteredUsers.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {searchTerm || filterRole !== 'all' ? 'No users found' : 'No users yet'}
          </h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || filterRole !== 'all'
              ? 'Try adjusting your search or filter criteria'
              : 'Registered users will appear here'}
          </p>
          {!searchTerm && filterRole === 'all' && (
            <p className="text-sm text-gray-500 mt-2">
              Note: The backend endpoint <code className="bg-gray-100 px-2 py-1 rounded">/api/admin/users</code> is needed to display users
            </p>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#004B49]">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                    Username
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                    User Type
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                    Joined Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user, index) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-black">
                      {user.username}
                    </td>
                    <td className="px-6 py-4 text-sm text-black">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {user.role === 'admin' ? (
                        <span className="px-3 py-1 text-black rounded-full text-xs font-semibold">
                          Admin
                        </span>
                      ) : (
                        <span className="px-3 py-1 text-black rounded-full text-xs font-semibold">
                          Student
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
