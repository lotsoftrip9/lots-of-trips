import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PolicyContent } from "@/components/sections/policy/PolicyContent";
import { PolicyNav } from "@/components/sections/policy/PolicyNav";
import { PageHeader } from "@/components/ui/PageHeader";
import { getPolicies, getPolicy } from "@/lib/data/guides";

export function generateStaticParams() {
  return getPolicies().map((policy) => ({ slug: policy.slug }));
}

export async function generateMetadata({ params }: PageProps<"/policies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const policy = getPolicy(slug);
  if (!policy) return {};

  return {
    title: policy.title,
    description: policy.summary,
    alternates: { canonical: `/policies/${policy.slug}` },
  };
}

export default async function PolicyPage({ params }: PageProps<"/policies/[slug]">) {
  const { slug } = await params;
  const policy = getPolicy(slug);
  if (!policy) notFound();

  return (
    <>
      <PageHeader eyebrow="Policies" title={policy.title} description={policy.summary}>
        <PolicyNav policies={getPolicies()} activeSlug={policy.slug} />
      </PageHeader>
      <div className="container-x pb-section">
        <PolicyContent policy={policy} />
      </div>
    </>
  );
}
