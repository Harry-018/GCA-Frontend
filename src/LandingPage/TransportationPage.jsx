import { useEffect, useState } from "react";
// import axios from "axios";
import { Banknote, Bus, MapPinned, Route } from "lucide-react";
import TransportationBanner from "../Components/LandingpageComponents/Transportation/TransportationBanner";
import TransportationCard from "../Components/LandingpageComponents/Transportation/TransportationCard";
import LoginHeader from "../Components/LoginHeader";
import HomeSidebar from "../Components/HomeSidebar";
import Footer from "../Components/Footer";

const transpoData = [
  {
    id: 1,
    location: "Paragon Village",
    distance: "10km",
    price: "3,500",
    zone: "Tanza",
  },
  {
    id: 2,
    location: "Woodville Subdivision",
    distance: "10km",
    price: "3,500",
    zone: "Tanza",
  },
  {
    id: 3,
    location: "Port 45",
    distance: "10km",
    price: "3,500",
    zone: "Tanza",
  },
  {
    id: 4,
    location: "Sunshine Ville",
    distance: "4km",
    price: "3,500",
    zone: "Trece Martires City",
  },
  {
    id: 5,
    location: "Benedict's City",
    distance: "4km",
    price: "3,500",
    zone: "Trece Martires City",
  },
  {
    id: 6,
    location: "Park 7",
    distance: "4km",
    price: "3,500",
    zone: "Trece Martires City",
  },
  {
    id: 7,
    location: "Governor's Road",
    distance: "7.6km",
    price: "2,900",
    zone: "Tanza",
  },
  {
    id: 8,
    location: "Isaac New Town",
    distance: "7.6km",
    price: "2,900",
    zone: "Tanza",
  },
  {
    id: 9,
    location: "Michael's Area",
    distance: "7.6km",
    price: "2,900",
    zone: "Tanza",
  },
];

const STATS = [
  { label: "Routes Available", value: "9", icon: Route },
  { label: "Fee Range", value: "₱2,900 – ₱3,500", icon: Banknote },
  { label: "Max Distance", value: "10 km", icon: MapPinned },
];

const TransportationPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // TEMPORARY - api fetch (uncomment to run)
    // axios
    //   .get("http://localhost:5000/api/transportation")
    //   .then((response) => {
    //     console.log("TransportationPage data:", response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching transportation data:", error);
    //   });
  }, []);

  const zones = transpoData.reduce((acc, item) => {
    if (!acc[item.zone]) acc[item.zone] = [];
    acc[item.zone].push(item);
    return acc;
  }, {});

  const zoneOrder = ["Trece Martires City", "Tanza"];

  return (
    <div className="flex h-full w-full flex-col">
      <LoginHeader 
        onMenuToggle={() => 
        setSidebarOpen(true)} 
      />

      <HomeSidebar 
        open={sidebarOpen} onClose={() => 
        setSidebarOpen(false)} 
      />

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
                  <Icon className="h-5 w-5 text-swamp-green sm:h-6 sm:w-6" strokeWidth={1.5} />
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
              <h2 className="font-Handpicked-seashells font-bold uppercase text-lg text-swamp-green">
                Locations Available
              </h2>
            </div>

{zoneOrder
              .filter((zone) => zones[zone])
              .map((zone) => (
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
                      key={transpo.id}
                      location={transpo.location}
                      distance={transpo.distance}
                      price={transpo.price}
                    />
                  ))}
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default TransportationPage;