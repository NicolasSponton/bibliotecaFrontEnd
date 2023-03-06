export const sortAntd = (sorter) => {
    return sorter.order 
        ? sorter.order === 'ascend' 
            ? sorter.columnKey + " asc" 
            : sorter.columnKey + " desc" 
        : ""
}