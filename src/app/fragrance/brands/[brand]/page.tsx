import { redirect } from "next/navigation";
export default async function OldFragranceBrandPage({ params }: { params: Promise<{ brand: string }> }) {
  const { brand } = await params;
  redirect(`/brands/fragrance/${brand}`);
}
