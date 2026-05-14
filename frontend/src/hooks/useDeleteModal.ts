import { useState } from "react";

export function useDeleteModal<T>() {
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [isDeleting, setDeleting] = useState(false);

  const openDeleteModal = (item: T) => {
    setSelectedItem(item);
    setDeleting(true);
  };

  const closeDeleteModal = () => {
    setSelectedItem(null);
    setDeleting(false);
  };

  return {
    selectedItem,
    isDeleting,
    openDeleteModal,
    closeDeleteModal,
  };
}