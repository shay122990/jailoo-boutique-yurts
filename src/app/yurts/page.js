import { getYurts } from "../../_lib/data-service";

export const metadata = {
  title: "Yurts",
};

export default async function Yurts() {
  const yurts = await getYurts();

  return (
    <div>
      <h1>Our Yurts</h1>

      {yurts.map((yurt) => (
        <div key={yurt.id}>
          <h2>{yurt.name}</h2>
          <p>{yurt.location}</p>
          <p>${yurt.price} per night</p>
        </div>
      ))}
    </div>
  );
}
