import { Button } from "react-bootstrap";
import { MdDeleteSweep } from "react-icons/md";
import { CiViewTimeline } from "react-icons/ci";
import { GrUpdate } from "react-icons/gr";
import { deleteProduct } from "../../../services/product.services";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const SingleProductView = ({
  SN,
  singleProduct,
  products,
  setProducts,
  handleShow,
  setSingleView,
  openEditProductModal,
}) => {
  const {
    title,
    quantity,
    stock,
    live,
    price,
    addedDate,
    discountedPrice,
    category,
  } = singleProduct;

  const formatdate = (time) => {
    return new Date(time).toLocaleDateString();
  };

  const getBackgroundForProduct = () => {
    // live + st0ack === green table-success
    // not live === red table-danger
    // not stock ==> yello tabel-warning

    if (live && stock) {
      return "table-success";
    } else if (!live) {
      return "table-danger";
    } else if (!stock) {
      return "table-warning";
    } else {
    }
  };

  // delete product

  const handleDelete = (event, productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // making an api call for delete the product
        deleteProduct(productId)
          .then((data) => {
            console.log(data);
            toast.success("Product Deleted!");

            let newProductArray = products.content.filter((obj) => {
              return obj.productId !== productId;
            });

            setProducts((products) => {
              return {
                ...products,
                content: newProductArray,
              };
            });
          })
          .catch((error) => {
            console.log(error);
            toast.error("Unable to Deleted!");
          });
      }
    });
  };

  // below function invokes when in view products view button get Clicked..
  const handleView = (event, singleProduct) => {
    setSingleView((singleView) => {
      return singleProduct;
    });

    handleShow();
  };

  return (
    <tr className={getBackgroundForProduct()}>
      <td className="px-2 small">{SN}</td>
      <td className="px-2 small">{title}</td>
      <td className="px-2 small">{quantity}</td>
      <td className="px-2 small">{price}₹</td>
      <td className="px-2 small">{discountedPrice}₹</td>
      <td className="px-2 small">{live ? "Live" : "NOT"}</td>
      <td className="px-2 small">{stock ? "IN" : "OUT"}</td>
      <td className="px-2 small">{category ? category.title : ""}</td>
      <td className="px-2 small">{formatdate(addedDate)}</td>

      <td className="px-2 small d-flex">
        {/* Delete button */}
        <Button
          variant="danger"
          className="me-1"
          size="sm"
          onClick={(event) => {
            handleDelete(event, singleProduct.productId);
          }}
        >
          <MdDeleteSweep size={""} />
        </Button>

        {/* View Button*/}
        <Button
          size="sm"
          className="me-1"
          variant="info"
          onClick={(event) => {
            handleView(event, singleProduct);
          }}
        >
          <CiViewTimeline />
        </Button>

        {/*Update Button*/}
        <Button
          size="sm"
          variant="warning"
          onClick={(event) => {
            openEditProductModal(event, singleProduct);
          }}
        >
          <GrUpdate />
        </Button>
      </td>
    </tr>
  );
};

export default SingleProductView;
