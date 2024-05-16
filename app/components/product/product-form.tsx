import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Icons } from "~/components/icons";
import { Heading } from "~/components/ui/heading";
import { postData } from "~/lib/fetch";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import { productUpsertSchema } from "~/lib/validations/product";
import { useToast } from "~/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@remix-run/react";

const captains = console;

type ProductFormValues = z.infer<typeof productUpsertSchema>;

interface ProductFormProps {
  initialData:
    | (ProductFormValues & {
        version?: number;
      })
    | null;
  _csrf: string;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  _csrf,
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const title = initialData ? "Edit product" : "Create product";
  const description = initialData ? "Edit a product." : "Add a new product.";
  const toastMessage = initialData ? "Product updated." : "Product created.";
  const action = initialData ? "Save changes" : "Create";

  const defaultValues = initialData
    ? initialData
    : {
        name: "",
        description: "",
        quantity: 0,
      };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productUpsertSchema),
    defaultValues: {
      ...defaultValues,
      token: _csrf,
    },
  });

  const mutation = useMutation({
    mutationFn: (data: ProductFormValues) => {
      return postData("/api/products/post", data);
    },
    onSuccess: () => {
      navigate("/dashboard/products");
      toast({
        description: toastMessage,
      });
    },
    onError: (error) => {
      toast({
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: ProductFormValues) => {
    if (!mutation.isPending) {
      captains.log("do something with the data", data);
      mutation.mutate(data);
    }
  };

  const onDelete = async () => {
    // TODO: Implement onDelete
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button variant="destructive" size="sm" onClick={onDelete}>
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="gap-8 md:grid md:grid-cols-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Product description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Hidden System Control field _csrf and version */}
            <FormField
              control={form.control}
              name="token"
              render={({ field }) => (
                <FormItem hidden>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="version"
              render={({ field }) => (
                <FormItem hidden>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            className="ml-auto"
            type="submit"
            disabled={mutation.isPending}
          >
            {mutation.isPending && (
              <Icons.spinner
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
            )}
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
