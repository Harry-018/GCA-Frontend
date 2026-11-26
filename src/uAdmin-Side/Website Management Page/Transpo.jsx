import React, { useEffect, useState } from "react";
import Header from "../../Components/AdminComponents/Website Management/Header.jsx";
import TranspoRouteCard from "../../Components/AdminComponents/Website Management/Transportation/TranspoRouteCard.jsx";
import AddTranspoModal from "../../Components/AdminComponents/Website Management/Transportation/AddTranspoModal.jsx";
import RemoveModal from "../../Components/AdminComponents/Website Management/RemoveModal.jsx";
import AdminPageSkeleton from "../../Components/AdminPageSkeleton.jsx";

import {
  getTransportation,
  addTransportation,
  editTransportation,
  deleteTransportation,
} from "../../requests/transporationRequests.js";

const Transpo = () => {
  const [routes, setRoutes] = useState([]);
  const [addOpen, setAddOpen] = useState(false);
  const [editingRoute, setEditingRoute] = useState(null);
  const [removingRoute, setRemovingRoute] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadTransportation = async () => {
    try {
      setLoading(true);

      const data = await getTransportation();

      setRoutes(data.r || []);
    } catch (error) {
      console.error("Failed to load transportation:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (mounted) await loadTransportation();
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handleAddSubmit = async (formData) => {
    try {
      setLoading(true);

      await addTransportation({
        location: formData.location,
        distance: formData.distance,
        price: formData.price,
        city: formData.city,
      });

      await loadTransportation();

      setAddOpen(false);
    } catch (error) {
      console.error("Failed to add transportation:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditOpen = (route, city) => {
    setEditingRoute({
      ...route,
      city,
    });

    setAddOpen(true);
  };

  const handleEditSubmit = async (formData) => {
    try {
      setLoading(true);

      await editTransportation(editingRoute.transportation_id, {
        location: formData.location,
        distance: formData.distance,
        price: formData.price,
        city: editingRoute.city,
      });

      await loadTransportation();

      setAddOpen(false);
      setEditingRoute(null);
    } catch (error) {
      console.error("Failed to edit transportation:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveOpen = (route) => {
    setRemovingRoute(route);
  };

  const handleRemoveConfirm = async () => {
    try {
      setLoading(true);

      await deleteTransportation(removingRoute.transportation_id);

      await loadTransportation();

      setRemovingRoute(null);
    } catch (error) {
      console.error("Failed to remove transportation:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    if (editingRoute) {
      await handleEditSubmit(formData);
    } else {
      await handleAddSubmit(formData);
    }
  };

  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col gap-4 overflow-hidden bg-egg font-[Poppins]">
      <Header activeTab="transportation" />

      <div className="no-scrollbar flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-1 pb-4">
        <section className="relative w-full rounded-2xl bg-[#0c2423] shadow-sm">
          <button
            type="button"
            onClick={() => {
              setEditingRoute(null);
              setAddOpen(true);
            }}
            className="absolute right-4 top-4 z-30 rounded-xl bg-parent-green px-4 py-2 text-xs font-[PoppinsBold] text-white transition hover:bg-parent-accent"
          >
            Add route
          </button>

          <div className="px-5 py-12 sm:px-10 lg:px-16 lg:py-16">
            <div className="mx-auto max-w-7xl">
              <span className="font-[PoppinsBold] text-sm uppercase tracking-[0.35em] text-parent-mint">Transportation</span>
              <h2 className="mt-4 max-w-2xl font-[SuperJoyful] text-4xl leading-[1.05] text-parent-mint sm:text-5xl">
                School Service Routes
              </h2>
              <p className="mt-4 max-w-2xl font-[Poppins] text-sm leading-relaxed text-bone/85 sm:text-base">
                Manage pickup locations, distances, and transportation fees displayed on the landing page.
              </p>

              <div className="mt-10 flex flex-col gap-8">
                {loading && routes.length === 0 ? (
                  <AdminPageSkeleton variant="transportation" />
                ) : routes.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 px-4 py-10 text-center text-sm text-white/60">
                    No transportation routes found.
                  </div>
                ) : (
                  routes.map((cityGroup) => (
                    <div key={cityGroup.city} className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <h3 className="font-[PoppinsBold] text-sm uppercase tracking-wider text-white/80 sm:text-base">
                          {cityGroup.city}
                        </h3>
                        <span className="rounded-full bg-parent-mint/20 px-2.5 py-0.5 text-xs font-[PoppinsBold] text-parent-mint">
                          {cityGroup.locations.length}
                        </span>
                        <span className="h-px flex-1 bg-white/15" />
                      </div>

                      <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {cityGroup.locations.map((route) => (
                          <TranspoRouteCard
                            key={route.transportation_id}
                            location={route.location}
                            distance={route.distance}
                            price={route.price}
                            onEdit={() => handleEditOpen(route, cityGroup.city)}
                            onRemove={() => handleRemoveOpen(route)}
                          />
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      <AddTranspoModal
        isOpen={addOpen}
        routeData={editingRoute}
        onClose={() => {
          setAddOpen(false);
          setEditingRoute(null);
        }}
        onSubmit={handleSubmit}
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
