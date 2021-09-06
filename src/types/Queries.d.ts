interface Queries {
  sort_by?: 'date' | 'alphabetical',
  search?: string,
  order?: 'asc' | 'desc',
  ingredients?: string[],
}

export default Queries;
