import { useState } from "react";

export function useStatusModal<T, A extends string>() {
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [action, setAction] = useState<A | null>(null);

  const openStatusModal = (item: T, actionType: A) => {
    setSelectedItem(item);
    setAction(actionType);
  };

  const closeStatusModal = () => {
    setSelectedItem(null);
    setAction(null);
  };

  return {
    selectedItem,
    action,
    openStatusModal,
    closeStatusModal,
  };
}