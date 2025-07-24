export interface PaginateResult<T> {
    docs: Array<T>
    totalDocs: number
    offset: number
    limit: number
    page: number
    pagingCounter: number
    totalPages: number
    hasPrevPage: boolean
    hasNextPage: boolean
    prevPage?: number | null | undefined
    nextPage?: number | null | undefined
}
