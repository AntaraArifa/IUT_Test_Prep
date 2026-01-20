'use client';

import { useState, useEffect } from 'react';
import {
  fetchAdminStats,
  AdminStats,
  fetchAllUsers,
  fetchContactMessages,
  fetchQuestionBanks,
  fetchUserCount,
} from '@/lib/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalMessages: 0,
    totalQuestionBanks: 0,
    recentActivity: 'Loading...',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      
      // Try to fetch from admin stats API first
      try {
        const data = await fetchAdminStats();
        setStats(data);
        setLoading(false);
        return;
      } catch (err) {
        console.log('Admin stats API not available, fetching individual stats...');
      }

      // If stats API not available, fetch individual endpoints and calculate
      const [userCount, messages, questionBanks] = await Promise.all([
        fetchUserCount().catch(() => 0),
        fetchContactMessages().catch(() => []),
        fetchQuestionBanks().catch(() => []),
      ]);

      setStats({
        totalUsers: userCount,
        totalMessages: messages.length,
        totalQuestionBanks: questionBanks.length,
        recentActivity: 'System ready',
      });
    } catch (err) {
      console.log('Unable to load stats');
      setStats({
        totalUsers: 0,
        totalMessages: 0,
        totalQuestionBanks: 0,
        recentActivity: 'Backend API pending',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#004B49]">
          <div className="text-sm text-gray-600 mb-1">Total Users</div>
          <div className="text-3xl font-bold text-[#004B49]">
            {stats.totalUsers}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="text-sm text-gray-600 mb-1">Contact Messages</div>
          <div className="text-3xl font-bold text-blue-600">
            {stats.totalMessages}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="text-sm text-gray-600 mb-1">Question Banks</div>
          <div className="text-3xl font-bold text-green-600">
            {stats.totalQuestionBanks}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/contacts"
            className="p-6 border-2 border-gray-200 rounded-lg hover:border-[#004B49] hover:bg-gray-50 transition-colors"
          >
            <div className="font-semibold text-gray-900 mb-2">View Messages</div>
            <div className="text-sm text-gray-600">
              Check contact submissions
            </div>
          </a>

          <a
            href="/admin/users"
            className="p-6 border-2 border-gray-200 rounded-lg hover:border-[#004B49] hover:bg-gray-50 transition-colors"
          >
            <div className="font-semibold text-gray-900 mb-2">Manage Users</div>
            <div className="text-sm text-gray-600">View user accounts</div>
          </a>

          <a
            href="/admin/questions"
            className="p-6 border-2 border-gray-200 rounded-lg hover:border-[#004B49] hover:bg-gray-50 transition-colors"
          >
            <div className="font-semibold text-gray-900 mb-2">Upload Questions</div>
            <div className="text-sm text-gray-600">Import CSV files</div>
          </a>
        </div>
      </div>
    </div>
  );
}
