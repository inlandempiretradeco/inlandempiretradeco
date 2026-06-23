import { redirect } from "next/navigation";
export default function OldWatchBrandPage({ params }: { params: { brand: string } }) {
  redirect(`/brands/watches/${params.brand}`);
}
