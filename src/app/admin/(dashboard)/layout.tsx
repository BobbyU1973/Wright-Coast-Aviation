import { AdminShell } from "@/components/admin/admin-shell";
import { requireOwner } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const user = await requireOwner();

  return (
    <AdminShell userEmail={user.email || "Owner"}>
      {children}
    </AdminShell>
  );
}
