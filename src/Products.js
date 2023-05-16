import styled from "styled-components";
import FilterSection from "./components/FilterSection";
import ProductList from "./components/ProductList";
import Sort from "./components/Sort";
import { useFilterContext } from "./context/filter_context";

const Products = () => {
  return (
    <Wrapper>
      {/* // first col Products */}
      <div className="container grid grid-filter-column">
        <div>
          <FilterSection />
        </div>
        {/* second col products */}
        <section className="product-view--sort">
          {/* first row */}
          <div className="sort-filter">
            <Sort />
          </div>
          {/* second row */}
          <div className="main-product">
            <ProductList />
          </div>
        </section>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .grid-filter-column {
    grid-template-columns: 0.2fr 1fr;
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid-filter-column {
      grid-template-columns: 1fr;
    }
  }
`;

export default Products;