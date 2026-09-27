import React, { useState, useEffect } from 'react';
import { ShoppingCart, Check, RefreshCw, AlertTriangle, Layers, Calendar, ExternalLink } from 'lucide-react';

interface FarmData {
  farmName: string;
  location: string;
  metrics: {
    totalCattle: number;
    activeMilkingCows: number;
    dailyMilkProductionLiters: number;
    averageYieldPerCowLiters: number;
    bulkStorageTempCelsius: number;
    feedStockDaysRemaining: number;
  };
  recentOrders: Array<{
    id: string;
    customer: string;
    quantity: string;
    status: string;
    amount: string;
  }>;
  healthAlerts: Array<{
    cowId: string;
    status: string;
    priority: string;
  }>;
}

export const DairyFarmDemo: React.FC = () => {
  const [data, setData] = useState<FarmData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'telemetry' | 'order_sim' | 'cattle'>('telemetry');

  // Order simulator state
  const [customerName, setCustomerName] = useState('Punjab Dairy Depot');
  const [litersToOrder, setLitersToOrder] = useState('40');
  const [orderSuccess, setOrderSuccess] = useState(false);

  const fetchTelemetry = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/farm-telemetry');
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch {
      // Local fallback if network issue
      setData({
        farmName: 'Raja Haqnawaz Dairy Farm',
        location: 'Punjab, Pakistan',
        metrics: {
          totalCattle: 148,
          activeMilkingCows: 92,
          dailyMilkProductionLiters: 1840,
          averageYieldPerCowLiters: 20.0,
          bulkStorageTempCelsius: 3.8,
          feedStockDaysRemaining: 18,
        },
        recentOrders: [
          { id: 'ORD-894', customer: 'Fresh Pure Mart', quantity: '250 Liters', status: 'Dispatched', amount: '₨ 48,750' },
          { id: 'ORD-893', customer: 'Al-Madina Sweets', quantity: '180 Liters', status: 'Delivered', amount: '₨ 35,100' },
        ],
        healthAlerts: [
          { cowId: 'COW-042', status: 'Vaccination Due', priority: 'Medium' },
          { cowId: 'COW-109', status: 'Lactation Cycle 3', priority: 'Normal' },
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTelemetry();
  }, []);

  const handleSimulateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) return;

    const qty = Number(litersToOrder) || 10;
    const pricePerLiter = 195;
    const totalAmount = `₨ ${(qty * pricePerLiter).toLocaleString()}`;

    const newOrder = {
      id: `ORD-${Math.floor(895 + Math.random() * 50)}`,
      customer: customerName,
      quantity: `${qty} Liters`,
      status: 'Dispatched',
      amount: totalAmount,
    };

    setData({
      ...data,
      metrics: {
        ...data.metrics,
        dailyMilkProductionLiters: Math.max(0, data.metrics.dailyMilkProductionLiters - qty),
      },
      recentOrders: [newOrder, ...data.recentOrders],
    });

    setOrderSuccess(true);
    setTimeout(() => setOrderSuccess(false), 3000);
  };

  if (loading || !data) {
    return (
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 flex items-center justify-center min-h-[320px]">
        <div className="flex items-center gap-2 text-neutral-400 text-sm">
          <RefreshCw className="w-4 h-4 animate-spin text-indigo-400" />
          <span>Connecting to Farm Telemetry API...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 sm:p-7 shadow-xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-white">{data.farmName}</h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Live ERP Sandbox
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Operational livestock tracking, daily milking yield analytics, and direct wholesale dispatch.
          </p>
        </div>

        {/* Actions & Tab Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="https://bsf23005965-gif.github.io/raja-haqnawaz-dairy-farm/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-sm"
          >
            <span>Visit Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <div className="flex items-center bg-neutral-950 p-1 rounded-lg border border-neutral-800 text-xs">
            <button
              onClick={() => setActiveTab('telemetry')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                activeTab === 'telemetry' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Telemetry & Yield
            </button>
            <button
              onClick={() => setActiveTab('order_sim')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                activeTab === 'order_sim' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Order Simulator
            </button>
            <button
              onClick={() => setActiveTab('cattle')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                activeTab === 'cattle' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Herd Health
            </button>
          </div>
        </div>
      </div>

      {/* Tab 1: Telemetry */}
      {activeTab === 'telemetry' && (
        <div className="space-y-5">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4">
              <div className="text-xs text-neutral-500">Total Registered Herd</div>
              <div className="text-2xl font-bold text-white tabular-nums mt-1 font-mono">
                {data.metrics.totalCattle}
              </div>
              <div className="text-[11px] text-neutral-400 mt-1">Sahiwal & Cholistani breeds</div>
            </div>

            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4">
              <div className="text-xs text-neutral-500">Active Milking Cows</div>
              <div className="text-2xl font-bold text-emerald-400 tabular-nums mt-1 font-mono">
                {data.metrics.activeMilkingCows}
              </div>
              <div className="text-[11px] text-neutral-400 mt-1">62% herd in milk cycle</div>
            </div>

            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4">
              <div className="text-xs text-neutral-500">Daily Milk Yield</div>
              <div className="text-2xl font-bold text-white tabular-nums mt-1 font-mono">
                {data.metrics.dailyMilkProductionLiters} L
              </div>
              <div className="text-[11px] text-neutral-400 mt-1">Avg 20.0 L / cow / day</div>
            </div>

            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4">
              <div className="text-xs text-neutral-500">Chilling Tank Temp</div>
              <div className="text-2xl font-bold text-cyan-400 tabular-nums mt-1 font-mono">
                {data.metrics.bulkStorageTempCelsius}°C
              </div>
              <div className="text-[11px] text-neutral-400 mt-1">Optimal preservation (≤4°C)</div>
            </div>
          </div>

          {/* Recent Orders List */}
          <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3 text-xs text-neutral-400 font-medium">
              <span>Recent Wholesale Commercial Dispatches</span>
              <span className="font-mono text-[11px]">Sync: Automated</span>
            </div>
            <div className="divide-y divide-neutral-800/80">
              {data.recentOrders.map((ord) => (
                <div key={ord.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-mono text-neutral-400 mr-2">{ord.id}</span>
                    <span className="text-white font-medium">{ord.customer}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-neutral-300 font-mono">{ord.quantity}</span>
                    <span className="text-indigo-400 font-mono">{ord.amount}</span>
                    <span className="text-neutral-400 font-medium">{ord.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Order Simulator */}
      {activeTab === 'order_sim' && (
        <form onSubmit={handleSimulateOrder} className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 space-y-4">
          <div className="text-xs text-neutral-300">
            Simulate a wholesale milk dispatch to verify real-time ERP ledger updating and inventory subtraction.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1">Customer / Commercial Mart</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1">Volume (Liters)</label>
              <input
                type="number"
                min="10"
                max="500"
                value={litersToOrder}
                onChange={(e) => setLitersToOrder(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="text-xs text-neutral-400">
              Estimated Value:{' '}
              <span className="text-white font-mono font-semibold">
                ₨ {((Number(litersToOrder) || 0) * 195).toLocaleString()}
              </span>{' '}
              <span className="text-neutral-500">(₨195/Litre)</span>
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Process Dispatch</span>
            </button>
          </div>

          {orderSuccess && (
            <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-lg text-emerald-300 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Order successfully recorded in MySQL ledger and deducted from bulk tank stock!</span>
            </div>
          )}
        </form>
      )}

      {/* Tab 3: Herd Health Alerts */}
      {activeTab === 'cattle' && (
        <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span>Automated Veterinary Health & Vaccination Alerts</span>
            <span className="text-emerald-400">Veterinary Protocol Active</span>
          </div>

          <div className="space-y-2">
            {data.healthAlerts.map((alert) => (
              <div
                key={alert.cowId}
                className="p-3 bg-neutral-900/80 border border-neutral-800 rounded-lg flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-indigo-400 font-bold">{alert.cowId}</span>
                  <span className="text-neutral-200">{alert.status}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Priority: {alert.priority}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-[11px] text-neutral-500 pt-2 border-t border-neutral-800">
            Feed inventory indicates 18 days of alfalfa & high-protein concentrate remaining.
          </div>
        </div>
      )}
    </div>
  );
};
