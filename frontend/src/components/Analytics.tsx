import React from 'react';
import DashboardLayout from './DashboardLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';

const Analytics: React.FC = () => {
  return (
    <DashboardLayout currentPage="analytics">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-navy">Analytics Dashboard</h1>
            <p className="text-navy/70">Coming Soon - Insights into your task management performance</p>
          </div>
        </div>

        {/* Coming Soon Card */}
        <Card>
          <CardHeader className="text-center py-12">
            <div className="mx-auto w-16 h-16 bg-navy/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <CardTitle className="text-navy">Analytics Coming Soon</CardTitle>
            <CardDescription className="mt-2 max-w-sm mx-auto">
              We're working on bringing you comprehensive analytics and insights for your task management. 
              Stay tuned for detailed reports, performance metrics, and productivity insights.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center pb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="text-2xl font-bold text-navy mb-2">📊</div>
                <h3 className="font-semibold text-navy">Task Statistics</h3>
                <p className="text-sm text-navy/70">Track completion rates and progress</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="text-2xl font-bold text-navy mb-2">📈</div>
                <h3 className="font-semibold text-navy">Performance Metrics</h3>
                <p className="text-sm text-navy/70">Monitor productivity trends</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="text-2xl font-bold text-navy mb-2">📋</div>
                <h3 className="font-semibold text-navy">Detailed Reports</h3>
                <p className="text-sm text-navy/70">Export and analyze your data</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;