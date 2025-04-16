import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Probs = {
  pageNumber: number;
  totalPages: number;
  href: string;
};

export const PaginationComponent = ({
  pageNumber,
  totalPages,
  href,
}: Probs) => {
  return (
    <Pagination className="mt-4 md:mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={pageNumber > 1 ? href + (pageNumber - 1) : href + "1"}
            aria-disabled={pageNumber <= 1}
            className={pageNumber <= 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {pageNumber > 2 && (
          <PaginationItem>
            <PaginationLink href={href + 1}>1</PaginationLink>
          </PaginationItem>
        )}

        {pageNumber > 3 && (
          <PaginationItem>
            <PaginationLink className="cursor-default">...</PaginationLink>
          </PaginationItem>
        )}

        {pageNumber > 1 && (
          <PaginationItem>
            <PaginationLink href={href + (pageNumber - 1)}>
              {pageNumber - 1}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink isActive href={href + pageNumber}>
            {pageNumber}
          </PaginationLink>
        </PaginationItem>

        {pageNumber < totalPages && (
          <PaginationItem>
            <PaginationLink href={href + (pageNumber + 1)}>
              {pageNumber + 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {pageNumber < totalPages - 2 && (
          <PaginationItem>
            <PaginationLink className="cursor-default">...</PaginationLink>
          </PaginationItem>
        )}

        {pageNumber < totalPages - 1 && (
          <PaginationItem>
            <PaginationLink href={href + totalPages}>
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            href={
              pageNumber < totalPages
                ? href + (pageNumber + 1)
                : href + pageNumber
            }
            aria-disabled={pageNumber >= totalPages}
            className={
              pageNumber >= totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
