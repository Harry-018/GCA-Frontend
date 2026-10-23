import { useEffect, useState } from "react";
import { Banknote, Bus, MapPinned, Route } from "lucide-react";

import TransportationBanner from "../Components/LandingpageComponents/Transportation/TransportationBanner";
import TransportationCard from "../Components/LandingpageComponents/Transportation/TransportationCard";
import LoginHeader from "../Components/LoginHeader";
import HomeSidebar from "../Components/HomeSidebar";
import Footer from "../Components/Footer";

import { getTransportation } from "../requests/transporationRequests.js";

const TransportationPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [transpoData, setTranspoData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadTransportation = async () => {
      try {
        setLoading(true);

        const response = await getTransportation();

        if (!cancelled) {
          setTranspoData(Array.isArray(response.r) ? response.r : []);
        }
      } catch (error) {
        console.error("Failed to load transportation:", error);

        if (!cancelled) {
          setTranspoData([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadTransportation();

    return () => {
      cancelled = true;
    };
  }, []);

  // Group transportation locations by city.
  const zones = transpoData.reduce((acc, cityGroup) => {
    const city = cityGroup.city;

    if (!acc[city]) {
      acc[city] = [];
    }

    acc[city].push(
      ...(Array.isArray(cityGroup.locations) ? cityGroup.locations : []),
    );

    return acc;
  }, {});

  // Preserve the previous city order, then include any additional cities.
  const preferredZoneOrder = ["Trece Martires City", "Tanza"];

  const zoneOrder = [
    ...preferredZoneOrder.filter((zone) => zones[zone]),
    ...Object.keys(zones).filter((zone) => !preferredZoneOrder.includes(zone)),
  ];

  const allLocations = transpoData.flatMap((cityGroup) =>
    Array.isArray(cityGroup.locations) ? cityGroup.locations : [],
  );

  const prices = allLocations
    .map((item) => Number(item.price))
    .filter((price) => Number.isFinite(price) && price >= 0);

  const distances = allLocations
    .map((item) => parseFloat(item.distance))
    .filter((distance) => Number.isFinite(distance) && distance >= 0);

  const formatPrice = (price) =>
    `₱${price.toLocaleString("en-PH", {
      maximumFractionDigits: 2,
    })}`;

  const feeRange =
    prices.length > 0
      ? prices.every((price) => price === prices[0])
        ? formatPrice(prices[0])
        : `${formatPrice(Math.min(...prices))} – ${formatPrice(Math.max(...prices))}`
      : "Not available";

  const maxDistance =
    distances.length > 0
      ? `${Math.max(...distances).toLocaleString("en-PH")} km`
      : "Not available";

  const STATS = [
    {
      label: "Routes Available",
      value: String(allLocations.length),
      icon: Route,
    },
    {
      label: "Fee Range",
      value: feeRange,
      icon: Banknote,
    },
    {
      label: "Max Distance",
      value: maxDistance,
      icon: MapPinned,
    },
  ];

  return (
    <div className="flex h-full w-full flex-col">
      <LoginHeader onMenuToggle={() => setSidebarOpen(true)} />

      <HomeSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex w-full flex-col overflow-x-hidden">
        <div className="flex w-full flex-col bg-egg px-3 pt-3 pb-10 font-[Poppins] text-egg-dark sm:px-5 sm:pt-5 sm:pb-12 lg:px-6 lg:pt-5 lg:pb-14">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 sm:gap-8">
            <TransportationBanner />

            <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {STATS.map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 rounded-2xl bg-bone p-4 shadow-[0_2px_3px_rgba(0,0,0,0.2)] sm:p-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-swamp-green/15 sm:h-12 sm:w-12">
                    <Icon
                      className="h-5 w-5 text-swamp-green sm:h-6 sm:w-6"
                      strokeWidth={1.5}
                    />
                  </div>

                  <div className="flex min-w-0 flex-col">
                    <p className="whitespace-nowrap font-[PoppinsBold] text-sm text-swamp-green sm:text-base lg:text-lg">
                      {value}
                    </p>
                    <p className="text-sm text-ashlight">{label}</p>
                  </div>
                </div>
              ))}
            </section>

            <section className="flex flex-col gap-y-8">
              <div className="flex items-center gap-3">
                <Bus className="h-5 w-5 text-swamp-green" />

                <h2 className="font-[PoppinsBold] uppercase text-xl text-swamp-green">
                  Locations Available
                </h2>
              </div>

              {loading ? (
                <p className="py-6 text-center text-sm text-ashlight">
                  Loading transportation...
                </p>
              ) : allLocations.length === 0 ? (
                <p className="py-6 text-center text-sm text-ashlight">
                  No transportation routes found.
                </p>
              ) : (
                zoneOrder.map((zone) => (
                  <div key={zone} className="flex flex-col gap-y-4">
                    <div className="flex items-center gap-2">
                      <span className="font-[PoppinsBold] text-sm uppercase tracking-wider text-ashlight">
                        {zone}
                      </span>

                      <span className="rounded-full bg-swamp-green/15 px-2.5 py-0.5 text-xs font-[PoppinsBold] text-swamp-green">
                        {zones[zone].length}
                      </span>

                      <span className="h-px flex-1 bg-bone/60" />
                    </div>

                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
                      {zones[zone].map((transpo) => (
                        <TransportationCard
                          key={transpo.transportation_id}
                          location={transpo.location}
                          distance={transpo.distance}
                          price={transpo.price}
                        />
                      ))}
                    </div>
                  </div>
                ))
              )}
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TransportationPage;
