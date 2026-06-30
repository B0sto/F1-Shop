import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

const buttonClass =
    "flex size-10 items-center justify-center border-y-2 border-r-2 border-[#F90301] text-[20px] leading-none transition-colors hover:bg-[#F90301] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent sm:size-13 cursor-pointer";

const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
    if (totalPages <= 1) return null;

    return (
        <nav className="mt-20 flex justify-center" aria-label="Pagination">
            <div className="flex border-l-2 border-[#F90301]">
                <button
                    type="button"
                    aria-label="Previous page"
                    disabled={page === 1}
                    onClick={() => onPageChange(page - 1)}
                    className={buttonClass}
                >
                    <ChevronLeft className="size-7" />
                </button>

                {Array.from({ length: totalPages }, (_, index) => {
                    const pageNumber = index + 1;
                    const isActive = pageNumber === page;

                    return (
                        <button
                            type="button"
                            key={pageNumber}
                            aria-current={isActive ? "page" : undefined}
                            onClick={() => onPageChange(pageNumber)}
                            className={`${buttonClass} ${isActive ? "bg-[#F90301]" : "bg-transparent"}`}
                        >
                            {pageNumber}
                        </button>
                    );
                })}

                <button
                    type="button"
                    aria-label="Next page"
                    disabled={page === totalPages}
                    onClick={() => onPageChange(page + 1)}
                    className={buttonClass}
                >
                    <ChevronRight className="size-7" />
                </button>
            </div>
        </nav>
    );
};

export default Pagination;
