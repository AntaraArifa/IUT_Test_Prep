"use client";

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
        fetchQuestionBanks('prev_year').catch(() => []),
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
        <div className="bg-[#004B49] rounded-2xl shadow-lg p-6 border-l-7 border-[#003333]">
          <div className="text-base font-semibold text-white mb-4">Total Users</div>
          <div className="text-4xl font-bold text-white">
            {stats.totalUsers}
          </div>
        </div>

        <div className="bg-[#004B49] rounded-2xl shadow-lg p-6 border-l-7 border-[#003333]">
          <div className="text-base font-semibold text-white mb-4">Contact Message</div>
          <div className="text-4xl font-bold text-white">
            {stats.totalMessages}
          </div>
        </div>

        <div className="bg-[#004B49] rounded-2xl shadow-lg p-6 border-l-7 border-[#003333]">
          <div className="text-base font-semibold text-white mb-4">Question Bank</div>
          <div className="text-4xl font-bold text-white">
            {stats.totalQuestionBanks}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a
            href="/admin/contacts"
            className="bg-white p-8 border-2 border-[#004B49] rounded-xl hover:bg-gray-50 transition-colors min-h-[160px] flex flex-col"
          >
            <div className="font-semibold text-gray-900 mb-3 text-xl">View Message</div>
            <div className="text-base text-black leading-relaxed">
              Check and respond to contact form submissions from students
            </div>
          </a>

          <a
            href="/admin/users"
            className="bg-white p-8 border-2 border-[#004B49] rounded-xl hover:bg-gray-50 transition-colors min-h-[160px] flex flex-col"
          >
            <div className="font-semibold text-gray-900 mb-3 text-xl">Manage Users</div>
            <div className="text-base text-black leading-relaxed">View, edit, and manage all user accounts in the system</div>
          </a>

          <a
            href="/admin/questions"
            className="bg-white p-8 border-2 border-[#004B49] rounded-xl hover:bg-gray-50 transition-colors min-h-[160px] flex flex-col"
          >
            <div className="font-semibold text-gray-900 mb-3 text-xl">Upload Questions</div>
            <div className="text-base text-black leading-relaxed">Import new questions via CSV files to expand question banks</div>
          </a>
        </div>
      </div>
    </div>
  );
}
