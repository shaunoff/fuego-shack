import { Form, json } from "remix";
import type { ActionFunction } from "remix";

import { createNote } from "~/models/note.server";
import { requireUserId } from "~/session.server";
import { useState } from "react";

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();

  const title = formData.get("title");
  const body = formData.get("description") || "no description";
  const imageUrl = formData.get("img");

  if (typeof title !== "string" || title.length === 0) {
    return json({ errors: { title: "Title is required" } }, { status: 400 });
  }

  if (typeof body !== "string" || body.length === 0) {
    return json({ errors: { body: "Body is required" } }, { status: 400 });
  }

  if (typeof imageUrl !== "string" || imageUrl.length === 0) {
    return json({ errors: { image: "Image is required" } }, { status: 400 });
  }

  const note = await createNote({
    title,
    body,
    userId,
    imageUrl,
  });

  return note;
};

export default function NewNotePage() {
  const [brand, setBrand] = useState<any>("");
  const [name, setName] = useState<any>("");
  const [page, setPage] = useState<any>(1);
  const [products, setProducts] = useState<any>([]);

  const clickHandler = () => {
    fetch(
      "https://cors-anywhere.herokuapp.com/" +
        `https://api.barcodelookup.com/v3/products?search=${name}&page=${page}&brand=${brand}&key=36m27enso57qr6e6i2aeqnxcyxa77e&formatted=y&category=Food, Beverages %26 Tobacco`,
      {
        // mode: "cors",
        // credentials: "include",
        headers: {
          "Content-Type": "application/json",
          //   "Access-Control-Allow-Origin": "*",
        },
      }
    )
      .then((data) => data.json())
      .then((data) => {
        setProducts(data.products);
      });
  };
  return (
    <div>
      <div>
        Brand:
        <input onChange={(e) => setBrand(e.target.value)} value={brand} />
        tyep:
        <input onChange={(e) => setName(e.target.value)} value={name} />
        <p>{brand}</p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "20px",
          }}
        >
          <button onClick={() => setPage(1)}>1</button>
          <button onClick={() => setPage(2)}>2</button>
          <button onClick={() => setPage(3)}>3</button>
          <button onClick={() => setPage(4)}>4</button>
          <button onClick={() => setPage(5)}>5</button>
          <button onClick={() => setPage(6)}>6</button>
          <button onClick={() => setPage(7)}>7</button>
          <button onClick={() => setPage(8)}>8</button>
          <button onClick={() => setPage(9)}>9</button>
          <button onClick={() => setPage(10)}>10</button>
          <button onClick={() => setPage(11)}>11</button>
        </div>
        <button style={{ background: "green" }} onClick={clickHandler}>
          GET
        </button>
      </div>
      {products.map((product: any, index: number) => {
        return (
          <Form method="post" key={index}>
            <div key={product.id}>
              <div>
                Title:
                <input
                  name="title"
                  value={product.title}
                  type="textarea"
                  style={{ width: "100%" }}
                />
              </div>
              <br />
              <div>
                Brand:
                <input name="brand" value={product.brand} />
              </div>{" "}
              <br />
              <div>
                Description:{" "}
                <input
                  name="description"
                  value={product.description}
                  type="textarea"
                  style={{ width: "100%" }}
                />
              </div>
              <div>
                <input name="release_date" value={product.release_date} />
              </div>
              <input name="barcode_number" value={product.barcode_number} />
              <input name="category" value={product.category} />
              {product.images.map((image: any, index: number) => {
                if (index == 0) {
                  return (
                    <>
                      <img
                        src={image}
                        style={{ width: 200, height: 600 }}
                        alt="logo"
                      />
                      <input
                        name={"img"}
                        value={image}
                        style={{ width: "100%" }}
                      />
                    </>
                  );
                }
                return null;
              })}
            </div>
            <button type="submit" className="button">
              Add
            </button>
          </Form>
        );
      })}
    </div>
  );
}
