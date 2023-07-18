import Settings from "../settings/settings";
import MainStore from "../store/main-store";
import { Activity } from "./activitiy";
import LatestOrders from "./latest-orders";

export function Dashboard({ currentTab }: { currentTab: number }) {
  const renderLeftComponent = () => {
    if (currentTab === 5) return <MainStore />;
    else if (currentTab === 1) return <Activity />;
    else return <Activity />;
  };
  return currentTab !== 6 ? (
    <main className="-mt-24 pb-8 h-screen">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="sr-only">Page title</h1>
        {/* Main 3 column grid */}
        <div className="grid grid-cols-1  items-start gap-4 lg:grid-cols-3 lg:gap-8">
          {/* Left column */}
          <div className="grid grid-cols-1 gap-4 lg:col-span-2">
            <section aria-labelledby="section-1-title">
              <h2 className="sr-only" id="section-1-title">
                Section title
              </h2>
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="p-6">{renderLeftComponent()}</div>
              </div>
            </section>
          </div>

          {/* Right column */}
          <div className="grid grid-cols-1 gap-4">
            <section aria-labelledby="section-2-title">
              <h2 className="sr-only" id="section-2-title">
                Section title
              </h2>
              <div className="h-screen rounded-lg  bg-white shadow overflow-y-auto">
                <div className="p-6">
                  <LatestOrders />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  ) : (
    <main className="-mt-24 pb-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <Settings />
      </div>
    </main>
  );
}
