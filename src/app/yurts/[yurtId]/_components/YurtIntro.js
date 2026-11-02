function YurtIntro({ yurt }) {
  return (
    <>
      {/* Quick facts */}
      <section className="border-b border-[#e6e3da]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-8 sm:grid-cols-4 md:px-12">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#7c8067]">
              Guests
            </p>
            <p className="mt-2 text-xl">{yurt.capacity} guests</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-[#7c8067]">
              Bedrooms
            </p>
            <p className="mt-2 text-xl">
              {yurt.bedrooms} {yurt.bedrooms === 1 ? "bedroom" : "bedrooms"}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-[#7c8067]">
              Setting
            </p>
            <p className="mt-2 text-xl">{yurt.location}</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-[#7c8067]">
              From
            </p>
            <p className="mt-2 text-xl">
              {Number(yurt.price).toLocaleString()}{" "}
              <span className="text-sm">/ night</span>
            </p>
          </div>
        </div>
      </section>

      {/* Details and amenities */}
      <section
        id="details"
        className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.3fr_0.7fr] md:px-12 md:py-24"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#7c8067]">
            Your mountain retreat
          </p>

          <h2 className="mt-4 max-w-xl text-3xl font-light leading-tight sm:text-4xl">
            A little closer to nature, a little further from everyday life.
          </h2>

          <p className="mt-6 max-w-2xl leading-8 text-[#696b60]">
            {yurt.description}
          </p>

          <div className="mt-12">
            <h3 className="text-xl font-medium">Amenities & comforts</h3>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {(yurt.amenities ?? []).map((amenity) => (
                <div
                  key={amenity}
                  className="flex items-center gap-3 border-b border-[#e6e3da] pb-4"
                >
                  <span className="text-[#7c8067]" aria-hidden="true">
                    ✳
                  </span>
                  <span className="text-sm">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stay summary */}
        <aside className="h-fit border border-[#e6e3da] bg-white p-7 md:p-9">
          <p className="text-xs uppercase tracking-[0.25em] text-[#7c8067]">
            Your stay at Jailoo
          </p>

          <h3 className="mt-4 text-2xl font-light">{yurt.name}</h3>

          <p className="mt-2 text-sm text-[#77796f]">
            {yurt.location}, Kyrgyzstan
          </p>

          <div className="my-7 border-t border-[#e6e3da]" />

          <div className="flex items-baseline justify-between gap-4">
            <span className="text-sm text-[#696b60]">Price per night</span>
            <span className="text-2xl font-medium">
              {Number(yurt.price).toLocaleString()}
            </span>
          </div>

          <p className="mt-3 text-sm leading-6 text-[#77796f]">
            A peaceful retreat designed for up to {yurt.capacity}{" "}
            {yurt.capacity === 1 ? "guest" : "guests"}.
          </p>

          <div className="mt-6 border-t border-[#e6e3da] pt-5">
            <p className="text-sm leading-6 text-[#696b60]">
              Ready to experience the mountains? Get in touch to plan your stay.
            </p>
          </div>
        </aside>
      </section>
    </>
  );
}

export default YurtIntro;
