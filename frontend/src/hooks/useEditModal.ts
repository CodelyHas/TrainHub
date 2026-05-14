import { useState } from "react";

export function useEditModal<T>() {
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [isEditing, setEditing] = useState(false);

  const openEditModal = (item: T) => {
    setSelectedItem(item);
    setEditing(true);
  };

  const closeEditModal = () => {
    setSelectedItem(null);
    setEditing(false);
  };

  return {
    selectedItem,
    isEditing,
    openEditModal,
    closeEditModal,
  };
}