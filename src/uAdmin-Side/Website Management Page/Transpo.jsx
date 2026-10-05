import React, { useEffect, useState } from "react";
import Header from "../../Components/AdminComponents/Website Management/Header.jsx";
import TranspoRouteCard from "../../Components/AdminComponents/Website Management/Transportation/TranspoRouteCard.jsx";
import AddTranspoModal from "../../Components/AdminComponents/Website Management/Transportation/AddTranspoModal.jsx";
import RemoveModal from "../../Components/AdminComponents/Website Management/RemoveModal.jsx";

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
    loadTransportation();
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
    <div className="flex min-h-0 flex-1 cursor-default flex-col gap-4 overflow-hidden bg-[#ebe9e4] font-[Poppins]">
      <Header activeTab="transportation" />

      {/* Page header */}
      <div className="flex items-center justify-between px-1">
        <h2 className="text-sm font-[PoppinsBold] text-swamp-green sm:text-base">
          Transportation
        </h2>

        <button
          type="button"
          onClick={() => {
            setEditingRoute(null);
            setAddOpen(true);
          }}
          className="rounded-full bg-swamp-green px-5 py-2 text-[9px] font-medium text-white transition hover:bg-[#7d965f] sm:text-xs"
        >
          Add
        </button>
      </div>

      <div className="no-scrollbar flex min-h-0 flex-1 flex-col overflow-y-auto">
        {loading && routes.length === 0 ? (
          <div className="flex justify-center py-10">
            <p className="text-[9px] text-gray-500 sm:text-xs">
              Loading transportation...
            </p>
          </div>
        ) : routes.length === 0 ? (
          <div className="flex justify-center py-10">
            <p className="text-[9px] text-gray-500 sm:text-xs">
              No transportation routes found.
            </p>
          </div>
        ) : (
          routes.map((cityGroup) => (
            <section key={cityGroup.city} className="pb-6">
              <div className="pb-3">
                <h2 className="rounded-full text-md font-[PoppinsBold] text-swamp-green">
                  {cityGroup.city}
                </h2>
              </div>

              <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
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
            </section>
          ))
        )}
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
