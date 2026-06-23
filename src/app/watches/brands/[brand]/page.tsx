import { redirect } from "next/navigation";
export default async function OldWatchBrandPage({ params }: { params: Promise<{ brand: string }> }) {
  const { brand } = await params;
  redirect(`/brands/watches/${brand}`);
}
