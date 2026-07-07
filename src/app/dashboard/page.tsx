"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useShop } from "@/context/ShopContext";
import { fetchUserProfile } from "@/app/actions/auth";

export default function DashboardPage() {
  const router = useRouter();
  const { user, login } = useShop();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Extract email safely to prevent referencing the whole object
  const userEmail = user?.email;

  useEffect(() => {
    if (!userEmail && !loading) {
      router.push("/auth");
      return;
    }

    async function syncProfile() {
      try {
        const email = userEmail;
        if (!email) return;

        const data = await fetchUserProfile(email);
        if (data) {
          setProfile(data);
          login(data); // Now safe to update because userEmail stays the same!
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    syncProfile();
    // Only re-run if the specific user email changes, or if the router updates
  }, [userEmail, router]);

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center text-sm font-medium text-gray-500">
        Loading profile matrix...
      </div>
    );
  }

  const orders = profile?.orderHistory || [];

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      {/* ... keeping the rest of your JSX exactly the same ... */}
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          Account Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your delivery details and monitor past electronic acquisitions.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Buyer Identity
          </span>
          <h2 className="mt-1 text-lg font-bold text-gray-900">
            {profile?.name}
          </h2>
          <p className="text-sm text-gray-500">{profile?.email}</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Default Shipping Point
          </span>
          <p className="mt-1 text-sm text-gray-700">
            {profile?.address
              ? profile.address
              : "No address saved yet. Complete a checkout to store one."}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold tracking-tight text-gray-900 mb-4">
          Order History ({orders.length})
        </h2>

        {orders.length === 0 ? (
          <div className="rounded-xl border-2 border-dashed border-gray-200 p-8 text-center text-sm text-gray-400">
            You haven&apos;t placed any orders yet.
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order: any, idx: number) => (
              <div
                key={order._id || idx}
                className="rounded-xl border border-gray-200 bg-white p-4 shadow-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3">
                  <div>
                    <p className="text-xs font-semibold text-gray-400">
                      ORDER ID:{" "}
                      <span className="text-gray-700">
                        #
                        {String(order._id || idx)
                          .slice(-8)
                          .toUpperCase()}
                      </span>
                    </p>
                    <p className="text-xs text-gray-400">
                      Placed on:{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="rounded-lg bg-green-50 px-2.5 py-1 text-xs font-bold text-green-700">
                    Total Paid: ${order.totalCost}
                  </span>
                </div>

                <ul className="mt-3 divide-y divide-gray-50">
                  {order.items.map((item: any, itemIdx: number) => (
                    <li
                      key={itemIdx}
                      className="flex items-center justify-between py-2 text-sm"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{item.emoji}</span>
                        <span className="font-medium text-gray-900">
                          {item.name}
                        </span>
                        <span className="text-xs text-gray-400">
                          x{item.quantity}
                        </span>
                      </div>
                      <span className="font-semibold text-gray-700">
                        ${item.price * item.quantity}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
