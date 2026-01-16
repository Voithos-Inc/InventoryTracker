export const SORT_ORDER_RACK_OFFSET = Math.pow(10.0, 6.0)
export const SORT_ORDER_SHELF_OFFSET = Math.pow(10.0, 3.0)

export function sortOrderToRack(sortOrder: number) {
  return Math.floor(sortOrder / SORT_ORDER_RACK_OFFSET)
}

export function sortOrderToShelf(sortOrder: number) {
  return Math.floor((sortOrder % SORT_ORDER_RACK_OFFSET) / SORT_ORDER_SHELF_OFFSET)
}

export function rackShelfLineToSortOrder(rack: number, shelf: number, lineNum: number) {
  return rack * SORT_ORDER_RACK_OFFSET + shelf * SORT_ORDER_SHELF_OFFSET + lineNum
}