import { useState } from "react";

export function useCreateModal() {
  const [isCreating, setCreating] = useState(false);

  const openCreateModal = () => {
    setCreating(true);
  };

  const closeCreateModal = () => {
    setCreating(false);
  };

  return {
    isCreating,
    openCreateModal,
    closeCreateModal,
  };
}