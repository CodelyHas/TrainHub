export function updateItemById<T extends { id: number }>(
  list: T[],
  updatedItem: T
) {
  return list.map((item) =>
    item.id === updatedItem.id ? updatedItem : item
  );
}

export function removeItemById<T extends { id: number }>(
  list: T[],
  id: number
) {
  return list.filter((item) => item.id !== id);
}