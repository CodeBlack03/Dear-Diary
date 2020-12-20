import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
const Paginate = ({ pages, page, filter = "", sort = "" }) => {
  console.log(filter + " -> " + sort);
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !sort
                ? filter
                  ? `/notes/search/${filter}/page/${x + 1}`
                  : `/page/${x + 1}`
                : filter
                ? `/notes/search/${filter}/sort/${sort}/page/${x + 1}`
                : `/notes/search/sort/${sort}/page/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};
export default Paginate;
