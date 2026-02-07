"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

interface DeleteButtonProps {
  itemId: number;
  itemType: string;
  action: (id: number) => Promise<void>;
  onSuccess?: () => void;
}

export default function DeleteButton({ itemId, itemType, action, onSuccess }: DeleteButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete this ${itemType}?`)) {
      return;
    }

    setIsDeleting(true);

    try {
      await action(itemId);
      toast.success(`${itemType.charAt(0).toUpperCase() + itemType.slice(1)} deleted successfully`);
      
      if (onSuccess) {
        onSuccess();
      } else {
        router.refresh();
      }
    } catch (error) {
      console.error(`Failed to delete ${itemType}:`, error);
      toast.error(`Failed to delete ${itemType}`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className="rounded p-2 text-gray-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
      title="Delete"
    >
      {isDeleting ? (
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-red-500"></div>
      ) : (
        <Trash2 size={18} />
      )}
    </button>
  );
}