"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function DashboardPage() {
  const router = useRouter();

  // 1. Hook into Better-Auth's live reactive session state
  const { data: session, isPending } = authClient.useSession();

  // 2. Handle the loading state while checking tokens
  if (isPending) {
    return (
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50/50">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-sm font-medium text-gray-500">
            Verifying session context...
          </p>
        </div>
      </main>
    );
  }

  // 3. Kick unauthenticated users back to your login portal
  if (!session) {
    router.replace("/auth");
    return null;
  }

  const { user } = session;



  return (
    <main className="min-h-[calc(100vh-4rem)] bg-gray-50/50 p-4 sm:p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header Unit */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Account
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your verified smartshop application states and history.
            </p>
          </div>
        </div>

        {/* Profile Card Layout */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col items-center text-center">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name}
                className="h-20 w-20 rounded-full border border-gray-100 object-cover shadow-sm"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50 text-2xl font-bold text-indigo-600">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
            )}
            <h2 className="mt-4 font-bold text-gray-900 text-lg">
              {user.name}
            </h2>
            <p className="text-xs font-medium text-gray-400 mt-0.5">
              {user.email}
            </p>

            <div className="mt-4 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-100">
              ✓ Verified Session
            </div>
          </div>

          {/* Metadata Block */}
          <div className="md:col-span-2 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-3">
              Identity Breakdown
            </h3>
            <dl className="mt-4 space-y-4 text-sm">
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <dt className="font-medium text-gray-400">
                  Internal Reference ID
                </dt>
                <dd className="font-mono text-xs text-gray-600 bg-gray-50 px-2 py-0.5 rounded">
                  {user.id}
                </dd>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <dt className="font-medium text-gray-400">Account Username</dt>
                <dd className="font-semibold text-gray-800">{user.name}</dd>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <dt className="font-medium text-gray-400">
                  Primary Contact Address
                </dt>
                <dd className="font-semibold text-gray-800">{user.email}</dd>
              </div>
              <div className="flex justify-between pt-1">
                <dt className="font-medium text-gray-400">
                  Registration Timestamp
                </dt>
                <dd className="font-medium text-gray-600">
                  {new Date(user.createdAt || Date.now()).toLocaleDateString(
                    undefined,
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </main>
  );
}
