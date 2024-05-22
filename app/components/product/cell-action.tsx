import { useState } from "react";
import { Product } from "~/constants/data";
import { useNavigate } from "@remix-run/react";
import { deleteData } from "~/lib/fetch";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { AlertModal } from "~/components/modal/alert-modal";
import { useProductCsrfContext } from "~/routes/dashboard.products";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "~/components/ui/use-toast";

interface CellActionProps {
  data: Product;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const _csrf = useProductCsrfContext(); // eslint-disable-line @typescript-eslint/no-unused-vars

  const deleteProduct = useMutation({
    mutationFn: (id: string) => {
      // TODO: 必要に応じて _csrf トークンを利用し、CSRF対策を実施する
      return deleteData(`/api/products/delete?id=${id}`);
    },
    onSuccess: () => {
      navigate("/dashboard/products?page=1&limit=5");
      toast({
        description: "Product deleted.",
      });
    },
    onError: (error) => {
      toast({
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onConfirm = () => deleteProduct.mutate(data.id);

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={deleteProduct.isPending}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigate(`/dashboard/product/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
