import { PAGE_SIZES } from "@/shared/constants/adminTables";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

export interface PaginationType {
  currentPage: number;
  pageSize: number;
  totalCount: number;
}

interface PaginationProps {
  pagination: PaginationType;
  handlePagination: (value: "next" | "prev") => void;
  setPagination: React.Dispatch<React.SetStateAction<PaginationType>>;
}

export const Pagination = ({
  pagination,
  handlePagination,
  setPagination,
}: PaginationProps) => {
  
  const totalPages = Math.ceil(pagination.totalCount / pagination.pageSize);

  const goToFirst = () =>
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  const goToLast = () =>
    setPagination((prev) => ({ ...prev, currentPage: totalPages }));

  return (
    <div className="flex items-center justify-between mt-4">
      {/* Page Info */}
      <span className="text-sm dark:text-white text-gray-600">
        Page {pagination.currentPage} of {totalPages}
      </span>

      {/* Pagination Buttons */}
      <div className="flex gap-2">
        {/* First Page */}
        <button
          disabled={pagination.currentPage === 1}
          onClick={goToFirst}
          className="leading-none pb-1 px-3 py-0 text-3xl bg-secondary hover:bg-secondary-dark text-white rounded-md disabled:opacity-50 flex items-center justify-center"
        >
          «
        </button>

        {/* Prev */}
        <button
          disabled={pagination.currentPage === 1}
          onClick={() => handlePagination("prev")}
          className="leading-none pb-1 px-3 py-0 text-3xl bg-secondary hover:bg-secondary-dark text-white rounded-md disabled:opacity-50 flex items-center justify-center"
        >
          ‹
        </button>

        {/* Next */}
        <button
          disabled={pagination.currentPage === totalPages}
          onClick={() => handlePagination("next")}
          className="leading-none pb-1 px-3 py-0 text-3xl bg-secondary hover:bg-secondary-dark text-white rounded-md disabled:opacity-50 flex items-center justify-center"
        >
          ›
        </button>

        {/* Last Page */}
        <button
          disabled={pagination.currentPage === totalPages}
          onClick={goToLast}
          className="leading-none pb-1 px-3 py-0 text-3xl bg-secondary hover:bg-secondary-dark text-white rounded-md disabled:opacity-50 flex items-center justify-center"
        >
          »
        </button>
      </div>

      {/* Page Size Selector */}
      <div className="flex items-center gap-3">
        <label className="text-sm dark:text-white text-gray-600">
          Page Size
        </label>
        <Select
          value={pagination.pageSize.toString()} // ✅ controlled value
          onValueChange={(value) =>
            setPagination((prev) => ({
              ...prev,
              pageSize: Number(value),
              currentPage: 1,
            }))
          }
        >
          <SelectTrigger className="w-15">
            <SelectValue placeholder="Select page size" />
          </SelectTrigger>
                    <SelectContent className="min-w-[9rem] rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-gray-800 dark:bg-gray-900">
            {PAGE_SIZES.map((item) => (
              <SelectItem
                key={item}
                value={item.toString()}
                /* pl-8 gives space for the check icon, pr-3 ensures end spacing */
                className="relative flex w-full cursor-pointer items-center justify-between border-b border-gray-100 py-2.5 pl-8 pr-3 text-sm text-gray-700 transition-colors last:border-b-0 hover:bg-gray-100 focus:bg-gray-100 data-[state=checked]:bg-blue-50 data-[state=checked]:font-semibold data-[state=checked]:text-blue-600 dark:border-gray-800 dark:text-gray-200 dark:hover:bg-gray-800 dark:focus:bg-gray-800 dark:data-[state=checked]:bg-blue-950/50 dark:data-[state=checked]:text-blue-400"
              >
                {/* Container with flex & gap to keep icon/label separated from the number */}
                <div className="flex items-center gap-2">
                  <span className="font-medium">{item}</span>

                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <span className="text-sm dark:text-white text-gray-600 text-center">
          Record {(pagination.currentPage - 1) * pagination.pageSize + 1} -{" "}
          {Math.min(
            pagination.currentPage * pagination.pageSize,
            pagination.totalCount
          )}{" "}
          of {pagination.totalCount}
        </span>
      </div>
    </div>
  );
};
