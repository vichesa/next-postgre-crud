import { PrismaClient } from "@prisma/client";
import AddProduct from "./addProduct";
import DeleteProduct from "./deleteProduct";
import UpdateProduct from "./updateProduct";

const prisma = new PrismaClient();

const getProducts = async () => {
  const res = await prisma.product.findMany({
    select: {
      id: true,
      title: true,
      price: true,
      brandId: true,
      brand: true,
    },
  });
  return res;
};

const getBrand = async () => {
  const res = await prisma.brand.findMany();
  return res;
};

const Product = async () => {
  const [products, brands] = await Promise.all([getProducts(), getBrand()]);
  //   console.log(products);

  return (
    <div>
      <AddProduct brands={brands} />
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Price</th>
              <th>Brand</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{p.title}</td>
                <td>{p.price}</td>
                <td>{p.brand.name}</td>
                <td>
                  <DeleteProduct product={p} />
                  <UpdateProduct product={p} brands={brands} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Product;
