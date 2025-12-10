"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TourFormValues } from "../_schemas/tour-schema";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EmptyState from "./empty-state";
import DeleteTourModal from "./modals/delete-tour-modal";
import {
  CopyIcon,
  EllipsisVertical,
  Eye,
  PencilIcon,
  TrashIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { getEmbedScript } from "@/lib/utils";
import Loader from "@/components/loader";

const CreatedTours: React.FC = () => {
  const router = useRouter();
  const [tours, setTours] = useState<TourFormValues[]>([]);
  const [loading, setLoading] = useState(true);
  const [tourToDelete, setTourToDelete] = useState<TourFormValues | null>(null);

  // Fetch tours from API
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await fetch("/api/tours");
        const data = await res.json();
        console.log("tour data", data);
        setTours(data.tours || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  const handleViewDetails = (tourId: string) => router.push(`/tours/${tourId}`);
  const handleEdit = (tourId: string) => router.push(`/tours/edit/${tourId}`);
  const handleCopyEmbed = (tourId: string) => {
    const embedCode = getEmbedScript(tourId);
    navigator.clipboard.writeText(embedCode);
    toast.success("Embed code copied to clipboard!");
  };

  if (loading) return <Loader itemName="your tours" />;

  if (!tours.length) return <EmptyState />;

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {tours.map((tour) => (
        <Card
          key={tour.id}
          onClick={() => handleViewDetails(tour.id!)}
          className="rounded-2xl shadow hover:shadow-md backdrop-blur-2xl ease-in-out hover:bg-primary/10 relative hover:shadow-primary/20 cursor-pointer hover:border-primary transition-all duration-150"
        >
          <CardHeader className="flex flex-row justify-between items-start space-x-4">
            <CardTitle className="text-lg font-semibold">{tour.name}</CardTitle>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="p-2 ml-auto">
                  <EllipsisVertical className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="bg-background">
                <DropdownMenuItem onClick={() => handleViewDetails(tour.id!)}>
                  <Eye /> View
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleEdit(tour.id!)}>
                  <PencilIcon /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTourToDelete(tour)}>
                  <TrashIcon /> Delete
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleCopyEmbed(tour.id!)}>
                  <CopyIcon /> Copy Embed Code
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>

          <CardContent className="space-y-2">
            <p className="text-gray-300">
              {tour.description || "No description provided."}
            </p>
          </CardContent>

          <CardFooter className="flex justify-end gap-4 mt-auto">
            <p className="text-sm text-gray-400">{tour.steps.length} Steps</p>
          </CardFooter>
        </Card>
      ))}

      {tourToDelete && (
        <DeleteTourModal
          tourId={tourToDelete.id!}
          tourName={tourToDelete.name}
          open={!!tourToDelete}
          onOpenChange={(open) => {
            if (!open) setTourToDelete(null);
          }}
          onDeleted={() => {
            // remove the deleted tour from state
            setTours((prev) => prev.filter((t) => t.id !== tourToDelete.id));
            setTourToDelete(null);
          }}
        />
      )}
    </div>
  );
};

export default CreatedTours;
