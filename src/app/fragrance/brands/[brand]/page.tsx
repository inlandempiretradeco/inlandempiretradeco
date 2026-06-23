import { redirect } from "next/navigation";
export default function OldFragranceBrandPage({ params }: { params: { brand: string } }) {
  redirect(`/brands/fragrance/${params.brand}`);
}
