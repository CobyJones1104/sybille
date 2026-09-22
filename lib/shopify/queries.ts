const IMAGE_FIELDS = `
  url
  altText
  width
  height
`;

const MONEY_FIELDS = `
  amount
  currencyCode
`;

const PRODUCT_FIELDS = `
  id
  handle
  title
  descriptionHtml
  productType
  tags
  featuredImage {
    ${IMAGE_FIELDS}
  }
  priceRange {
    minVariantPrice {
      ${MONEY_FIELDS}
    }
  }
  stepMeters: metafield(namespace: "custom", key: "step_meters") {
    value
  }
  variants(first: 10) {
    edges {
      node {
        id
        title
        availableForSale
        quantityAvailable
        price {
          ${MONEY_FIELDS}
        }
        selectedOptions {
          name
          value
        }
      }
    }
  }
`;

export const GET_PRODUCTS_QUERY = `
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          ${PRODUCT_FIELDS}
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      ${PRODUCT_FIELDS}
    }
  }
`;

const CART_FIELDS = `
  id
  checkoutUrl
  totalQuantity
  cost {
    totalAmount { ${MONEY_FIELDS} }
    subtotalAmount { ${MONEY_FIELDS} }
  }
  lines(first: 50) {
    edges {
      node {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            price { ${MONEY_FIELDS} }
            product {
              title
              handle
            }
          }
        }
        cost {
          totalAmount { ${MONEY_FIELDS} }
        }
      }
    }
  }
`;

export const CART_CREATE_MUTATION = `
  mutation CartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart { ${CART_FIELDS} }
      userErrors { message }
    }
  }
`;

export const CART_LINES_ADD_MUTATION = `
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ${CART_FIELDS} }
      userErrors { message }
    }
  }
`;

export const CART_LINES_UPDATE_MUTATION = `
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { ${CART_FIELDS} }
      userErrors { message }
    }
  }
`;

export const CART_LINES_REMOVE_MUTATION = `
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { ${CART_FIELDS} }
      userErrors { message }
    }
  }
`;

export const GET_CART_QUERY = `
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      ${CART_FIELDS}
    }
  }
`;
