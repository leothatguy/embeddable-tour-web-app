"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DeleteTourModal from "../../_components/delete-tour-modal";
import { ArrowLeft, CopyIcon, PencilIcon, TrashIcon } from "lucide-react";
import { useTourByID } from "@/hooks/use-tours";
import { toast } from "sonner";
import { getEmbedScript } from "@/lib/utils";

const ViewTourPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();

  const id = Array.isArray(params.id) ? params.id[0] : (params.id as string);

  const { tour, loading, deleteTour } = useTourByID(id);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  
  const handleDelete = async () => {
    if (!tour) return;
    const deleted = await deleteTour(tour.id);

    if (deleted) {
      router.push("/tours");
    } else {
      toast.error("Failed to delete tour");
    }
  };

  const handleCopyEmbed = () => {
    if (!tour) return;
    const embedCode = getEmbedScript(tour.id);
    navigator.clipboard.writeText(embedCode);
    toast.success("Embed code copied to clipboard!");
  };

  const handleEdit = () => {
    if (!tour) return;
    router.push(`/tours/edit/${tour.id}`);
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (!tour) return <p className="text-center mt-10">Tour not found</p>;

  return (
    <div className="max-w-4xl mx-auto mt-6 space-y-6">
      <Button
        variant="outline"
        size="sm"
        onClick={() => router.push("/tours")}
        className="mb-4"
      >
        <ArrowLeft />
      </Button>
      <header className="flex flex-col md:flex-row justify-between gap-5 md:items-center pb-4 border-b">
        <h1 className="text-3xl font-bold">{tour.name}</h1>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleEdit}>
            <PencilIcon className="w-4 h-4 mr-2" /> Edit
          </Button>
          <Button variant="outline" size="sm" onClick={handleCopyEmbed}>
            <CopyIcon className="w-4 h-4 mr-2" /> Copy Script
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            <TrashIcon className="w-4 h-4 mr-2" /> Delete
          </Button>
        </div>
      </header>

      {tour.description && (
        <Card className="rounded-xl shadow p-4">
          <CardTitle className="text-lg mb-2">Description</CardTitle>
          <p className="text-gray-600">{tour.description}</p>
        </Card>
      )}

      <h2 className="text-2xl font-semibold mt-6">
        Steps ({tour.steps.length})
      </h2>

      <div className="space-y-4 mt-4">
        {tour.steps.map((step) => (
          <Card key={step.id} className="rounded-xl shadow p-4">
            <CardHeader className="p-0 pb-2">
              <CardTitle className="text-xl font-medium">
                Step {step.order_number}: {step.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p>{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <DeleteTourModal
        tourName={tour.name}
        onConfirm={handleDelete}
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
      />
    </div>
  );
};

export default ViewTourPage;
