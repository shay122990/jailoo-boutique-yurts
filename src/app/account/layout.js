import SideNavigation from "./_components/SideNavigation";

export default function Layout({ children }) {
  return (
    <div className="grid w-full min-w-0 grid-cols-1 gap-6 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10">
      <SideNavigation />
      <main className="min-w-0 py-1">{children}</main>
    </div>
  );
}
