import React, { useEffect, useState } from "react";

const AddChildrenActivityModal = ({
  isOpen,
  onClose,
  onSubmit,
  loading = false,
}) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      setForm({
        title: "",
        description: "",
        image: null,
      });

      setPreview(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setForm((prev) => ({
      ...prev,
      image: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-[#f7f8ff] p-5 shadow-md sm:p-6">
        {/* Header */}
        <div className="mb-5">
          <h2 className="text-sm font-[PoppinsBold] text-swamp-green sm:text-base">
            Add Children Activity
          </h2>

          <p className="mt-1 text-[9px] text-gray-500 sm:text-xs">
            Add a new activity to the homepage.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="text-[9px] text-gray-600 sm:text-xs">
                Title:
              </label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter activity title"
                required
                maxLength={225}
                className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-[9px] text-gray-600 outline-none transition placeholder:text-gray-400 focus:border-swamp-green sm:text-xs"
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-[9px] text-gray-600 sm:text-xs">
                Description:
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter activity description"
                required
                rows={5}
                className="mt-1 w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-[9px] leading-relaxed text-gray-600 outline-none transition placeholder:text-gray-400 focus:border-swamp-green sm:text-xs"
              />
            </div>

            {/* Image */}
            <div>
              <label className="text-[9px] text-gray-600 sm:text-xs">
                Image:
              </label>

              <label className="mt-1 block cursor-pointer">
                <div className="flex min-h-32 items-center justify-center overflow-hidden rounded-lg border border-gray-300 bg-white transition hover:border-swamp-green">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="h-32 w-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <p className="text-[9px] text-gray-500 sm:text-xs">
                        Click to select an image
                      </p>

                      <p className="mt-1 text-[8px] text-gray-400 sm:text-[10px]">
                        JPG, JPEG, PNG, or WEBP
                      </p>
                    </div>
                  )}
                </div>

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-[9px] text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 sm:text-xs"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-full bg-swamp-green px-4 py-2 text-[9px] font-medium text-white transition hover:bg-lime-green disabled:cursor-not-allowed disabled:opacity-50 sm:text-xs"
            >
              {loading ? "Adding..." : "Add Activity"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddChildrenActivityModal;
