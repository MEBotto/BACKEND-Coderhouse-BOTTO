import Button from "../Button/Button";
import Swal from "sweetalert2";

const ProductCard = ({ p, t }) => {
  const viewInfo = () => {
    Swal.fire({
      imageUrl: p.thumbnail,
      imageHeight: 200,
      imageAlt: p.title,
      text: p.description,
    });
  };

  return (
    <div
      className={`flex flex-col items-center border ${
        t === "dark"
          ? "border-gray-400 text-white"
          : "border-zinc-900 text-black"
      } rounded-xl pb-2`}
    >
      <div
        className={`p-4 border-b ${
          t === "dark"
            ? "border-gray-400 text-white"
            : "border-zinc-900 text-black"
        }`}
      >
        {" "}
        <img
          src={p.thumbnail}
          alt={`Imagen de ${p.title}`}
          className="rounded-lg md:h-[400px] lg:h-[340px] xl:h-[390px]"
        />
      </div>
      <h2 className="uppercase text-lg font-bold mt-2">{p.title}</h2>
      <p className="mx-4 text-justify overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[90%]">
        {p.description}
      </p>
      <p className="text-xl font-bold my-2">${p.price}</p>
      <div className="flex justify-between gap-4">
        <Button
          text={"View More"}
          className={"font-bold"}
          onClickFunction={viewInfo}
        />
        <Button
          text={"Add to Cart"}
          className={`${
            t === "dark"
              ? "bg-mainColor text-black"
              : "bg-mainColorLight text-white"
          } p-2 rounded-xl font-bold`}
        />
      </div>
    </div>
  );
};

export default ProductCard;
