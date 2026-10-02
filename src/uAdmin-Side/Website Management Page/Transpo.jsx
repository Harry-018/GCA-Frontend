import React, { useState } from "react";
import Header from "../../Components/AdminComponents/Website Management/Header";
import TranspoRouteCard from "../../Components/AdminComponents/Website Management/Transportation/TranspoRouteCard";
import AddTranspoModal from "../../Components/AdminComponents/Website Management/Transportation/AddTranspoModal";
import RemoveModal from "../../Components/AdminComponents/Website Management/RemoveModal";

const ROUTES = [
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

const ZONE_ORDER = ["Trece Martires City", "Tanza"];

const Transpo = () => {
  const [routes, setRoutes] = useState(ROUTES);
  const [addOpen, setAddOpen] = useState(false);
  const [addZone, setAddZone] = useState("");
  const [editingRoute, setEditingRoute] = useState(null);
  const [removingRoute, setRemovingRoute] = useState(null);

  const handleAddOpen = (zone) => {
    setAddZone(zone);
    setEditingRoute(null);
    setAddOpen(true);
  };

  const handleAddSubmit = (formData) => {
    if (editingRoute) {
      setRoutes((prev) =>
        prev.map((route) =>
          route.id === editingRoute.id
            ? { ...route, ...formData }
            : route
        )
      );
    } else {
      const nextId = routes.length
        ? Math.max(...routes.map((r) => r.id)) + 1
        : 1;

      setRoutes((prev) => [
        ...prev,
        { id: nextId, ...formData, zone: addZone },
      ]);
    }

    setAddOpen(false);
    setEditingRoute(null);
    setAddZone("");
  };

  const handleEditOpen = (route) => {
    setEditingRoute(route);
    setAddOpen(true);
  };

  const handleRemoveOpen = (route) => {
    setRemovingRoute(route);
  };

  const handleRemoveConfirm = () => {
    setRoutes((prev) =>
      prev.filter((route) => route.id !== removingRoute.id)
    );
    setRemovingRoute(null);
  };

  const zones = ZONE_ORDER.reduce((acc, zone) => {
    acc[zone] = routes.filter((route) => route.zone === zone);
    return acc;
  }, {});

  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col gap-4 overflow-hidden bg-[#ebe9e4] font-[Poppins]">
      <Header activeTab="transportation" />

      <div className="no-scrollbar flex min-h-0 flex-1 flex-col overflow-y-auto">
        {ZONE_ORDER.filter((zone) => zones[zone].length).map((zone) => (
          <section key={zone} className="pb-6">
            <div className="flex items-center justify-between pb-3">
              <h2 className="rounded-full px-4 py-1 text-md font-bold text-swamp-green">
                {zone}
              </h2>

              <button
                type="button"
                onClick={() => handleAddOpen(zone)}
                className="rounded-full bg-swamp-green px-5 py-2 text-[9px] sm:text-xs font-medium text-white transition hover:bg-[#7d965f]"
              >
                Add
              </button>
            </div>

            <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {zones[zone].map((route) => (
                <TranspoRouteCard
                  key={route.id}
                  location={route.location}
                  distance={route.distance}
                  price={route.price}
                  onEdit={() => handleEditOpen(route)}
                  onRemove={() => handleRemoveOpen(route)}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      <AddTranspoModal
        isOpen={addOpen}
        routeData={editingRoute}
        onClose={() => {
          setAddOpen(false);
          setEditingRoute(null);
        }}
        onSubmit={handleAddSubmit}
      />

      <RemoveModal
        isOpen={removingRoute !== null}
        title="Remove Route"
        itemName={removingRoute?.location}
        onClose={() => setRemovingRoute(null)}
        onRemove={handleRemoveConfirm}
      />
    </div>
  );
};

export default Transpo;