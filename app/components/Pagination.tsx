import React from "react";
import feather from "feather-icons";

interface Props {
  page: number;
  setPage: (page: number) => void;
  pageFromApi: number | undefined;
}

const Pagination: React.FC<Props> = ({ page, setPage, pageFromApi }) => {
  const nextPage = () => {
    if (pageFromApi && page < pageFromApi) {
      setPage(page + 1);
    }
  };
  const prevPage = () => {
    if (page !== 1) {
      setPage(page - 1);
    }
  };
  return (
    <>
      <div className="flex justify-center gap-2 text-white">
        <div
          dangerouslySetInnerHTML={{
            __html: feather.icons["arrow-left"].toSvg(),
          }}
          className="cursor-pointer"
          onClick={prevPage}
        ></div>
        <p>
          {page} of {pageFromApi}
        </p>
        <div
          dangerouslySetInnerHTML={{
            __html: feather.icons["arrow-right"].toSvg(),
          }}
          className="cursor-pointer"
          onClick={nextPage}
        ></div>
      </div>
    </>
  );
};

export default Pagination;
