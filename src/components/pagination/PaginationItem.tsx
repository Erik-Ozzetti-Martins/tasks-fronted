import { Button } from "@chakra-ui/react";

interface PagianationItemProps {
  isCurrent?: boolean;
  numberPage: number;
  onChangePage: (page:number) => void
}
export function PaginationItem({
  isCurrent,
  numberPage,
  onChangePage
}: PagianationItemProps) {
  if (isCurrent) {
    return (
      <Button disabled colorScheme="pink">
        {numberPage}
      </Button>
    );
  }

  return <Button colorScheme="gray.200" onClick={() => onChangePage(numberPage) }> {numberPage}</Button>;
}
