"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import CreateTourForm from "../../../_components/create-tour-form";
import { useTourByID } from "@/hooks/use-tours";
import { toast } from "sonner";

const EditTourPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params.id) ? params.id[0] : (params.id as string);
  const { tour, loading, error } = useTourByID(id);

  useEffect(() => {
    if (!tour && error) {
      toast.error(error);
      router.push("/tours");
    }
  }, [tour, router, error]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-lg">Loading tour...</p>
      </div>
    );
  }

  if (!tour) {
    return null;
  }

  return <CreateTourForm existingTour={{
    id: tour.id,
    name: tour.name,
    description: tour.description,
    steps: tour.steps.map((step) => ({
      id: step.id,
      order: step.order_number,
      title: step.title,
      description: step.description,
    })),
  }} mode="edit" />;
};

export default EditTourPage;
