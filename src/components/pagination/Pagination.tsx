import { Flex } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
  totalCount: number;
  registerPorPage?: number;
  currentPage?: number;
  onChangePage: (page: number) => void;
}

function generetedPageArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter((page) => page > 0);
}
const sibligsCount = 1;

export function Pagination({
  totalCount,
  currentPage = 1,
  registerPorPage = 10,
  onChangePage,
}: PaginationProps) {
  const lastPage = Math.ceil(totalCount / registerPorPage);

  const previousPage =
    currentPage > 1
      ? generetedPageArray(currentPage - 1 - sibligsCount, currentPage - 1)
      : [];
  const nextPage =
    currentPage < lastPage
      ? generetedPageArray(
          currentPage,
          Math.min(currentPage + sibligsCount, lastPage)
        )
      : [];



    return (
      <Flex>
        {currentPage > (1 + sibligsCount) && (
          <PaginationItem onChangePage={onChangePage} numberPage={1} />
        )}
        {previousPage.length > 0 &&
          previousPage.map((page) => {
            return (
              <PaginationItem
                key={page}
                onChangePage={onChangePage}
                numberPage={page}
              />
            );
          })}
        <PaginationItem
          onChangePage={onChangePage}
          numberPage={currentPage}
          isCurrent
        />
        {nextPage.length > 0 &&
          nextPage.map((page) => {
            return (
              <PaginationItem onChangePage={onChangePage} numberPage={page}  key={page} />
            );
          })}
        {(currentPage + sibligsCount) < lastPage && (
          <PaginationItem numberPage={lastPage} onChangePage={onChangePage} />
        )}
      </Flex>
    );
  }

//   return (
//     <Flex align="center" justify="center" m="4">
//       <PaginationItem
//         isCurrent
//         onChangePage={onChangePage}
//         numberPage={currentPage}
//       />
//     </Flex>
//   );
// }
