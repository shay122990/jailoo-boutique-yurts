import {
  UsersIcon,
  HomeModernIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

function YurtIntro({ yurt }) {
  return (
    <>
      {/* Quick facts */}
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-8 sm:grid-cols-4 md:px-12">
        {[
          {
            label: "Guests",
            value: `${yurt.capacity} guests`,
            Icon: UsersIcon,
          },
          {
            label: "Bedrooms",
            value: `${yurt.bedrooms} ${yurt.bedrooms === 1 ? "bedroom" : "bedrooms"}`,
            Icon: HomeModernIcon,
          },
          {
            label: "Setting",
            value: yurt.location,
            Icon: MapPinIcon,
          },
          {
            label: "From",
            value: `$ ${Number(yurt.price).toLocaleString()} / night`,
            Icon: CurrencyDollarIcon,
          },
        ].map(({ label, value, Icon }) => (
          <div key={label} className="flex items-center gap-4">
            <Icon className="h-7 w-7 shrink-0 text-purple" strokeWidth={1.5} />

            <div>
              <p className="text-xs uppercase tracking-widest text-purple">
                {label}
              </p>
              <p className="mt-1 text-lg text-plum">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Details and amenities */}
      <section
        id="details"
        className="mx-auto grid max-w-7xl gap-12 border-b border-plum/15 px-6 py-16 md:grid-cols-[1.3fr_0.7fr] md:px-12 md:py-24"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-teal">
            Your mountain retreat
          </p>

          <h2 className="mt-4 max-w-xl text-3xl font-light leading-tight text-plum sm:text-4xl">
            A little closer to nature, a little further from everyday life.
          </h2>

          <p className="mt-6 max-w-2xl leading-8 text-bg/75">
            {yurt.description}
          </p>

          <div className="mt-12">
            <h3 className="text-xl font-medium text-plum">
              Amenities & comforts
            </h3>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {(yurt.amenities ?? []).map((amenity) => (
                <div
                  key={amenity}
                  className="flex items-center gap-3 border-b border-plum/15 pb-4"
                >
                  <span className="text-peach" aria-hidden="true">
                    <CheckCircleIcon
                      className="h-5 w-5 shrink-0 text-teal"
                      strokeWidth={1.5}
                    />
                  </span>
                  <span className="text-sm text-bg">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stay summary */}
        <aside className="h-fit rounded-xl border border-plum/15 bg-white p-7 shadow-sm md:p-9">
          <p className="text-xs uppercase tracking-[0.25em] text-purple">
            Your stay at Jailoo
          </p>

          <h3 className="mt-4 text-2xl font-light text-plum">{yurt.name}</h3>

          <p className="mt-2 text-sm text-bg/60">{yurt.location}, Kyrgyzstan</p>

          <div className="my-7 border-t border-plum/15" />

          <div className="flex items-baseline justify-between gap-4">
            <span className="text-sm text-bg/70">Price per night</span>
            <span className="text-2xl font-medium text-plum">
              {`$ ${Number(yurt.price).toLocaleString()}`}
            </span>
          </div>

          <p className="mt-3 text-sm leading-6 text-bg/70">
            A peaceful retreat designed for up to {yurt.capacity}{" "}
            {yurt.capacity === 1 ? "guest" : "guests"}.
          </p>

          <div className="mt-6 border-t border-plum/15 pt-5">
            <p className="text-sm leading-6 text-bg/70">
              Ready to experience the mountains? Get in touch to plan your stay.
            </p>
          </div>

          <a
            href="#"
            className="mt-6 block rounded-lg bg-teal px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-aqua hover:text-plum"
          >
            Plan your stay
          </a>
        </aside>
      </section>
    </>
  );
}

export default YurtIntro;
