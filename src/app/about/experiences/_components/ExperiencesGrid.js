// import Image from "next/image";
// import Link from "next/link";
// import type { Experience } from "@/lib/experiences";

// type ExperiencesGridProps = {
//   experiences: Experience[];
// };

// export default function ExperiencesGrid({ experiences }: ExperiencesGridProps) {
//   return (
//     <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
//       <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
//         <div>
//           <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#7c8067]">
//             Find your adventure
//           </p>

//           <h2 className="font-heading text-3xl md:text-4xl">
//             Explore our experiences
//           </h2>
//         </div>

//         <p className="max-w-md text-sm leading-6 text-[#686a60]">
//           Every experience offers a new perspective on the beauty and traditions
//           of Kyrgyzstan.
//         </p>
//       </div>

//       {experiences.length === 0 ? (
//         <p className="py-12 text-center text-sm text-[#686a60]">
//           No experiences are available right now.
//         </p>
//       ) : (
//         <div className="grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
//           {experiences.map((experience) => (
//             <article key={experience.id} className="group">
//               <div className="relative mb-5 aspect-4/5 overflow-hidden bg-[#e5e1d6]">
//                 <Image
//                   src={experience.image}
//                   alt={experience.title}
//                   fill
//                   loading="eager"
//                   sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//                   className="object-cover transition-transform duration-700 group-hover:scale-105"
//                 />
//               </div>

//               <div className="flex items-center justify-between gap-3">
//                 <span className="text-[10px] uppercase tracking-[0.2em] text-[#7c8067]">
//                   {experience.category}
//                 </span>

//                 <span className="text-xs text-[#77786f]">
//                   {experience.duration}
//                 </span>
//               </div>

//               <h3 className="mt-3 font-heading text-2xl">{experience.title}</h3>

//               <p className="mt-3 text-sm leading-7 text-[#686a60]">
//                 {experience.description}
//               </p>

//               <Link
//                 href="/contact"
//                 className="mt-5 inline-flex items-center gap-2 border-b border-[#858772] pb-1 text-xs uppercase tracking-[0.15em] transition-colors hover:text-[#858772]"
//               >
//                 Enquire about experience
//                 <span aria-hidden="true">↗</span>
//               </Link>
//             </article>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }
