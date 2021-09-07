interface Queries {
  sort_by?: 'date' | 'alphabetical',
  search?: string,
  order?: 'asc' | 'desc',
  ingredient?: string[],
  category?: string[],
}

export default Queries;
